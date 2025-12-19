# Diagramas do Fluxo SincronizarSiapeJob

Este documento contém diagramas Mermaid que representam o fluxo completo do job de sincronização SIAPE.

## 1. Visão Geral do Pipeline

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#e1f5fe', 'primaryTextColor': '#01579b', 'primaryBorderColor': '#0288d1', 'lineColor': '#0288d1', 'secondaryColor': '#fff3e0', 'tertiaryColor': '#f3e5f5'}}}%%

flowchart TB
    subgraph LEGEND["📋 LEGENDA"]
        direction LR
        L1[/"📥 Entrada"/]
        L2["⚙️ Processo"]
        L3[("💾 Banco")]
        L4{"🔀 Decisão"}
        L5[/"📤 Saída"/]
    end

    subgraph PIPELINE["🔄 PIPELINE DE SINCRONIZAÇÃO SIAPE"]
        direction TB

        subgraph JOB1["JOB 1: BuscarDadosSiapeJob"]
            direction TB
            API[/"🌐 API ConectaGov/SIAPE"/]
            COLETA["⚙️ Coleta XMLs via SOAP"]
            API --> COLETA
        end

        subgraph TEMP["💾 TABELAS TEMPORÁRIAS"]
            direction TB
            T1[("siape_listaUORG")]
            T2[("siape_dadosUORG")]
            T3[("siape_listaServidores")]
            T4[("siape_consultaDadosFuncionais")]
            T5[("siape_consultaDadosPessoais")]
        end

        subgraph JOB2["JOB 2: SincronizarSiapeJob"]
            direction TB
            SYNC["⚙️ Processa XMLs\ne atualiza BD"]
        end

        subgraph FINAL["💾 TABELAS DEFINITIVAS"]
            direction TB
            F1[("integracao_unidades")]
            F2[("integracao_servidores")]
            F3[("unidades")]
            F4[("usuarios")]
            F5[("unidades_integrantes")]
        end

        COLETA --> T1 & T2 & T3 & T4 & T5
        T1 & T2 & T3 & T4 & T5 --> SYNC
        SYNC --> F1 & F2 & F3 & F4 & F5
    end

    style LEGEND fill:#f5f5f5,stroke:#9e9e9e
    style JOB1 fill:#e3f2fd,stroke:#1976d2
    style TEMP fill:#fff8e1,stroke:#ffa000
    style JOB2 fill:#e8f5e9,stroke:#388e3c
    style FINAL fill:#fce4ec,stroke:#c2185b
```

## 2. Arquitetura de Classes

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#e8eaf6', 'primaryTextColor': '#1a237e', 'primaryBorderColor': '#3f51b5'}}}%%

flowchart TB
    subgraph LEGEND["📋 LEGENDA DE CLASSES"]
        direction LR
        CL1["🎯 Job/Controller"]
        CL2["🔧 Service"]
        CL3["📦 Repository"]
        CL4["🗃️ Model"]
    end

    subgraph CLASSES["🏗️ ARQUITETURA DE CLASSES"]
        direction TB

        JOB["🎯 SincronizarSiapeJob"]

        subgraph SERVICES["CAMADA DE SERVIÇOS"]
            IS["🔧 IntegracaoService"]
            ISS["🔧 IntegracaoSiapeService"]
            PDS["🔧 ProcessaDadosSiapeBD"]
        end

        subgraph PROCESSORS["PROCESSADORES ESPECÍFICOS"]
            SI["🔧 Servidor\\Integracao"]
            GI["🔧 Gestor\\Integracao"]
        end

        subgraph REPOS["REPOSITÓRIOS"]
            ISR["📦 IntegracaoServidorRepository"]
        end

        subgraph MODELS["MODELS"]
            MU["🗃️ Usuario"]
            MUN["🗃️ Unidade"]
            MIU["🗃️ IntegracaoUnidade"]
            MIS["🗃️ IntegracaoServidor"]
            MUI["🗃️ UnidadeIntegrante"]
        end

        JOB --> IS
        IS --> ISS
        ISS --> PDS
        IS --> SI
        IS --> GI
        SI --> ISR
        ISR --> MIS
        IS --> MU & MUN & MIU & MUI
        GI --> MU & MUI
    end

    style LEGEND fill:#f5f5f5,stroke:#9e9e9e
    style JOB fill:#ffeb3b,stroke:#f57f17
    style SERVICES fill:#e3f2fd,stroke:#1976d2
    style PROCESSORS fill:#e8f5e9,stroke:#388e3c
    style REPOS fill:#fff3e0,stroke:#ef6c00
    style MODELS fill:#fce4ec,stroke:#c2185b
```

## 3. Fluxo Detalhado do SincronizarSiapeJob

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#e1f5fe', 'primaryTextColor': '#01579b', 'primaryBorderColor': '#0288d1', 'lineColor': '#424242'}}}%%

flowchart TB
    subgraph LEGEND["📋 LEGENDA"]
        direction LR
        LE1["🟢 Início/Fim"]
        LE2["🔵 Processo"]
        LE3["🟡 Decisão"]
        LE4["🟣 Fase"]
        LE5["🔴 Erro"]
    end

    START(("🟢 START"))

    subgraph CONFIG["⚙️ CONFIGURAÇÃO INICIAL"]
        C1["memory_limit = -1"]
        C2["timeout = 0"]
        C3["max_execution_time = 30min"]
        C1 --> C2 --> C3
    end

    LOAD_ENT["📋 Carregar todas Entidades"]

    subgraph LOOP["🔄 PARA CADA ENTIDADE"]
        direction TB

        INPUT["📥 inputs = {\n  unidades: true,\n  servidores: true,\n  gestores: true\n}"]

        subgraph FASE1["🟣 FASE 1: UNIDADES"]
            direction TB
            F1_START{"unidades\n== true?"}
            F1_READ["📖 ProcessaDadosSiapeBD\n.dadosUorg()"]
            F1_PARSE["🔄 Parse XML\nXPath: //ns1:dadosUorgResponse/out"]
            F1_TRANS["🔄 IntegracaoSiapeService\n.retornarUorgs()"]
            F1_LOOP["🔁 Para cada UORG"]
            F1_CHECK{"Existe em\nintegracao_\nunidades?"}
            F1_INSERT["➕ INSERT\nintegracao_unidades"]
            F1_UPDATE{"data_mod\n> local?"}
            F1_UPD["🔄 UPDATE\nintegracao_unidades"]
            F1_SKIP["⏭️ Skip"]
            F1_HIER["🏗️ Atualizar hierarquia\ntabela unidades"]
            F1_RESULT["✅ Resultado: Sucesso"]
            F1_ERROR["❌ Resultado: ERRO"]

            F1_START -->|Sim| F1_READ
            F1_START -->|Não| F1_RESULT
            F1_READ --> F1_PARSE --> F1_TRANS --> F1_LOOP
            F1_LOOP --> F1_CHECK
            F1_CHECK -->|Não| F1_INSERT
            F1_CHECK -->|Sim| F1_UPDATE
            F1_UPDATE -->|Sim| F1_UPD
            F1_UPDATE -->|Não| F1_SKIP
            F1_INSERT --> F1_HIER
            F1_UPD --> F1_HIER
            F1_SKIP --> F1_HIER
            F1_HIER --> F1_RESULT
        end

        subgraph FASE2["🟣 FASE 2: SERVIDORES"]
            direction TB
            F2_START{"servidores\n== true?"}
            F2_READ["📖 ProcessaDadosSiapeBD\n.dadosServidor()"]
            F2_JOIN["🔗 JOIN pessoais + funcionais\nWHERE processado = 0"]
            F2_TRANS["🔄 IntegracaoSiapeService\n.retornarServidores()"]
            F2_FILTER{"codSitFuncional\n== 8?"}
            F2_IGNORE["⏭️ Ignorar\n(ATIVO_EM_OUTRO_ORGAO)"]
            F2_CT{"codSitFuncional\n== 76?"}
            F2_SIGLA["🔍 Buscar unidade\npor siglaUorgLotacao"]
            F2_PROC["🔧 Servidor\\Integracao\n.processar()"]
            F2_USRS["🔄 Atualizar usuarios\ne lotações"]
            F2_RESULT["✅ Resultado: Sucesso"]
            F2_ERROR["❌ Resultado: ERRO"]

            F2_START -->|Sim| F2_READ
            F2_START -->|Não| F2_RESULT
            F2_READ --> F2_JOIN --> F2_TRANS --> F2_FILTER
            F2_FILTER -->|Sim| F2_IGNORE
            F2_FILTER -->|Não| F2_CT
            F2_CT -->|Sim| F2_SIGLA --> F2_PROC
            F2_CT -->|Não| F2_PROC
            F2_PROC --> F2_USRS --> F2_RESULT
        end

        CHECK_PHASES{"Fase 1 == Sucesso\nE\nFase 2 == Sucesso?"}

        subgraph FASE3["🟣 FASE 3: GESTORES"]
            direction TB
            F3_QUERY["🔍 Query: identificar\nusuários sem GESTOR"]
            F3_LOOP["🔁 Para cada chefia"]
            F3_CHEFE{"id_chefe\nvazio?"}
            F3_REMOVE["🗑️ Remover GESTOR\natual da unidade"]
            F3_PREP["📋 Preparar atribuições:\n[LOTADO, GESTOR]"]
            F3_SAVE["💾 salvarIntegrantes()"]
            F3_PERFIL["👤 Alterar perfil\npara 'Chefia'"]
            F3_RESULT["✅ Resultado: Sucesso"]

            F3_QUERY --> F3_LOOP --> F3_CHEFE
            F3_CHEFE -->|Sim| F3_REMOVE
            F3_CHEFE -->|Não| F3_PREP
            F3_REMOVE --> F3_RESULT
            F3_PREP --> F3_SAVE --> F3_PERFIL --> F3_RESULT
        end

        SKIP_F3["⏭️ Fase 3 não executada"]

        INPUT --> FASE1
        FASE1 --> FASE2
        FASE2 --> CHECK_PHASES
        CHECK_PHASES -->|Sim| FASE3
        CHECK_PHASES -->|Não| SKIP_F3
    end

    SAVE_RESULT["💾 Salvar resultado\nna tabela integracoes"]

    END_(("🟢 END"))

    START --> CONFIG --> LOAD_ENT --> LOOP
    FASE3 --> SAVE_RESULT
    SKIP_F3 --> SAVE_RESULT
    SAVE_RESULT --> END_

    style LEGEND fill:#f5f5f5,stroke:#9e9e9e
    style CONFIG fill:#e0f7fa,stroke:#00838f
    style FASE1 fill:#e3f2fd,stroke:#1565c0
    style FASE2 fill:#e8f5e9,stroke:#2e7d32
    style FASE3 fill:#fff3e0,stroke:#ef6c00
    style START fill:#c8e6c9,stroke:#2e7d32
    style END_ fill:#c8e6c9,stroke:#2e7d32
```

## 4. Diagrama de Sequência - Interação entre Classes

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#e8eaf6', 'actorTextColor': '#1a237e', 'actorBorder': '#3f51b5', 'signalColor': '#3f51b5'}}}%%

sequenceDiagram
    autonumber

    box rgb(232, 245, 233) Job Layer
        participant JOB as 🎯 SincronizarSiapeJob
    end

    box rgb(227, 242, 253) Service Layer
        participant IS as 🔧 IntegracaoService
        participant ISS as 🔧 IntegracaoSiapeService
        participant PDS as 🔧 ProcessaDadosSiapeBD
    end

    box rgb(255, 243, 224) Processor Layer
        participant SI as 🔧 Servidor\\Integracao
        participant GI as 🔧 Gestor\\Integracao
    end

    box rgb(252, 228, 236) Data Layer
        participant DB as 💾 Database
    end

    Note over JOB,DB: 🚀 INÍCIO DO JOB

    JOB->>IS: sincronizar(inputs)
    activate IS

    Note over IS,DB: 📦 FASE 1: UNIDADES

    IS->>ISS: retornarUorgs()
    activate ISS
    ISS->>PDS: dadosUorg()
    activate PDS
    PDS->>DB: SELECT FROM siape_dadosUORG<br/>WHERE processado = 0
    DB-->>PDS: XMLs das UORGs
    PDS->>PDS: Parse XML com XPath<br/>//ns1:dadosUorgResponse/out
    PDS->>DB: UPDATE processado = 1
    PDS-->>ISS: Array de dados estruturados
    deactivate PDS
    ISS->>ISS: Transformar dados<br/>Resolver código IBGE
    ISS-->>IS: Array UORGs formatado
    deactivate ISS

    loop Para cada UORG
        IS->>DB: Verificar integracao_unidades
        alt Não existe
            IS->>DB: INSERT integracao_unidades
        else data_modificacao > local
            IS->>DB: UPDATE integracao_unidades
        end
    end

    IS->>IS: deepReplaceUnidades()<br/>Atualizar hierarquia
    IS->>DB: INSERT/UPDATE unidades

    Note over IS,DB: 📦 FASE 2: SERVIDORES

    IS->>ISS: retornarServidores()
    activate ISS
    ISS->>PDS: dadosServidor()
    activate PDS
    PDS->>DB: SELECT FROM siape_consultaDadosPessoais p<br/>JOIN siape_consultaDadosFuncionais f<br/>WHERE processado = 0
    DB-->>PDS: XMLs combinados
    PDS->>PDS: Parse XML Pessoais<br/>//ns1:consultaDadosPessoaisResponse/out
    PDS->>PDS: Parse XML Funcionais<br/>//tipo:DadosFuncionais
    PDS->>PDS: Tratar múltiplas matrículas
    PDS->>DB: UPDATE processado = 1
    PDS-->>ISS: Array servidores
    deactivate PDS
    ISS->>ISS: Filtrar codSitFuncional 8<br/>Tratar codSitFuncional 76
    ISS-->>IS: Array formatado
    deactivate ISS

    IS->>SI: processar()
    activate SI
    loop Para cada servidor
        SI->>DB: Verificar integracao_servidores
        alt Não existe
            SI->>DB: INSERT integracao_servidores
        else Existe
            SI->>DB: UPDATE campos alterados
        end
    end
    SI-->>IS: Resultado
    deactivate SI

    IS->>DB: SELECT usuarios com dados alterados
    IS->>DB: UPDATE usuarios
    IS->>DB: UPDATE unidades_integrantes (lotações)

    Note over IS,DB: 📦 FASE 3: GESTORES (se Fases 1 e 2 OK)

    IS->>DB: Query identificar chefes sem GESTOR
    DB-->>IS: Lista de chefias

    IS->>GI: processar(chefes)
    activate GI
    loop Para cada chefia
        alt id_chefe vazio
            GI->>DB: Remover GESTOR da unidade
        else id_chefe preenchido
            GI->>GI: preparaChefia()<br/>[LOTADO, GESTOR]
            GI->>DB: salvarIntegrantes()
            GI->>DB: Alterar perfil para Chefia
        end
    end
    GI-->>IS: Resultado
    deactivate GI

    IS->>DB: INSERT integracoes (resultado)
    IS-->>JOB: Resultado completo
    deactivate IS

    Note over JOB,DB: ✅ FIM DO JOB
```

## 5. Fluxo de Dados - Entity Relationship

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#fff8e1', 'primaryTextColor': '#ff6f00', 'primaryBorderColor': '#ffa000'}}}%%

flowchart LR
    subgraph LEGEND["📋 LEGENDA"]
        direction TB
        L1[/"XML Entrada"/]
        L2[("Tabela Temp")]
        L3[["Tabela Definitiva"]]
        L4{{"Transformação"}}
    end

    subgraph INPUT["📥 ENTRADA (XMLs SIAPE)"]
        direction TB
        X1[/"dadosUorgResponse\n49 campos"/]
        X2[/"consultaDadosPessoaisResponse\n17 campos"/]
        X3[/"consultaDadosFuncionaisResponse\n60+ campos"/]
    end

    subgraph TEMP["💾 TABELAS TEMPORÁRIAS"]
        direction TB
        T1[("siape_dadosUORG\n- codigo\n- response (XML)\n- data_modificacao\n- processado")]
        T2[("siape_consultaDadosPessoais\n- cpf\n- response (XML)\n- processado")]
        T3[("siape_consultaDadosFuncionais\n- cpf\n- response (XML)\n- processado")]
    end

    subgraph TRANSFORM["🔄 TRANSFORMAÇÕES"]
        direction TB
        TR1{{"ProcessaDadosSiapeBD\n.dadosUorg()"}}
        TR2{{"ProcessaDadosSiapeBD\n.dadosServidor()"}}
        TR3{{"IntegracaoSiapeService\n.retornarUorgs()"}}
        TR4{{"IntegracaoSiapeService\n.retornarServidores()"}}
    end

    subgraph INTEG["💾 TABELAS DE INTEGRAÇÃO"]
        direction TB
        I1[["integracao_unidades\n- id_servo\n- pai_servo\n- codigo_siape\n- nomeuorg\n- siglauorg\n- cpf_titular_autoridade_uorg\n- data_modificacao"]]
        I2[["integracao_servidores\n- cpf\n- matriculasiape\n- nome\n- emailfuncional\n- codigo_servo_exercicio\n- modalidade_pgd\n- participa_pgd"]]
    end

    subgraph FINAL["💾 TABELAS DEFINITIVAS"]
        direction TB
        F1[["unidades\n- id (UUID)\n- codigo\n- nome\n- sigla\n- path\n- unidade_pai_id"]]
        F2[["usuarios\n- id (UUID)\n- cpf\n- matricula\n- nome\n- email\n- modalidade_pgd"]]
        F3[["unidades_integrantes\n- usuario_id\n- unidade_id"]]
        F4[["unidades_integrantes_atribuicoes\n- unidade_integrante_id\n- atribuicao (LOTADO, GESTOR)"]]
    end

    X1 --> T1
    X2 --> T2
    X3 --> T3

    T1 --> TR1 --> TR3 --> I1
    T2 --> TR2
    T3 --> TR2
    TR2 --> TR4 --> I2

    I1 --> F1
    I2 --> F2
    F1 --> F3
    F2 --> F3
    F3 --> F4

    style LEGEND fill:#f5f5f5,stroke:#9e9e9e
    style INPUT fill:#e3f2fd,stroke:#1565c0
    style TEMP fill:#fff8e1,stroke:#ffa000
    style TRANSFORM fill:#f3e5f5,stroke:#7b1fa2
    style INTEG fill:#e0f2f1,stroke:#00695c
    style FINAL fill:#fce4ec,stroke:#c2185b
```

## 6. Tratamento de Casos Especiais

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffebee', 'primaryTextColor': '#b71c1c', 'primaryBorderColor': '#c62828'}}}%%

flowchart TB
    subgraph LEGEND["📋 LEGENDA"]
        direction LR
        L1["✅ Sucesso"]
        L2["⚠️ Tratamento Especial"]
        L3["❌ Erro/Blacklist"]
    end

    subgraph CASOS["⚠️ CASOS ESPECIAIS"]
        direction TB

        subgraph SIT_FUNC["SITUAÇÃO FUNCIONAL"]
            SF1{"codSitFuncional?"}
            SF2["⚠️ Código 8\nATIVO_EM_OUTRO_ORGAO"]
            SF3["⚠️ Código 76\nCONTRATO_TEMPORARIO"]
            SF4["✅ Outros códigos\nProcessar normalmente"]
            SF5["❌ Ignorar servidor"]
            SF6["🔍 Buscar unidade\npor siglaUorgLotacao"]

            SF1 -->|8| SF2 --> SF5
            SF1 -->|76| SF3 --> SF6
            SF1 -->|Outros| SF4
        end

        subgraph MULT_MAT["MÚLTIPLAS MATRÍCULAS"]
            MM1{"CPF com\nmúltiplas\nmatrículas?"}
            MM2["📋 Obter matrículas\nativas do XML"]
            MM3{"Matrícula\nno XML?"}
            MM4["✅ Ativar matrícula"]
            MM5["❌ Adicionar à blacklist"]

            MM1 -->|Sim| MM2 --> MM3
            MM1 -->|Não| MM4
            MM3 -->|Sim| MM4
            MM3 -->|Não| MM5
        end

        subgraph EMAIL_DUP["EMAIL DUPLICADO"]
            ED1{"Email já\nexiste?"}
            ED2["⚠️ Gerar email fake:\nmatricula@petrvs.gov.br"]
            ED3{"Ainda\nduplicado?"}
            ED4["⚠️ Usar UUID:\nuuid@petrvs.gov.br"]
            ED5["✅ Usar email\noriginal"]

            ED1 -->|Sim| ED2 --> ED3
            ED1 -->|Não| ED5
            ED3 -->|Sim| ED4
            ED3 -->|Não| ED5
        end

        subgraph HIERARQUIA["HIERARQUIA DE UNIDADES"]
            HI1{"Unidade\nexiste?"}
            HI2["➕ INSERT nova unidade\ncom path hierárquico"]
            HI3{"Pai\nmudou?"}
            HI4["🔄 UPDATE path\n+ paths dos filhos"]
            HI5["🔄 UPDATE apenas\nnome, sigla, cidade"]

            HI1 -->|Não| HI2
            HI1 -->|Sim| HI3
            HI3 -->|Sim| HI4
            HI3 -->|Não| HI5
        end

        subgraph BLACKLIST["BLACKLIST"]
            BL1{"SOAP Fault\ncódigo 0002?"}
            BL2["❌ Adicionar CPF/código\nà blacklist"]
            BL3["✅ Processar\nnormalmente"]
            BL4["📋 Guardar XML\nde resposta"]

            BL1 -->|Sim| BL2 --> BL4
            BL1 -->|Não| BL3
        end
    end

    style LEGEND fill:#f5f5f5,stroke:#9e9e9e
    style SIT_FUNC fill:#e3f2fd,stroke:#1565c0
    style MULT_MAT fill:#fff3e0,stroke:#ef6c00
    style EMAIL_DUP fill:#f3e5f5,stroke:#7b1fa2
    style HIERARQUIA fill:#e8f5e9,stroke:#2e7d32
    style BLACKLIST fill:#ffebee,stroke:#c62828
```

## 7. Timeline de Execução

```mermaid
%%{init: {'theme': 'base'}}%%

gantt
    title Timeline de Execução - SincronizarSiapeJob
    dateFormat HH:mm
    axisFormat %H:%M

    section Configuração
    Inicialização (memory, timeout)      :a1, 03:00, 1m
    Carregar Entidades                   :a2, after a1, 1m

    section Fase 1 - Unidades
    Ler siape_dadosUORG                  :b1, after a2, 2m
    Parse XMLs                           :b2, after b1, 3m
    Atualizar integracao_unidades        :b3, after b2, 3m
    Atualizar hierarquia unidades        :b4, after b3, 2m

    section Fase 2 - Servidores
    Ler siape_consultaDados*             :c1, after b4, 2m
    Parse XMLs (JOIN)                    :c2, after c1, 4m
    Atualizar integracao_servidores      :c3, after c2, 3m
    Atualizar usuarios                   :c4, after c3, 3m
    Atualizar lotações                   :c5, after c4, 2m

    section Fase 3 - Gestores
    Query identificar chefes             :d1, after c5, 1m
    Atribuir GESTOR                      :d2, after d1, 2m
    Alterar perfis                       :d3, after d2, 1m

    section Finalização
    Salvar resultado                     :e1, after d3, 1m
```

## 8. Diagrama de Estados

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#e8f5e9'}}}%%

stateDiagram-v2
    [*] --> Idle: Job agendado

    Idle --> Configurando: Trigger (03:00)

    state Configurando {
        [*] --> SetMemory
        SetMemory --> SetTimeout
        SetTimeout --> LoadEntidades
        LoadEntidades --> [*]
    }

    Configurando --> ProcessandoUnidades: Para cada Entidade

    state ProcessandoUnidades {
        [*] --> LendoXML_UORGs
        LendoXML_UORGs --> ParseandoXML_UORGs
        ParseandoXML_UORGs --> AtualizandoIntegracaoUnidades
        AtualizandoIntegracaoUnidades --> AtualizandoHierarquia
        AtualizandoHierarquia --> [*]
    }

    ProcessandoUnidades --> ProcessandoServidores: Fase 1 OK
    ProcessandoUnidades --> Erro: Falha

    state ProcessandoServidores {
        [*] --> LendoXML_Servidores
        LendoXML_Servidores --> ParseandoXML_Servidores
        ParseandoXML_Servidores --> FiltrandoSituacoes
        FiltrandoSituacoes --> AtualizandoIntegracaoServidores
        AtualizandoIntegracaoServidores --> AtualizandoUsuarios
        AtualizandoUsuarios --> AtualizandoLotacoes
        AtualizandoLotacoes --> [*]
    }

    ProcessandoServidores --> ProcessandoGestores: Fase 2 OK
    ProcessandoServidores --> Erro: Falha

    state ProcessandoGestores {
        [*] --> IdentificandoChefes
        IdentificandoChefes --> AtribuindoGESTOR
        AtribuindoGESTOR --> AlterandoPerfis
        AlterandoPerfis --> [*]
    }

    ProcessandoGestores --> Finalizando: Fase 3 OK
    ProcessandoGestores --> Finalizando: Fase 3 Skip (erro anterior)

    state Finalizando {
        [*] --> SalvandoResultado
        SalvandoResultado --> [*]
    }

    Finalizando --> Idle: Próxima execução
    Erro --> Finalizando: Log erro

    note right of ProcessandoUnidades
        Lê de: siape_dadosUORG
        Escreve em: integracao_unidades, unidades
    end note

    note right of ProcessandoServidores
        Lê de: siape_consultaDadosPessoais,
               siape_consultaDadosFuncionais
        Escreve em: integracao_servidores,
                    usuarios, unidades_integrantes
    end note

    note right of ProcessandoGestores
        Lê de: integracao_unidades
        Escreve em: unidades_integrantes_atribuicoes
    end note
```

## 9. Resumo Visual Compacto

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'pie1': '#4CAF50', 'pie2': '#2196F3', 'pie3': '#FF9800', 'pie4': '#9C27B0', 'pie5': '#f44336'}}}%%

pie showData
    title Distribuição de Tempo por Fase
    "Fase 1 - Unidades" : 25
    "Fase 2 - Servidores" : 45
    "Fase 3 - Gestores" : 15
    "Config/Finalização" : 10
    "Tratamento Erros" : 5
```

---

## Notas de Uso

### Renderização dos Diagramas

Para visualizar estes diagramas:

1. **GitHub/GitLab**: Renderiza automaticamente em arquivos `.md`
2. **VS Code**: Instale extensão "Markdown Preview Mermaid Support"
3. **Mermaid Live Editor**: https://mermaid.live
4. **Documentação**: Integre com ferramentas como Docusaurus, MkDocs

### Personalização

Os diagramas usam a configuração `init` do Mermaid para personalizar cores e estilos. Modifique o bloco `%%{init:...}%%` para ajustar às cores do seu projeto.

### Exportação

Para exportar como imagem:
```bash
# Usando mermaid-cli
npx @mermaid-js/mermaid-cli mmdc -i diagrama.md -o diagrama.png
```

---

*Diagramas criados em: 2025-12-17*
*Baseados na análise do código: SincronizarSiapeJob, IntegracaoService, ProcessaDadosSiapeBD*
