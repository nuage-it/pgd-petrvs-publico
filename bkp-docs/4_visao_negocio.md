# Documentação de Negócio e Jornadas de Usuário

## Visão Geral do Sistema

### O Que é o Sistema?

O **PGD Petrvs** é um sistema de gestão do **Programa de Gestão e Desempenho (PGD)** desenvolvido para o governo federal brasileiro. O sistema permite que órgãos públicos implementem e gerenciem programas de trabalho remoto e híbrido, seguindo as diretrizes estabelecidas pelo Ministério da Gestão e da Inovação em Serviços Públicos (MGI).

O sistema resolve o desafio de **digitalizar e automatizar** a gestão de planos de trabalho individuais, permitindo que servidores públicos trabalhem de forma remota ou híbrida com total transparência, controle e avaliação de resultados. Ele substitui processos manuais e planilhas por uma plataforma integrada que conecta planejamento institucional, execução individual e avaliação de desempenho.

Destinado a **gestores públicos, servidores e administradores** de órgãos federais, o sistema atende desde pequenas unidades até grandes ministérios, oferecendo uma solução completa para implementação do PGD conforme a legislação vigente.

### Principais Benefícios

- ✅ **Conformidade Legal**: Garante aderência total às normas do PGD estabelecidas pelo MGI
- ✅ **Transparência**: Oferece visibilidade completa sobre execução e resultados dos planos de trabalho
- ✅ **Eficiência**: Automatiza processos burocráticos e reduz tempo gasto com controles manuais
- ✅ **Integração**: Conecta-se com sistemas governamentais (SIAPE, Login Único, SEI)
- ✅ **Flexibilidade**: Adapta-se a diferentes modalidades de trabalho e estruturas organizacionais

### Estatísticas
- Módulos: 12 | Perfis: 7 | Funcionalidades: 118+ | Relatórios: 15+

---

# Personas

## Desenvolvedor

**Descrição:** Técnico responsável pela manutenção e evolução do sistema

**Objetivos:**
1. Manter sistema funcionando e atualizado
2. Implementar novas funcionalidades conforme demandas

**Permissões:**
- ✅ Pode acessar todos os módulos | ❌ Não pode alterar dados de produção sem autorização

**Funcionalidades Principais:**
1. Monitoramento de logs e erros - Diário
2. Análise de integrações - Semanal

**Cenário:** Desenvolvedor monitora diariamente logs do sistema, identifica problemas de integração com SIAPE e implementa correções para garantir sincronização de dados dos servidores.

---

## Administrador Master

**Descrição:** Representante da unidade autorizadora com poderes administrativos máximos

**Objetivos:**
1. Configurar e gerenciar entidades e unidades
2. Supervisionar implementação do PGD no órgão

**Permissões:**
- ✅ Pode gerenciar todas as configurações | ❌ Não pode alterar dados de outros órgãos

**Funcionalidades Principais:**
1. Gestão de entidades e unidades - Semanal
2. Configuração de programas - Mensal

**Cenário:** Administrador Master configura nova unidade no sistema, define gestores, estabelece programas de gestão e monitora indicadores gerais de implementação do PGD.

---

## Administrador Negocial

**Descrição:** Representante de unidades instituidoras responsável pela gestão operacional

**Objetivos:**
1. Gerenciar programas e planos de entrega
2. Acompanhar execução e resultados

**Permissões:**
- ✅ Pode gerenciar programas e planos | ❌ Não pode alterar configurações de sistema

**Funcionalidades Principais:**
1. Criação de programas de gestão - Mensal
2. Acompanhamento de planos de entrega - Semanal

**Cenário:** Administrador Negocial cria programa de gestão para sua unidade, define critérios de avaliação, estabelece periodicidade de consolidação e acompanha execução dos planos vinculados.

---

## Gestor de Unidade

**Descrição:** Chefe de unidade executora responsável por equipes e planos de trabalho

**Objetivos:**
1. Aprovar e acompanhar planos de trabalho da equipe
2. Avaliar desempenho e resultados

**Permissões:**
- ✅ Pode gerenciar planos de sua unidade | ❌ Não pode acessar outras unidades

**Funcionalidades Principais:**
1. Aprovação de planos de trabalho - Diário
2. Avaliação de consolidações - Semanal

**Cenário:** Gestor recebe solicitação de plano de trabalho de servidor, analisa entregas propostas, assina TCR digitalmente e acompanha execução através de consolidações periódicas.

---

## Participante

**Descrição:** Servidor público selecionado para participar do PGD

**Objetivos:**
1. Criar e executar plano de trabalho individual
2. Registrar atividades e entregas realizadas

**Permissões:**
- ✅ Pode criar planos próprios | ❌ Não pode acessar planos de outros servidores

**Funcionalidades Principais:**
1. Elaboração de plano de trabalho - Mensal
2. Registro de execução - Diário

**Cenário:** Servidor elabora plano de trabalho definindo entregas e prazos, submete para aprovação da chefia, executa atividades em modalidade remota e registra progresso no sistema.

---

## Colaborador

**Descrição:** Servidor não selecionável para PGD mas com acesso limitado ao sistema

**Objetivos:**
1. Consultar informações relevantes
2. Apoiar processos quando necessário

**Permissões:**
- ✅ Pode consultar dados públicos | ❌ Não pode criar planos de trabalho

**Funcionalidades Principais:**
1. Consulta de relatórios - Semanal
2. Apoio a processos - Conforme demanda

**Cenário:** Colaborador terceirizado consulta relatórios para apoiar gestão, acessa informações de planos para suporte administrativo, mas não pode criar planos próprios.

---

## Consulta

**Descrição:** Usuário com acesso somente leitura, geralmente servidor inativo

**Objetivos:**
1. Consultar informações históricas
2. Acessar dados para auditoria

**Permissões:**
- ✅ Pode visualizar dados | ❌ Não pode alterar informações

**Funcionalidades Principais:**
1. Consulta de histórico - Conforme necessidade
2. Relatórios de auditoria - Mensal

**Cenário:** Servidor aposentado acessa sistema para consultar histórico de planos anteriores, auditor consulta dados para verificação de conformidade com normas.

---

# Casos de Uso

## Criar Plano de Trabalho

**Código:** UC-001
**Ator:** Participante
**Objetivo:** Elaborar plano de trabalho individual para modalidade remota/híbrida
**Frequência:** Mensal/Trimestral
**Prioridade:** 🔴 Crítica

---

### Caminho Feliz ✨

**Pré-condições:**
- Usuário logado como Participante
- Programa de gestão vigente na unidade
- Usuário selecionado para participar do PGD

**Passo 1:** Acessa módulo de Planos de Trabalho
```
📍 Rota: /plano-trabalho/new
🖥️ Interface: Formulário de criação de plano
```

**Passo 2:** Seleciona dados básicos
```
🎯 Ação: Preenchimento de campos obrigatórios
```

**Passo 3:** Preenche informações do plano
```
📝 Campos obrigatórios:
• Usuário - Seleção do participante
• Unidade Executora - Unidade onde será executado
• Programa - Programa de gestão vigente
• Modalidade - Tipo de trabalho (remoto/híbrido)
• Período - Data início e fim
• Carga Horária - Horas diárias/semanais

💡 Validações:
• Período: Não pode conflitar com outros planos
• Modalidade: Deve estar disponível para o usuário
• Programa: Deve estar vigente na unidade
```

**Passo 4:** Define entregas e atividades
```
📝 Campos obrigatórios:
• Descrição da Entrega - O que será entregue
• Prazo - Data limite para conclusão
• Força de Trabalho - % do tempo dedicado
• Critérios de Avaliação - Como será avaliado

💡 Validações:
• Força de trabalho total não pode exceder 100%
• Pelo menos uma entrega deve ser definida
• Prazos devem estar dentro do período do plano
```

**Passo 5:** Gera Termo de Ciência e Responsabilidade (TCR)
```
⚙️ Processamento:
1. Sistema valida dados
2. Gera TCR automaticamente
3. Salva plano com status "INCLUÍDO"

⏱️ Tempo: 2-3 segundos
```

**Passo 6:** Recebe confirmação
```
✅ Mensagem: "Plano de trabalho criado com sucesso"
↪️ Redirecionamento: Tela de assinatura do TCR
```

**Resultado:**
- ✅ Plano criado e aguardando assinaturas
- ✅ Próxima ação: Assinar TCR e aguardar aprovação da chefia

---

### Fluxos Alternativos

**Alt 3a:** Usuário não selecionado para PGD
```
🚫 Ação: Sistema detecta usuário não habilitado
📍 Resultado: Exibe mensagem de erro e bloqueia criação
```

**Alt 4a:** Período conflitante
```
⚠️ Gatilho: Já existe plano no período
📍 Sistema:
1. Destaca erro no campo data
2. Mostra: "Período conflita com plano existente"
3. Sugere datas disponíveis
```

**Alt 5a:** Programa não vigente
```
⚠️ Gatilho: Programa expirado ou inativo
📍 Sistema:
1. Mostra: "Não há programa vigente para a unidade"
2. Bloqueia criação do plano
3. Orienta contatar administrador
```

---

### Exceções

**Exc 1:** Erro de integração SIAPE
```
🔴 Gatilho: Falha na consulta de dados do servidor
📍 Sistema:
1. Mostra: "Erro na consulta de dados. Tente novamente"
2. Registra log do erro
3. Notifica administradores
```

**Exc 2:** Sessão expirada
```
🔴 Gatilho: Token de autenticação inválido
📍 Sistema:
1. Redireciona para login
2. Preserva dados do formulário
3. Restaura após nova autenticação
```

---

### Regras de Negócio

**RN-001:** Conflito de Períodos
```
📜 Descrição: Um servidor não pode ter planos com períodos sobrepostos
📋 Condição: Ao definir datas de início e fim
✅ Satisfeita: Permite criação do plano
❌ Violada: Bloqueia criação e exibe erro

💡 Exemplo:
Cenário: Servidor tenta criar plano de 01/03 a 30/06
Resultado: Sistema verifica se já existe plano ativo no período
```

**RN-002:** Força de Trabalho Total
```
📜 Descrição: Soma das forças de trabalho das entregas não pode exceder 100%
📋 Condição: Ao adicionar/editar entregas
✅ Satisfeita: Permite salvar entregas
❌ Violada: Exibe erro e impede salvamento

💡 Exemplo:
Cenário: Usuário define 3 entregas com 40% cada (120% total)
Resultado: Sistema impede salvamento e solicita ajuste
```

---

### Interface

**Wireframe:**
```
┌─────────────────────────────────────────┐
│ 🏠 PGD Petrvs > Plano Trabalho  👤 User▼│
├─────────────────────────────────────────┤
│ 📋 Novo Plano de Trabalho               │
│ ┌─────────────────────────────────────┐ │
│ │ Dados Básicos                       │ │
│ │ Usuário: [João Silva ▼]             │ │
│ │ Unidade: [DINFO - Diretoria ▼]      │ │
│ │ Programa: [PGD 2024 ▼]              │ │
│ │ Modalidade: [Teletrabalho ▼]        │ │
│ │ Período: [01/03/24] a [30/06/24]    │ │
│ │ Carga: [8h] por [Dia ▼]             │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ Entregas Planejadas                 │ │
│ │ ✓ Relatório Mensal      30% [✏️]    │ │
│ │ ✓ Sistema Web           50% [✏️]    │ │
│ │ ✓ Treinamento Equipe    20% [✏️]    │ │
│ │                    [➕ Nova Entrega] │ │
│ └─────────────────────────────────────┘ │
│           [💾 Salvar] [❌ Cancelar]     │
└─────────────────────────────────────────┘
```

---

### Mensagens

**Sucesso:**
- ✅ "Plano de trabalho criado com sucesso"
- ✅ "TCR gerado automaticamente"

**Erro:**
- ❌ "Período conflita com plano existente"
- ❌ "Força de trabalho excede 100%"
- ❌ "Usuário não habilitado para PGD"

**Confirmação:**
- ⚠️ "Confirma criação do plano de trabalho?"

---

## Assinar TCR (Termo de Ciência e Responsabilidade)

**Código:** UC-002
**Ator:** Participante, Gestor de Unidade
**Objetivo:** Formalizar acordo sobre plano de trabalho através de assinatura digital
**Frequência:** Conforme criação/alteração de planos
**Prioridade:** 🔴 Crítica

---

### Caminho Feliz ✨

**Pré-condições:**
- Plano de trabalho criado
- Usuário com permissão para assinar
- TCR gerado pelo sistema

**Passo 1:** Acessa plano para assinatura
```
📍 Rota: /plano-trabalho/{id}/termos
🖥️ Interface: Visualização do TCR
```

**Passo 2:** Revisa conteúdo do TCR
```
🎯 Ação: Leitura do termo gerado
📄 Conteúdo: Dados do plano, entregas, prazos, responsabilidades
```

**Passo 3:** Confirma assinatura
```
🎯 Ação: Clica em "Assinar Documento"
🔐 Autenticação: Confirma identidade via Login Único
```

**Passo 4:** Sistema processa assinatura
```
⚙️ Processamento:
1. Valida permissões do usuário
2. Registra assinatura com timestamp
3. Atualiza status do plano
4. Verifica se faltam outras assinaturas

⏱️ Tempo: 1-2 segundos
```

**Passo 5:** Recebe confirmação
```
✅ Mensagem: "Documento assinado com sucesso"
📊 Status: Plano vai para "ATIVO" ou "AGUARDANDO_ASSINATURA"
```

**Resultado:**
- ✅ Assinatura registrada no sistema
- ✅ Próxima ação: Aguardar outras assinaturas ou iniciar execução

---

## Consolidar Período de Trabalho

**Código:** UC-003
**Ator:** Participante
**Objetivo:** Registrar execução e resultados do período trabalhado
**Frequência:** Semanal/Quinzenal/Mensal (conforme programa)
**Prioridade:** 🟡 Alta

---

### Caminho Feliz ✨

**Pré-condições:**
- Plano de trabalho ativo
- Período de consolidação vencido
- Atividades executadas no período

**Passo 1:** Acessa consolidação pendente
```
📍 Rota: /consolidacao/{id}
🖥️ Interface: Formulário de consolidação
```

**Passo 2:** Registra atividades executadas
```
📝 Campos obrigatórios:
• Atividades realizadas - Descrição detalhada
• Tempo dedicado - Horas trabalhadas
• Entregas concluídas - % de progresso
• Observações - Comentários adicionais

💡 Validações:
• Tempo não pode exceder horas úteis do período
• Progresso deve ser coerente com atividades
```

**Passo 3:** Anexa evidências (opcional)
```
📎 Tipos aceitos: PDF, DOC, XLS, IMG
📏 Tamanho máximo: 10MB por arquivo
```

**Passo 4:** Submete consolidação
```
⚙️ Processamento:
1. Valida dados informados
2. Calcula indicadores automáticos
3. Salva consolidação
4. Notifica gestor para avaliação

⏱️ Tempo: 3-5 segundos
```

**Resultado:**
- ✅ Período consolidado e aguardando avaliação
- ✅ Próxima ação: Aguardar feedback do gestor

---

# Jornadas Completas

## Implementação do PGD na Unidade

**Persona:** Administrador Master
**Objetivo:** Implementar programa de gestão completo na organização
**Duração:** 2-3 meses
**Complexidade:** 🔴 Alta

### Mapa
```
Início → [Config Entidade] → [Criar Programa] → [Habilitar Unidades] → [Treinar Usuários] → Fim ✅
         (1 semana)          (2 semanas)       (3 semanas)           (4 semanas)
```

### Narrativa

**Contexto:** Órgão público decide implementar PGD seguindo normativas do MGI

**Etapa 1: Configuração da Entidade**
```
🎯 Objetivo: Estabelecer configurações básicas do órgão
📍 Tela: /entidade/config
⏱️ Tempo: 1 semana

Ações:
1. Define dados da entidade (CNPJ, nome, gestor)
2. Configura carga horária padrão
3. Estabelece forma de contagem (dia/semana/mês)
4. Define feriados específicos

Feedback: Sistema confirma configurações salvas

⚠️ Fricção: Necessidade de documentos oficiais
💡 Solução: Sistema orienta sobre documentação necessária
```

**Etapa 2: Criação do Programa**
```
🎯 Objetivo: Estabelecer regras do programa de gestão
📍 Tela: /programa/new
⏱️ Tempo: 2 semanas

Ações:
1. Define período de vigência
2. Estabelece critérios de avaliação
3. Configura periodicidade de consolidação
4. Define template do TCR
5. Estabelece assinaturas obrigatórias

Feedback: Programa criado e disponível para unidades

⚠️ Fricção: Complexidade das regras de negócio
💡 Solução: Assistente guiado e templates pré-definidos
```

**Resultado:**
```
✅ Sucesso: PGD implementado e operacional
📊 Impacto: Unidades habilitadas para criar planos
↪️ Próximo: Monitorar execução e ajustar conforme necessário
```

---

## Ciclo Completo de Plano de Trabalho

**Persona:** Participante
**Objetivo:** Executar ciclo completo desde criação até avaliação final
**Duração:** 3-6 meses (duração do plano)
**Complexidade:** 🟡 Média

### Mapa
```
Início → [Criar Plano] → [Assinar TCR] → [Executar] → [Consolidar] → [Avaliar] → Fim ✅
         (1 dia)         (2 dias)       (90 dias)    (semanal)     (mensal)
```

### Narrativa

**Contexto:** Servidor aprovado para trabalho remoto precisa formalizar e executar plano

**Etapa 1: Elaboração do Plano**
```
🎯 Objetivo: Criar plano de trabalho detalhado
📍 Tela: /plano-trabalho/new
⏱️ Tempo: 4-6 horas

Ações:
1. Define período e modalidade
2. Planeja entregas e prazos
3. Distribui força de trabalho
4. Gera TCR automaticamente

Feedback: Plano criado aguardando assinaturas

⚠️ Fricção: Dificuldade em estimar tempos
💡 Solução: Sistema sugere distribuição baseada em histórico
```

**Etapa 2: Execução e Acompanhamento**
```
🎯 Objetivo: Executar atividades e registrar progresso
📍 Tela: /atividade/execucao
⏱️ Tempo: Período do plano (ex: 90 dias)

Ações:
1. Registra início de atividades
2. Atualiza progresso regularmente
3. Consolida períodos conforme cronograma
4. Comunica impedimentos quando necessário

Feedback: Progresso visível em dashboards

⚠️ Fricção: Necessidade de disciplina para registros
💡 Solução: Notificações automáticas e lembretes
```

**Resultado:**
```
✅ Sucesso: Plano executado e avaliado positivamente
📊 Impacto: Servidor habilitado para novos planos
↪️ Próximo: Criar novo plano ou aguardar próximo período
```

---

# Relatórios

## Relatório de Planos de Trabalho

**Finalidade:** Acompanhar status e execução dos planos na unidade
**Usuários:** Gestores, Administradores

**Como Acessar:**
1. Menu Relatórios > Planos de Trabalho
2. Definir filtros (período, unidade, status)

**Filtros:**
- 📅 Período de vigência | 🏢 Unidade executora | 👥 Status do plano | 🎯 Modalidade

**Dados:**
| Coluna | Descrição | Formato |
|--------|-----------|---------|
| Servidor | Nome do participante | Texto |
| Unidade | Unidade executora | Texto |
| Período | Data início/fim | DD/MM/AAAA |
| Status | Situação atual | Badge colorido |
| Progresso | % de execução | Barra de progresso |
| Modalidade | Tipo de trabalho | Texto |

**Exportação:** PDF | Excel | CSV

---

## Relatório de Consolidações

**Finalidade:** Acompanhar registros de execução e avaliações
**Usuários:** Gestores, Participantes

**Visualização:**
```
┌───────────────────────────────────────┐
│ 📊 Consolidações - Março/2024         │
│ 📅 01/03 - 31/03/2024                │
├───────────────────────────────────────┤
│ Concluídas: 45 ↑ +12%                │
│ Pendentes: 8 ↓ -3%                   │
│ Em Avaliação: 12 → 0%                │
│ [Gráfico de barras por semana]        │
└───────────────────────────────────────┘
```

---

# Notificações

## Plano Aguardando Assinatura

**Gatilho:** TCR criado ou alterado
**Destinatário:** Gestores responsáveis
**Canal:** 📧 Email | 📱 Sistema

**Conteúdo:**
```
Título: Plano de Trabalho Aguardando Assinatura
Corpo: O plano de trabalho de [Nome] está aguardando sua assinatura
Ação: [Assinar TCR] → /plano-trabalho/{id}/termos
```

---

## Consolidação Vencida

**Gatilho:** Prazo de consolidação ultrapassado
**Destinatário:** Participante
**Canal:** 📧 Email | 📱 Sistema

**Conteúdo:**
```
Título: Consolidação em Atraso
Corpo: Você possui consolidação pendente do período [data]
Ação: [Consolidar] → /consolidacao/{id}
```

---

# Glossário

| Termo | Definição | Exemplo |
|-------|-----------|---------|
| PGD | Programa de Gestão e Desempenho | Modalidade de trabalho remoto |
| TCR | Termo de Ciência e Responsabilidade | Documento que formaliza o plano |
| Consolidação | Registro periódico de execução | Relatório semanal de atividades |
| Força de Trabalho | Percentual de tempo dedicado | 30% do tempo para uma entrega |
| Modalidade | Tipo de execução do trabalho | Teletrabalho, presencial, híbrido |

---

# FAQ

**P:** Como criar um plano de trabalho?
**R:** Acesse o menu Planos de Trabalho > Novo, preencha os dados obrigatórios e defina as entregas planejadas.

**P:** Por que não consigo assinar o TCR?
**R:** Verifique se você tem permissão para assinar e se o plano está no status correto (INCLUÍDO ou AGUARDANDO_ASSINATURA).

**P:** Como alterar um plano já ativo?
**R:** Planos ativos podem ser alterados apenas por gestores com permissão específica, gerando novo TCR para assinatura.

**P:** O que fazer se a consolidação está atrasada?
**R:** Acesse o menu Consolidações, localize o período pendente e registre as atividades executadas o quanto antes.

---

# Métricas de Sucesso

| Métrica | Objetivo | Medição |
|---------|----------|---------|
| Taxa de Adesão | 80% dos servidores elegíveis | % usuários com planos ativos |
| Tempo de Aprovação | Máximo 5 dias úteis | Tempo entre criação e ativação |
| Consolidações em Dia | 95% no prazo | % consolidações dentro do prazo |
| Satisfação dos Usuários | Nota 4.0/5.0 | Pesquisa trimestral |

**Usabilidade:**
- ⏱️ Tempo médio para criar plano: 30 min
- 📊 Taxa de sucesso na primeira tentativa: 85%
- 😊 Satisfação geral: 4.2/5

---

# Troubleshooting

## Erro ao Criar Plano de Trabalho

**Sintoma:** Mensagem "Usuário não habilitado para PGD"

**Causas:**
- Servidor não selecionado no SouGov Líder
- Dados não sincronizados com SIAPE
- Perfil incorreto no sistema

**Solução:**
1. Verificar seleção no SouGov Líder
2. Aguardar sincronização automática (24h)
3. Contatar administrador se persistir

**Se persistir:** Abrir chamado técnico com dados do servidor

---

## TCR Não Carrega

**Sintoma:** Tela em branco ao tentar visualizar TCR

**Causas:**
- Problema na geração do documento
- Template corrompido
- Erro de permissão

**Solução:**
1. Atualizar página (F5)
2. Limpar cache do navegador
3. Tentar em navegador diferente

**Se persistir:** Contatar suporte técnico informando ID do plano

---

## Consolidação Não Salva

**Sintoma:** Dados não são salvos ao clicar em "Salvar"

**Causas:**
- Campos obrigatórios não preenchidos
- Sessão expirada
- Erro de validação

**Solução:**
1. Verificar campos marcados em vermelho
2. Fazer login novamente
3. Verificar se tempo não excede limite

**Se persistir:** Salvar dados em arquivo e contatar suporte