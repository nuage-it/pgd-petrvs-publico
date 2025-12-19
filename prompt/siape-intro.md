# Prompt: Documentacao de Integracao SIAPE

## Objetivo

Analisar todo o codigo do back-end relacionado ao SIAPE e construir um documento completo em `docs/siape/intro.md`.

## Escopo da Analise

### 1. Pontos de Entrada e Saida

- Identificar todos os endpoints HTTP que interagem com o SIAPE
- Mapear operacoes SOAP consumidas da API SIAPE
- Documentar rotas internas e externas

### 2. Meios de Comunicacao

- Protocolo de comunicacao (SOAP/XML via ConectaGov)
- Autenticacao OAuth2 (Client Credentials)
- Headers necessarios para requisicoes
- Endpoint base e operacoes disponiveis

### 3. Entrada e Saida de Dados

- Dados recebidos do SIAPE (pessoais, funcionais, UORG)
- Transformacoes aplicadas aos dados
- Dados enviados para o SIAPE (quando aplicavel)
- Formato XML SOAP das requisicoes

### 4. Persistencia de Dados

Mapear todas as tabelas relacionadas:
- Tabelas temporarias SIAPE (armazenamento XML)
- Tabelas de blacklist
- Tabelas de integracao processada
- Tabelas de destino final (usuarios, unidades)

### 5. Fluxo de Dados

Documentar os fluxos completos:
- Sincronizacao em lote (BuscarDadosSiapeJob -> SincronizarSiapeJob)
- Processamento individual (SiapeIndividualController)
- Inativacao de usuarios/unidades (blacklist)
- Atualizacao de gestores/chefias

### 6. Regras de Negocio

- Situacoes funcionais especiais (ativo em outro orgao, contrato temporario)
- Logica de blacklist e inativacao (30 dias)
- Estados de usuario SIAPE (ATIVO, INATIVO, ATIVO_TEMPORARIO)
- Validacoes e tratamento de duplicidade

### 7. Analise de Seguranca

- Vulnerabilidades identificadas
- Riscos operacionais
- Pontos de atencao
- Recomendacoes de melhoria

### 8. Pontos Positivos

- Boas praticas implementadas
- Robustez da arquitetura
- Escalabilidade

## Arquivos a Analisar

### Services Principais
- `app/Services/IntegracaoService.php`
- `app/Services/IntegracaoSiapeService.php`
- `app/Services/IntegracaoServidorService.php`
- `app/Services/SiapeIndividualService.php`
- `app/Services/Siape/BuscarDados/*.php`
- `app/Services/Siape/ProcessaDadosSiapeBD.php`
- `app/Services/Siape/Servidor/Integracao.php`

### Controllers
- `app/Http/Controllers/SiapeIndividualController.php`
- `app/Http/Controllers/SiapeBlackListServidorController.php`
- `app/Http/Controllers/SiapeBlacklistUnidadeController.php`

### Jobs
- `app/Jobs/BuscarDadosSiapeJob.php`
- `app/Jobs/SincronizarSiapeJob.php`
- `app/Jobs/InativacaoUsuariosSiape.php`
- `app/Jobs/InativacaoUnidadesSiape.php`

### Models
- `app/Models/Siape*.php`
- `app/Models/TipoModalidadeSiape.php`

### Configuracao
- `config/integracao.php`

### Migrations
- `database/migrations/tenant/*siape*.php`

### Rotas
- `routes/api_tenant.php` (rotas SIAPE)

### Exceptions
- `app/Exceptions/*Siape*.php`
- `app/Exceptions/RequestConectaGovException.php`

### Enums
- `app/Enums/UsuarioSituacaoSiape.php`

## Estrutura do Documento Final

O documento deve conter:

1. **Visao Geral** - Objetivo e arquitetura
2. **Autenticacao** - OAuth2 com ConectaGov
3. **Variaveis de Ambiente** - Configuracoes necessarias
4. **Estrutura de Dados** - Tabelas e relacionamentos
5. **Endpoints** - Rotas internas e operacoes SOAP
6. **Fluxos de Processamento** - Diagramas e explicacoes
7. **Dados do SIAPE** - Campos recebidos e mapeamento
8. **Jobs e Comandos** - Processamento assincrono
9. **Tratamento de Erros** - Exceptions e logging
10. **Estados de Usuario** - Enum e transicoes
11. **Analise de Seguranca** - Vulnerabilidades e riscos
12. **Pontos Positivos** - Boas praticas
13. **Diagramas** - Sequencia e fluxo
14. **Estrutura de Arquivos** - Organizacao do codigo
15. **Checklist de Implantacao** - Passos para deploy
16. **Glossario** - Termos tecnicos
17. **Referencias** - Links uteis

## Criterios de Qualidade

- Documento autocontido e completo
- Linguagem tecnica mas acessivel
- Exemplos de codigo quando relevante
- Diagramas ASCII para fluxos
- Tabelas para mapeamento de dados
- Identificacao clara de riscos e recomendacoes
- Estrutura navegavel com sumario

## Resultado Esperado

Um documento robusto em Markdown que permita a qualquer desenvolvedor ou arquiteto:
- Compreender completamente a integracao SIAPE
- Identificar pontos de entrada/saida
- Entender o fluxo de dados
- Conhecer as regras de negocio
- Avaliar riscos de seguranca
- Realizar manutencao no codigo
- Implantar em novos ambientes
