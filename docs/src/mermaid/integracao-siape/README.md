# Diagramas Mermaid - Integração SIAPE

## Estrutura Hierárquica

Esta documentação está organizada em **4 níveis hierárquicos** de abstração, do mais geral ao mais específico:

### 📋 Nível 1: Contexto Geral
**Diretório:** `nivel-1-contexto/`

Visão macro do sistema no contexto governamental.

- **`sistema-contexto.mmd`** - Contexto geral PGD-SIAPE no Governo Federal
- **`atores-principais.mmd`** - Mapeamento de atores e responsabilidades

### ⚙️ Nível 2: Arquitetura Técnica  
**Diretório:** `nivel-2-arquitetura/`

Componentes técnicos e estrutura da solução.

- **`componentes-tecnicos.mmd`** - Arquitetura em camadas (Externa, Aplicação, Dados, Infraestrutura)
- **`apis-endpoints.mmd`** - APIs ConectaGov/SIAPE e configurações de comunicação
- **`pipeline.mmd`** - Pipeline completo de sincronização (BuscarDados + Sincronizar)
- **`architecture.mmd`** - Diagrama de classes e herança

### 🔄 Nível 3: Fluxos de Processo
**Diretório:** `nivel-3-processos/`

Processos de negócio e fluxos operacionais.

- **`fluxo-completo.mmd`** - Processo end-to-end (Gatilhos → Preparação → Execução → Sincronização → Finalização)
- **`tratamento-erros.mmd`** - Estratégias de tratamento de erros e recuperação
- **`sequence.mmd`** - Sequência detalhada das 4 etapas do BuscarDadosSiapeJob
- **`dataflow.mmd`** - Fluxo de dados desde API SIAPE até tabelas definitivas

### 🔧 Nível 4: Detalhes Técnicos
**Diretório:** `nivel-4-detalhes/`

Implementação técnica específica e estruturas de dados.

- **`estruturas-dados.mmd`** - Modelo ER completo (tabelas temporárias, controle, produção, auditoria)
- **`mapeamento-campos.mmd`** - Transformação XML SIAPE → Banco de dados PGD
- **`optimization.mmd`** - 5 mecanismos de otimização implementados
- **`configuration.mmd`** - Configurações detalhadas do sistema

## Princípios da Documentação

### 🎯 Hierarquia Clara
- **Nível 1**: Para gestores e stakeholders (visão estratégica)
- **Nível 2**: Para arquitetos e líderes técnicos (decisões arquiteturais)
- **Nível 3**: Para desenvolvedores sênior (implementação de processos)
- **Nível 4**: Para desenvolvedores (implementação técnica detalhada)

### 📊 Cobertura Completa
- ✅ Contexto governamental e atores
- ✅ Arquitetura técnica em camadas
- ✅ APIs e protocolos de comunicação
- ✅ Fluxos de processo e tratamento de erros
- ✅ Estruturas de dados e mapeamentos
- ✅ Otimizações e configurações

### 🔄 Facilidade de Manutenção
- Diagramas auto-explicativos
- Nomenclatura consistente
- Cores padronizadas (gov.br design system)
- Estrutura modular e escalável

## Como Usar

### 📖 Para Leitura
1. Comece pelo **Nível 1** para entender o contexto
2. Avance pelos níveis conforme necessário
3. Use os diagramas como referência durante desenvolvimento

### 🔧 Para Manutenção
1. Edite os arquivos `.mmd` na estrutura hierárquica
2. Execute `npm run mermaid:build` para gerar PNGs
3. As imagens são criadas automaticamente em `public/mermaid/`

### 📋 Para Documentação
- Cada nível tem propósito específico
- Mantenha consistência visual entre diagramas
- Atualize conforme evolução do sistema

## Referências

- **Portal PGD MGI**: https://www.gov.br/servidor/pt-br/assuntos/programa-de-gestao
- **Padrões de Código**: `/.amazonq/rules/padroes_de_codigo.md`
- **Build Script**: `/scripts/build-mermaid.js`
- **Documentação**: `/src/app/integracao-siape/page.tsx`