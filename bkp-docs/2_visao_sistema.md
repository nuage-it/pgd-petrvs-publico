# Visão Geral do Sistema

## Propósito e Escopo

O **PGD Petrvs** é um sistema integrado de gestão de Programa de Gestão e Desempenho (PGD) que automatiza e centraliza todos os processos relacionados ao trabalho remoto e híbrido no setor público federal. O sistema gerencia desde o planejamento estratégico institucional até a execução individual de atividades, passando por avaliações de desempenho, consolidação de resultados e geração de relatórios gerenciais. Implementa uma arquitetura multi-tenant robusta que permite atender múltiplos órgãos simultaneamente, mantendo isolamento completo de dados e configurações personalizadas por entidade.

O escopo abrange gestão de planos de trabalho individuais, planos de entrega institucionais, controle de atividades e tempo, sistema de avaliações, integração com sistemas governamentais (SIAPE, Login Único), relatórios gerenciais e dashboards executivos, além de funcionalidades de auditoria e compliance.

## Estatísticas do Sistema

- **Total de Módulos Funcionais**: 12
- **Total de Controllers**: 118
- **Total de Models**: 130
- **Total de Services**: 95
- **Total de Jobs Assíncronos**: 8
- **Total de Rotas API**: 400+

---

# Arquitetura de Alto Nível

## Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                     CAMADA DE APRESENTAÇÃO                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Frontend   │  │   Mobile     │  │  API Pública │     │
│  │   Angular    │  │     App      │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST API
┌────────────────────────▼────────────────────────────────────┐
│                    CAMADA DE APLICAÇÃO                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Controllers (API Endpoints)              │  │
│  │  • Gestão (PlanoTrabalho, PlanoEntrega, Atividade)   │  │
│  │  • Configurações (Usuario, Unidade, Perfil)          │  │
│  │  • Cadastros (Tipos, Feriados, Cidades)              │  │
│  │  • Relatórios (Indicadores, Exportações)             │  │
│  │  • Integrações (SIAPE, Login, Notificações)          │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   CAMADA DE NEGÓCIO                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                     Services                          │  │
│  │  • PlanoTrabalhoService, PlanoEntregaService         │  │
│  │  • AtividadeService, AvaliacaoService                │  │
│  │  • IntegracaoSiapeService, NotificacaoService        │  │
│  │  • RelatorioService, IndicadoresService              │  │
│  │  • UsuarioService, UnidadeService                    │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   CAMADA DE DADOS                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Models & Repositories                         │  │
│  │  • Usuario, Unidade, PlanoTrabalho, PlanoEntrega     │  │
│  │  • Atividade, Avaliacao, Programa, Projeto           │  │
│  │  • Tenant, Audit, Logs, Notificacao                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Componentes Horizontais

### Autenticação e Autorização
- **Mecanismo**: Laravel Sanctum + Multi-provider (Azure AD, Google, Gov.br, LDAP)
- **Localização**: `/app/Http/Controllers/LoginController.php`, `/app/Auth/`
- **Módulos afetados**: Todos os módulos funcionais

### Cache
- **Implementação**: Redis com separação por tenant via tags
- **Estratégia**: Cache de consultas, sessões e dados temporários
- **Módulos que utilizam**: Todos os módulos de alta frequência

### Filas e Jobs
- **Driver**: Redis com Laravel Horizon
- **Processador**: Supervisord + Horizon Dashboard
- **Jobs principais**: SincronizarSiapeJob, BuscarDadosSiapeJob, ProcessEmails, ExportarTenantJob

### Logging e Auditoria
- **Sistema**: Laravel Auditing + Telescope + Logs customizados
- **Alcance**: Todas as operações CRUD, autenticação, integrações externas

---

# Mapa de Módulos

## Módulo: Gestão de Planos de Trabalho

### Visão Geral
Módulo central que gerencia todo o ciclo de vida dos planos de trabalho individuais, desde criação até avaliação final, incluindo controle de entregas e consolidação de resultados.

### Componentes

**Controllers:**
- `PlanoTrabalhoController` - CRUD e operações de ciclo de vida
- `PlanoTrabalhoEntregaController` - Gestão de entregas do plano
- `PlanoTrabalhoConsolidacaoController` - Consolidação e fechamento

**Models:**
- `PlanoTrabalho` - Entidade principal do plano
- `PlanoTrabalhoEntrega` - Entregas vinculadas ao plano
- `PlanoTrabalhoConsolidacao` - Dados de consolidação

**Services:**
- `PlanoTrabalhoService` - Lógica de negócio principal
- `PlanoTrabalhoEntregaService` - Gestão de entregas
- `PlanoTrabalhoConsolidacaoService` - Processamento de consolidação

**Jobs:**
- Não possui jobs específicos (usa jobs compartilhados)

**Frontend:**
- Módulo Angular: `/src/app/modules/gestao/plano-trabalho/`
- Componentes principais: Lista, Formulário, Consolidação, Avaliação

### Dependências

**Depende de:**
- Módulo Usuario - Para vinculação de participantes
- Módulo Unidade - Para hierarquia organizacional
- Módulo Programa - Para vinculação a programas
- Módulo Atividade - Para registro de execução

**É usado por:**
- Módulo Avaliacao - Que avalia os planos
- Módulo Relatorios - Que gera relatórios dos planos
- Módulo Indicadores - Que calcula métricas

### APIs Expostas

| Método | Endpoint | Controller | Propósito |
|--------|----------|------------|-----------|
| GET | /api/PlanoTrabalho/query | PlanoTrabalhoController | Listagem com filtros |
| POST | /api/PlanoTrabalho/store | PlanoTrabalhoController | Criação de plano |
| POST | /api/PlanoTrabalho/ativar | PlanoTrabalhoController | Ativação do plano |
| POST | /api/PlanoTrabalho/suspender | PlanoTrabalhoController | Suspensão do plano |
| POST | /api/PlanoTrabalho/enviar-para-assinatura | PlanoTrabalhoController | Workflow de aprovação |

### Eventos Emitidos
- `PlanoTrabalhoAtivado` - Disparado quando plano é ativado
- `PlanoTrabalhoSuspenso` - Disparado quando plano é suspenso

### Eventos Ouvidos
- `UsuarioInativado` - Reage suspendendo planos do usuário
- `UnidadeAlterada` - Reage atualizando hierarquia

---

## Módulo: Gestão de Planos de Entrega

### Visão Geral
Gerencia planos de entrega institucionais vinculados ao planejamento estratégico, controlando entregas, objetivos e processos organizacionais.

### Componentes

**Controllers:**
- `PlanoEntregaController` - CRUD e operações de ciclo de vida
- `PlanoEntregaEntregaController` - Gestão de entregas
- `PlanoEntregaEntregaProgressoController` - Controle de progresso

**Models:**
- `PlanoEntrega` - Entidade principal
- `PlanoEntregaEntrega` - Entregas do plano
- `PlanoEntregaEntregaProgresso` - Progresso das entregas

**Services:**
- `PlanoEntregaService` - Lógica de negócio principal
- `PlanoEntregaEntregaService` - Gestão de entregas
- `PlanoEntregaEntregaProgressoService` - Controle de progresso

**Frontend:**
- Módulo Angular: `/src/app/modules/gestao/plano-entrega/`
- Componentes principais: Lista, Formulário, Entregas, Progresso

### Dependências

**Depende de:**
- Módulo Unidade - Para vinculação organizacional
- Módulo Planejamento - Para objetivos estratégicos
- Módulo CadeiaValor - Para processos organizacionais

**É usado por:**
- Módulo PlanoTrabalho - Que se vincula às entregas
- Módulo Relatorios - Para relatórios institucionais
- Módulo Indicadores - Para métricas organizacionais

### APIs Expostas

| Método | Endpoint | Controller | Propósito |
|--------|----------|------------|-----------|
| GET | /api/PlanoEntrega/query | PlanoEntregaController | Listagem com filtros |
| POST | /api/PlanoEntrega/store | PlanoEntregaController | Criação de plano |
| POST | /api/PlanoEntrega/homologar | PlanoEntregaController | Homologação do plano |
| POST | /api/PlanoEntrega/concluir | PlanoEntregaController | Conclusão do plano |

---

## Módulo: Gestão de Atividades

### Visão Geral
Controla o registro e acompanhamento de atividades executadas pelos servidores, incluindo controle de tempo, pausas e hierarquia de tarefas.

### Componentes

**Controllers:**
- `AtividadeController` - CRUD e controle de execução
- `AtividadeTarefaController` - Gestão de tarefas
- `AtividadePausaController` - Controle de pausas

**Models:**
- `Atividade` - Entidade principal da atividade
- `AtividadeTarefa` - Tarefas da atividade
- `AtividadePausa` - Pausas registradas

**Services:**
- `AtividadeService` - Lógica de negócio principal
- `AtividadeTarefaService` - Gestão de tarefas
- `AtividadePausaService` - Controle de pausas

**Frontend:**
- Módulo Angular: `/src/app/modules/gestao/atividade/`
- Componentes principais: Lista, Formulário, Timer, Hierarquia

### Dependências

**Depende de:**
- Módulo Usuario - Para executor da atividade
- Módulo PlanoTrabalho - Para vinculação ao plano
- Módulo TipoAtividade - Para classificação

**É usado por:**
- Módulo PlanoTrabalhoConsolidacao - Para consolidação
- Módulo Relatorios - Para relatórios de produtividade
- Módulo Indicadores - Para métricas de desempenho

### APIs Expostas

| Método | Endpoint | Controller | Propósito |
|--------|----------|------------|-----------|
| POST | /api/Atividade/iniciar | AtividadeController | Início da atividade |
| POST | /api/Atividade/pausar | AtividadeController | Pausa da atividade |
| POST | /api/Atividade/concluir | AtividadeController | Conclusão da atividade |
| POST | /api/Atividade/hierarquia | AtividadeController | Estrutura hierárquica |

---

## Módulo: Sistema de Avaliações

### Visão Geral
Implementa o sistema de avaliação de planos de trabalho e entregas, com notas, justificativas e recursos.

### Componentes

**Controllers:**
- `AvaliacaoController` - CRUD e operações de avaliação

**Models:**
- `Avaliacao` - Entidade principal da avaliação
- `AvaliacaoEntregaChecklist` - Checklist de entregas

**Services:**
- `AvaliacaoService` - Lógica de avaliação

**Frontend:**
- Módulo Angular: `/src/app/modules/uteis/avaliar/`
- Componentes principais: Formulário de avaliação, Visualização

### Dependências

**Depende de:**
- Módulo PlanoTrabalho - Para avaliar planos
- Módulo PlanoEntrega - Para avaliar entregas
- Módulo TipoAvaliacao - Para tipos de avaliação

**É usado por:**
- Módulo Relatorios - Para relatórios de avaliação
- Módulo Indicadores - Para métricas de desempenho

---

## Módulo: Configurações de Usuários e Unidades

### Visão Geral
Gerencia usuários, unidades organizacionais, perfis de acesso e estrutura hierárquica da organização.

### Componentes

**Controllers:**
- `UsuarioController` - Gestão de usuários
- `UnidadeController` - Gestão de unidades
- `PerfilController` - Gestão de perfis
- `UnidadeIntegranteController` - Integrantes das unidades

**Models:**
- `Usuario` - Entidade do usuário
- `Unidade` - Entidade da unidade organizacional
- `Perfil` - Perfis de acesso
- `UnidadeIntegrante` - Relacionamento usuário-unidade

**Services:**
- `UsuarioService` - Lógica de usuários
- `UnidadeService` - Lógica de unidades
- `PerfilService` - Gestão de perfis

**Frontend:**
- Módulo Angular: `/src/app/modules/configuracoes/`
- Componentes principais: Usuario, Unidade, Perfil

### Dependências

**Depende de:**
- Módulo Integracao - Para sincronização SIAPE
- Módulo Entidade - Para configuração organizacional

**É usado por:**
- Todos os módulos funcionais - Para autenticação e autorização

---

## Módulo: Relatórios e Indicadores

### Visão Geral
Gera relatórios gerenciais e calcula indicadores de desempenho para diferentes níveis organizacionais.

### Componentes

**Controllers:**
- `RelatorioController` - Relatórios gerais
- `RelatorioAgenteController` - Relatórios por agente
- `RelatorioUnidadeController` - Relatórios por unidade
- `IndicadoresController` - Indicadores de equipe
- `IndicadoresGestaoController` - Indicadores gerenciais

**Models:**
- Views especializadas para relatórios

**Services:**
- `RelatorioPlanoTrabalhoService` - Relatórios de planos
- `IndicadoresService` - Cálculo de indicadores
- `IndicadoresGestaoService` - Indicadores gerenciais

**Frontend:**
- Módulo Angular: `/src/app/modules/relatorios/`
- Componentes principais: Filtros, Gráficos, Exportação

### Dependências

**Depende de:**
- Todos os módulos de gestão - Para dados dos relatórios

**É usado por:**
- Gestores e administradores - Para tomada de decisão

---

## Módulo: Integrações Externas

### Visão Geral
Gerencia integrações com sistemas externos como SIAPE, Login Único, Azure AD e APIs governamentais.

### Componentes

**Controllers:**
- `IntegracaoController` - Controle geral de integrações
- `SiapeIndividualController` - Integração SIAPE individual
- `LoginController` - Autenticação multi-provider

**Models:**
- `Integracao` - Registro de integrações
- `IntegracaoServidor` - Dados de servidores
- `IntegracaoUnidade` - Dados de unidades

**Services:**
- `IntegracaoSiapeService` - Integração SIAPE
- `IntegracaoService` - Serviço geral
- `GoogleService` - Integração Google
- `FirebaseAuthService` - Autenticação Firebase

**Jobs:**
- `SincronizarSiapeJob` - Sincronização SIAPE
- `BuscarDadosSiapeJob` - Busca dados individuais

**Frontend:**
- Módulo Angular: `/src/app/modules/rotinas/integracao/`
- Componentes principais: Sincronização, Logs, Configuração

### Dependências

**Depende de:**
- Módulo Usuario - Para sincronização de dados
- Módulo Unidade - Para estrutura organizacional

**É usado por:**
- Módulo Login - Para autenticação
- Módulo Usuario - Para dados atualizados

---

## Módulo: Cadastros Básicos

### Visão Geral
Gerencia cadastros auxiliares como tipos, feriados, cidades e outras entidades de apoio ao sistema.

### Componentes

**Controllers:**
- 15+ controllers de tipos (TipoAtividade, TipoAvaliacao, etc.)
- `FeriadoController` - Gestão de feriados
- `CidadeController` - Cadastro de cidades

**Models:**
- 15+ models de tipos e cadastros auxiliares

**Services:**
- Services correspondentes para cada cadastro

**Frontend:**
- Módulo Angular: `/src/app/modules/cadastros/`
- Componentes principais: Formulários CRUD para cada tipo

### Dependências

**Depende de:**
- Módulo base - Para funcionalidades básicas

**É usado por:**
- Todos os módulos funcionais - Para classificação e configuração

---

## Módulo: Logs e Auditoria

### Visão Geral
Registra e monitora todas as operações do sistema para auditoria, compliance e troubleshooting.

### Componentes

**Controllers:**
- `AuditController` - Consulta de auditoria
- `ChangeController` - Log de alterações
- `ErrorController` - Log de erros

**Models:**
- `Audit` - Registros de auditoria
- `Change` - Log de alterações
- `Error` - Log de erros

**Services:**
- `AuditService` - Processamento de auditoria
- `ChangeService` - Gestão de alterações
- `ErrorService` - Tratamento de erros

**Frontend:**
- Módulo Angular: `/src/app/modules/logs/`
- Componentes principais: Consulta, Filtros, Visualização

### Dependências

**Depende de:**
- Todos os módulos - Para captura de eventos

**É usado por:**
- Administradores - Para auditoria e monitoramento

---

## Módulo: Painel Administrativo

### Visão Geral
Interface administrativa para gestão de tenants, configurações globais e monitoramento do sistema.

### Componentes

**Controllers:**
- `PainelUsuarioController` - Usuários do painel
- `TenantController` - Gestão de tenants
- `JobScheduleController` - Jobs agendados

**Models:**
- `PainelUsuario` - Usuários administrativos
- `Tenant` - Tenants do sistema
- `JobSchedule` - Jobs agendados

**Services:**
- `PainelUsuarioService` - Gestão de usuários admin
- `TenantService` - Gestão de tenants

**Frontend:**
- Módulo Angular: `/src/app/modules/panel/`
- Componentes principais: Dashboard, Tenants, Configurações

### Dependências

**Depende de:**
- Sistema base - Para funcionalidades core

**É usado por:**
- Administradores de sistema - Para gestão global

---

## Módulo: Notificações

### Visão Geral
Sistema de notificações multi-canal (email, WhatsApp, Teams) para comunicação com usuários.

### Componentes

**Controllers:**
- `NotificacaoController` - Gestão de notificações

**Models:**
- `Notificacao` - Entidade de notificação
- `NotificacaoDestinatario` - Destinatários

**Services:**
- `NotificacaoService` - Lógica de notificações
- `WhatsappService` - Integração WhatsApp

**Jobs:**
- `ProcessEmails` - Processamento de emails

**Frontend:**
- Módulo Angular: `/src/app/modules/uteis/notificacoes/`
- Componentes principais: Lista, Configuração

### Dependências

**Depende de:**
- Módulo Usuario - Para destinatários
- Serviços externos - Para envio

**É usado por:**
- Todos os módulos - Para comunicação com usuários

---

# Matriz de Interdependências

## Mapa de Relacionamentos

```
[PlanoTrabalho] ──depende──> [Usuario]
     │                       │
     └──────depende──────> [Unidade]
                             │
[PlanoEntrega] ──depende──> [Unidade]
     │                       │
     └──────depende──────> [Planejamento]
                             │
[Atividade] ──depende────> [PlanoTrabalho]
     │                       │
     └──────depende──────> [Usuario]
                             │
[Avaliacao] ──depende────> [PlanoTrabalho]
     │                       │
     └──────depende──────> [PlanoEntrega]
                             │
[Relatorios] ──depende───> [Todos os módulos]
```

## Tabela de Interdependências

| Módulo Fonte | Módulo Destino | Tipo de Dependência | Via |
|--------------|----------------|---------------------|-----|
| PlanoTrabalho | Usuario | Relacionamento | Foreign Key usuario_id |
| PlanoTrabalho | Unidade | Relacionamento | Foreign Key unidade_id |
| PlanoTrabalho | Programa | Relacionamento | Foreign Key programa_id |
| Atividade | PlanoTrabalho | Relacionamento | Foreign Key plano_trabalho_id |
| Atividade | Usuario | Relacionamento | Foreign Key usuario_id |
| Avaliacao | PlanoTrabalho | Relacionamento | Foreign Key plano_trabalho_id |
| PlanoEntrega | Unidade | Relacionamento | Foreign Key unidade_id |
| PlanoEntrega | Planejamento | Relacionamento | Foreign Key planejamento_id |
| Integracao | Usuario | Sincronização | SIAPE API |
| Integracao | Unidade | Sincronização | SIAPE API |
| Relatorios | PlanoTrabalho | Consulta | Database Views |
| Relatorios | PlanoEntrega | Consulta | Database Views |
| Notificacao | Usuario | Comunicação | Email/WhatsApp |

---

# Fluxos de Dados Principais

## Fluxo 1: Criação e Execução de Plano de Trabalho

**Descrição:** Fluxo completo desde a criação de um plano de trabalho até sua consolidação final

**Componentes Envolvidos:**

```
┌──────────────┐
│   Frontend   │
└──────┬───────┘
       │ HTTP POST /api/PlanoTrabalho/store
       ▼
┌──────────────────────┐
│  PlanoTrabalhoController │ ──┐
└──────────────────────┘   │ Valida dados
       │                    │ Verifica permissões
       │ Chama service      │ Aplica regras de negócio
       ▼                    │
┌──────────────────────┐   │
│   PlanoTrabalhoService │ ◄─┘
└──────────────────────┘
       │ Processa lógica de negócio
       │ Valida participante e unidade
       ▼
┌──────────────────────┐
│   PlanoTrabalho      │
│   save()             │
└──────────────────────┘
       │ Persiste no banco
       ▼
┌──────────────────────┐
│     Database         │
│   (tenant_xxx)       │
└──────────────────────┘
```

**Processamentos Assíncronos:**
- Notificações são enfileiradas para participantes e gestores
- Integração com sistemas externos para validação de dados

**Integrações Externas:**
- Consulta SIAPE para validação de dados funcionais
- Envio de notificações via email/WhatsApp

---

## Fluxo 2: Sincronização SIAPE

**Descrição:** Sincronização automática de dados de servidores e unidades com o sistema SIAPE

**Componentes Envolvidos:**

```
┌──────────────┐
│   Scheduler  │ (Cron/Laravel Schedule)
└──────┬───────┘
       │ Dispara job diário
       ▼
┌──────────────────────┐
│  SincronizarSiapeJob │
└──────────────────────┘
       │ Processa em background
       ▼
┌──────────────────────┐
│ IntegracaoSiapeService │
└──────────────────────┘
       │ Chama API SOAP SIAPE
       ▼
┌──────────────────────┐
│    SIAPE API         │
│  (Governo Federal)   │
└──────────────────────┘
       │ Retorna dados XML
       ▼
┌──────────────────────┐
│ ProcessaDadosSiapeBD │
└──────────────────────┘
       │ Processa e valida dados
       ▼
┌──────────────────────┐
│ Usuario/Unidade      │
│ Models               │
└──────────────────────┘
```

**Processamentos Assíncronos:**
- `BuscarDadosSiapeJob` para dados individuais
- `InativacaoUsuariosSiape` para inativação automática

**Integrações Externas:**
- API SOAP SIAPE para dados funcionais
- Logs de integração para auditoria

---

## Fluxo 3: Geração de Relatórios

**Descrição:** Geração de relatórios gerenciais com exportação para Excel

**Componentes Envolvidos:**

```
┌──────────────┐
│   Frontend   │
└──────┬───────┘
       │ HTTP POST /api/Relatorio/planos-trabalho/xls
       ▼
┌──────────────────────┐
│  RelatorioController │
└──────────────────────┘
       │ Valida filtros
       ▼
┌──────────────────────┐
│ RelatorioPlanoTrabalhoService │
└──────────────────────┘
       │ Processa consulta complexa
       ▼
┌──────────────────────┐
│ Database Views       │
│ (ViewRelatorioPlanoTrabalho) │
└──────────────────────┘
       │ Retorna dados agregados
       ▼
┌──────────────────────┐
│ Excel Export Service │
│ (Maatwebsite/Excel)  │
└──────────────────────┘
       │ Gera arquivo Excel
       ▼
┌──────────────────────┐
│   Download Response  │
└──────────────────────┘
```

**Processamentos Assíncronos:**
- Relatórios grandes são processados em background
- Notificação quando relatório está pronto

**Integrações Externas:**
- Biblioteca Maatwebsite/Excel para geração
- Storage local ou S3 para arquivos temporários

---

## Fluxo 4: Autenticação Multi-Provider

**Descrição:** Processo de autenticação com múltiplos provedores de identidade

**Componentes Envolvidos:**

```
┌──────────────┐
│   Frontend   │
└──────┬───────┘
       │ Seleciona provider (Azure/Google/Gov.br)
       ▼
┌──────────────────────┐
│   LoginController    │
└──────────────────────┘
       │ Redireciona para provider
       ▼
┌──────────────────────┐
│  External Provider   │
│ (Azure AD/Google/Gov.br) │
└──────────────────────┘
       │ Callback com token
       ▼
┌──────────────────────┐
│ LoginController      │
│ (callback method)    │
└──────────────────────┘
       │ Valida token
       ▼
┌──────────────────────┐
│ UsuarioService       │
└──────────────────────┘
       │ Cria/atualiza usuário
       ▼
┌──────────────────────┐
│ Laravel Sanctum      │
│ (gera token API)     │
└──────────────────────┘
```

**Processamentos Assíncronos:**
- Log de acesso é registrado em background
- Sincronização de dados do usuário se necessário

**Integrações Externas:**
- Azure AD para autenticação corporativa
- Google OAuth para contas Google
- Login Único Gov.br para autenticação governamental

---

## Fluxo 5: Processamento de Avaliações

**Descrição:** Fluxo de avaliação de planos de trabalho com cálculo de notas e notificações

**Componentes Envolvidos:**

```
┌──────────────┐
│   Frontend   │
└──────┬───────┘
       │ HTTP POST /api/Avaliacao/store
       ▼
┌──────────────────────┐
│  AvaliacaoController │
└──────────────────────┘
       │ Valida permissões de avaliador
       ▼
┌──────────────────────┐
│   AvaliacaoService   │
└──────────────────────┘
       │ Calcula notas e médias
       │ Valida critérios
       ▼
┌──────────────────────┐
│     Avaliacao        │
│     save()           │
└──────────────────────┘
       │ Persiste avaliação
       ▼
┌──────────────────────┐
│ NotificacaoService   │
└──────────────────────┘
       │ Envia notificação ao avaliado
       ▼
┌──────────────────────┐
│   ProcessEmails      │
│   (Job assíncrono)   │
└──────────────────────┘
```

**Processamentos Assíncronos:**
- `ProcessEmails` para notificação de avaliação
- Atualização de indicadores de desempenho

**Integrações Externas:**
- SMTP para envio de emails
- WhatsApp API para notificações móveis

---

# Componentes Críticos

## Autenticação

**Implementação:** Laravel Sanctum com múltiplos provedores de identidade

**Fluxo de Autenticação:**
1. Usuário seleciona provedor (Azure AD, Google, Gov.br, LDAP)
2. Redirecionamento para provedor externo
3. Callback com token de autorização
4. Validação e criação/atualização do usuário local
5. Geração de token Sanctum para API
6. Retorno do token para frontend

**Arquivos-chave:**
- `/app/Http/Controllers/LoginController.php`
- `/config/services.php`
- `/app/Services/GoogleService.php`
- `/app/Services/FirebaseAuthService.php`

## Autorização

**Sistema de Permissões:** RBAC (Role-Based Access Control) com perfis hierárquicos

**Como funciona:**
O sistema utiliza perfis (roles) associados a usuários, com verificação de permissões em middleware e policies. Cada perfil tem permissões específicas para módulos e operações.

**Arquivos-chave:**
- `/app/Models/Perfil.php`
- `/app/Http/Middleware/`
- `/app/Traits/HasPermissions.php`

## Cache

**Estratégia:** Cache distribuído Redis com separação por tenant via tags

**O que é cacheado:**
- Consultas frequentes de usuários e unidades
- Dados de configuração do sistema
- Resultados de relatórios complexos
- Sessões de usuário
- Dados de integração SIAPE

## Processamento Assíncrono

**Jobs Principais:**

### SincronizarSiapeJob
- **Propósito**: Sincronização completa com SIAPE
- **Acionado por**: Agendamento diário (cron)
- **Frequência**: Diária às 02:00
- **Impacto**: Módulos Usuario, Unidade, Integracao

### BuscarDadosSiapeJob
- **Propósito**: Busca dados individuais de servidor
- **Acionado por**: Solicitação manual ou automática
- **Frequência**: Sob demanda
- **Impacto**: Módulo Usuario específico

### ProcessEmails
- **Propósito**: Processamento de fila de emails
- **Acionado por**: Eventos de notificação
- **Frequência**: Contínua
- **Impacto**: Módulo Notificacao

### ExportarTenantJob
- **Propósito**: Exportação de dados do tenant
- **Acionado por**: Solicitação administrativa
- **Frequência**: Sob demanda
- **Impacto**: Todos os módulos do tenant

---

# Integrações Externas

## Integração: SIAPE

**Tipo:** API SOAP/WSDL

**Propósito:** Sincronização de dados funcionais de servidores públicos federais

**Módulos que utilizam:**
- Módulo Usuario - Para dados pessoais e funcionais
- Módulo Unidade - Para estrutura organizacional
- Módulo Integracao - Para controle de sincronização

**Arquivos-chave:**
- Service: `/app/Services/Siape/`
- Config: `/config/integracao.php`
- Jobs: `/app/Jobs/SincronizarSiapeJob.php`

**Fluxo de Integração:**
1. Job agendado dispara sincronização
2. Consulta API SOAP SIAPE
3. Processa dados XML retornados
4. Atualiza base local com validações
5. Registra logs de integração

---

## Integração: Login Único Gov.br

**Tipo:** OAuth 2.0 / OpenID Connect

**Propósito:** Autenticação unificada do governo federal

**Módulos que utilizam:**
- Módulo Login - Para autenticação de usuários

**Arquivos-chave:**
- Service: `/app/Http/Controllers/LoginController.php`
- Config: `/config/services.php`

**Fluxo de Integração:**
1. Redirecionamento para Gov.br
2. Usuário autentica no portal
3. Callback com código de autorização
4. Troca código por token de acesso
5. Consulta dados do usuário
6. Criação/atualização na base local

---

## Integração: Microsoft Azure AD

**Tipo:** OAuth 2.0 / SAML

**Propósito:** Autenticação corporativa para órgãos que usam Microsoft 365

**Módulos que utilizam:**
- Módulo Login - Para autenticação corporativa

**Arquivos-chave:**
- Service: `/app/Http/Controllers/LoginController.php`
- Config: `/config/services.php`

**Fluxo de Integração:**
Similar ao Gov.br, mas com endpoints Azure AD específicos

---

## Integração: Google Workspace

**Tipo:** OAuth 2.0 / Google APIs

**Propósito:** Autenticação e integração com serviços Google

**Módulos que utilizam:**
- Módulo Login - Para autenticação
- Módulo Calendario - Para integração com Google Calendar

**Arquivos-chave:**
- Service: `/app/Services/GoogleService.php`
- Config: `/config/google.php`

---

# Pontos de Extensão

## Onde adicionar novas funcionalidades

### Novo recurso de Gestão
1. Criar model em `/app/Models/[Nome].php`
2. Criar migration em `/database/migrations/`
3. Criar controller em `/app/Http/Controllers/[Nome]Controller.php`
4. Criar service em `/app/Services/[Nome]Service.php`
5. Registrar rotas em `/routes/api_tenant.php`
6. Criar módulo Angular em `/src/app/modules/gestao/[nome]/`

### Nova integração externa
1. Criar service em `/app/Services/Integrations/[Nome]Service.php`
2. Adicionar configurações em `/config/services.php`
3. Criar job se necessário em `/app/Jobs/[Nome]Job.php`
4. Adicionar variáveis de ambiente em `.env`
5. Criar testes em `/tests/Feature/[Nome]Test.php`

### Novo tipo de relatório
1. Criar view de banco em `/database/migrations/`
2. Criar controller em `/app/Http/Controllers/Relatorio[Nome]Controller.php`
3. Criar service em `/app/Services/Relatorio[Nome]Service.php`
4. Criar export class em `/app/Exports/[Nome]Export.php`
5. Adicionar rotas em `/routes/api_tenant.php`

---

# Glossário de Componentes

| Termo | Tipo | Localização | Propósito |
|-------|------|-------------|-----------|
| PlanoTrabalho | Model | /app/Models/ | Representa plano de trabalho individual |
| PlanoTrabalhoService | Service | /app/Services/ | Encapsula lógica de negócio de planos |
| SincronizarSiapeJob | Job | /app/Jobs/ | Processa sincronização SIAPE |
| PlanoTrabalhoController | Controller | /app/Http/Controllers/ | Expõe endpoints de planos |
| Usuario | Model | /app/Models/ | Representa usuário do sistema |
| Unidade | Model | /app/Models/ | Representa unidade organizacional |
| Atividade | Model | /app/Models/ | Representa atividade executada |
| Avaliacao | Model | /app/Models/ | Representa avaliação de desempenho |
| Tenant | Model | /app/Models/ | Representa tenant multi-tenancy |
| IntegracaoSiapeService | Service | /app/Services/ | Encapsula integração SIAPE |
| NotificacaoService | Service | /app/Services/ | Gerencia notificações multi-canal |
| RelatorioService | Service | /app/Services/ | Gera relatórios gerenciais |

---

# Diagrama de Visão Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                         SISTEMA PGD PETRVS                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │   Gestão    │  │Configurações│  │ Relatórios  │           │
│  │ 25 Models   │  │ 15 Models   │  │ 10 Models   │           │
│  │ 45 APIs     │  │ 30 APIs     │  │ 20 APIs     │           │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘           │
│         │                 │                 │                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │  Cadastros  │  │Integrações  │  │    Logs     │           │
│  │ 30 Models   │  │ 10 Models   │  │ 15 Models   │           │
│  │ 60 APIs     │  │ 25 APIs     │  │ 15 APIs     │           │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘           │
│         │                 │                 │                   │
│         └─────────────────┴─────────────────┘                   │
│                           │                                     │
│                ┌──────────▼──────────┐                         │
│                │  Componentes Shared │                         │
│                │  - Auth (Sanctum)   │                         │
│                │  - Cache (Redis)    │                         │
│                │  - Queue (Horizon)  │                         │
│                │  - Audit (Laravel)  │                         │
│                └─────────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
```

---

# Métricas de Complexidade

| Módulo | Controllers | Models | Services | Complexidade |
|--------|-------------|--------|----------|--------------|
| Gestão | 15 | 25 | 20 | 🔴 Crítica |
| Configurações | 8 | 15 | 12 | ⚠️ Alta |
| Relatórios | 5 | 10 | 8 | 🟢 Média |
| Cadastros | 20 | 30 | 25 | 🔴 Crítica |
| Integrações | 6 | 10 | 8 | ⚠️ Alta |
| Logs | 4 | 15 | 6 | 🟢 Média |
| Painel | 5 | 8 | 5 | 🔵 Baixa |
| Notificações | 2 | 5 | 3 | 🔵 Baixa |

**Legenda:**
- 🔴 Crítica: 15+ componentes
- ⚠️ Alta: 10-14 componentes  
- 🟢 Média: 5-9 componentes
- 🔵 Baixa: 1-4 componentes

**Observações:**
- Módulos de Gestão e Cadastros são os mais complexos devido ao volume de funcionalidades
- Módulos de Integrações têm alta complexidade devido às integrações externas
- Módulos de suporte (Logs, Painel, Notificações) mantêm baixa complexidade por design