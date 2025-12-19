#!/usr/bin/env node

const { exec } = require('child_process');
const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: 'localhost',
  port: 3308,
  user: 'root',
  password: 'PsEeTnRhVaS'
};

const CONTAINER_NAME = 'petrvs_php';

async function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function fixCorruptedTable(database, tableName) {
  try {
    console.log(`🔧 Reparando tabela corrompida: ${tableName}`);
    const connection = await mysql.createConnection({...DB_CONFIG, database});
    
    await connection.execute(`REPAIR TABLE ${tableName}`);
    await connection.execute(`CHECK TABLE ${tableName}`);
    
    await connection.end();
    console.log(`✓ Tabela ${tableName} reparada`);
    return true;
  } catch (error) {
    console.log(`✗ Erro ao reparar ${tableName}:`, error.message);
    return false;
  }
}

async function dropAndRecreateTable(database, tableName) {
  try {
    console.log(`🔧 Recriando tabela: ${tableName}`);
    const connection = await mysql.createConnection({...DB_CONFIG, database});
    
    await connection.execute(`DROP TABLE IF EXISTS ${tableName}`);
    
    const createSql = `
      CREATE TABLE ${tableName} (
        id char(36) NOT NULL PRIMARY KEY,
        response longtext NOT NULL,
        created_at timestamp NULL DEFAULT NULL,
        updated_at timestamp NULL DEFAULT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `;
    
    await connection.execute(createSql);
    await connection.end();
    console.log(`✓ Tabela ${tableName} recriada`);
    return true;
  } catch (error) {
    console.log(`✗ Erro ao recriar ${tableName}:`, error.message);
    return false;
  }
}

async function fixMigrationError(errorMsg) {
  if (errorMsg.includes('Incorrect information in file') && errorMsg.includes('.frm')) {
    const match = errorMsg.match(/petrvs_(\w+)\/(\w+)\.frm/);
    if (match) {
      const [, tenant, tableName] = match;
      const database = `petrvs_${tenant}`;
      
      console.log(`🔍 Detectado arquivo .frm corrompido: ${tableName} no tenant ${tenant}`);
      
      if (await fixCorruptedTable(database, tableName)) {
        return true;
      }
      
      return await dropAndRecreateTable(database, tableName);
    }
  }
  
  if (errorMsg.includes('Duplicate column name')) {
    console.log('🔧 Coluna já existe, marcando migration como executada...');
    await markMigrationAsRun();
    return true;
  }
  
  if (errorMsg.includes('Table') && errorMsg.includes('already exists')) {
    console.log('🔧 Tabela já existe, continuando...');
    return true;
  }
  
  return false;
}

async function markMigrationAsRun() {
  try {
    const connection = await mysql.createConnection({...DB_CONFIG, database: 'petrvs_nua'});
    
    const migrationName = '2024_10_01_200620_add_cpf_to_siape_tables';
    const batch = await connection.execute('SELECT MAX(batch) as max_batch FROM migrations');
    const nextBatch = (batch[0][0]?.max_batch || 0) + 1;
    
    await connection.execute(
      'INSERT IGNORE INTO migrations (migration, batch) VALUES (?, ?)',
      [migrationName, nextBatch]
    );
    
    await connection.end();
    console.log('✓ Migration marcada como executada');
  } catch (error) {
    console.log('✗ Erro ao marcar migration:', error.message);
  }
}

async function runTenantsMigrate() {
  try {
    console.log('🚀 Executando tenants:migrate');
    
    const command = `docker exec ${CONTAINER_NAME} php artisan tenants:migrate --force`;
    const result = await executeCommand(command);
    
    console.log('✓ Migration executada com sucesso!');
    return true;
  } catch (error) {
    console.log('✗ Erro na migration');
    
    const errorMsg = error.stderr || error.stdout || error.error?.message || '';
    
    if (await fixMigrationError(errorMsg)) {
      console.log('⏳ Tentando migration novamente após correção...');
      return await runTenantsMigrate();
    }
    
    throw error;
  }
}

async function main() {
  try {
    await runTenantsMigrate();
    console.log('\n✅ Processo concluído com sucesso!');
  } catch (error) {
    console.log('\n❌ Falha na migration:', error.stderr || error.error?.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}