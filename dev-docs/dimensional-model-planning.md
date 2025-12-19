# Planejamento - Estrutura Dimensional PGD Petrvs

## Análise das Tabelas Principais

### Tabelas Fato Identificadas
- **planos_entregas** - Fato principal dos planos de entrega
- **planos_trabalhos** - Fato principal dos planos de trabalho  
- **planos_entregas_entregas** - Fato das entregas específicas
- **planos_trabalhos_entregas** - Fato das entregas do plano de trabalho
- **avaliacoes** - Fato das avaliações

### Tabelas Dimensão Identificadas
- **usuarios** - Dimensão de usuários/servidores
- **unidades** - Dimensão organizacional hierárquica
- **programas** - Dimensão de programas de gestão
- **tipos_modalidades** - Dimensão de modalidades de trabalho
- **entregas** - Dimensão de catálogo de entregas
- **entidades** - Dimensão de entidades/órgãos

## Estrutura Dimensional Proposta

### Fatos Centrais

#### 1. Fato Plano Entrega (ft_plano_entrega)
**Métricas:**
- Quantidade de planos
- Dias de duração
- Status de progresso
- Indicadores de cumprimento

**Dimensões:**
- Tempo (data_inicio, data_fim)
- Unidade executora
- Programa
- Usuário responsável
- Status

#### 2. Fato Plano Trabalho (ft_plano_trabalho)  
**Métricas:**
- Carga horária total
- Tempo proporcional
- Quantidade de entregas
- Percentual de conclusão

**Dimensões:**
- Tempo (data_inicio, data_fim)
- Usuário participante
- Unidade
- Programa
- Modalidade
- Status

#### 3. Fato Entregas (ft_entregas)
**Métricas:**
- Progresso esperado
- Progresso realizado
- Força de trabalho alocada
- Desvio de prazo

**Dimensões:**
- Tempo
- Tipo de entrega
- Unidade demandante
- Plano origem

#### 4. Fato Avaliações (ft_avaliacoes)
**Métricas:**
- Notas atribuídas
- Quantidade de recursos
- Tempo de avaliação

**Dimensões:**
- Tempo
- Avaliador
- Tipo de avaliação
- Plano avaliado

### Dimensões Principais

#### 1. Dimensão Tempo (dim_tempo)
- Hierarquia: Ano > Trimestre > Mês > Semana > Dia
- Atributos: feriados, dias úteis, períodos de consolidação

#### 2. Dimensão Unidade (dim_unidade)
- Hierarquia organizacional completa
- Path hierárquico
- Atributos: sigla, nome, tipo, status

#### 3. Dimensão Usuário (dim_usuario)
- Dados pessoais e funcionais
- Situação funcional
- Perfil de acesso

#### 4. Dimensão Programa (dim_programa)
- Configurações do programa
- Prazos e periodicidades
- Tipos de avaliação

## Benefícios da Estrutura Dimensional

### 1. Análises Temporais
- Evolução de planos ao longo do tempo
- Sazonalidade de entregas
- Tendências de performance

### 2. Análises Organizacionais
- Performance por unidade
- Comparação entre hierarquias
- Distribuição de carga de trabalho

### 3. Análises de Gestão
- Efetividade de programas
- Qualidade das avaliações
- Cumprimento de prazos

### 4. Indicadores Estratégicos
- Taxa de conclusão de planos
- Produtividade por servidor
- Eficiência organizacional

## Implementação Sugerida

### Fase 1: Dimensões Base
1. Criar dim_tempo com calendário completo
2. Implementar dim_unidade com hierarquia
3. Estruturar dim_usuario com dados funcionais

### Fase 2: Fatos Principais  
1. Implementar ft_plano_entrega
2. Implementar ft_plano_trabalho
3. Criar relacionamentos com dimensões

### Fase 3: Fatos Detalhados
1. Implementar ft_entregas
2. Implementar ft_avaliacoes
3. Criar métricas calculadas

### Fase 4: Otimização
1. Índices para performance
2. Agregações pré-calculadas
3. Views materializadas

## Considerações Técnicas

### ETL Process
- Extração incremental das tabelas OLTP
- Transformação para estrutura dimensional
- Carga com controle de qualidade

### Performance
- Particionamento por tempo
- Índices otimizados para consultas
- Compressão de dados históricos

### Governança
- Definição clara de métricas
- Documentação de regras de negócio
- Controle de acesso por perfil