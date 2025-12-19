#!/bin/bash

# Script para extrair metadados das principais tabelas do sistema PGD
DATABASE="petrvs_nua"
OUTPUT_FILE="docs/pgd_main_tables.md"

# Tabelas principais do sistema PGD
MAIN_TABLES=(
    "usuarios"
    "unidades" 
    "programas"
    "planos_trabalhos"
    "planos_trabalhos_entregas"
    "planos_trabalhos_consolidacoes"
    "atividades"
    "planos_entregas"
    "planos_entregas_entregas"
    "entidades"
    "tipos_modalidades"
    "avaliacoes"
)

echo "# Documentação das Principais Tabelas - Sistema PGD Petrvs" > $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
echo "Este documento contém a estrutura das principais tabelas do sistema PGD Petrvs." >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
echo "**Data de geração:** $(date)" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

echo "## Tabelas Principais" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

for table in "${MAIN_TABLES[@]}"; do
    echo "- [$table](#$table)" >> $OUTPUT_FILE
done

echo "" >> $OUTPUT_FILE
echo "---" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Extrair informações de cada tabela principal
for table in "${MAIN_TABLES[@]}"; do
    echo "## $table" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    
    # Verificar se a tabela existe
    TABLE_EXISTS=$(docker exec petrvs_db mariadb -u root -pPsEeTnRhVaS $DATABASE -e "SHOW TABLES LIKE '$table';" | wc -l)
    
    if [ $TABLE_EXISTS -gt 1 ]; then
        # Obter CREATE TABLE de forma mais limpa
        echo "### Estrutura da Tabela" >> $OUTPUT_FILE
        echo "" >> $OUTPUT_FILE
        echo '```sql' >> $OUTPUT_FILE
        docker exec petrvs_db mariadb -u root -pPsEeTnRhVaS $DATABASE -e "SHOW CREATE TABLE $table\G" | grep -A 1000 "Create Table:" | tail -n +2 | head -n -1 >> $OUTPUT_FILE
        echo '```' >> $OUTPUT_FILE
        echo "" >> $OUTPUT_FILE
        
        # Obter informações das colunas em formato de tabela
        echo "### Descrição das Colunas" >> $OUTPUT_FILE
        echo "" >> $OUTPUT_FILE
        echo "| Campo | Tipo | Nulo | Chave | Padrão | Extra |" >> $OUTPUT_FILE
        echo "|-------|------|------|-------|--------|-------|" >> $OUTPUT_FILE
        
        docker exec petrvs_db mariadb -u root -pPsEeTnRhVaS $DATABASE -e "DESCRIBE $table;" | tail -n +2 | while IFS=$'\t' read -r field type null key default extra; do
            echo "| $field | $type | $null | $key | $default | $extra |" >> $OUTPUT_FILE
        done
        
        echo "" >> $OUTPUT_FILE
    else
        echo "**Tabela não encontrada no banco de dados.**" >> $OUTPUT_FILE
        echo "" >> $OUTPUT_FILE
    fi
    
    echo "---" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
done

echo "Documentação das principais tabelas gerada com sucesso em $OUTPUT_FILE"