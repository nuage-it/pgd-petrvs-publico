#!/bin/bash

# Script para extrair metadados do banco de dados Petrvs
DATABASE="petrvs_nua"
OUTPUT_FILE="docs/database_schema.md"

echo "# Documentação do Banco de Dados - Sistema Petrvs PGD" > $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
echo "Este documento contém a estrutura completa do banco de dados do sistema Petrvs PGD." >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
echo "**Data de geração:** $(date)" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Obter lista de tabelas
TABLES=$(docker exec petrvs_db mariadb -u root -pPsEeTnRhVaS $DATABASE -e "SHOW TABLES;" | tail -n +2)

echo "## Índice de Tabelas" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Criar índice
for table in $TABLES; do
    echo "- [$table](#$table)" >> $OUTPUT_FILE
done

echo "" >> $OUTPUT_FILE
echo "---" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Extrair DDL de cada tabela
for table in $TABLES; do
    echo "## $table" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    
    # Obter CREATE TABLE
    echo "### Estrutura da Tabela" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    echo '```sql' >> $OUTPUT_FILE
    docker exec petrvs_db mariadb -u root -pPsEeTnRhVaS $DATABASE -e "SHOW CREATE TABLE $table\G" | grep -A 1000 "Create Table:" | tail -n +2 | sed 's/^[[:space:]]*//' >> $OUTPUT_FILE
    echo '```' >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    
    # Obter informações das colunas
    echo "### Colunas" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    echo "| Campo | Tipo | Nulo | Chave | Padrão | Extra |" >> $OUTPUT_FILE
    echo "|-------|------|------|-------|--------|-------|" >> $OUTPUT_FILE
    
    docker exec petrvs_db mariadb -u root -pPsEeTnRhVaS $DATABASE -e "DESCRIBE $table;" | tail -n +2 | while read line; do
        echo "| $line |" | sed 's/\t/ | /g' >> $OUTPUT_FILE
    done
    
    echo "" >> $OUTPUT_FILE
    
    # Obter índices
    echo "### Índices" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    echo '```sql' >> $OUTPUT_FILE
    docker exec petrvs_db mariadb -u root -pPsEeTnRhVaS $DATABASE -e "SHOW INDEX FROM $table;" >> $OUTPUT_FILE
    echo '```' >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    
    echo "---" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
done

echo "Documentação gerada com sucesso em $OUTPUT_FILE"