# Documentação do Banco de Dados - Sistema Petrvs PGD

Este documento contém a estrutura completa do banco de dados do sistema Petrvs PGD.

```

---

## integracao_unidades

### Estrutura da Tabela

```sql
**Data de geração:** Mon Dec 15 15:34:02 -03 2025

`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`id_servo` varchar(50) DEFAULT NULL,
`pai_servo` varchar(50) DEFAULT NULL,
`codigo_siape` varchar(50) DEFAULT NULL,
`pai_siape` varchar(50) DEFAULT NULL,
`codupag` varchar(50) DEFAULT NULL,
`nomeuorg` varchar(200) DEFAULT NULL,
`siglauorg` varchar(50) DEFAULT NULL,
`telefone` varchar(50) DEFAULT NULL,
`email` varchar(100) DEFAULT NULL,
`natureza` varchar(50) DEFAULT NULL,
`fronteira` varchar(50) DEFAULT NULL,
`fuso_horario` varchar(50) DEFAULT NULL,
`cod_uop` varchar(50) DEFAULT NULL,
`cod_unidade` varchar(50) DEFAULT NULL,
`tipo` varchar(50) DEFAULT NULL,
`tipo_desc` varchar(100) DEFAULT NULL,
`na_rodovia` varchar(50) DEFAULT NULL,
`logradouro` varchar(100) DEFAULT NULL,
`bairro` varchar(100) DEFAULT NULL,
`cep` varchar(50) DEFAULT NULL,
`ptn_ge_coordenada` varchar(50) DEFAULT NULL,
`municipio_siafi_siape` varchar(100) DEFAULT NULL,
`municipio_siscom` varchar(100) DEFAULT NULL,
`municipio_ibge` varchar(50) DEFAULT NULL,
`municipio_nome` varchar(100) DEFAULT NULL,
`municipio_uf` varchar(50) DEFAULT NULL,
`ativa` varchar(50) DEFAULT NULL,
`regimental` varchar(50) DEFAULT NULL,
`data_modificacao` datetime DEFAULT NULL,
`und_nu_adicional` varchar(50) DEFAULT NULL,
`cnpjupag` varchar(60) DEFAULT NULL,
`cpf_titular_autoridade_uorg` varchar(14) DEFAULT NULL,
`cpf_substituto_autoridade_uorg` varchar(14) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
## Índice de Tabelas

- [afastamentos](#afastamentos)
- [anexos](#anexos)
- [areas_atividades_externas](#areas_atividades_externas)
- [areas_conhecimentos](#areas_conhecimentos)
- [areas_tematicas](#areas_tematicas)
- [atividades](#atividades)
- [atividades_pausas](#atividades_pausas)
- [atividades_tarefas](#atividades_tarefas)
- [audits](#audits)
- [avaliacoes](#avaliacoes)
- [avaliacoes_entregas_checklist](#avaliacoes_entregas_checklist)
- [cadeias_valores](#cadeias_valores)
- [cadeias_valores_processos](#cadeias_valores_processos)
- [capacidades](#capacidades)
- [capacidades_tecnicas](#capacidades_tecnicas)
- [cargos](#cargos)
- [catalogo_produtos_servicos](#catalogo_produtos_servicos)
- [centros_treinamentos](#centros_treinamentos)
- [cidades](#cidades)
- [clientes](#clientes)
- [comentarios](#comentarios)
- [comparecimentos](#comparecimentos)
- [curriculuns](#curriculuns)
- [curriculuns_graduacoes](#curriculuns_graduacoes)
- [curriculuns_profissionais](#curriculuns_profissionais)
- [cursos](#cursos)
- [disciplinas](#disciplinas)
- [documentos](#documentos)
- [documentos_assinaturas](#documentos_assinaturas)
- [eixos_tematicos](#eixos_tematicos)
- [entidades](#entidades)
- [entregas](#entregas)
- [favoritos](#favoritos)
- [feriados](#feriados)
- [funcoes](#funcoes)
- [grupos_especializados](#grupos_especializados)
- [historicos_atividades_externas](#historicos_atividades_externas)
- [historicos_atividades_internas](#historicos_atividades_internas)
- [historicos_cursos_externos](#historicos_cursos_externos)
- [historicos_cursos_internos](#historicos_cursos_internos)
- [historicos_docencias_externas](#historicos_docencias_externas)
- [historicos_docencias_internas](#historicos_docencias_internas)
- [historicos_funcoes](#historicos_funcoes)
- [historicos_lotacoes](#historicos_lotacoes)
- [integracao_servidores](#integracao_servidores)
- [integracao_unidades](#integracao_unidades)
- [integracoes](#integracoes)
- [materiais_servicos](#materiais_servicos)
- [migrations](#migrations)
- [notificacoes](#notificacoes)
- [notificacoes_destinatarios](#notificacoes_destinatarios)
- [notificacoes_whatsapp](#notificacoes_whatsapp)
- [ocorrencias](#ocorrencias)
- [okrs](#okrs)
- [okrs_objetivos](#okrs_objetivos)
- [okrs_objetivos_resultados_chaves](#okrs_objetivos_resultados_chaves)
- [perfis](#perfis)
- [personal_access_tokens](#personal_access_tokens)
- [planejamentos](#planejamentos)
- [planejamentos_objetivos](#planejamentos_objetivos)
- [planos_entregas](#planos_entregas)
- [planos_entregas_entregas](#planos_entregas_entregas)
- [planos_entregas_entregas_objetivos](#planos_entregas_entregas_objetivos)
- [planos_entregas_entregas_processos](#planos_entregas_entregas_processos)
- [planos_entregas_entregas_progressos](#planos_entregas_entregas_progressos)
- [planos_entregas_entregas_resultados_chaves](#planos_entregas_entregas_resultados_chaves)
- [planos_trabalhos](#planos_trabalhos)
- [planos_trabalhos_consolidacoes](#planos_trabalhos_consolidacoes)
- [planos_trabalhos_consolidacoes_afastamentos](#planos_trabalhos_consolidacoes_afastamentos)
- [planos_trabalhos_consolidacoes_atividades](#planos_trabalhos_consolidacoes_atividades)
- [planos_trabalhos_consolidacoes_ocorrencias](#planos_trabalhos_consolidacoes_ocorrencias)
- [planos_trabalhos_entregas](#planos_trabalhos_entregas)
- [produto_clientes](#produto_clientes)
- [produto_processo_cadeia_valor](#produto_processo_cadeia_valor)
- [produto_produto](#produto_produto)
- [produtos](#produtos)
- [programas](#programas)
- [programas_participantes](#programas_participantes)
- [projetos](#projetos)
- [projetos_alocacoes](#projetos_alocacoes)
- [projetos_alocacoes_regras](#projetos_alocacoes_regras)
- [projetos_fases](#projetos_fases)
- [projetos_historicos](#projetos_historicos)
- [projetos_recursos](#projetos_recursos)
- [projetos_regras](#projetos_regras)
- [projetos_tarefas](#projetos_tarefas)
- [projetos_tarefas_dependencias](#projetos_tarefas_dependencias)
- [questionarios](#questionarios)
- [questionarios_perguntas](#questionarios_perguntas)
- [questionarios_perguntas_respostas](#questionarios_perguntas_respostas)
- [questionarios_preenchimentos](#questionarios_preenchimentos)
- [reacoes](#reacoes)
- [sequences](#sequences)
- [siape_consultaDadosFuncionais](#siape_consultaDadosFuncionais)
- [siape_consultaDadosPessoais](#siape_consultaDadosPessoais)
- [siape_dadosUORG](#siape_dadosUORG)
- [siape_listaServidores](#siape_listaServidores)
- [siape_listaUORG](#siape_listaUORG)
- [solucao_produtos_servicos](#solucao_produtos_servicos)
- [status_justificativas](#status_justificativas)
- [templates](#templates)
- [tipos_atividades](#tipos_atividades)
- [tipos_avaliacoes](#tipos_avaliacoes)
- [tipos_avaliacoes_justificativas](#tipos_avaliacoes_justificativas)
- [tipos_avaliacoes_notas](#tipos_avaliacoes_notas)
- [tipos_capacidades](#tipos_capacidades)
- [tipos_clientes](#tipos_clientes)
- [tipos_cursos](#tipos_cursos)
- [tipos_documentos](#tipos_documentos)
- [tipos_justificativas](#tipos_justificativas)
- [tipos_modalidades](#tipos_modalidades)
- [tipos_motivos_afastamentos](#tipos_motivos_afastamentos)
- [tipos_processos](#tipos_processos)
- [tipos_projetos](#tipos_projetos)
- [tipos_tarefas](#tipos_tarefas)
- [unidades](#unidades)
- [unidades_integrantes](#unidades_integrantes)
- [unidades_integrantes_atribuicoes](#unidades_integrantes_atribuicoes)
- [usuarios](#usuarios)
- [view_api_pgd](#view_api_pgd)

---

## afastamentos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| id_servo | varchar(50) | YES |  | NULL |
| pai_servo | varchar(50) | YES |  | NULL |
| codigo_siape | varchar(50) | YES |  | NULL |
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`observacoes` text DEFAULT NULL COMMENT 'Observação sobre o afastamento',
`data_inicio` datetime NOT NULL COMMENT 'Inicio do afastamento',
`data_fim` datetime NOT NULL COMMENT 'Fim do afastamento',
`usuario_id` char(36) NOT NULL,
`tipo_motivo_afastamento_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `afastamentos_usuario_id_foreign` (`usuario_id`),
KEY `afastamentos_tipo_motivo_afastamento_id_foreign` (`tipo_motivo_afastamento_id`),
CONSTRAINT `afastamentos_tipo_motivo_afastamento_id_foreign` FOREIGN KEY (`tipo_motivo_afastamento_id`) REFERENCES `tipos_motivos_afastamentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `afastamentos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| pai_siape | varchar(50) | YES |  | NULL |
| codupag | varchar(50) | YES |  | NULL |
| nomeuorg | varchar(200) | YES |  | NULL |
| siglauorg | varchar(50) | YES |  | NULL |
| telefone | varchar(50) | YES |  | NULL |
| email | varchar(100) | YES |  | NULL |
| natureza | varchar(50) | YES |  | NULL |
| fronteira | varchar(50) | YES |  | NULL |
| fuso_horario | varchar(50) | YES |  | NULL |
| cod_uop | varchar(50) | YES |  | NULL |
| cod_unidade | varchar(50) | YES |  | NULL |
| tipo | varchar(50) | YES |  | NULL |
| tipo_desc | varchar(100) | YES |  | NULL |
| na_rodovia | varchar(50) | YES |  | NULL |
| logradouro | varchar(100) | YES |  | NULL |
| bairro | varchar(100) | YES |  | NULL |
| cep | varchar(50) | YES |  | NULL |
| ptn_ge_coordenada | varchar(50) | YES |  | NULL |
| municipio_siafi_siape | varchar(100) | YES |  | NULL |
| municipio_siscom | varchar(100) | YES |  | NULL |
| municipio_ibge | varchar(50) | YES |  | NULL |
| municipio_nome | varchar(100) | YES |  | NULL |
| municipio_uf | varchar(50) | YES |  | NULL |
| ativa | varchar(50) | YES |  | NULL |
| regimental | varchar(50) | YES |  | NULL |
| data_modificacao | datetime | YES |  | NULL |
| und_nu_adicional | varchar(50) | YES |  | NULL |
| cnpjupag | varchar(60) | YES |  | NULL |
| cpf_titular_autoridade_uorg | varchar(14) | YES |  | NULL |
| cpf_substituto_autoridade_uorg | varchar(14) | YES |  | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| observacoes | text | YES |  | NULL |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | NO |  | NULL |
| usuario_id | char(36) | NO | MUL | NULL |
| tipo_motivo_afastamento_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
integracao_unidades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## integracoes

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
afastamentos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
afastamentos	1	afastamentos_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
afastamentos	1	afastamentos_tipo_motivo_afastamento_id_foreign	1	tipo_motivo_afastamento_id	A	0	NULL	NULL		BTREE			NO
```

---

## anexos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_execucao` datetime NOT NULL COMMENT 'Data em que a rotina de integração foi executada',
`atualizar_unidades` tinyint(1) NOT NULL COMMENT 'Define se a rotina deve atualizar as unidades',
`atualizar_servidores` tinyint(1) NOT NULL COMMENT 'Define se a rotina deve atualizar os servidores',
`atualizar_gestores` tinyint(1) NOT NULL COMMENT 'Define se a rotina deve atualizar os gestores',
`usar_arquivos_locais` tinyint(1) NOT NULL COMMENT 'Define se a rotina deve importar os dados de um arquivo local em formato XML',
`gravar_arquivos_locais` tinyint(1) NOT NULL COMMENT 'Define se a rotina deve salvar os dados importados do SIAPE em um arquivo local em formato XML',
`resultado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Resultado da execução da rotina de integração' CHECK (json_valid(`resultado`)),
`entidade_id` char(36) NOT NULL,
`usuario_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `integracoes_entidade_id_foreign` (`entidade_id`),
KEY `integracoes_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `integracoes_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `integracoes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do arquivo com extensão',
`descricao` varchar(256) NOT NULL COMMENT 'Descrição do anexo',
`data_comentario` datetime NOT NULL COMMENT 'Data e horário que foi feito o comentário',
`path` varchar(256) DEFAULT NULL COMMENT 'Path relativo do arquivo',
`base64` text DEFAULT NULL COMMENT 'Arquivo em formato base64',
`usuario_id` char(36) DEFAULT NULL,
`comentario_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `anexos_usuario_id_foreign` (`usuario_id`),
KEY `anexos_comentario_id_foreign` (`comentario_id`),
CONSTRAINT `anexos_comentario_id_foreign` FOREIGN KEY (`comentario_id`) REFERENCES `comentarios` (`id`) ON UPDATE CASCADE,
CONSTRAINT `anexos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_execucao | datetime | NO |  | NULL |
| atualizar_unidades | tinyint(1) | NO |  | NULL |
| atualizar_servidores | tinyint(1) | NO |  | NULL |
| atualizar_gestores | tinyint(1) | NO |  | NULL |
| usar_arquivos_locais | tinyint(1) | NO |  | NULL |
| gravar_arquivos_locais | tinyint(1) | NO |  | NULL |
| resultado | longtext | NO |  | NULL |
| entidade_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | YES | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| descricao | varchar(256) | NO |  | NULL |
| data_comentario | datetime | NO |  | NULL |
| path | varchar(256) | YES |  | NULL |
| base64 | text | YES |  | NULL |
| usuario_id | char(36) | YES | MUL | NULL |
| comentario_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
integracoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
integracoes	1	integracoes_entidade_id_foreign	1	entidade_id	A	0	NULL	NULL		BTREE			NO
integracoes	1	integracoes_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## materiais_servicos

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
anexos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
anexos	1	anexos_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL	YES	BTREE			NO
anexos	1	anexos_comentario_id_foreign	1	comentario_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## areas_atividades_externas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`tipo` enum('MATERIAL','SERVICO') NOT NULL DEFAULT 'MATERIAL' COMMENT 'Tipo',
`codigo` varchar(100) DEFAULT NULL COMMENT 'Código',
`referencia` varchar(100) DEFAULT NULL COMMENT 'Referência',
`descricao` varchar(256) NOT NULL COMMENT 'Descrição',
`unidade_medida` enum('UNIDADE','CAIXA','METRO','KILO','LITRO','DUZIA','MONETARIO','HORAS','DIAS','PACOTE') NOT NULL COMMENT 'Unidade',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome da área',
`ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'area ativo ou inativo',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| id | char(36) | NO | PRI | NULL |
| tipo | enum('MATERIAL','SERVICO') | NO |  | MATERIAL |
| created_at | timestamp | YES |  | NULL |
| codigo | varchar(100) | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| referencia | varchar(100) | YES |  | NULL |
| descricao | varchar(256) | NO |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| unidade_medida | enum('UNIDADE','CAIXA','METRO','KILO','LITRO','DUZIA','MONETARIO','HORAS','DIAS','PACOTE') | NO |  | NULL |

### Índices

```sql
| ativo | tinyint(4) | NO |  | 1 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
materiais_servicos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## migrations

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
areas_atividades_externas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## areas_conhecimentos

### Estrutura da Tabela

```sql
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`migration` varchar(255) NOT NULL,
`batch` int(11) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome da área da graduação',
`ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Área ativa ou inativa',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | int(10) unsigned | NO | PRI | NULL | auto_increment |
| migration | varchar(255) | NO |  | NULL |
| batch | int(11) | NO |  | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| ativo | tinyint(4) | NO |  | 1 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
migrations	0	PRIMARY	1	id	A	226	NULL	NULL		BTREE			NO
```

---

## notificacoes

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
areas_conhecimentos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## areas_tematicas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número da mensagem (Gerado pelo sistema)',
`codigo` varchar(255) NOT NULL COMMENT 'Código da mensagem',
`data_registro` datetime NOT NULL COMMENT 'Data e hora da inclusão da mensagem',
`mensagem` longtext NOT NULL COMMENT 'Mensagem',
`remetente_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `notificacoes_numero_unique` (`numero`),
KEY `notificacoes_remetente_id_foreign` (`remetente_id`),
CONSTRAINT `notificacoes_remetente_id_foreign` FOREIGN KEY (`remetente_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome da área temática',
`ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Área ativa ou inativa',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| numero | int(11) | NO | UNI | 0 |
| codigo | varchar(255) | NO |  | NULL |
| data_registro | datetime | NO |  | NULL |
| mensagem | longtext | NO |  | NULL |
| remetente_id | char(36) | YES | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| ativo | tinyint(4) | NO |  | 1 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
notificacoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
notificacoes	0	notificacoes_numero_unique	1	numero	A	0	NULL	NULL		BTREE			NO
notificacoes	1	notificacoes_remetente_id_foreign	1	remetente_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## notificacoes_destinatarios

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
areas_tematicas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## atividades

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`tipo` enum('PETRVS','EMAIL','WHATSAPP') NOT NULL DEFAULT 'PETRVS' COMMENT 'Tipo do envio',
`data_leitura` datetime DEFAULT NULL COMMENT 'Data e hora da leitura',
`data_envio` datetime DEFAULT NULL COMMENT 'Data e hora do envio, utilizado quando realmente a mensagem foi despachada',
`opcoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Opções' CHECK (json_valid(`opcoes`)),
`notificacao_id` char(36) NOT NULL,
`usuario_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `notificacoes_destinatarios_notificacao_id_foreign` (`notificacao_id`),
KEY `notificacoes_destinatarios_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `notificacoes_destinatarios_notificacao_id_foreign` FOREIGN KEY (`notificacao_id`) REFERENCES `notificacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `notificacoes_destinatarios_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`numero` int(11) NOT NULL COMMENT 'Número da atividade (Gerado pelo sistema)',
`descricao` text NOT NULL COMMENT 'Assunto da atividade',
`data_distribuicao` datetime NOT NULL COMMENT 'Data de cadastro da atividade',
`carga_horaria` double(8,2) DEFAULT NULL COMMENT 'Carga horária que será utilizada para todos os cálculos (vinda do plano de trabalho)',
`tempo_planejado` double(8,2) NOT NULL COMMENT 'Diferença entre data_distribuicao e data_estipulada_entrega em horas (úteis ou corridas, configurada na unidade)',
`data_estipulada_entrega` datetime NOT NULL COMMENT 'Data estipulada para entrega da demanda',
`data_inicio` datetime DEFAULT NULL COMMENT 'Data em que o usuário iniciou a atividade',
`data_entrega` datetime DEFAULT NULL COMMENT 'Data da entrega',
`esforco` double(8,2) NOT NULL COMMENT 'Esforço (tempo) que será empregado na execução da atividade',
`tempo_despendido` double(8,2) DEFAULT NULL COMMENT 'Calculado no final da atividade, sendo o tempo líquido (considerando pausas)',
`data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento da demanda',
`etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Etiquetas' CHECK (json_valid(`etiquetas`)),
`checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Checklist' CHECK (json_valid(`checklist`)),
`prioridade` int(11) DEFAULT NULL COMMENT 'Nível de prioridade',
`progresso` decimal(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Progresso da realização da atividade',
`status` enum('INCLUIDO','INICIADO','PAUSADO','CONCLUIDO') NOT NULL DEFAULT 'INCLUIDO' COMMENT 'Status atual da atividade',
`plano_trabalho_id` char(36) DEFAULT NULL,
`plano_trabalho_entrega_id` char(36) DEFAULT NULL,
`plano_trabalho_consolidacao_id` char(36) DEFAULT NULL,
`tipo_atividade_id` char(36) DEFAULT NULL,
`demandante_id` char(36) NOT NULL,
`usuario_id` char(36) DEFAULT NULL,
`unidade_id` char(36) NOT NULL,
`documento_requisicao_id` char(36) DEFAULT NULL,
`documento_entrega_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `atividades_numero_unique` (`numero`),
KEY `atividades_plano_trabalho_id_foreign` (`plano_trabalho_id`),
KEY `atividades_plano_trabalho_entrega_id_foreign` (`plano_trabalho_entrega_id`),
KEY `atividades_plano_trabalho_consolidacao_id_foreign` (`plano_trabalho_consolidacao_id`),
KEY `atividades_tipo_atividade_id_foreign` (`tipo_atividade_id`),
KEY `atividades_demandante_id_foreign` (`demandante_id`),
KEY `atividades_usuario_id_foreign` (`usuario_id`),
KEY `atividades_unidade_id_foreign` (`unidade_id`),
KEY `atividades_documento_requisicao_id_foreign` (`documento_requisicao_id`),
KEY `atividades_documento_entrega_id_foreign` (`documento_entrega_id`),
CONSTRAINT `atividades_demandante_id_foreign` FOREIGN KEY (`demandante_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
CONSTRAINT `atividades_documento_entrega_id_foreign` FOREIGN KEY (`documento_entrega_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `atividades_documento_requisicao_id_foreign` FOREIGN KEY (`documento_requisicao_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `atividades_plano_trabalho_consolidacao_id_foreign` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `atividades_plano_trabalho_entrega_id_foreign` FOREIGN KEY (`plano_trabalho_entrega_id`) REFERENCES `planos_trabalhos_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `atividades_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `atividades_tipo_atividade_id_foreign` FOREIGN KEY (`tipo_atividade_id`) REFERENCES `tipos_atividades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `atividades_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `atividades_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| tipo | enum('PETRVS','EMAIL','WHATSAPP') | NO |  | PETRVS |
| data_leitura | datetime | YES |  | NULL |
| data_envio | datetime | YES |  | NULL |
| opcoes | longtext | YES |  | NULL |
| notificacao_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| numero | int(11) | NO | UNI | NULL |
| descricao | text | NO |  | NULL |
| data_distribuicao | datetime | NO |  | NULL |
| carga_horaria | double(8,2) | YES |  | NULL |
| tempo_planejado | double(8,2) | NO |  | NULL |
| data_estipulada_entrega | datetime | NO |  | NULL |
| data_inicio | datetime | YES |  | NULL |
| data_entrega | datetime | YES |  | NULL |
| esforco | double(8,2) | NO |  | NULL |
| tempo_despendido | double(8,2) | YES |  | NULL |
| data_arquivamento | datetime | YES |  | NULL |
| etiquetas | longtext | YES |  | NULL |
| checklist | longtext | YES |  | NULL |
| prioridade | int(11) | YES |  | NULL |
| progresso | decimal(5,2) | NO |  | 0.00 |
| status | enum('INCLUIDO','INICIADO','PAUSADO','CONCLUIDO') | NO |  | INCLUIDO |
| plano_trabalho_id | char(36) | YES | MUL | NULL |
| plano_trabalho_entrega_id | char(36) | YES | MUL | NULL |
| plano_trabalho_consolidacao_id | char(36) | YES | MUL | NULL |
| tipo_atividade_id | char(36) | YES | MUL | NULL |
| demandante_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | YES | MUL | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| documento_requisicao_id | char(36) | YES | MUL | NULL |
| documento_entrega_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
notificacoes_destinatarios	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
notificacoes_destinatarios	1	notificacoes_destinatarios_notificacao_id_foreign	1	notificacao_id	A	0	NULL	NULL		BTREE			NO
notificacoes_destinatarios	1	notificacoes_destinatarios_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
```

---

## notificacoes_whatsapp

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
atividades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
atividades	0	atividades_numero_unique	1	numero	A	0	NULL	NULL		BTREE			NO
atividades	1	atividades_plano_trabalho_id_foreign	1	plano_trabalho_id	A	0	NULL	NULL	YES	BTREE			NO
atividades	1	atividades_plano_trabalho_entrega_id_foreign	1	plano_trabalho_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
atividades	1	atividades_plano_trabalho_consolidacao_id_foreign	1	plano_trabalho_consolidacao_id	A	0	NULL	NULL	YES	BTREE			NO
atividades	1	atividades_tipo_atividade_id_foreign	1	tipo_atividade_id	A	0	NULL	NULL	YES	BTREE			NO
atividades	1	atividades_demandante_id_foreign	1	demandante_id	A	0	NULL	NULL		BTREE			NO
atividades	1	atividades_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL	YES	BTREE			NO
atividades	1	atividades_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
atividades	1	atividades_documento_requisicao_id_foreign	1	documento_requisicao_id	A	0	NULL	NULL	YES	BTREE			NO
atividades	1	atividades_documento_entrega_id_foreign	1	documento_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## atividades_pausas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_inicio_sessao` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Data hora do início da sessão',
`data_fim_sessao` datetime DEFAULT NULL COMMENT 'Data hora do final da sessão (utilizado posteriormente para alertar o usuário que seu atendimento acabou)',
`data_ultima_interacao` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Data hora utilizada para fazer o controle do tempo de sessão',
`interacoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT json_array() COMMENT 'Interações (histórico do campo atual)' CHECK (json_valid(`interacoes`)),
`atual` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Informações da posição atual no menu',
`usuario_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `notificacoes_whatsapp_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `notificacoes_whatsapp_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_inicio` datetime NOT NULL COMMENT 'Data de início da pausa',
`data_fim` datetime DEFAULT NULL COMMENT 'Data de retorno',
`atividade_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `atividades_pausas_atividade_id_foreign` (`atividade_id`),
CONSTRAINT `atividades_pausas_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_inicio_sessao | datetime | NO |  | current_timestamp() |
| data_fim_sessao | datetime | YES |  | NULL |
| data_ultima_interacao | datetime | NO |  | current_timestamp() |
| interacoes | longtext | NO |  | json_array() |
| atual | tinyint(4) | NO |  | 0 |
| usuario_id | char(36) | YES | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | YES |  | NULL |
| atividade_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
notificacoes_whatsapp	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
notificacoes_whatsapp	1	notificacoes_whatsapp_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## ocorrencias

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
atividades_pausas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
atividades_pausas	1	atividades_pausas_atividade_id_foreign	1	atividade_id	A	0	NULL	NULL		BTREE			NO
```

---

## atividades_tarefas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_inicio` datetime NOT NULL COMMENT 'Data inicial da consolidacão',
`data_fim` datetime NOT NULL COMMENT 'Data final da consolidação',
`descricao` longtext NOT NULL COMMENT 'Descrição da ocorrência',
`plano_trabalho_id` char(36) DEFAULT NULL,
`usuario_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `ocorrencias_plano_trabalho_id_foreign` (`plano_trabalho_id`),
KEY `ocorrencias_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `ocorrencias_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `ocorrencias_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`descricao` text DEFAULT NULL COMMENT 'Descrição da tarefa',
`data_lancamento` datetime NOT NULL COMMENT 'Data hora do lançamento da tarefa',
`tempo_estimado` double(8,2) NOT NULL COMMENT 'Tempo estimado para a execução da tarefa (Horas decimais)',
`data_conclusao` datetime DEFAULT NULL COMMENT 'Data da conclusão',
`documento_id` char(36) DEFAULT NULL,
`atividade_id` char(36) NOT NULL,
`usuario_id` char(36) NOT NULL,
`tipo_tarefa_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `atividades_tarefas_documento_id_foreign` (`documento_id`),
KEY `atividades_tarefas_atividade_id_foreign` (`atividade_id`),
KEY `atividades_tarefas_usuario_id_foreign` (`usuario_id`),
KEY `atividades_tarefas_tipo_tarefa_id_foreign` (`tipo_tarefa_id`),
CONSTRAINT `atividades_tarefas_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `atividades_tarefas_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `atividades_tarefas_tipo_tarefa_id_foreign` FOREIGN KEY (`tipo_tarefa_id`) REFERENCES `tipos_tarefas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `atividades_tarefas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | NO |  | NULL |
| descricao | longtext | NO |  | NULL |
| plano_trabalho_id | char(36) | YES | MUL | NULL |
| usuario_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| descricao | text | YES |  | NULL |
| data_lancamento | datetime | NO |  | NULL |
| tempo_estimado | double(8,2) | NO |  | NULL |
| data_conclusao | datetime | YES |  | NULL |
| documento_id | char(36) | YES | MUL | NULL |
| atividade_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | NO | MUL | NULL |
| tipo_tarefa_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
ocorrencias	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
ocorrencias	1	ocorrencias_plano_trabalho_id_foreign	1	plano_trabalho_id	A	0	NULL	NULL	YES	BTREE			NO
ocorrencias	1	ocorrencias_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
```

---

## okrs

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
atividades_tarefas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
atividades_tarefas	1	atividades_tarefas_documento_id_foreign	1	documento_id	A	0	NULL	NULL	YES	BTREE			NO
atividades_tarefas	1	atividades_tarefas_atividade_id_foreign	1	atividade_id	A	0	NULL	NULL		BTREE			NO
atividades_tarefas	1	atividades_tarefas_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
atividades_tarefas	1	atividades_tarefas_tipo_tarefa_id_foreign	1	tipo_tarefa_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## audits

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_inicio` datetime NOT NULL COMMENT 'Data de início do OKR',
`data_fim` datetime NOT NULL COMMENT 'Data final do OKR',
`data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento do OKR',
`nome` varchar(256) NOT NULL COMMENT 'Nome do OKR',
`unidade_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `okrs_unidade_id_foreign` (`unidade_id`),
CONSTRAINT `okrs_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
`user_type` varchar(255) DEFAULT NULL,
`user_id` char(36) DEFAULT NULL,
`event` varchar(255) NOT NULL,
`auditable_type` varchar(255) NOT NULL,
`auditable_id` char(36) NOT NULL,
`old_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`old_values`)),
`new_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`new_values`)),
`url` text DEFAULT NULL,
`ip_address` varchar(45) DEFAULT NULL,
`user_agent` varchar(1023) DEFAULT NULL,
`tags` varchar(255) DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`error_message` longtext DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `audits_user_type_user_id_index` (`user_type`,`user_id`),
KEY `audits_auditable_type_auditable_id_index` (`auditable_type`,`auditable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | NO |  | NULL |
| data_arquivamento | datetime | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| unidade_id | char(36) | YES | MUL | NULL |

### Índices

```sql
| id | bigint(20) unsigned | NO | PRI | NULL | auto_increment |
| user_type | varchar(255) | YES | MUL | NULL |
| user_id | char(36) | YES |  | NULL |
| event | varchar(255) | NO |  | NULL |
| auditable_type | varchar(255) | NO | MUL | NULL |
| auditable_id | char(36) | NO |  | NULL |
| old_values | longtext | YES |  | NULL |
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
okrs	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
okrs	1	okrs_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL	YES	BTREE			NO
| new_values | longtext | YES |  | NULL |
| url | text | YES |  | NULL |
```

---

## okrs_objetivos

### Estrutura da Tabela

```sql
| ip_address | varchar(45) | YES |  | NULL |
| user_agent | varchar(1023) | YES |  | NULL |
| tags | varchar(255) | YES |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| error_message | longtext | YES |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`sequencia` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequência utilizada para ordenar os objetivos',
`fundamentacao` varchar(256) NOT NULL COMMENT 'Fundamentação do objetivo',
`nome` varchar(256) NOT NULL COMMENT 'Nome do objetivo',
`cor` varchar(100) NOT NULL COMMENT 'Cor do objetivo',
`okr_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `okrs_objetivos_okr_id_foreign` (`okr_id`),
CONSTRAINT `okrs_objetivos_okr_id_foreign` FOREIGN KEY (`okr_id`) REFERENCES `okrs` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
audits	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
audits	1	audits_user_type_user_id_index	1	user_type	A	0	NULL	NULL	YES	BTREE			NO
audits	1	audits_user_type_user_id_index	2	user_id	A	0	NULL	NULL	YES	BTREE			NO
audits	1	audits_auditable_type_auditable_id_index	1	auditable_type	A	0	NULL	NULL		BTREE			NO
audits	1	audits_auditable_type_auditable_id_index	2	auditable_id	A	0	NULL	NULL		BTREE			NO
```

---

## avaliacoes

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| sequencia | int(11) | NO |  | 0 |
| fundamentacao | varchar(256) | NO |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| cor | varchar(100) | NO |  | NULL |
| okr_id | char(36) | NO | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_avaliacao` datetime NOT NULL COMMENT 'Data e hora da avaliação',
`nota` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Nota da avaliação' CHECK (json_valid(`nota`)),
`justificativa` text DEFAULT NULL COMMENT 'Comentário referente à avaliação, pelo avaliador',
`justificativas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT json_array() COMMENT 'Justificativas' CHECK (json_valid(`justificativas`)),
`recurso` text DEFAULT NULL COMMENT 'Recurso contra a nota atribuída, pelo avaliado',
`avaliador_id` char(36) NOT NULL,
`plano_trabalho_consolidacao_id` char(36) DEFAULT NULL,
`plano_entrega_id` char(36) DEFAULT NULL,
`tipo_avaliacao_id` char(36) NOT NULL,
`tipo_avaliacao_nota_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `avaliacoes_avaliador_id_foreign` (`avaliador_id`),
KEY `avaliacoes_plano_trabalho_consolidacao_id_foreign` (`plano_trabalho_consolidacao_id`),
KEY `avaliacoes_plano_entrega_id_foreign` (`plano_entrega_id`),
KEY `avaliacoes_tipo_avaliacao_id_foreign` (`tipo_avaliacao_id`),
KEY `avaliacoes_tipo_avaliacao_nota_id_foreign` (`tipo_avaliacao_nota_id`),
CONSTRAINT `avaliacoes_avaliador_id_foreign` FOREIGN KEY (`avaliador_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
CONSTRAINT `avaliacoes_plano_entrega_id_foreign` FOREIGN KEY (`plano_entrega_id`) REFERENCES `planos_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `avaliacoes_plano_trabalho_consolidacao_id_foreign` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `avaliacoes_tipo_avaliacao_id_foreign` FOREIGN KEY (`tipo_avaliacao_id`) REFERENCES `tipos_avaliacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `avaliacoes_tipo_avaliacao_nota_id_foreign` FOREIGN KEY (`tipo_avaliacao_nota_id`) REFERENCES `tipos_avaliacoes_notas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
okrs_objetivos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
okrs_objetivos	1	okrs_objetivos_okr_id_foreign	1	okr_id	A	0	NULL	NULL		BTREE			NO
```

---

## okrs_objetivos_resultados_chaves

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_avaliacao | datetime | NO |  | NULL |
| nota | longtext | NO |  | NULL |
| justificativa | text | YES |  | NULL |
| justificativas | longtext | NO |  | json_array() |
| recurso | text | YES |  | NULL |
| avaliador_id | char(36) | NO | MUL | NULL |
| plano_trabalho_consolidacao_id | char(36) | YES | MUL | NULL |
| plano_entrega_id | char(36) | YES | MUL | NULL |
| tipo_avaliacao_id | char(36) | NO | MUL | NULL |
| tipo_avaliacao_nota_id | char(36) | YES | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_inicio` datetime NOT NULL COMMENT 'Data inicial',
`data_fim` datetime DEFAULT NULL COMMENT 'Data final',
`descricao` varchar(256) NOT NULL COMMENT 'Descrição',
`meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Meta para a entrega' CHECK (json_valid(`meta`)),
`confianca` decimal(5,2) DEFAULT 0.00 COMMENT 'Nível % de confiança para atingir a meta',
`realizado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Valor realizado da entrega' CHECK (json_valid(`realizado`)),
`cor` varchar(100) NOT NULL COMMENT 'Cor do objetivo',
`okr_objetivo_id` char(36) NOT NULL,
`entrega_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `okrs_objetivos_resultados_chaves_okr_objetivo_id_foreign` (`okr_objetivo_id`),
KEY `okrs_objetivos_resultados_chaves_entrega_id_foreign` (`entrega_id`),
CONSTRAINT `okrs_objetivos_resultados_chaves_entrega_id_foreign` FOREIGN KEY (`entrega_id`) REFERENCES `entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `okrs_objetivos_resultados_chaves_okr_objetivo_id_foreign` FOREIGN KEY (`okr_objetivo_id`) REFERENCES `okrs_objetivos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
avaliacoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
avaliacoes	1	avaliacoes_avaliador_id_foreign	1	avaliador_id	A	0	NULL	NULL		BTREE			NO
avaliacoes	1	avaliacoes_plano_trabalho_consolidacao_id_foreign	1	plano_trabalho_consolidacao_id	A	0	NULL	NULL	YES	BTREE			NO
avaliacoes	1	avaliacoes_plano_entrega_id_foreign	1	plano_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
avaliacoes	1	avaliacoes_tipo_avaliacao_id_foreign	1	tipo_avaliacao_id	A	0	NULL	NULL		BTREE			NO
avaliacoes	1	avaliacoes_tipo_avaliacao_nota_id_foreign	1	tipo_avaliacao_nota_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## avaliacoes_entregas_checklist

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | YES |  | NULL |
| descricao | varchar(256) | NO |  | NULL |
| meta | longtext | NO |  | NULL |
| confianca | decimal(5,2) | YES |  | 0.00 |
| realizado | longtext | YES |  | NULL |
| cor | varchar(100) | NO |  | NULL |
| okr_objetivo_id | char(36) | NO | MUL | NULL |
| entrega_id | char(36) | NO | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Checklist' CHECK (json_valid(`checklist`)),
`avaliacao_id` char(36) NOT NULL,
`plano_trabalho_entrega_id` char(36) DEFAULT NULL,
`plano_entrega_entrega_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `avaliacoes_entregas_checklist_avaliacao_id_foreign` (`avaliacao_id`),
KEY `avaliacoes_entregas_checklist_plano_trabalho_entrega_id_foreign` (`plano_trabalho_entrega_id`),
KEY `avaliacoes_entregas_checklist_plano_entrega_entrega_id_foreign` (`plano_entrega_entrega_id`),
CONSTRAINT `avaliacoes_entregas_checklist_avaliacao_id_foreign` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `avaliacoes_entregas_checklist_plano_entrega_entrega_id_foreign` FOREIGN KEY (`plano_entrega_entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `avaliacoes_entregas_checklist_plano_trabalho_entrega_id_foreign` FOREIGN KEY (`plano_trabalho_entrega_id`) REFERENCES `planos_trabalhos_entregas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
okrs_objetivos_resultados_chaves	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
okrs_objetivos_resultados_chaves	1	okrs_objetivos_resultados_chaves_okr_objetivo_id_foreign	1	okr_objetivo_id	A	0	NULL	NULL		BTREE			NO
okrs_objetivos_resultados_chaves	1	okrs_objetivos_resultados_chaves_entrega_id_foreign	1	entrega_id	A	0	NULL	NULL		BTREE			NO
```

---

## perfis

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| checklist | longtext | NO |  | NULL |
| avaliacao_id | char(36) | NO | MUL | NULL |
| plano_trabalho_entrega_id | char(36) | YES | MUL | NULL |
| plano_entrega_entrega_id | char(36) | YES | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nivel` int(11) NOT NULL COMMENT 'Evita que usuários de nível inferior atribuam perfis de nível superior',
`nome` varchar(256) NOT NULL COMMENT 'Nome do perfil',
`descricao` text NOT NULL COMMENT 'Descrição do perfil',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
avaliacoes_entregas_checklist	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
avaliacoes_entregas_checklist	1	avaliacoes_entregas_checklist_avaliacao_id_foreign	1	avaliacao_id	A	0	NULL	NULL		BTREE			NO
avaliacoes_entregas_checklist	1	avaliacoes_entregas_checklist_plano_trabalho_entrega_id_foreign	1	plano_trabalho_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
avaliacoes_entregas_checklist	1	avaliacoes_entregas_checklist_plano_entrega_entrega_id_foreign	1	plano_entrega_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## cadeias_valores

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nivel | int(11) | NO |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| descricao | text | NO |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_inicio` datetime NOT NULL COMMENT 'Data de início da cadeia de valores',
`data_fim` datetime DEFAULT NULL COMMENT 'Data final da cadeia de valores',
`data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento da cadeia de valores',
`nome` varchar(256) NOT NULL COMMENT 'Nome da cadeia de valores',
`entidade_id` char(36) NOT NULL,
`unidade_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `cadeias_valores_entidade_id_foreign` (`entidade_id`),
KEY `cadeias_valores_unidade_id_foreign` (`unidade_id`),
CONSTRAINT `cadeias_valores_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `cadeias_valores_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
perfis	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## personal_access_tokens

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | YES |  | NULL |
| data_arquivamento | datetime | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| entidade_id | char(36) | NO | MUL | NULL |
| unidade_id | char(36) | YES | MUL | NULL |

### Índices

```sql
`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
`tokenable_type` varchar(255) NOT NULL,
`tokenable_id` char(36) NOT NULL,
`name` varchar(255) NOT NULL,
`token` varchar(64) NOT NULL,
`abilities` text DEFAULT NULL,
`last_used_at` timestamp NULL DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
cadeias_valores	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
cadeias_valores	1	cadeias_valores_entidade_id_foreign	1	entidade_id	A	0	NULL	NULL		BTREE			NO
cadeias_valores	1	cadeias_valores_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## cadeias_valores_processos

### Estrutura da Tabela

```sql
| id | bigint(20) unsigned | NO | PRI | NULL | auto_increment |
| tokenable_type | varchar(255) | NO | MUL | NULL |
| tokenable_id | char(36) | NO |  | NULL |
| name | varchar(255) | NO |  | NULL |
| token | varchar(64) | NO | UNI | NULL |
| abilities | text | YES |  | NULL |
| last_used_at | timestamp | YES |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`sequencia` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequência do processo dentro do grupo',
`path` text DEFAULT NULL COMMENT 'Path dos nós pais separados por /, ou NULL caso sejam nós raiz',
`nome` varchar(256) NOT NULL COMMENT 'Nome do processo',
`cadeia_valor_id` char(36) NOT NULL,
`processo_pai_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `cadeias_valores_processos_cadeia_valor_id_foreign` (`cadeia_valor_id`),
KEY `cadeias_valores_processos_processo_pai_id_foreign` (`processo_pai_id`),
CONSTRAINT `cadeias_valores_processos_cadeia_valor_id_foreign` FOREIGN KEY (`cadeia_valor_id`) REFERENCES `cadeias_valores` (`id`) ON UPDATE CASCADE,
CONSTRAINT `cadeias_valores_processos_processo_pai_id_foreign` FOREIGN KEY (`processo_pai_id`) REFERENCES `cadeias_valores_processos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
personal_access_tokens	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
personal_access_tokens	0	personal_access_tokens_token_unique	1	token	A	0	NULL	NULL		BTREE			NO
personal_access_tokens	1	personal_access_tokens_tokenable_type_tokenable_id_index	1	tokenable_type	A	0	NULL	NULL		BTREE			NO
personal_access_tokens	1	personal_access_tokens_tokenable_type_tokenable_id_index	2	tokenable_id	A	0	NULL	NULL		BTREE			NO
```

---

## planejamentos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| sequencia | int(11) | NO |  | 0 |
| path | text | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| cadeia_valor_id | char(36) | NO | MUL | NULL |
| processo_pai_id | char(36) | YES | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do planejamento institucional',
`missao` text NOT NULL COMMENT 'Missão da entidade/unidade',
`visao` text NOT NULL COMMENT 'Visão da entidade/unidade',
`data_inicio` datetime NOT NULL COMMENT 'Data de início do planejamento institucional',
`data_fim` datetime NOT NULL COMMENT 'Data final do planejamento institucional',
`data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento do planejamento institucional',
`valores` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Valores da unidade' CHECK (json_valid(`valores`)),
`resultados_institucionais` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Resultados da unidade' CHECK (json_valid(`resultados_institucionais`)),
`entidade_id` char(36) NOT NULL,
`unidade_id` char(36) NOT NULL,
`planejamento_superior_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `planejamentos_entidade_id_foreign` (`entidade_id`),
KEY `planejamentos_unidade_id_foreign` (`unidade_id`),
KEY `planejamentos_planejamento_superior_id_foreign` (`planejamento_superior_id`),
CONSTRAINT `planejamentos_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planejamentos_planejamento_superior_id_foreign` FOREIGN KEY (`planejamento_superior_id`) REFERENCES `planejamentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planejamentos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
cadeias_valores_processos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
cadeias_valores_processos	1	cadeias_valores_processos_cadeia_valor_id_foreign	1	cadeia_valor_id	A	0	NULL	NULL		BTREE			NO
cadeias_valores_processos	1	cadeias_valores_processos_processo_pai_id_foreign	1	processo_pai_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## capacidades

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| missao | text | NO |  | NULL |
| visao | text | NO |  | NULL |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | NO |  | NULL |
| data_arquivamento | datetime | YES |  | NULL |
| valores | longtext | NO |  | NULL |
| resultados_institucionais | longtext | YES |  | NULL |
| entidade_id | char(36) | NO | MUL | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| planejamento_superior_id | char(36) | YES | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`perfil_id` char(36) DEFAULT NULL,
`tipo_capacidade_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `capacidades_perfil_id_foreign` (`perfil_id`),
KEY `capacidades_tipo_capacidade_id_foreign` (`tipo_capacidade_id`),
CONSTRAINT `capacidades_perfil_id_foreign` FOREIGN KEY (`perfil_id`) REFERENCES `perfis` (`id`) ON UPDATE CASCADE,
CONSTRAINT `capacidades_tipo_capacidade_id_foreign` FOREIGN KEY (`tipo_capacidade_id`) REFERENCES `tipos_capacidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planejamentos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planejamentos	1	planejamentos_entidade_id_foreign	1	entidade_id	A	0	NULL	NULL		BTREE			NO
planejamentos	1	planejamentos_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
planejamentos	1	planejamentos_planejamento_superior_id_foreign	1	planejamento_superior_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## planejamentos_objetivos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| perfil_id | char(36) | YES | MUL | NULL |
| tipo_capacidade_id | char(36) | NO | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`sequencia` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequência utilizada para ordenar os objetivos',
`fundamentacao` varchar(256) NOT NULL COMMENT 'Fundamentação do objetivo',
`nome` text NOT NULL,
`path` text DEFAULT NULL COMMENT 'IDs dos nós ascendentes separados por /, ou NULL caso seja um nó raiz',
`planejamento_id` char(36) NOT NULL,
`eixo_tematico_id` char(36) NOT NULL,
`objetivo_pai_id` char(36) DEFAULT NULL,
`objetivo_superior_id` char(36) DEFAULT NULL,
`integra_okr` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Objetivos que serão visíveis no OKR',
PRIMARY KEY (`id`),
KEY `planejamentos_objetivos_planejamento_id_foreign` (`planejamento_id`),
KEY `planejamentos_objetivos_eixo_tematico_id_foreign` (`eixo_tematico_id`),
KEY `planejamentos_objetivos_objetivo_pai_id_foreign` (`objetivo_pai_id`),
KEY `planejamentos_objetivos_objetivo_superior_id_foreign` (`objetivo_superior_id`),
CONSTRAINT `planejamentos_objetivos_eixo_tematico_id_foreign` FOREIGN KEY (`eixo_tematico_id`) REFERENCES `eixos_tematicos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planejamentos_objetivos_objetivo_pai_id_foreign` FOREIGN KEY (`objetivo_pai_id`) REFERENCES `planejamentos_objetivos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planejamentos_objetivos_objetivo_superior_id_foreign` FOREIGN KEY (`objetivo_superior_id`) REFERENCES `planejamentos_objetivos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planejamentos_objetivos_planejamento_id_foreign` FOREIGN KEY (`planejamento_id`) REFERENCES `planejamentos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
capacidades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
capacidades	1	capacidades_perfil_id_foreign	1	perfil_id	A	0	NULL	NULL	YES	BTREE			NO
capacidades	1	capacidades_tipo_capacidade_id_foreign	1	tipo_capacidade_id	A	0	NULL	NULL		BTREE			NO
```

---

## capacidades_tecnicas

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| sequencia | int(11) | NO |  | 0 |
| fundamentacao | varchar(256) | NO |  | NULL |
| nome | text | NO |  | NULL |
| path | text | YES |  | NULL |
| planejamento_id | char(36) | NO | MUL | NULL |
| eixo_tematico_id | char(36) | NO | MUL | NULL |
| objetivo_pai_id | char(36) | YES | MUL | NULL |
| objetivo_superior_id | char(36) | YES | MUL | NULL |
| integra_okr | tinyint(1) | NO |  | 1 |
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome da capacidade técnica',
`ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'capacidade ativo ou inativo',
`area_tematica_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `capacidades_tecnicas_area_tematica_id_foreign` (`area_tematica_id`),
CONSTRAINT `capacidades_tecnicas_area_tematica_id_foreign` FOREIGN KEY (`area_tematica_id`) REFERENCES `areas_tematicas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```


### Colunas
### Índices


| Campo | Tipo | Nulo | Chave | Padrão | Extra |
```sql
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planejamentos_objetivos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planejamentos_objetivos	1	planejamentos_objetivos_planejamento_id_foreign	1	planejamento_id	A	0	NULL	NULL		BTREE			NO
planejamentos_objetivos	1	planejamentos_objetivos_eixo_tematico_id_foreign	1	eixo_tematico_id	A	0	NULL	NULL		BTREE			NO
planejamentos_objetivos	1	planejamentos_objetivos_objetivo_pai_id_foreign	1	objetivo_pai_id	A	0	NULL	NULL	YES	BTREE			NO
planejamentos_objetivos	1	planejamentos_objetivos_objetivo_superior_id_foreign	1	objetivo_superior_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## planos_entregas

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| ativo | tinyint(4) | NO |  | 1 |
| area_tematica_id | char(36) | NO | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número do plano de entrega (Gerado pelo sistema)',
`data_inicio` datetime NOT NULL COMMENT 'Data inicial do plano de entregas',
`data_fim` datetime DEFAULT NULL COMMENT 'Data final do plano de entregas',
`data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento do plano de entregas',
`nome` varchar(256) NOT NULL COMMENT 'Nome do plano de entregas',
`status` enum('INCLUIDO','HOMOLOGANDO','ATIVO','CONCLUIDO','AVALIADO','SUSPENSO','CANCELADO') NOT NULL DEFAULT 'INCLUIDO' COMMENT 'Status atual do plano de entregas',
`planejamento_id` char(36) DEFAULT NULL,
`cadeia_valor_id` char(36) DEFAULT NULL,
`unidade_id` char(36) NOT NULL,
`plano_entrega_id` char(36) DEFAULT NULL,
`programa_id` char(36) NOT NULL,
`criacao_usuario_id` char(36) NOT NULL,
`avaliacao_id` char(36) DEFAULT NULL,
`okr_id` char(36) DEFAULT NULL,
`data_envio_api_pgd` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `planos_entregas_numero_unique` (`numero`),
KEY `planos_entregas_planejamento_id_foreign` (`planejamento_id`),
KEY `planos_entregas_cadeia_valor_id_foreign` (`cadeia_valor_id`),
KEY `planos_entregas_unidade_id_foreign` (`unidade_id`),
KEY `planos_entregas_plano_entrega_id_foreign` (`plano_entrega_id`),
KEY `planos_entregas_programa_id_foreign` (`programa_id`),
KEY `planos_entregas_criacao_usuario_id_foreign` (`criacao_usuario_id`),
KEY `planos_entregas_avaliacao_id_foreign` (`avaliacao_id`),
KEY `planos_entregas_okr_id_foreign` (`okr_id`),
CONSTRAINT `planos_entregas_avaliacao_id_foreign` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_cadeia_valor_id_foreign` FOREIGN KEY (`cadeia_valor_id`) REFERENCES `cadeias_valores` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_criacao_usuario_id_foreign` FOREIGN KEY (`criacao_usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_okr_id_foreign` FOREIGN KEY (`okr_id`) REFERENCES `okrs` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_planejamento_id_foreign` FOREIGN KEY (`planejamento_id`) REFERENCES `planejamentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_plano_entrega_id_foreign` FOREIGN KEY (`plano_entrega_id`) REFERENCES `planos_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_programa_id_foreign` FOREIGN KEY (`programa_id`) REFERENCES `programas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
capacidades_tecnicas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
capacidades_tecnicas	1	capacidades_tecnicas_area_tematica_id_foreign	1	area_tematica_id	A	0	NULL	NULL		BTREE			NO
```

---

## cargos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| numero | int(11) | NO | UNI | 0 |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | YES |  | NULL |
| data_arquivamento | datetime | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| status | enum('INCLUIDO','HOMOLOGANDO','ATIVO','CONCLUIDO','AVALIADO','SUSPENSO','CANCELADO') | NO |  | INCLUIDO |
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do Cargo',
`nivel` varchar(256) DEFAULT NULL COMMENT 'Nível do Cargo',
`descricao` varchar(256) DEFAULT NULL COMMENT 'Descrição do Cargo',
`siape` varchar(256) DEFAULT NULL COMMENT 'código SIAPE do Cargo',
`cbo` varchar(256) DEFAULT NULL COMMENT 'código CBO do Cargo',
`efetivo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Cargo efetivo ou comissionado',
`ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Cargo ativo ou inativo',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| planejamento_id | char(36) | YES | MUL | NULL |
| cadeia_valor_id | char(36) | YES | MUL | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| plano_entrega_id | char(36) | YES | MUL | NULL |
| programa_id | char(36) | NO | MUL | NULL |
| criacao_usuario_id | char(36) | NO | MUL | NULL |
| avaliacao_id | char(36) | YES | MUL | NULL |
| okr_id | char(36) | YES | MUL | NULL |
| data_envio_api_pgd | timestamp | YES |  | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_entregas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_entregas	0	planos_entregas_numero_unique	1	numero	A	0	NULL	NULL		BTREE			NO
planos_entregas	1	planos_entregas_planejamento_id_foreign	1	planejamento_id	A	0	NULL	NULL	YES	BTREE			NO
planos_entregas	1	planos_entregas_cadeia_valor_id_foreign	1	cadeia_valor_id	A	0	NULL	NULL	YES	BTREE			NO
planos_entregas	1	planos_entregas_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
planos_entregas	1	planos_entregas_plano_entrega_id_foreign	1	plano_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
planos_entregas	1	planos_entregas_programa_id_foreign	1	programa_id	A	0	NULL	NULL		BTREE			NO
planos_entregas	1	planos_entregas_criacao_usuario_id_foreign	1	criacao_usuario_id	A	0	NULL	NULL		BTREE			NO
planos_entregas	1	planos_entregas_avaliacao_id_foreign	1	avaliacao_id	A	0	NULL	NULL	YES	BTREE			NO
planos_entregas	1	planos_entregas_okr_id_foreign	1	okr_id	A	0	NULL	NULL	YES	BTREE			NO
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
```

---

## planos_entregas_entregas

### Estrutura da Tabela

```sql
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| nivel | varchar(256) | YES |  | NULL |
| descricao | varchar(256) | YES |  | NULL |
| siape | varchar(256) | YES |  | NULL |
| cbo | varchar(256) | YES |  | NULL |
| efetivo | tinyint(4) | NO |  | 1 |
| ativo | tinyint(4) | NO |  | 1 |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`homologado` tinyint(4) NOT NULL COMMENT 'Se a entrega foi ou não homologada',
`progresso_esperado` decimal(5,2) DEFAULT 0.00 COMMENT 'Percentual esperado de progresso do Plano de Entregas',
`progresso_realizado` decimal(5,2) DEFAULT 0.00 COMMENT 'Percentual realizado de progresso do Plano de Entregas',
`data_inicio` datetime NOT NULL COMMENT 'Data inicial da entrega',
`data_fim` datetime DEFAULT NULL COMMENT 'Data final da entrega',
`descricao` text NOT NULL,
`destinatario` varchar(255) DEFAULT NULL COMMENT 'Destinatário da entrega',
`meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Meta para a entrega' CHECK (json_valid(`meta`)),
`realizado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Valor realizado da entrega' CHECK (json_valid(`realizado`)),
`plano_entrega_id` char(36) NOT NULL,
`entrega_id` char(36) NOT NULL DEFAULT '1' COMMENT '(DC2Type:guid)',
`entrega_pai_id` char(36) DEFAULT NULL,
`unidade_id` char(36) NOT NULL,
`checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Checklist' CHECK (json_valid(`checklist`)),
`etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Etiquetas' CHECK (json_valid(`etiquetas`)),
`descricao_meta` longtext NOT NULL COMMENT 'Descrição da meta',
`descricao_entrega` longtext NOT NULL COMMENT 'Descrição do título da entrega',
PRIMARY KEY (`id`),
KEY `planos_entregas_entregas_plano_entrega_id_foreign` (`plano_entrega_id`),
KEY `planos_entregas_entregas_entrega_id_foreign` (`entrega_id`),
KEY `planos_entregas_entregas_entrega_pai_id_foreign` (`entrega_pai_id`),
KEY `planos_entregas_entregas_unidade_id_foreign` (`unidade_id`),
CONSTRAINT `planos_entregas_entregas_entrega_id_foreign` FOREIGN KEY (`entrega_id`) REFERENCES `entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_entregas_entrega_pai_id_foreign` FOREIGN KEY (`entrega_pai_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_entregas_plano_entrega_id_foreign` FOREIGN KEY (`plano_entrega_id`) REFERENCES `planos_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_entregas_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
cargos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## catalogo_produtos_servicos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| homologado | tinyint(4) | NO |  | NULL |
| progresso_esperado | decimal(5,2) | YES |  | 0.00 |
| progresso_realizado | decimal(5,2) | YES |  | 0.00 |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | YES |  | NULL |
| descricao | text | NO |  | NULL |
| destinatario | varchar(255) | YES |  | NULL |
`id` char(36) NOT NULL,
`nome` varchar(100) NOT NULL,
`unidade_id` char(36) NOT NULL,
`curador_responsavel_id` char(36) NOT NULL,
`data_inicio` date NOT NULL,
`data_fim` date DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `catalogo_produtos_servicos_unidade_id_foreign` (`unidade_id`),
KEY `catalogo_produtos_servicos_curador_responsavel_id_foreign` (`curador_responsavel_id`),
CONSTRAINT `catalogo_produtos_servicos_curador_responsavel_id_foreign` FOREIGN KEY (`curador_responsavel_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
CONSTRAINT `catalogo_produtos_servicos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| meta | longtext | NO |  | NULL |
| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| realizado | longtext | YES |  | NULL |
| plano_entrega_id | char(36) | NO | MUL | NULL |
| entrega_id | char(36) | NO | MUL | 1 |
| entrega_pai_id | char(36) | YES | MUL | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| checklist | longtext | YES |  | NULL |
| etiquetas | longtext | YES |  | NULL |
| descricao_meta | longtext | NO |  | NULL |
| descricao_entrega | longtext | NO |  | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| nome | varchar(100) | NO |  | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| curador_responsavel_id | char(36) | NO | MUL | NULL |
| data_inicio | date | NO |  | NULL |
| data_fim | date | YES |  | NULL |
| created_at | timestamp | YES |  | NULL |
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_entregas_entregas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas	1	planos_entregas_entregas_plano_entrega_id_foreign	1	plano_entrega_id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas	1	planos_entregas_entregas_entrega_id_foreign	1	entrega_id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas	1	planos_entregas_entregas_entrega_pai_id_foreign	1	entrega_pai_id	A	0	NULL	NULL	YES	BTREE			NO
planos_entregas_entregas	1	planos_entregas_entregas_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |

### Índices

```sql
```

---

## planos_entregas_entregas_objetivos

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
catalogo_produtos_servicos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
catalogo_produtos_servicos	1	catalogo_produtos_servicos_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
catalogo_produtos_servicos	1	catalogo_produtos_servicos_curador_responsavel_id_foreign	1	curador_responsavel_id	A	0	NULL	NULL		BTREE			NO
```

---

## centros_treinamentos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`planejamento_objetivo_id` char(36) NOT NULL COMMENT 'Objetivo do Planejamento institucional ao qual está vinculado este objetivo',
`entrega_id` char(36) NOT NULL COMMENT 'Entrega do Plano de Entregas à qual está vinculado este objetivo',
PRIMARY KEY (`id`),
KEY `fk_plan_entr_entr_obj_id_planej_obj_id` (`planejamento_objetivo_id`),
KEY `fk_plan_ent_ent_id_plan_entr_entr_obj_id` (`entrega_id`),
CONSTRAINT `fk_plan_ent_ent_id_plan_entr_entr_obj_id` FOREIGN KEY (`entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_plan_entr_entr_obj_id_planej_obj_id` FOREIGN KEY (`planejamento_objetivo_id`) REFERENCES `planejamentos_objetivos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do centro de treinamento',
`ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Curso ativo ou inativo',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| planejamento_objetivo_id | char(36) | NO | MUL | NULL |
| entrega_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| ativo | tinyint(4) | NO |  | 1 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_entregas_entregas_objetivos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_objetivos	1	fk_plan_entr_entr_obj_id_planej_obj_id	1	planejamento_objetivo_id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_objetivos	1	fk_plan_ent_ent_id_plan_entr_entr_obj_id	1	entrega_id	A	0	NULL	NULL		BTREE			NO
```

---

## planos_entregas_entregas_processos

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
centros_treinamentos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## cidades

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`cadeia_processo_id` char(36) NOT NULL,
`entrega_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `planos_entregas_entregas_processos_cadeia_processo_id_foreign` (`cadeia_processo_id`),
KEY `planos_entregas_entregas_processos_entrega_id_foreign` (`entrega_id`),
CONSTRAINT `planos_entregas_entregas_processos_cadeia_processo_id_foreign` FOREIGN KEY (`cadeia_processo_id`) REFERENCES `cadeias_valores_processos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_entregas_processos_entrega_id_foreign` FOREIGN KEY (`entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`codigo_ibge` varchar(20) NOT NULL COMMENT 'Código IBGE',
`nome` varchar(256) NOT NULL COMMENT 'Nome',
`tipo` set('MUNICIPIO','DISTRITO','CAPITAL') NOT NULL COMMENT 'Tipo da cidade',
`uf` varchar(2) NOT NULL COMMENT 'Unidade Federativa',
`timezone` int(11) NOT NULL COMMENT 'Timezone UTC da cidade',
PRIMARY KEY (`id`),
UNIQUE KEY `cidades_codigo_ibge_unique` (`codigo_ibge`),
KEY `cidades_codigo_ibge_index` (`codigo_ibge`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| cadeia_processo_id | char(36) | NO | MUL | NULL |
| entrega_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| codigo_ibge | varchar(20) | NO | UNI | NULL |
| nome | varchar(256) | NO |  | NULL |
| tipo | set('MUNICIPIO','DISTRITO','CAPITAL') | NO |  | NULL |
| uf | varchar(2) | NO |  | NULL |
| timezone | int(11) | NO |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_entregas_entregas_processos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_processos	1	planos_entregas_entregas_processos_cadeia_processo_id_foreign	1	cadeia_processo_id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_processos	1	planos_entregas_entregas_processos_entrega_id_foreign	1	entrega_id	A	0	NULL	NULL		BTREE			NO
```

---

## planos_entregas_entregas_progressos

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
cidades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
cidades	0	cidades_codigo_ibge_unique	1	codigo_ibge	A	0	NULL	NULL		BTREE			NO
cidades	1	cidades_codigo_ibge_index	1	codigo_ibge	A	0	NULL	NULL		BTREE			NO
```

---

## clientes

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`homologado` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se a entrega foi ou não homologada',
`progresso_esperado` decimal(5,2) DEFAULT 0.00 COMMENT 'Percentual esperado de progresso do Plano de Entregas',
`progresso_realizado` decimal(5,2) DEFAULT 0.00 COMMENT 'Percentual realizado de progresso do Plano de Entregas',
`data_inicio` datetime DEFAULT NULL COMMENT 'Data inicial da entrega',
`data_fim` datetime DEFAULT NULL COMMENT 'Data final da entrega',
`meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Meta para a entrega' CHECK (json_valid(`meta`)),
`realizado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Valor realizado da entrega' CHECK (json_valid(`realizado`)),
`data_progresso` date NOT NULL COMMENT 'Data do progresso',
`usuario_id` char(36) NOT NULL,
`plano_entrega_entrega_id` char(36) NOT NULL COMMENT 'Entrega do Plano de Entregas à qual está vinculado este progresso',
PRIMARY KEY (`id`),
KEY `planos_entregas_entregas_progressos_usuario_id_foreign` (`usuario_id`),
KEY `fk_plan_ent_ent_id_plan_entr_entr_pro_id` (`plano_entrega_entrega_id`),
CONSTRAINT `fk_plan_ent_ent_id_plan_entr_entr_pro_id` FOREIGN KEY (`plano_entrega_entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_entregas_progressos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`nome` varchar(255) NOT NULL,
`tipo_cliente_id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `clientes_tipo_cliente_id_foreign` (`tipo_cliente_id`),
CONSTRAINT `clientes_tipo_cliente_id_foreign` FOREIGN KEY (`tipo_cliente_id`) REFERENCES `tipos_clientes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| homologado | tinyint(4) | NO |  | 0 |
| progresso_esperado | decimal(5,2) | YES |  | 0.00 |
| progresso_realizado | decimal(5,2) | YES |  | 0.00 |
| data_inicio | datetime | YES |  | NULL |
| data_fim | datetime | YES |  | NULL |
| meta | longtext | YES |  | NULL |
| realizado | longtext | YES |  | NULL |
| data_progresso | date | NO |  | NULL |
| usuario_id | char(36) | NO | MUL | NULL |
| plano_entrega_entrega_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| nome | varchar(255) | NO |  | NULL |
| tipo_cliente_id | char(36) | NO | MUL | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_entregas_entregas_progressos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_progressos	1	planos_entregas_entregas_progressos_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_progressos	1	fk_plan_ent_ent_id_plan_entr_entr_pro_id	1	plano_entrega_entrega_id	A	0	NULL	NULL		BTREE			NO
```

---

## planos_entregas_entregas_resultados_chaves

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
clientes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
clientes	1	clientes_tipo_cliente_id_foreign	1	tipo_cliente_id	A	0	NULL	NULL		BTREE			NO
```

---

## comentarios

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`okr_objetivo_resultado_chave_id` char(36) NOT NULL COMMENT 'Resultado chave do OKR',
`entrega_id` char(36) NOT NULL COMMENT 'Entrega do Plano de Entregas à qual está vinculado',
PRIMARY KEY (`id`),
KEY `fk_plan_entr_entr_okr_id_resultado_chave` (`okr_objetivo_resultado_chave_id`),
KEY `fk_plan_ent_ent_id_plan_entr_entr_okr_id` (`entrega_id`),
CONSTRAINT `fk_plan_ent_ent_id_plan_entr_entr_okr_id` FOREIGN KEY (`entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_plan_entr_entr_okr_id_resultado_chave` FOREIGN KEY (`okr_objetivo_resultado_chave_id`) REFERENCES `okrs_objetivos_resultados_chaves` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`texto` text NOT NULL COMMENT 'Texto do comentário',
`path` text DEFAULT NULL COMMENT 'Path dos ids dos comentários',
`data_comentario` datetime NOT NULL COMMENT 'Data e horário em que foi feito o comentário',
`tipo` enum('COMENTARIO','TECNICO','GERENCIAL','AVALIACAO','TAREFA','ATIVIDADE','TIPO_ATIVIDADE') NOT NULL DEFAULT 'COMENTARIO' COMMENT 'Tipo do comentário',
`privacidade` enum('PUBLICO','PRIVADO') NOT NULL DEFAULT 'PUBLICO' COMMENT 'Nível de acesso ao comentário',
`usuario_id` char(36) NOT NULL,
`comentario_pai_id` char(36) DEFAULT NULL,
`atividade_id` char(36) DEFAULT NULL,
`atividade_tarefa_id` char(36) DEFAULT NULL,
`projeto_id` char(36) DEFAULT NULL,
`projeto_tarefa_id` char(36) DEFAULT NULL,
`plano_entrega_entrega_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `comentarios_usuario_id_foreign` (`usuario_id`),
KEY `comentarios_comentario_pai_id_foreign` (`comentario_pai_id`),
KEY `comentarios_atividade_id_foreign` (`atividade_id`),
KEY `comentarios_atividade_tarefa_id_foreign` (`atividade_tarefa_id`),
KEY `comentarios_projeto_id_foreign` (`projeto_id`),
KEY `comentarios_projeto_tarefa_id_foreign` (`projeto_tarefa_id`),
KEY `comentarios_plano_entrega_entrega_id_foreign` (`plano_entrega_entrega_id`),
CONSTRAINT `comentarios_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `comentarios_atividade_tarefa_id_foreign` FOREIGN KEY (`atividade_tarefa_id`) REFERENCES `atividades_tarefas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `comentarios_comentario_pai_id_foreign` FOREIGN KEY (`comentario_pai_id`) REFERENCES `comentarios` (`id`) ON UPDATE CASCADE,
CONSTRAINT `comentarios_plano_entrega_entrega_id_foreign` FOREIGN KEY (`plano_entrega_entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `comentarios_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `comentarios_projeto_tarefa_id_foreign` FOREIGN KEY (`projeto_tarefa_id`) REFERENCES `projetos_tarefas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `comentarios_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| okr_objetivo_resultado_chave_id | char(36) | NO | MUL | NULL |
| entrega_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| texto | text | NO |  | NULL |
| path | text | YES |  | NULL |
| data_comentario | datetime | NO |  | NULL |
| tipo | enum('COMENTARIO','TECNICO','GERENCIAL','AVALIACAO','TAREFA','ATIVIDADE','TIPO_ATIVIDADE') | NO |  | COMENTARIO |
| privacidade | enum('PUBLICO','PRIVADO') | NO |  | PUBLICO |
| usuario_id | char(36) | NO | MUL | NULL |
| comentario_pai_id | char(36) | YES | MUL | NULL |
| atividade_id | char(36) | YES | MUL | NULL |
| atividade_tarefa_id | char(36) | YES | MUL | NULL |
| projeto_id | char(36) | YES | MUL | NULL |
| projeto_tarefa_id | char(36) | YES | MUL | NULL |
| plano_entrega_entrega_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_entregas_entregas_resultados_chaves	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_resultados_chaves	1	fk_plan_entr_entr_okr_id_resultado_chave	1	okr_objetivo_resultado_chave_id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_resultados_chaves	1	fk_plan_ent_ent_id_plan_entr_entr_okr_id	1	entrega_id	A	0	NULL	NULL		BTREE			NO
```

---

## planos_trabalhos

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
comentarios	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
comentarios	1	comentarios_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
comentarios	1	comentarios_comentario_pai_id_foreign	1	comentario_pai_id	A	0	NULL	NULL	YES	BTREE			NO
comentarios	1	comentarios_atividade_id_foreign	1	atividade_id	A	0	NULL	NULL	YES	BTREE			NO
comentarios	1	comentarios_atividade_tarefa_id_foreign	1	atividade_tarefa_id	A	0	NULL	NULL	YES	BTREE			NO
comentarios	1	comentarios_projeto_id_foreign	1	projeto_id	A	0	NULL	NULL	YES	BTREE			NO
comentarios	1	comentarios_projeto_tarefa_id_foreign	1	projeto_tarefa_id	A	0	NULL	NULL	YES	BTREE			NO
comentarios	1	comentarios_plano_entrega_entrega_id_foreign	1	plano_entrega_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## comparecimentos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`carga_horaria` double(8,2) NOT NULL DEFAULT 0.00 COMMENT 'Carga horária diária do usuário',
`tempo_total` double(8,2) NOT NULL DEFAULT 0.00 COMMENT 'Horas úteis de trabalho no período de data_inicio à data_fim considerando carga_horaria, feriados, fins de semana',
`tempo_proporcional` double(8,2) NOT NULL DEFAULT 0.00 COMMENT 'tempo_total menos os afastamentos',
`numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número do plano de trabalho (Gerado pelo sistema)',
`data_inicio` datetime NOT NULL COMMENT 'Inicio do plano de trabalho',
`data_fim` datetime NOT NULL COMMENT 'Fim do plano de trabalho',
`data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento do plano de trabalho',
`forma_contagem_carga_horaria` enum('DIA','SEMANA','MES') NOT NULL DEFAULT 'DIA' COMMENT 'Forma de contagem padrão da carga horária',
`status` enum('INCLUIDO','AGUARDANDO_ASSINATURA','ATIVO','CONCLUIDO','AVALIADO','SUSPENSO','CANCELADO') NOT NULL DEFAULT 'INCLUIDO' COMMENT 'Status atual do plano de trabalho',
`programa_id` char(36) NOT NULL,
`usuario_id` char(36) NOT NULL,
`unidade_id` char(36) NOT NULL,
`tipo_modalidade_id` char(36) NOT NULL,
`criacao_usuario_id` char(36) NOT NULL,
`documento_id` char(36) DEFAULT NULL,
`criterios_avaliacao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT json_array() COMMENT 'Critérios para avaliação' CHECK (json_valid(`criterios_avaliacao`)),
`data_envio_api_pgd` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `planos_trabalhos_numero_unique` (`numero`),
KEY `planos_trabalhos_programa_id_foreign` (`programa_id`),
KEY `planos_trabalhos_usuario_id_foreign` (`usuario_id`),
KEY `planos_trabalhos_unidade_id_foreign` (`unidade_id`),
KEY `planos_trabalhos_tipo_modalidade_id_foreign` (`tipo_modalidade_id`),
KEY `planos_trabalhos_criacao_usuario_id_foreign` (`criacao_usuario_id`),
KEY `planos_trabalhos_documento_id_foreign` (`documento_id`),
CONSTRAINT `planos_trabalhos_criacao_usuario_id_foreign` FOREIGN KEY (`criacao_usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_programa_id_foreign` FOREIGN KEY (`programa_id`) REFERENCES `programas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_tipo_modalidade_id_foreign` FOREIGN KEY (`tipo_modalidade_id`) REFERENCES `tipos_modalidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_comparecimento` date NOT NULL COMMENT 'Data do comparecimento',
`detalhamento` varchar(255) NOT NULL COMMENT 'Detalhamento do comparecimento',
`plano_trabalho_consolidacao_id` char(36) NOT NULL,
`unidade_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `comparecimentos_plano_trabalho_consolidacao_id_foreign` (`plano_trabalho_consolidacao_id`),
KEY `comparecimentos_unidade_id_foreign` (`unidade_id`),
CONSTRAINT `comparecimentos_plano_trabalho_consolidacao_id_foreign` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `comparecimentos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| carga_horaria | double(8,2) | NO |  | 0.00 |
| tempo_total | double(8,2) | NO |  | 0.00 |
| tempo_proporcional | double(8,2) | NO |  | 0.00 |
| numero | int(11) | NO | UNI | 0 |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | NO |  | NULL |
| data_arquivamento | datetime | YES |  | NULL |
| forma_contagem_carga_horaria | enum('DIA','SEMANA','MES') | NO |  | DIA |
| status | enum('INCLUIDO','AGUARDANDO_ASSINATURA','ATIVO','CONCLUIDO','AVALIADO','SUSPENSO','CANCELADO') | NO |  | INCLUIDO |
| programa_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | NO | MUL | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| tipo_modalidade_id | char(36) | NO | MUL | NULL |
| criacao_usuario_id | char(36) | NO | MUL | NULL |
| documento_id | char(36) | YES | MUL | NULL |
| criterios_avaliacao | longtext | NO |  | json_array() |
| data_envio_api_pgd | timestamp | YES |  | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_comparecimento | date | NO |  | NULL |
| detalhamento | varchar(255) | NO |  | NULL |
| plano_trabalho_consolidacao_id | char(36) | NO | MUL | NULL |
| unidade_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_trabalhos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos	0	planos_trabalhos_numero_unique	1	numero	A	0	NULL	NULL		BTREE			NO
planos_trabalhos	1	planos_trabalhos_programa_id_foreign	1	programa_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos	1	planos_trabalhos_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos	1	planos_trabalhos_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos	1	planos_trabalhos_tipo_modalidade_id_foreign	1	tipo_modalidade_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos	1	planos_trabalhos_criacao_usuario_id_foreign	1	criacao_usuario_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos	1	planos_trabalhos_documento_id_foreign	1	documento_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## planos_trabalhos_consolidacoes

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
comparecimentos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
comparecimentos	1	comparecimentos_plano_trabalho_consolidacao_id_foreign	1	plano_trabalho_consolidacao_id	A	0	NULL	NULL		BTREE			NO
comparecimentos	1	comparecimentos_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
```

---

## curriculuns

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_inicio` date NOT NULL COMMENT 'Data inicial da consolidacão',
`data_fim` date NOT NULL COMMENT 'Data final da consolidação',
`data_conclusao` datetime DEFAULT NULL COMMENT 'Data da conclusão (usado como referência para o snapshot das atividades)',
`status` enum('INCLUIDO','CONCLUIDO','AVALIADO') NOT NULL DEFAULT 'INCLUIDO' COMMENT 'Status atual da consolidação',
`plano_trabalho_id` char(36) NOT NULL,
`avaliacao_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `planos_trabalhos_consolidacoes_plano_trabalho_id_foreign` (`plano_trabalho_id`),
KEY `planos_trabalhos_consolidacoes_avaliacao_id_foreign` (`avaliacao_id`),
CONSTRAINT `planos_trabalhos_consolidacoes_avaliacao_id_foreign` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_consolidacoes_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`apresentacao` longtext NOT NULL COMMENT 'Apresentação',
`telefone` varchar(64) NOT NULL COMMENT 'Telefone',
`idiomas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Idiomas que fala' CHECK (json_valid(`idiomas`)),
`estado_civil` varchar(64) DEFAULT NULL COMMENT 'Estado Civil',
`quantidade_filhos` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Qtde de filhos',
`ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Curriculum ativa ou inativa',
`usuario_id` char(36) NOT NULL,
`cidade_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `curriculums_usuario_id_foreign` (`usuario_id`),
KEY `curriculums_cidade_id_foreign` (`cidade_id`),
CONSTRAINT `curriculums_cidade_id_foreign` FOREIGN KEY (`cidade_id`) REFERENCES `cidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `curriculums_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_inicio | date | NO |  | NULL |
| data_fim | date | NO |  | NULL |
| data_conclusao | datetime | YES |  | NULL |
| status | enum('INCLUIDO','CONCLUIDO','AVALIADO') | NO |  | INCLUIDO |
| plano_trabalho_id | char(36) | NO | MUL | NULL |
| avaliacao_id | char(36) | YES | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| apresentacao | longtext | NO |  | NULL |
| telefone | varchar(64) | NO |  | NULL |
| idiomas | longtext | YES |  | NULL |
| estado_civil | varchar(64) | YES |  | NULL |
| quantidade_filhos | tinyint(4) | NO |  | 0 |
| ativo | tinyint(4) | NO |  | 1 |
| usuario_id | char(36) | NO | MUL | NULL |
| cidade_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_trabalhos_consolidacoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_consolidacoes	1	planos_trabalhos_consolidacoes_plano_trabalho_id_foreign	1	plano_trabalho_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_consolidacoes	1	planos_trabalhos_consolidacoes_avaliacao_id_foreign	1	avaliacao_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## planos_trabalhos_consolidacoes_afastamentos

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
curriculuns	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
curriculuns	1	curriculums_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
curriculuns	1	curriculums_cidade_id_foreign	1	cidade_id	A	0	NULL	NULL		BTREE			NO
```

---

## curriculuns_graduacoes

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`snapshot` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snapshot do registro de atividades' CHECK (json_valid(`snapshot`)),
`data_conclusao` datetime NOT NULL COMMENT 'Data e hora da conclusao',
`plano_trabalho_consolidacao_id` char(36) DEFAULT NULL COMMENT 'Consolidação do Plano de Trabalho à qual se refere o status',
`afastamento_id` char(36) DEFAULT NULL COMMENT 'Atividade à qual se refere o status',
PRIMARY KEY (`id`),
KEY `fk_plan_trb_cons_afst_id_plan_trb_cons_id` (`plano_trabalho_consolidacao_id`),
KEY `fk_afastamentos_afst_id_afastamentos_id` (`afastamento_id`),
CONSTRAINT `fk_afastamentos_afst_id_afastamentos_id` FOREIGN KEY (`afastamento_id`) REFERENCES `afastamentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_plan_trb_cons_afst_id_plan_trb_cons_id` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`pretensao` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Pretende fazer o curso',
`curriculum_id` char(36) NOT NULL,
`curso_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `curriculums_graduacoes_curriculum_id_foreign` (`curriculum_id`),
KEY `curriculums_graduacoes_curso_id_foreign` (`curso_id`),
CONSTRAINT `curriculums_graduacoes_curriculum_id_foreign` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculuns` (`id`) ON UPDATE CASCADE,
CONSTRAINT `curriculums_graduacoes_curso_id_foreign` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| snapshot | longtext | NO |  | NULL |
| data_conclusao | datetime | NO |  | NULL |
| plano_trabalho_consolidacao_id | char(36) | YES | MUL | NULL |
| afastamento_id | char(36) | YES | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| pretensao | tinyint(4) | NO |  | 0 |
| curriculum_id | char(36) | NO | MUL | NULL |
| curso_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_trabalhos_consolidacoes_afastamentos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_consolidacoes_afastamentos	1	fk_plan_trb_cons_afst_id_plan_trb_cons_id	1	plano_trabalho_consolidacao_id	A	0	NULL	NULL	YES	BTREE			NO
planos_trabalhos_consolidacoes_afastamentos	1	fk_afastamentos_afst_id_afastamentos_id	1	afastamento_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## planos_trabalhos_consolidacoes_atividades

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
curriculuns_graduacoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
curriculuns_graduacoes	1	curriculums_graduacoes_curriculum_id_foreign	1	curriculum_id	A	0	NULL	NULL		BTREE			NO
curriculuns_graduacoes	1	curriculums_graduacoes_curso_id_foreign	1	curso_id	A	0	NULL	NULL		BTREE			NO
```

---

## curriculuns_profissionais

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`snapshot` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snapshot do registro de atividades' CHECK (json_valid(`snapshot`)),
`data_conclusao` datetime NOT NULL COMMENT 'Data e hora da conclusao',
`plano_trabalho_consolidacao_id` char(36) DEFAULT NULL COMMENT 'Consolidação do Plano de Trabalho à qual se refere o status',
`atividade_id` char(36) DEFAULT NULL COMMENT 'Atividade à qual se refere o status',
PRIMARY KEY (`id`),
KEY `fk_plan_trb_cons_id_plan_trb_cons_id` (`plano_trabalho_consolidacao_id`),
KEY `fk_atividades_id_atividades_id` (`atividade_id`),
CONSTRAINT `fk_atividades_id_atividades_id` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_plan_trb_cons_id_plan_trb_cons_id` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`ano_ingresso` int(11) NOT NULL DEFAULT 0 COMMENT 'Ano de ingresso',
`lotacao_atual` varchar(255) DEFAULT NULL COMMENT 'Lotação atual',
`especifique_habilidades` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Especifique suas habilidades: (Ex: Desenvolvo em JavaScript)' CHECK (json_valid(`especifique_habilidades`)),
`viagem_nacional` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Já fez viagem nacional a trabalho',
`viagem_internacional` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Já fez viagem internacional a trabalho',
`interesse_bnt` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Você tem interesse na participação do Banco Nacional de Talentos',
`pgd_inserido` varchar(255) DEFAULT NULL COMMENT 'Você está inserido no programa de gestão da Instituição',
`pgd_interesse` varchar(255) DEFAULT NULL COMMENT 'Você tem interesse em participar do programa de gestão da Instituição',
`telefone` varchar(64) DEFAULT NULL COMMENT 'Telefone do chefe imediato',
`remocao` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Você tem interesse em remoção',
`curriculum_id` char(36) NOT NULL,
`centro_treinamento_id` char(36) DEFAULT NULL COMMENT '(DC2Type:guid)',
`cargo_id` char(36) NOT NULL,
`grupo_especializado_id` char(36) DEFAULT NULL COMMENT '(DC2Type:guid)',
PRIMARY KEY (`id`),
KEY `curriculums_profissionais_curriculum_id_foreign` (`curriculum_id`),
KEY `curriculums_profissionais_centro_treinamento_id_foreign` (`centro_treinamento_id`),
KEY `curriculums_profissionais_cargo_id_foreign` (`cargo_id`),
KEY `curriculums_profissionais_grupo_especializado_id_foreign` (`grupo_especializado_id`),
CONSTRAINT `curriculums_profissionais_cargo_id_foreign` FOREIGN KEY (`cargo_id`) REFERENCES `cargos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `curriculums_profissionais_centro_treinamento_id_foreign` FOREIGN KEY (`centro_treinamento_id`) REFERENCES `centros_treinamentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `curriculums_profissionais_curriculum_id_foreign` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculuns` (`id`) ON UPDATE CASCADE,
CONSTRAINT `curriculums_profissionais_grupo_especializado_id_foreign` FOREIGN KEY (`grupo_especializado_id`) REFERENCES `grupos_especializados` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| snapshot | longtext | NO |  | NULL |
| data_conclusao | datetime | NO |  | NULL |
| plano_trabalho_consolidacao_id | char(36) | YES | MUL | NULL |
| atividade_id | char(36) | YES | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| ano_ingresso | int(11) | NO |  | 0 |
| lotacao_atual | varchar(255) | YES |  | NULL |
| especifique_habilidades | longtext | YES |  | NULL |
| viagem_nacional | tinyint(4) | NO |  | 0 |
| viagem_internacional | tinyint(4) | NO |  | 0 |
| interesse_bnt | tinyint(4) | NO |  | 0 |
| pgd_inserido | varchar(255) | YES |  | NULL |
| pgd_interesse | varchar(255) | YES |  | NULL |
| telefone | varchar(64) | YES |  | NULL |
| remocao | tinyint(4) | NO |  | 0 |
| curriculum_id | char(36) | NO | MUL | NULL |
| centro_treinamento_id | char(36) | YES | MUL | NULL |
| cargo_id | char(36) | NO | MUL | NULL |
| grupo_especializado_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_trabalhos_consolidacoes_atividades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_consolidacoes_atividades	1	fk_plan_trb_cons_id_plan_trb_cons_id	1	plano_trabalho_consolidacao_id	A	0	NULL	NULL	YES	BTREE			NO
planos_trabalhos_consolidacoes_atividades	1	fk_atividades_id_atividades_id	1	atividade_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## planos_trabalhos_consolidacoes_ocorrencias

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
curriculuns_profissionais	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
curriculuns_profissionais	1	curriculums_profissionais_curriculum_id_foreign	1	curriculum_id	A	0	NULL	NULL		BTREE			NO
curriculuns_profissionais	1	curriculums_profissionais_centro_treinamento_id_foreign	1	centro_treinamento_id	A	0	NULL	NULL	YES	BTREE			NO
curriculuns_profissionais	1	curriculums_profissionais_cargo_id_foreign	1	cargo_id	A	0	NULL	NULL		BTREE			NO
curriculuns_profissionais	1	curriculums_profissionais_grupo_especializado_id_foreign	1	grupo_especializado_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## cursos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`plano_trabalho_consolidacao_id` char(36) NOT NULL COMMENT 'Consolidação do Plano de Trabalho à qual está associada esta entrega',
`snapshot` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snapshot do registro de atividades' CHECK (json_valid(`snapshot`)),
`data_conclusao` datetime NOT NULL COMMENT 'Data e hora da conclusao',
`ocorrencia_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `fk_plan_trab_cons_id_plan_trab_cons_ocor_id` (`plano_trabalho_consolidacao_id`),
KEY `planos_trabalhos_consolidacoes_ocorrencias_ocorrencia_id_foreign` (`ocorrencia_id`),
CONSTRAINT `fk_plan_trab_cons_id_plan_trab_cons_ocor_id` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_consolidacoes_ocorrencias_ocorrencia_id_foreign` FOREIGN KEY (`ocorrencia_id`) REFERENCES `ocorrencias` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do curso',
`titulo` varchar(64) NOT NULL COMMENT 'Titulação do curso->Graduação, Pos, etc',
`ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Curso ativo ou inativo',
`area_id` char(36) NOT NULL,
`tipo_curso_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `cursos_area_id_foreign` (`area_id`),
KEY `cursos_tipo_curso_id_foreign` (`tipo_curso_id`),
CONSTRAINT `cursos_area_id_foreign` FOREIGN KEY (`area_id`) REFERENCES `areas_conhecimentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `cursos_tipo_curso_id_foreign` FOREIGN KEY (`tipo_curso_id`) REFERENCES `tipos_cursos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| plano_trabalho_consolidacao_id | char(36) | NO | MUL | NULL |
| snapshot | longtext | NO |  | NULL |
| data_conclusao | datetime | NO |  | NULL |
| ocorrencia_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| titulo | varchar(64) | NO |  | NULL |
| ativo | tinyint(4) | NO |  | 1 |
| area_id | char(36) | NO | MUL | NULL |
| tipo_curso_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_trabalhos_consolidacoes_ocorrencias	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_consolidacoes_ocorrencias	1	fk_plan_trab_cons_id_plan_trab_cons_ocor_id	1	plano_trabalho_consolidacao_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_consolidacoes_ocorrencias	1	planos_trabalhos_consolidacoes_ocorrencias_ocorrencia_id_foreign	1	ocorrencia_id	A	0	NULL	NULL		BTREE			NO
```

---

## planos_trabalhos_entregas

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
cursos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
cursos	1	cursos_area_id_foreign	1	area_id	A	0	NULL	NULL		BTREE			NO
cursos	1	cursos_tipo_curso_id_foreign	1	tipo_curso_id	A	0	NULL	NULL		BTREE			NO
```

---

## disciplinas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`forca_trabalho` decimal(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Percentual da força de trabalho associado a esta entrega',
`meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Meta para a entrega' CHECK (json_valid(`meta`)),
`orgao` varchar(256) DEFAULT NULL COMMENT 'Órgão externo',
`descricao` text NOT NULL,
`plano_trabalho_id` char(36) NOT NULL,
`plano_entrega_entrega_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `planos_trabalhos_entregas_plano_trabalho_id_foreign` (`plano_trabalho_id`),
KEY `planos_trabalhos_entregas_plano_entrega_entrega_id_foreign` (`plano_entrega_entrega_id`),
CONSTRAINT `planos_trabalhos_entregas_plano_entrega_entrega_id_foreign` FOREIGN KEY (`plano_entrega_entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_entregas_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do curso',
`ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Curso ativo ou inativo',
`sigla` varchar(20) DEFAULT NULL COMMENT 'Sigla da disciplina.',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| forca_trabalho | decimal(5,2) | NO |  | 0.00 |
| meta | longtext | YES |  | NULL |
| orgao | varchar(256) | YES |  | NULL |
| descricao | text | NO |  | NULL |
| plano_trabalho_id | char(36) | NO | MUL | NULL |
| plano_entrega_entrega_id | char(36) | YES | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| ativo | tinyint(4) | NO |  | 1 |
| sigla | varchar(20) | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_trabalhos_entregas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_entregas	1	planos_trabalhos_entregas_plano_trabalho_id_foreign	1	plano_trabalho_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_entregas	1	planos_trabalhos_entregas_plano_entrega_entrega_id_foreign	1	plano_entrega_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## produto_clientes

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
disciplinas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## documentos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`produto_id` char(36) NOT NULL,
`cliente_id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `produto_clientes_produto_id_foreign` (`produto_id`),
KEY `produto_clientes_cliente_id_foreign` (`cliente_id`),
CONSTRAINT `produto_clientes_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
CONSTRAINT `produto_clientes_produto_id_foreign` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número do documento (Gerado pelo sistema)',
`titulo` varchar(256) NOT NULL COMMENT 'Titulo do documento',
`tipo` enum('HTML','PDF','LINK','REPORT') DEFAULT NULL,
`especie` enum('SEI','TCR','OUTRO','NOTIFICACAO','RELATORIO') DEFAULT NULL,
`conteudo` longtext DEFAULT NULL COMMENT 'Conteúdo do arquivo',
`metadados` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Metadados' CHECK (json_valid(`metadados`)),
`link` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Informações sobre o link, caso o tipo seja LINK' CHECK (json_valid(`link`)),
`status` enum('GERADO','AGUARDANDO_SEI') NOT NULL DEFAULT 'GERADO' COMMENT 'Status do documento: GERADO (documento gerado); AGUARDANDO_SEI (Aguardando abrir o documento no sei para colar o conteúdo dentro)',
`template` longtext DEFAULT NULL COMMENT 'Campo de Template',
`dataset` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Definição das variáveis disponíveis para o template' CHECK (json_valid(`dataset`)),
`datasource` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Conjunto de dados do template' CHECK (json_valid(`datasource`)),
`template_id` char(36) DEFAULT NULL,
`entidade_id` char(36) DEFAULT NULL,
`plano_trabalho_id` char(36) DEFAULT NULL,
`tipo_documento_id` char(36) DEFAULT NULL,
`tipo_processo_id` char(36) DEFAULT NULL,
`atividade_id` char(36) DEFAULT NULL,
`atividade_tarefa_id` char(36) DEFAULT NULL,
`usuario_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `documentos_numero_unique` (`numero`),
KEY `documentos_template_id_foreign` (`template_id`),
KEY `documentos_entidade_id_foreign` (`entidade_id`),
KEY `documentos_plano_trabalho_id_foreign` (`plano_trabalho_id`),
KEY `documentos_tipo_documento_id_foreign` (`tipo_documento_id`),
KEY `documentos_tipo_processo_id_foreign` (`tipo_processo_id`),
KEY `documentos_atividade_id_foreign` (`atividade_id`),
KEY `documentos_atividade_tarefa_id_foreign` (`atividade_tarefa_id`),
KEY `documentos_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `documentos_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `documentos_atividade_tarefa_id_foreign` FOREIGN KEY (`atividade_tarefa_id`) REFERENCES `atividades_tarefas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `documentos_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `documentos_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `documentos_template_id_foreign` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON UPDATE CASCADE,
CONSTRAINT `documentos_tipo_documento_id_foreign` FOREIGN KEY (`tipo_documento_id`) REFERENCES `tipos_documentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `documentos_tipo_processo_id_foreign` FOREIGN KEY (`tipo_processo_id`) REFERENCES `tipos_processos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `documentos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| produto_id | char(36) | NO | MUL | NULL |
| cliente_id | char(36) | NO | MUL | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
produto_clientes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
produto_clientes	1	produto_clientes_produto_id_foreign	1	produto_id	A	0	NULL	NULL		BTREE			NO
produto_clientes	1	produto_clientes_cliente_id_foreign	1	cliente_id	A	0	NULL	NULL		BTREE			NO
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
```

---

## produto_processo_cadeia_valor

### Estrutura da Tabela

```sql
| deleted_at | timestamp | YES |  | NULL |
| numero | int(11) | NO | UNI | 0 |
| titulo | varchar(256) | NO |  | NULL |
| tipo | enum('HTML','PDF','LINK','REPORT') | YES |  | NULL |
| especie | enum('SEI','TCR','OUTRO','NOTIFICACAO','RELATORIO') | YES |  | NULL |
| conteudo | longtext | YES |  | NULL |
| metadados | longtext | YES |  | NULL |
| link | longtext | YES |  | NULL |
| status | enum('GERADO','AGUARDANDO_SEI') | NO |  | GERADO |
| template | longtext | YES |  | NULL |
| dataset | longtext | YES |  | NULL |
| datasource | longtext | YES |  | NULL |
| template_id | char(36) | YES | MUL | NULL |
| entidade_id | char(36) | YES | MUL | NULL |
| plano_trabalho_id | char(36) | YES | MUL | NULL |
| tipo_documento_id | char(36) | YES | MUL | NULL |
| tipo_processo_id | char(36) | YES | MUL | NULL |
| atividade_id | char(36) | YES | MUL | NULL |
| atividade_tarefa_id | char(36) | YES | MUL | NULL |
| usuario_id | char(36) | YES | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`produto_id` char(36) NOT NULL,
`cadeia_valor_processo_id` char(36) NOT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `produto_processo_cadeia_valor_produto_id_foreign` (`produto_id`),
KEY `produto_processo_cadeia_valor_cadeia_valor_processo_id_foreign` (`cadeia_valor_processo_id`),
CONSTRAINT `produto_processo_cadeia_valor_cadeia_valor_processo_id_foreign` FOREIGN KEY (`cadeia_valor_processo_id`) REFERENCES `cadeias_valores_processos` (`id`) ON DELETE CASCADE,
CONSTRAINT `produto_processo_cadeia_valor_produto_id_foreign` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
documentos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
documentos	0	documentos_numero_unique	1	numero	A	0	NULL	NULL		BTREE			NO
documentos	1	documentos_template_id_foreign	1	template_id	A	0	NULL	NULL	YES	BTREE			NO
documentos	1	documentos_entidade_id_foreign	1	entidade_id	A	0	NULL	NULL	YES	BTREE			NO
documentos	1	documentos_plano_trabalho_id_foreign	1	plano_trabalho_id	A	0	NULL	NULL	YES	BTREE			NO
documentos	1	documentos_tipo_documento_id_foreign	1	tipo_documento_id	A	0	NULL	NULL	YES	BTREE			NO
documentos	1	documentos_tipo_processo_id_foreign	1	tipo_processo_id	A	0	NULL	NULL	YES	BTREE			NO
documentos	1	documentos_atividade_id_foreign	1	atividade_id	A	0	NULL	NULL	YES	BTREE			NO
documentos	1	documentos_atividade_tarefa_id_foreign	1	atividade_tarefa_id	A	0	NULL	NULL	YES	BTREE			NO
documentos	1	documentos_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## documentos_assinaturas

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| produto_id | char(36) | NO | MUL | NULL |
| cadeia_valor_processo_id | char(36) | NO | MUL | NULL |
| deleted_at | timestamp | YES |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_assinatura` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Data hora da assinatura',
`assinatura` text NOT NULL COMMENT 'Hash da assinatura',
`documento_id` char(36) NOT NULL,
`usuario_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `documentos_assinaturas_documento_id_foreign` (`documento_id`),
KEY `documentos_assinaturas_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `documentos_assinaturas_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `documentos_assinaturas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
produto_processo_cadeia_valor	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
produto_processo_cadeia_valor	1	produto_processo_cadeia_valor_produto_id_foreign	1	produto_id	A	0	NULL	NULL		BTREE			NO
produto_processo_cadeia_valor	1	produto_processo_cadeia_valor_cadeia_valor_processo_id_foreign	1	cadeia_valor_processo_id	A	0	NULL	NULL		BTREE			NO
```

---

## produto_produto

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_assinatura | datetime | NO |  | current_timestamp() |
| assinatura | text | NO |  | NULL |
| documento_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | NO | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`produto_base_id` char(36) NOT NULL,
`produto_id` char(36) NOT NULL,
`tipo` enum('input','output') NOT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `produto_produto_produto_base_id_produto_id_unique` (`produto_base_id`,`produto_id`),
KEY `produto_produto_produto_id_foreign` (`produto_id`),
CONSTRAINT `produto_produto_produto_base_id_foreign` FOREIGN KEY (`produto_base_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE,
CONSTRAINT `produto_produto_produto_id_foreign` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
documentos_assinaturas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
documentos_assinaturas	1	documentos_assinaturas_documento_id_foreign	1	documento_id	A	0	NULL	NULL		BTREE			NO
documentos_assinaturas	1	documentos_assinaturas_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
```

---

## eixos_tematicos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| produto_base_id | char(36) | NO | MUL | NULL |
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do eixo temático',
`icone` varchar(100) NOT NULL COMMENT 'Classe CSS do icone relacionado ao eixo temático',
`cor` varchar(100) NOT NULL COMMENT 'Código HEX da cor relacionada ao eixo temático',
`descricao` text DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| produto_id | char(36) | NO | MUL | NULL |
| tipo | enum('input','output') | NO |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
produto_produto	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
produto_produto	0	produto_produto_produto_base_id_produto_id_unique	1	produto_base_id	A	0	NULL	NULL		BTREE			NO
produto_produto	0	produto_produto_produto_base_id_produto_id_unique	2	produto_id	A	0	NULL	NULL		BTREE			NO
produto_produto	1	produto_produto_produto_id_foreign	1	produto_id	A	0	NULL	NULL		BTREE			NO
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
```

---

## produtos

### Estrutura da Tabela

```sql
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| icone | varchar(100) | NO |  | NULL |
| cor | varchar(100) | NO |  | NULL |
| descricao | text | YES |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`nome` varchar(100) NOT NULL,
`nome_fantasia` varchar(255) DEFAULT NULL,
`tipo` enum('produto','servico') NOT NULL,
`descricao` varchar(255) NOT NULL,
`url` text DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`unidade_id` char(36) NOT NULL,
`data_ativado` timestamp NULL DEFAULT NULL,
`data_desativado` timestamp NULL DEFAULT NULL,
`identificador` bigint(20) unsigned NOT NULL,
PRIMARY KEY (`id`),
KEY `produtos_unidade_id_foreign` (`unidade_id`),
CONSTRAINT `produtos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
eixos_tematicos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## entidades

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| nome | varchar(100) | NO |  | NULL |
| nome_fantasia | varchar(255) | YES |  | NULL |
| tipo | enum('produto','servico') | NO |  | NULL |
| descricao | varchar(255) | NO |  | NULL |
| url | text | YES |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| data_ativado | timestamp | YES |  | NULL |
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`sigla` varchar(100) NOT NULL COMMENT 'Sigla da entidade',
`nome` varchar(256) NOT NULL COMMENT 'Nome da entidade',
`abrangencia` enum('NACIONAL','ESTADUAL','MUNICIPAL') NOT NULL COMMENT 'Abrangência da entidade',
`codigo_ibge` varchar(8) DEFAULT NULL COMMENT 'Código da UF ou do município (IBGE)',
`uf` varchar(2) DEFAULT NULL COMMENT 'UF para feriados estaduais',
`carga_horaria_padrao` int(11) NOT NULL DEFAULT 8 COMMENT 'Carga horária utilizada ao criar plano de trabalho',
`gravar_historico_processo` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se grava andamento da atividade dentro do processo vinculado (Caso seja o SEI, será em Consultar Andamento)',
`layout_formulario_atividade` enum('COMPLETO','SIMPLIFICADO') NOT NULL DEFAULT 'COMPLETO' COMMENT 'Layout para a tela do formulário de atividades (cadastro simplificado ou completo)',
`campos_ocultos_atividade` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Campos que se deseja ocultar do formulário de atividade, com seu respectivo valor padrão, em caso de NULL será utilizado o valor default do banco' CHECK (json_valid(`campos_ocultos_atividade`)),
`nomenclatura` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Nomenclatura utilizada no sistema' CHECK (json_valid(`nomenclatura`)),
`notificacoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)' CHECK (json_valid(`notificacoes`)),
`forma_contagem_carga_horaria` enum('DIA','SEMANA','MES') NOT NULL DEFAULT 'DIA' COMMENT 'Forma de contagem padrão da carga horária',
`expediente` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{"domingo":[],"segunda":[],"terca":[],"quarta":[],"quinta":[],"sexta":[],"sabado":[],"especial":[]}' COMMENT 'Configuração de expediente' CHECK (json_valid(`expediente`)),
`tipo_modalidade_id` char(36) DEFAULT NULL,
`cidade_id` char(36) DEFAULT NULL,
`gestor_id` char(36) DEFAULT NULL,
`gestor_substituto_id` char(36) DEFAULT NULL,
`email_responsavel_siape` varchar(100) NOT NULL,
`email_remetente_siape` varchar(100) NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `entidades_sigla_unique` (`sigla`),
KEY `entidades_tipo_modalidade_id_foreign` (`tipo_modalidade_id`),
KEY `entidades_cidade_id_foreign` (`cidade_id`),
KEY `entidades_gestor_id_foreign` (`gestor_id`),
KEY `entidades_gestor_substituto_id_foreign` (`gestor_substituto_id`),
CONSTRAINT `entidades_cidade_id_foreign` FOREIGN KEY (`cidade_id`) REFERENCES `cidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `entidades_gestor_id_foreign` FOREIGN KEY (`gestor_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
CONSTRAINT `entidades_gestor_substituto_id_foreign` FOREIGN KEY (`gestor_substituto_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
CONSTRAINT `entidades_tipo_modalidade_id_foreign` FOREIGN KEY (`tipo_modalidade_id`) REFERENCES `tipos_modalidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
| data_desativado | timestamp | YES |  | NULL |
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| identificador | bigint(20) unsigned | NO |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
produtos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
produtos	1	produtos_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
```

---

## programas

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| sigla | varchar(100) | NO | UNI | NULL |
| nome | varchar(256) | NO |  | NULL |
| abrangencia | enum('NACIONAL','ESTADUAL','MUNICIPAL') | NO |  | NULL |
| codigo_ibge | varchar(8) | YES |  | NULL |
| uf | varchar(2) | YES |  | NULL |
| carga_horaria_padrao | int(11) | NO |  | 8 |
| gravar_historico_processo | tinyint(4) | NO |  | 0 |
| layout_formulario_atividade | enum('COMPLETO','SIMPLIFICADO') | NO |  | COMPLETO |
| campos_ocultos_atividade | longtext | YES |  | NULL |
| nomenclatura | longtext | YES |  | NULL |
| notificacoes | longtext | YES |  | NULL |
| forma_contagem_carga_horaria | enum('DIA','SEMANA','MES') | NO |  | DIA |
| expediente | longtext | NO |  | '{"domingo":[],"segunda":[],"terca":[],"quarta":[],"quinta":[],"sexta":[],"sabado":[],"especial":[]}' |
| tipo_modalidade_id | char(36) | YES | MUL | NULL |
| cidade_id | char(36) | YES | MUL | NULL |
| gestor_id | char(36) | YES | MUL | NULL |
| gestor_substituto_id | char(36) | YES | MUL | NULL |
| email_responsavel_siape | varchar(100) | NO |  | NULL |
| email_remetente_siape | varchar(100) | NO |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(255) NOT NULL COMMENT 'Nome do programa',
`normativa` varchar(255) DEFAULT NULL COMMENT 'Normativa que regula o programa de gestão',
`prazo_max_plano_entrega` int(11) NOT NULL COMMENT 'Limite máximo de dias corridos para o plano de entregas (Zero para não limitar)',
`termo_obrigatorio` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o termo é ou não obrigatório',
`config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações do programa' CHECK (json_valid(`config`)),
`data_inicio` datetime NOT NULL COMMENT 'Inicio da vigência do programa',
`data_fim` datetime NOT NULL COMMENT 'Fim da vigência do programa',
`periodicidade_consolidacao` enum('DIAS','SEMANAL','QUINZENAL','MENSAL','BIMESTRAL','TRIMESTRAL','SEMESTRAL') NOT NULL DEFAULT 'MENSAL' COMMENT 'Período para avaliação do plano de trabalho',
`periodicidade_valor` int(11) NOT NULL DEFAULT 1 COMMENT 'Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do mês para o restante',
`dias_tolerancia_consolidacao` int(11) NOT NULL DEFAULT 10 COMMENT 'Dias de tolerância para o lançamento do registro das atividades na consolidação, após esses dias será liberado automaticamente para avaliação',
`dias_tolerancia_avaliacao` int(11) NOT NULL DEFAULT 20 COMMENT 'Dias de tolerância para realizar a avaliação, considerando a tolerância da consolidação. Caso seja zero não fará nada, caso contrário após esse prazo a consolidação será automaticamente avaliada com a nota padrão',
`dias_tolerancia_recurso_avaliacao` int(11) NOT NULL DEFAULT 20 COMMENT 'Dias de tolerância para recorrer da avaliação',
`nota_padrao_avaliacao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Nota padrão de avaliação, para quando o gestor não realizar a avaliação dentro do prazo' CHECK (json_valid(`nota_padrao_avaliacao`)),
`checklist_avaliacao_entregas_plano_entrega` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Checklist para avaliar das entregas do plano de entrega' CHECK (json_valid(`checklist_avaliacao_entregas_plano_entrega`)),
`checklist_avaliacao_entregas_plano_trabalho` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Checklist para avaliar das entregas do plano de trabalho' CHECK (json_valid(`checklist_avaliacao_entregas_plano_trabalho`)),
`registra_comparecimento` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se utiliza registro de comparecimento nas consolidações do plano de trabalho',
`plano_trabalho_assinatura_participante` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Exigir assinatura do usuário no plano de trabalho',
`plano_trabalho_assinatura_gestor_lotacao` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Exigir assinatura do gestor da unidade de lotação do servidor',
`plano_trabalho_assinatura_gestor_unidade` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Exigir assinatura do gestor da unidade executora do plano de trabalho',
`plano_trabalho_assinatura_gestor_entidade` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Exigir assinatura do gestor da entidade do plano de trabalho',
`tipo_avaliacao_plano_trabalho_id` char(36) NOT NULL,
`tipo_avaliacao_plano_entrega_id` char(36) NOT NULL,
`tipo_justificativa_id` char(36) DEFAULT NULL,
`unidade_id` char(36) NOT NULL,
`template_tcr_id` char(36) DEFAULT NULL,
`tipo_documento_tcr_id` char(36) DEFAULT NULL,
`documento_id` char(36) DEFAULT NULL,
`plano_trabalho_criterios_avaliacao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT json_array() COMMENT 'Critérios para avaliação do plano de trabalho' CHECK (json_valid(`plano_trabalho_criterios_avaliacao`)),
`link_normativa` varchar(255) DEFAULT NULL COMMENT 'Link da normativa que regula o programa de gestão',
`unidade_autorizadora_id` char(36) DEFAULT NULL,
`link_autorizacao` varchar(255) DEFAULT NULL COMMENT 'Link da normativa que autoriza o programa de gestão',
PRIMARY KEY (`id`),
KEY `programas_tipo_avaliacao_plano_trabalho_id_foreign` (`tipo_avaliacao_plano_trabalho_id`),
KEY `programas_tipo_avaliacao_plano_entrega_id_foreign` (`tipo_avaliacao_plano_entrega_id`),
KEY `programas_tipo_justificativa_id_foreign` (`tipo_justificativa_id`),
KEY `programas_unidade_id_foreign` (`unidade_id`),
KEY `programas_template_tcr_id_foreign` (`template_tcr_id`),
KEY `programas_tipo_documento_tcr_id_foreign` (`tipo_documento_tcr_id`),
KEY `programas_documento_id_foreign` (`documento_id`),
KEY `programas_unidade_autorizadora_id_foreign` (`unidade_autorizadora_id`),
CONSTRAINT `programas_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `programas_template_tcr_id_foreign` FOREIGN KEY (`template_tcr_id`) REFERENCES `templates` (`id`) ON UPDATE CASCADE,
CONSTRAINT `programas_tipo_avaliacao_plano_entrega_id_foreign` FOREIGN KEY (`tipo_avaliacao_plano_entrega_id`) REFERENCES `tipos_avaliacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `programas_tipo_avaliacao_plano_trabalho_id_foreign` FOREIGN KEY (`tipo_avaliacao_plano_trabalho_id`) REFERENCES `tipos_avaliacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `programas_tipo_documento_tcr_id_foreign` FOREIGN KEY (`tipo_documento_tcr_id`) REFERENCES `tipos_documentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `programas_tipo_justificativa_id_foreign` FOREIGN KEY (`tipo_justificativa_id`) REFERENCES `tipos_justificativas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `programas_unidade_autorizadora_id_foreign` FOREIGN KEY (`unidade_autorizadora_id`) REFERENCES `unidades` (`id`),
CONSTRAINT `programas_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
entidades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
entidades	0	entidades_sigla_unique	1	sigla	A	0	NULL	NULL		BTREE			NO
entidades	1	entidades_tipo_modalidade_id_foreign	1	tipo_modalidade_id	A	0	NULL	NULL	YES	BTREE			NO
entidades	1	entidades_cidade_id_foreign	1	cidade_id	A	0	NULL	NULL	YES	BTREE			NO
entidades	1	entidades_gestor_id_foreign	1	gestor_id	A	0	NULL	NULL	YES	BTREE			NO
entidades	1	entidades_gestor_substituto_id_foreign	1	gestor_substituto_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## entregas

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(255) | NO |  | NULL |
| normativa | varchar(255) | YES |  | NULL |
| prazo_max_plano_entrega | int(11) | NO |  | NULL |
| termo_obrigatorio | tinyint(4) | NO |  | 1 |
| config | longtext | YES |  | NULL |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | NO |  | NULL |
| periodicidade_consolidacao | enum('DIAS','SEMANAL','QUINZENAL','MENSAL','BIMESTRAL','TRIMESTRAL','SEMESTRAL') | NO |  | MENSAL |
| periodicidade_valor | int(11) | NO |  | 1 |
| dias_tolerancia_consolidacao | int(11) | NO |  | 10 |
| dias_tolerancia_avaliacao | int(11) | NO |  | 20 |
| dias_tolerancia_recurso_avaliacao | int(11) | NO |  | 20 |
| nota_padrao_avaliacao | longtext | YES |  | NULL |
| checklist_avaliacao_entregas_plano_entrega | longtext | YES |  | NULL |
| checklist_avaliacao_entregas_plano_trabalho | longtext | YES |  | NULL |
| registra_comparecimento | tinyint(4) | NO |  | 1 |
| plano_trabalho_assinatura_participante | tinyint(4) | NO |  | 1 |
| plano_trabalho_assinatura_gestor_lotacao | tinyint(4) | NO |  | 0 |
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` text NOT NULL,
`descricao` text NOT NULL,
`tipo_indicador` enum('QUANTIDADE','VALOR','PORCENTAGEM','QUALITATIVO') NOT NULL COMMENT 'Tipo do indicador da entrega',
`lista_qualitativos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Lista de valores para entrega do tipo qualitativo' CHECK (json_valid(`lista_qualitativos`)),
`unidade_id` char(36) DEFAULT NULL,
`checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Checklist' CHECK (json_valid(`checklist`)),
`etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Etiquetas' CHECK (json_valid(`etiquetas`)),
PRIMARY KEY (`id`),
KEY `entregas_unidade_id_foreign` (`unidade_id`),
CONSTRAINT `entregas_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| plano_trabalho_assinatura_gestor_unidade | tinyint(4) | NO |  | 0 |
| plano_trabalho_assinatura_gestor_entidade | tinyint(4) | NO |  | 0 |
| tipo_avaliacao_plano_trabalho_id | char(36) | NO | MUL | NULL |
| tipo_avaliacao_plano_entrega_id | char(36) | NO | MUL | NULL |
| tipo_justificativa_id | char(36) | YES | MUL | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| template_tcr_id | char(36) | YES | MUL | NULL |
| tipo_documento_tcr_id | char(36) | YES | MUL | NULL |
| documento_id | char(36) | YES | MUL | NULL |
| plano_trabalho_criterios_avaliacao | longtext | YES |  | json_array() |
| link_normativa | varchar(255) | YES |  | NULL |
| unidade_autorizadora_id | char(36) | YES | MUL | NULL |
| link_autorizacao | varchar(255) | YES |  | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | text | NO |  | NULL |
| descricao | text | NO |  | NULL |
| tipo_indicador | enum('QUANTIDADE','VALOR','PORCENTAGEM','QUALITATIVO') | NO |  | NULL |
| lista_qualitativos | longtext | YES |  | NULL |
| unidade_id | char(36) | YES | MUL | NULL |
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
programas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
programas	1	programas_tipo_avaliacao_plano_trabalho_id_foreign	1	tipo_avaliacao_plano_trabalho_id	A	0	NULL	NULL		BTREE			NO
programas	1	programas_tipo_avaliacao_plano_entrega_id_foreign	1	tipo_avaliacao_plano_entrega_id	A	0	NULL	NULL		BTREE			NO
programas	1	programas_tipo_justificativa_id_foreign	1	tipo_justificativa_id	A	0	NULL	NULL	YES	BTREE			NO
programas	1	programas_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
programas	1	programas_template_tcr_id_foreign	1	template_tcr_id	A	0	NULL	NULL	YES	BTREE			NO
programas	1	programas_tipo_documento_tcr_id_foreign	1	tipo_documento_tcr_id	A	0	NULL	NULL	YES	BTREE			NO
programas	1	programas_documento_id_foreign	1	documento_id	A	0	NULL	NULL	YES	BTREE			NO
programas	1	programas_unidade_autorizadora_id_foreign	1	unidade_autorizadora_id	A	0	NULL	NULL	YES	BTREE			NO
| checklist | longtext | YES |  | NULL |
```

---

## programas_participantes

### Estrutura da Tabela

```sql
| etiquetas | longtext | YES |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`habilitado` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o participante está habilitado ou não para o programa',
`programa_id` char(36) NOT NULL,
`usuario_id` char(36) NOT NULL,
`documento_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `programas_participantes_programa_id_foreign` (`programa_id`),
KEY `programas_participantes_usuario_id_foreign` (`usuario_id`),
KEY `programas_participantes_documento_id_foreign` (`documento_id`),
CONSTRAINT `programas_participantes_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`),
CONSTRAINT `programas_participantes_programa_id_foreign` FOREIGN KEY (`programa_id`) REFERENCES `programas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `programas_participantes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
entregas	0	PRIMARY	1	id	A	1	NULL	NULL		BTREE			NO
entregas	1	entregas_unidade_id_foreign	1	unidade_id	A	1	NULL	NULL	YES	BTREE			NO
```

---

## favoritos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| habilitado | tinyint(4) | NO |  | 1 |
| programa_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | NO | MUL | NULL |
| documento_id | char(36) | YES | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações do favoritos' CHECK (json_valid(`config`)),
`usuario_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `favoritos_usuario_id_unique` (`usuario_id`),
CONSTRAINT `favoritos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
programas_participantes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
programas_participantes	1	programas_participantes_programa_id_foreign	1	programa_id	A	0	NULL	NULL		BTREE			NO
programas_participantes	1	programas_participantes_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
programas_participantes	1	programas_participantes_documento_id_foreign	1	documento_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## projetos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| config | longtext | YES |  | NULL |
| usuario_id | char(36) | NO | UNI | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número do projeto (Gerado pelo sistema)',
`nome` varchar(256) NOT NULL COMMENT 'Nome do projeto',
`descricao` varchar(256) NOT NULL COMMENT 'Descrição do projeto',
`finalidade` varchar(256) NOT NULL COMMENT 'Descrição do projeto',
`status` enum('PLANEJADO','INICIADO','CONCLUIDO','SUSPENSO','CANCELADO') NOT NULL COMMENT 'Status do projeto',
`data_inicio` datetime NOT NULL COMMENT 'Inicio do projeto',
`data_fim` datetime NOT NULL COMMENT 'Fim do projeto',
`data_inicio_baseline` datetime DEFAULT NULL COMMENT 'Inicio do projeto (Baseline)',
`data_fim_baseline` datetime DEFAULT NULL COMMENT 'Fim do projeto (Baseline)',
`custo` decimal(15,2) NOT NULL COMMENT 'Custo: Será a soma dos recursos, ou a soma dos filhos caso tem_filhos e soma_custos_filhos',
`calcula_custos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o projeto calcula custos',
`tempo_corrido` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se o tempo é corrido ou usa a configuração de fins de semana, feriados e horário do expediente (quando usar horas)',
`usa_baseline` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o projeto utiliza baseline',
`usa_horas` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se usa horas nas datas',
`calcula_intervalo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se calcula o início e término automaticamente pelos filhos',
`agrupador` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso)',
`soma_progresso_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos)',
`aloca_proprios_recursos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se possui recursos próprios',
`soma_recusos_alocados_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Mostra o somatório dos recursos filhos',
`custos_proprios` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se possui custos próprios',
`soma_custos_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Mostra o somatório dos custos filhos',
`duracao` double(8,2) NOT NULL COMMENT 'Duração do projeto',
`progresso` decimal(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Percentual de progresso do projeto',
`kanban_dockers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configuração das Labels das swimlanes do quadro Kanban' CHECK (json_valid(`kanban_dockers`)),
`expediente` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configuração de expediente' CHECK (json_valid(`expediente`)),
`usuario_id` char(36) DEFAULT NULL,
`tipo_projeto_id` char(36) DEFAULT NULL,
`fase_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `projetos_numero_unique` (`numero`),
KEY `projetos_usuario_id_foreign` (`usuario_id`),
KEY `projetos_tipo_projeto_id_foreign` (`tipo_projeto_id`),
KEY `projetos_fase_id_foreign` (`fase_id`),
CONSTRAINT `projetos_fase_id_foreign` FOREIGN KEY (`fase_id`) REFERENCES `projetos_fases` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_tipo_projeto_id_foreign` FOREIGN KEY (`tipo_projeto_id`) REFERENCES `tipos_projetos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
favoritos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
favoritos	0	favoritos_usuario_id_unique	1	usuario_id	A	0	NULL	NULL		BTREE			NO
```

---

## feriados

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| numero | int(11) | NO | UNI | 0 |
| nome | varchar(256) | NO |  | NULL |
| descricao | varchar(256) | NO |  | NULL |
| finalidade | varchar(256) | NO |  | NULL |
| status | enum('PLANEJADO','INICIADO','CONCLUIDO','SUSPENSO','CANCELADO') | NO |  | NULL |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | NO |  | NULL |
| data_inicio_baseline | datetime | YES |  | NULL |
| data_fim_baseline | datetime | YES |  | NULL |
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(250) NOT NULL COMMENT 'Descrição do feriado',
`dia` int(11) NOT NULL COMMENT 'Dia do mês (1~31) ou dia da semana (1-7)',
`mes` int(11) NOT NULL COMMENT 'Mês',
`ano` int(11) DEFAULT NULL COMMENT 'Ano do feriado caso seja data não recorrente',
`tipoDia` enum('MES','SEMANA') NOT NULL COMMENT 'Se o campo dia representa o dia da semana',
`recorrente` tinyint(4) NOT NULL COMMENT 'Se é uma data única ou repete todos os anos',
`abrangencia` enum('NACIONAL','ESTADUAL','MUNICIPAL') NOT NULL COMMENT 'Abrangência do feriado',
`codigo_ibge` varchar(8) DEFAULT NULL COMMENT 'Código da UF ou do município (IBGE)',
`uf` varchar(2) DEFAULT NULL COMMENT 'UF para feriados estaduais',
`entidade_id` char(36) DEFAULT NULL,
`cidade_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `feriados_entidade_id_foreign` (`entidade_id`),
KEY `feriados_cidade_id_foreign` (`cidade_id`),
CONSTRAINT `feriados_cidade_id_foreign` FOREIGN KEY (`cidade_id`) REFERENCES `cidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `feriados_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| custo | decimal(15,2) | NO |  | NULL |
| calcula_custos | tinyint(4) | NO |  | 1 |
| tempo_corrido | tinyint(4) | NO |  | 0 |
| usa_baseline | tinyint(4) | NO |  | 1 |
| usa_horas | tinyint(4) | NO |  | 1 |
| calcula_intervalo | tinyint(4) | NO |  | 1 |
| agrupador | tinyint(4) | NO |  | 0 |
| soma_progresso_filhos | tinyint(4) | NO |  | 1 |
| aloca_proprios_recursos | tinyint(4) | NO |  | 1 |
| soma_recusos_alocados_filhos | tinyint(4) | NO |  | 1 |
| custos_proprios | tinyint(4) | NO |  | 1 |
| soma_custos_filhos | tinyint(4) | NO |  | 1 |
| duracao | double(8,2) | NO |  | NULL |
| progresso | decimal(5,2) | NO |  | 0.00 |
| kanban_dockers | longtext | YES |  | NULL |
| expediente | longtext | YES |  | NULL |
| usuario_id | char(36) | YES | MUL | NULL |
| tipo_projeto_id | char(36) | YES | MUL | NULL |
| fase_id | char(36) | YES | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(250) | NO |  | NULL |
| dia | int(11) | NO |  | NULL |
| mes | int(11) | NO |  | NULL |
| ano | int(11) | YES |  | NULL |
| tipoDia | enum('MES','SEMANA') | NO |  | NULL |
| recorrente | tinyint(4) | NO |  | NULL |
| abrangencia | enum('NACIONAL','ESTADUAL','MUNICIPAL') | NO |  | NULL |
| codigo_ibge | varchar(8) | YES |  | NULL |
| uf | varchar(2) | YES |  | NULL |
| entidade_id | char(36) | YES | MUL | NULL |
| cidade_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos	0	projetos_numero_unique	1	numero	A	0	NULL	NULL		BTREE			NO
projetos	1	projetos_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL	YES	BTREE			NO
projetos	1	projetos_tipo_projeto_id_foreign	1	tipo_projeto_id	A	0	NULL	NULL	YES	BTREE			NO
projetos	1	projetos_fase_id_foreign	1	fase_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## projetos_alocacoes

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
feriados	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
feriados	1	feriados_entidade_id_foreign	1	entidade_id	A	0	NULL	NULL	YES	BTREE			NO
feriados	1	feriados_cidade_id_foreign	1	cidade_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## funcoes

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`descricao` varchar(256) NOT NULL COMMENT 'Descrição',
`quantidade` double(8,2) NOT NULL COMMENT 'Quantidade do recurso',
`projeto_id` char(36) NOT NULL,
`tarefa_id` char(36) DEFAULT NULL,
`recurso_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `projetos_alocacoes_projeto_id_foreign` (`projeto_id`),
KEY `projetos_alocacoes_tarefa_id_foreign` (`tarefa_id`),
KEY `projetos_alocacoes_recurso_id_foreign` (`recurso_id`),
CONSTRAINT `projetos_alocacoes_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_alocacoes_recurso_id_foreign` FOREIGN KEY (`recurso_id`) REFERENCES `projetos_recursos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_alocacoes_tarefa_id_foreign` FOREIGN KEY (`tarefa_id`) REFERENCES `projetos_tarefas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome da Função',
`nivel` varchar(256) DEFAULT NULL COMMENT 'Nível da Função',
`descricao` varchar(256) DEFAULT NULL COMMENT 'Descrição da Função',
`siape` varchar(256) DEFAULT NULL COMMENT 'código SIAPE da Função',
`cbo` varchar(256) DEFAULT NULL COMMENT 'código CBO da Função',
`ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Função ativo ou inativo',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| descricao | varchar(256) | NO |  | NULL |
| quantidade | double(8,2) | NO |  | NULL |
| projeto_id | char(36) | NO | MUL | NULL |
| tarefa_id | char(36) | YES | MUL | NULL |
| recurso_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| nivel | varchar(256) | YES |  | NULL |
| descricao | varchar(256) | YES |  | NULL |
| siape | varchar(256) | YES |  | NULL |
| cbo | varchar(256) | YES |  | NULL |
| ativo | tinyint(4) | NO |  | 1 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_alocacoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_alocacoes	1	projetos_alocacoes_projeto_id_foreign	1	projeto_id	A	0	NULL	NULL		BTREE			NO
projetos_alocacoes	1	projetos_alocacoes_tarefa_id_foreign	1	tarefa_id	A	0	NULL	NULL	YES	BTREE			NO
projetos_alocacoes	1	projetos_alocacoes_recurso_id_foreign	1	recurso_id	A	0	NULL	NULL		BTREE			NO
```

---

## projetos_alocacoes_regras

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
funcoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## grupos_especializados

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`projeto_alocacao_id` char(36) NOT NULL,
`regra_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `projetos_alocacoes_regras_projeto_alocacao_id_foreign` (`projeto_alocacao_id`),
KEY `projetos_alocacoes_regras_regra_id_foreign` (`regra_id`),
CONSTRAINT `projetos_alocacoes_regras_projeto_alocacao_id_foreign` FOREIGN KEY (`projeto_alocacao_id`) REFERENCES `projetos_alocacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_alocacoes_regras_regra_id_foreign` FOREIGN KEY (`regra_id`) REFERENCES `projetos_regras` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do grupo especializado',
`ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Nome ativo ou inativo',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| projeto_alocacao_id | char(36) | NO | MUL | NULL |
| regra_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| ativo | tinyint(4) | NO |  | 1 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_alocacoes_regras	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_alocacoes_regras	1	projetos_alocacoes_regras_projeto_alocacao_id_foreign	1	projeto_alocacao_id	A	0	NULL	NULL		BTREE			NO
projetos_alocacoes_regras	1	projetos_alocacoes_regras_regra_id_foreign	1	regra_id	A	0	NULL	NULL		BTREE			NO
```

---

## projetos_fases

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
grupos_especializados	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## historicos_atividades_externas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_inicio` datetime DEFAULT NULL COMMENT 'Inicio (opcional)',
`data_fim` datetime DEFAULT NULL COMMENT 'Fim (opcional)',
`cor` varchar(100) NOT NULL COMMENT 'Código da cor em formato hex',
`nome` varchar(100) NOT NULL COMMENT 'Nome',
`descricao` varchar(256) NOT NULL COMMENT 'Descrição',
`projeto_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `projetos_fases_projeto_id_foreign` (`projeto_id`),
CONSTRAINT `projetos_fases_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`curriculum_profissional_id` char(36) NOT NULL,
`area_atividade_externa_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `fk_hist_ativ_ext_id_curriculum_prof_id` (`curriculum_profissional_id`),
KEY `fk_hist_ativ_ext_id_area_ativ_ext_id` (`area_atividade_externa_id`),
CONSTRAINT `fk_hist_ativ_ext_id_area_ativ_ext_id` FOREIGN KEY (`area_atividade_externa_id`) REFERENCES `areas_atividades_externas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_hist_ativ_ext_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_inicio | datetime | YES |  | NULL |
| data_fim | datetime | YES |  | NULL |
| cor | varchar(100) | NO |  | NULL |
| nome | varchar(100) | NO |  | NULL |
| descricao | varchar(256) | NO |  | NULL |
| projeto_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| curriculum_profissional_id | char(36) | NO | MUL | NULL |
| area_atividade_externa_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_fases	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_fases	1	projetos_fases_projeto_id_foreign	1	projeto_id	A	0	NULL	NULL		BTREE			NO
```

---

## projetos_historicos

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
historicos_atividades_externas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
historicos_atividades_externas	1	fk_hist_ativ_ext_id_curriculum_prof_id	1	curriculum_profissional_id	A	0	NULL	NULL		BTREE			NO
historicos_atividades_externas	1	fk_hist_ativ_ext_id_area_ativ_ext_id	1	area_atividade_externa_id	A	0	NULL	NULL		BTREE			NO
```

---

## historicos_atividades_internas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_modificacao` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Data e hora da modificação',
`completo` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se o delta corresponde ao objeto completo',
`delta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Delta do objeto (ou objeto completo)' CHECK (json_valid(`delta`)),
`projeto_id` char(36) NOT NULL,
`usuario_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `projetos_historicos_projeto_id_foreign` (`projeto_id`),
KEY `projetos_historicos_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `projetos_historicos_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_historicos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`curriculum_profissional_id` char(36) NOT NULL,
`capacidade_tecnica_id` char(36) NOT NULL,
`atividade_desempenhada` varchar(256) DEFAULT NULL COMMENT 'Atividade desempenhada na instituição',
PRIMARY KEY (`id`),
KEY `fk_hist_ativ_int_id_curriculum_prof_id` (`curriculum_profissional_id`),
KEY `fk_capac_tec_id_curriculum_prof_id` (`capacidade_tecnica_id`),
CONSTRAINT `fk_capac_tec_id_curriculum_prof_id` FOREIGN KEY (`capacidade_tecnica_id`) REFERENCES `capacidades_tecnicas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_hist_ativ_int_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_modificacao | datetime | NO |  | current_timestamp() |
| completo | tinyint(4) | NO |  | 0 |
| delta | longtext | NO |  | NULL |
| projeto_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| curriculum_profissional_id | char(36) | NO | MUL | NULL |
| capacidade_tecnica_id | char(36) | NO | MUL | NULL |
| atividade_desempenhada | varchar(256) | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_historicos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_historicos	1	projetos_historicos_projeto_id_foreign	1	projeto_id	A	0	NULL	NULL		BTREE			NO
projetos_historicos	1	projetos_historicos_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
```

---

## projetos_recursos

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
historicos_atividades_internas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
historicos_atividades_internas	1	fk_hist_ativ_int_id_curriculum_prof_id	1	curriculum_profissional_id	A	0	NULL	NULL		BTREE			NO
historicos_atividades_internas	1	fk_capac_tec_id_curriculum_prof_id	1	capacidade_tecnica_id	A	0	NULL	NULL		BTREE			NO
```

---

## historicos_cursos_externos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do recurso',
`tipo` enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO') NOT NULL COMMENT 'Tipo do recurso',
`unidade_medida` enum('UNIDADE','CAIXA','METRO','KILO','LITRO','DUZIA','MONETARIO','HORAS','DIAS','PACOTE') NOT NULL COMMENT 'Unidade do recurso',
`valor` decimal(15,2) NOT NULL COMMENT 'Valor',
`projeto_id` char(36) NOT NULL,
`usuario_id` char(36) DEFAULT NULL,
`unidade_id` char(36) DEFAULT NULL,
`material_servico_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `projetos_recursos_projeto_id_foreign` (`projeto_id`),
KEY `projetos_recursos_usuario_id_foreign` (`usuario_id`),
KEY `projetos_recursos_unidade_id_foreign` (`unidade_id`),
KEY `projetos_recursos_material_servico_id_foreign` (`material_servico_id`),
CONSTRAINT `projetos_recursos_material_servico_id_foreign` FOREIGN KEY (`material_servico_id`) REFERENCES `materiais_servicos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_recursos_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_recursos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_recursos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(128) NOT NULL COMMENT 'Nome do curso externo',
`pretensao` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Pretende ou não fazer o curso',
`curriculum_profissional_id` char(36) NOT NULL,
`area_atividade_externa_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `fk_hist_cur_ext_id_curriculum_prof_id` (`curriculum_profissional_id`),
KEY `fk_hist_cur_ext_id_area_ativ_id` (`area_atividade_externa_id`),
CONSTRAINT `fk_hist_cur_ext_id_area_ativ_id` FOREIGN KEY (`area_atividade_externa_id`) REFERENCES `areas_atividades_externas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_hist_cur_ext_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| tipo | enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO') | NO |  | NULL |
| unidade_medida | enum('UNIDADE','CAIXA','METRO','KILO','LITRO','DUZIA','MONETARIO','HORAS','DIAS','PACOTE') | NO |  | NULL |
| valor | decimal(15,2) | NO |  | NULL |
| projeto_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | YES | MUL | NULL |
| unidade_id | char(36) | YES | MUL | NULL |
| material_servico_id | char(36) | YES | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(128) | NO |  | NULL |
| pretensao | tinyint(4) | NO |  | 0 |
| curriculum_profissional_id | char(36) | NO | MUL | NULL |
| area_atividade_externa_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_recursos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_recursos	1	projetos_recursos_projeto_id_foreign	1	projeto_id	A	0	NULL	NULL		BTREE			NO
projetos_recursos	1	projetos_recursos_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL	YES	BTREE			NO
projetos_recursos	1	projetos_recursos_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL	YES	BTREE			NO
projetos_recursos	1	projetos_recursos_material_servico_id_foreign	1	material_servico_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## projetos_regras

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
historicos_cursos_externos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
historicos_cursos_externos	1	fk_hist_cur_ext_id_curriculum_prof_id	1	curriculum_profissional_id	A	0	NULL	NULL		BTREE			NO
historicos_cursos_externos	1	fk_hist_cur_ext_id_area_ativ_id	1	area_atividade_externa_id	A	0	NULL	NULL		BTREE			NO
```

---

## historicos_cursos_internos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome da regra',
`tipo_recurso` enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO') NOT NULL DEFAULT 'MATERIAL' COMMENT 'Tipo do recurso que se aplica a regra',
`finalidade` enum('OUTRA','ESCRITORIO_PROJETO','GERENTE_PROJETO','GERENTE_RISCO','GERENTE_COMUNICACAO','GERENTE_RECURSO','PATROCINADOR','GESTOR_NEGOCIAL','MEMBRO') NOT NULL COMMENT 'Finalidade/Papel',
`perfis` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Perfis de capacidade aplicáveis a quem possuir a regra' CHECK (json_valid(`perfis`)),
`projeto_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `projetos_regras_projeto_id_foreign` (`projeto_id`),
CONSTRAINT `projetos_regras_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`pretensao` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Pretende ou não fazer o curso',
`curriculum_profissional_id` char(36) NOT NULL,
`curso_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `fk_hist_cur_int_id_curriculum_prof_id` (`curriculum_profissional_id`),
KEY `fk_hist_cur_int_id_curso_id` (`curso_id`),
CONSTRAINT `fk_hist_cur_int_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_hist_cur_int_id_curso_id` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| tipo_recurso | enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO') | NO |  | MATERIAL |
| finalidade | enum('OUTRA','ESCRITORIO_PROJETO','GERENTE_PROJETO','GERENTE_RISCO','GERENTE_COMUNICACAO','GERENTE_RECURSO','PATROCINADOR','GESTOR_NEGOCIAL','MEMBRO') | NO |  | NULL |
| perfis | longtext | YES |  | NULL |
| projeto_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| pretensao | tinyint(4) | NO |  | 0 |
| curriculum_profissional_id | char(36) | NO | MUL | NULL |
| curso_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_regras	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_regras	1	projetos_regras_projeto_id_foreign	1	projeto_id	A	0	NULL	NULL		BTREE			NO
```

---

## projetos_tarefas

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
historicos_cursos_internos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
historicos_cursos_internos	1	fk_hist_cur_int_id_curriculum_prof_id	1	curriculum_profissional_id	A	0	NULL	NULL		BTREE			NO
historicos_cursos_internos	1	fk_hist_cur_int_id_curso_id	1	curso_id	A	0	NULL	NULL		BTREE			NO
```

---

## historicos_docencias_externas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`indice` int(11) NOT NULL COMMENT 'Indice da sequencia da tarefa',
`path` text NOT NULL COMMENT 'Path dos nós pais',
`nome` varchar(256) NOT NULL COMMENT 'Nome da tarefa',
`descricao` varchar(256) NOT NULL COMMENT 'Descricao da tarefa',
`data_inicio` datetime DEFAULT NULL COMMENT 'Inicio da tarefa',
`data_fim` datetime DEFAULT NULL COMMENT 'Fim da tarefa',
`data_inicio_baseline` datetime DEFAULT NULL COMMENT 'Inicio do projeto (Baseline)',
`data_fim_baseline` datetime DEFAULT NULL COMMENT 'Fim do projeto (Baseline)',
`duracao` double(8,2) NOT NULL COMMENT 'Duração da atividade. Se a duração for 0 e sintéfico for falso então irá se comportar apenas como um grupo',
`progresso` decimal(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Percentual de progresso da tarefa',
`inicio_marco` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se o início é um marco',
`termino_marco` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se o término é um marco',
`tem_filhos` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se é um registro sintético (resumo)',
`agrupador` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso)',
`soma_progresso_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos)',
`status` enum('PLANEJADO','INICIADO','CONCLUIDO','FALHO','SUSPENSO','CANCELADO','AGUARDANDO') NOT NULL COMMENT 'Status',
`contraido` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se esta contraído',
`custo` decimal(15,2) NOT NULL COMMENT 'Custo: Será a soma dos recursos, ou a soma dos filhos caso tem_filhos e soma_custos_filhos',
`calcula_intervalo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se calcula o início e término automaticamente pelos filhos (somente se tem_filhos)',
`aloca_proprios_recursos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se possui recursos próprios (somente se tem_filhos)',
`soma_recusos_alocados_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Mostra o somatório dos recursos filhos (somente se tem_filhos)',
`custos_proprios` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se possui custos próprios (somente se tem_filhos), se não tem filhos sempre será true',
`soma_custos_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Mostra o somatório dos custos filhos (somente se tem_filhos)',
`etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Etiquetas' CHECK (json_valid(`etiquetas`)),
`documento_id` char(36) DEFAULT NULL,
`projeto_id` char(36) NOT NULL,
`tarefa_pai_id` char(36) DEFAULT NULL,
`tarefa_projeto_id` char(36) DEFAULT NULL,
`atividade_id` char(36) DEFAULT NULL,
`usuario_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `projetos_tarefas_documento_id_foreign` (`documento_id`),
KEY `projetos_tarefas_projeto_id_foreign` (`projeto_id`),
KEY `projetos_tarefas_tarefa_pai_id_foreign` (`tarefa_pai_id`),
KEY `projetos_tarefas_tarefa_projeto_id_foreign` (`tarefa_projeto_id`),
KEY `projetos_tarefas_atividade_id_foreign` (`atividade_id`),
KEY `projetos_tarefas_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `projetos_tarefas_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_tarefas_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_tarefas_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_tarefas_tarefa_pai_id_foreign` FOREIGN KEY (`tarefa_pai_id`) REFERENCES `projetos_tarefas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_tarefas_tarefa_projeto_id_foreign` FOREIGN KEY (`tarefa_projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_tarefas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`curriculum_profissional_id` char(36) NOT NULL,
`area_atividade_externa_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `fk_hist_docen_ext_id_curriculum_prof_id` (`curriculum_profissional_id`),
KEY `fk_hist_docen_ext_id_area_ativ_ext_id` (`area_atividade_externa_id`),
CONSTRAINT `fk_hist_docen_ext_id_area_ativ_ext_id` FOREIGN KEY (`area_atividade_externa_id`) REFERENCES `areas_atividades_externas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_hist_docen_ext_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| id | char(36) | NO | PRI | NULL |
| indice | int(11) | NO |  | NULL |
| created_at | timestamp | YES |  | NULL |
| path | text | NO |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| descricao | varchar(256) | NO |  | NULL |
| curriculum_profissional_id | char(36) | NO | MUL | NULL |
| data_inicio | datetime | YES |  | NULL |
| data_fim | datetime | YES |  | NULL |
| area_atividade_externa_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| data_inicio_baseline | datetime | YES |  | NULL |
| data_fim_baseline | datetime | YES |  | NULL |
| duracao | double(8,2) | NO |  | NULL |
| progresso | decimal(5,2) | NO |  | 0.00 |
| inicio_marco | tinyint(4) | NO |  | 0 |
| termino_marco | tinyint(4) | NO |  | 0 |
| tem_filhos | tinyint(4) | NO |  | 0 |
| agrupador | tinyint(4) | NO |  | 0 |
| soma_progresso_filhos | tinyint(4) | NO |  | 1 |
| status | enum('PLANEJADO','INICIADO','CONCLUIDO','FALHO','SUSPENSO','CANCELADO','AGUARDANDO') | NO |  | NULL |
| contraido | tinyint(4) | NO |  | 0 |
| custo | decimal(15,2) | NO |  | NULL |
| calcula_intervalo | tinyint(4) | NO |  | 1 |
| aloca_proprios_recursos | tinyint(4) | NO |  | 1 |
| soma_recusos_alocados_filhos | tinyint(4) | NO |  | 1 |
| custos_proprios | tinyint(4) | NO |  | 1 |
| soma_custos_filhos | tinyint(4) | NO |  | 1 |
| etiquetas | longtext | YES |  | NULL |
| documento_id | char(36) | YES | MUL | NULL |
| projeto_id | char(36) | NO | MUL | NULL |
| tarefa_pai_id | char(36) | YES | MUL | NULL |
| tarefa_projeto_id | char(36) | YES | MUL | NULL |
| atividade_id | char(36) | YES | MUL | NULL |
| usuario_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
historicos_docencias_externas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
historicos_docencias_externas	1	fk_hist_docen_ext_id_curriculum_prof_id	1	curriculum_profissional_id	A	0	NULL	NULL		BTREE			NO
historicos_docencias_externas	1	fk_hist_docen_ext_id_area_ativ_ext_id	1	area_atividade_externa_id	A	0	NULL	NULL		BTREE			NO
```

---

## historicos_docencias_internas

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_tarefas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_tarefas	1	projetos_tarefas_documento_id_foreign	1	documento_id	A	0	NULL	NULL	YES	BTREE			NO
projetos_tarefas	1	projetos_tarefas_projeto_id_foreign	1	projeto_id	A	0	NULL	NULL		BTREE			NO
projetos_tarefas	1	projetos_tarefas_tarefa_pai_id_foreign	1	tarefa_pai_id	A	0	NULL	NULL	YES	BTREE			NO
projetos_tarefas	1	projetos_tarefas_tarefa_projeto_id_foreign	1	tarefa_projeto_id	A	0	NULL	NULL	YES	BTREE			NO
projetos_tarefas	1	projetos_tarefas_atividade_id_foreign	1	atividade_id	A	0	NULL	NULL	YES	BTREE			NO
projetos_tarefas	1	projetos_tarefas_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## projetos_tarefas_dependencias

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`curriculum_profissional_id` char(36) NOT NULL,
`disciplina_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `fk_hist_docen_int_id_curriculum_prof_id` (`curriculum_profissional_id`),
KEY `historicos_docencias_internas_disciplina_id_foreign` (`disciplina_id`),
CONSTRAINT `fk_hist_docen_int_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE,
CONSTRAINT `historicos_docencias_internas_disciplina_id_foreign` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplinas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`tarefa_id` char(36) NOT NULL,
`dependencia_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `projetos_tarefas_dependencias_tarefa_id_foreign` (`tarefa_id`),
KEY `projetos_tarefas_dependencias_dependencia_id_foreign` (`dependencia_id`),
CONSTRAINT `projetos_tarefas_dependencias_dependencia_id_foreign` FOREIGN KEY (`dependencia_id`) REFERENCES `projetos_tarefas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_tarefas_dependencias_tarefa_id_foreign` FOREIGN KEY (`tarefa_id`) REFERENCES `projetos_tarefas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| curriculum_profissional_id | char(36) | NO | MUL | NULL |
| disciplina_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| tarefa_id | char(36) | NO | MUL | NULL |
| dependencia_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
historicos_docencias_internas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
historicos_docencias_internas	1	fk_hist_docen_int_id_curriculum_prof_id	1	curriculum_profissional_id	A	0	NULL	NULL		BTREE			NO
historicos_docencias_internas	1	historicos_docencias_internas_disciplina_id_foreign	1	disciplina_id	A	0	NULL	NULL		BTREE			NO
```

---

## historicos_funcoes

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_tarefas_dependencias	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_tarefas_dependencias	1	projetos_tarefas_dependencias_tarefa_id_foreign	1	tarefa_id	A	0	NULL	NULL		BTREE			NO
projetos_tarefas_dependencias	1	projetos_tarefas_dependencias_dependencia_id_foreign	1	dependencia_id	A	0	NULL	NULL		BTREE			NO
```

---

## questionarios

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`curriculum_profissional_id` char(36) NOT NULL,
`funcao_id` char(36) NOT NULL,
`unidade_id` text DEFAULT NULL COMMENT 'Unidade em que foi chefe',
PRIMARY KEY (`id`),
KEY `fk_hist_func_id_curriculum_prof_id` (`curriculum_profissional_id`),
KEY `fk_hist_func_id_funcao_id` (`funcao_id`),
CONSTRAINT `fk_hist_func_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_hist_func_id_funcao_id` FOREIGN KEY (`funcao_id`) REFERENCES `funcoes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`tipo` varchar(256) NOT NULL COMMENT 'Tipo interno | personalizado | anonimo',
`nome` varchar(256) NOT NULL COMMENT 'Nome do questionário',
`codigo` varchar(256) NOT NULL COMMENT 'Código do questionario',
`versao` int(11) NOT NULL DEFAULT 1 COMMENT 'Versao do questionario',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| curriculum_profissional_id | char(36) | NO | MUL | NULL |
| funcao_id | char(36) | NO | MUL | NULL |
| unidade_id | text | YES |  | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| tipo | varchar(256) | NO |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| codigo | varchar(256) | NO |  | NULL |
| versao | int(11) | NO |  | 1 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
historicos_funcoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
historicos_funcoes	1	fk_hist_func_id_curriculum_prof_id	1	curriculum_profissional_id	A	0	NULL	NULL		BTREE			NO
historicos_funcoes	1	fk_hist_func_id_funcao_id	1	funcao_id	A	0	NULL	NULL		BTREE			NO
```

---

## historicos_lotacoes

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
questionarios	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## questionarios_perguntas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`curriculum_profissional_id` char(36) NOT NULL,
`unidade_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `fk_hist_lot_id_curriculum_prof_id` (`curriculum_profissional_id`),
KEY `fk_hist_lot_id_unidade_id` (`unidade_id`),
CONSTRAINT `fk_hist_lot_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_hist_lot_id_unidade_id` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`sequencia` tinyint(4) NOT NULL COMMENT 'Sequequencia dos numeros da pergunta no questionario',
`pergunta` text NOT NULL COMMENT 'A pergunta do questionario',
`tipo` enum('EMOJI','SELECT','MULTI_SELECT','TEXT','TEXT_AREA','TIMER','DATE_TIME','NUMBER','RATE','SWITCH','RADIO','RADIO_INLINE','RADIO_BUTTON','CHECK','SEARCH') DEFAULT NULL,
`criado_versao` int(11) NOT NULL COMMENT 'Versão do Questionario que foi criada a pergunta',
`deletado_versao` int(11) DEFAULT NULL COMMENT 'Versão do Questionario que foi deletada a pergunta',
`respostas_possiveis` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Respostas possiveis para a pergunta(DC2Type:json)' CHECK (json_valid(`respostas_possiveis`)),
`questionario_id` char(36) NOT NULL,
`origem_id` char(36) DEFAULT NULL,
`codigo` text DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `questionarios_perguntas_questionario_id_foreign` (`questionario_id`),
KEY `questionarios_perguntas_origem_id_foreign` (`origem_id`),
CONSTRAINT `questionarios_perguntas_origem_id_foreign` FOREIGN KEY (`origem_id`) REFERENCES `questionarios_perguntas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `questionarios_perguntas_questionario_id_foreign` FOREIGN KEY (`questionario_id`) REFERENCES `questionarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| curriculum_profissional_id | char(36) | NO | MUL | NULL |
| unidade_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| sequencia | tinyint(4) | NO |  | NULL |
| pergunta | text | NO |  | NULL |
| tipo | enum('EMOJI','SELECT','MULTI_SELECT','TEXT','TEXT_AREA','TIMER','DATE_TIME','NUMBER','RATE','SWITCH','RADIO','RADIO_INLINE','RADIO_BUTTON','CHECK','SEARCH') | YES |  | NULL |
| criado_versao | int(11) | NO |  | NULL |
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
historicos_lotacoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
historicos_lotacoes	1	fk_hist_lot_id_curriculum_prof_id	1	curriculum_profissional_id	A	0	NULL	NULL		BTREE			NO
historicos_lotacoes	1	fk_hist_lot_id_unidade_id	1	unidade_id	A	0	NULL	NULL		BTREE			NO
| deletado_versao | int(11) | YES |  | NULL |
| respostas_possiveis | longtext | YES |  | NULL |
```

---

## integracao_servidores

### Estrutura da Tabela

```sql
| questionario_id | char(36) | NO | MUL | NULL |
| origem_id | char(36) | YES | MUL | NULL |
| codigo | text | YES |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`cpf_ativo` varchar(50) DEFAULT NULL,
`data_modificacao` datetime DEFAULT NULL,
`cpf` varchar(50) DEFAULT NULL,
`nome` varchar(100) DEFAULT NULL,
`emailfuncional` varchar(100) DEFAULT NULL,
`sexo` varchar(50) DEFAULT NULL,
`municipio` varchar(100) DEFAULT NULL,
`uf` varchar(50) DEFAULT NULL,
`data_nascimento` varchar(50) DEFAULT NULL,
`telefone` varchar(50) DEFAULT NULL,
`vinculo_ativo` varchar(50) DEFAULT NULL,
`matriculasiape` varchar(50) DEFAULT NULL,
`codigo_cargo` varchar(100) DEFAULT NULL,
`coduorgexercicio` varchar(50) DEFAULT NULL,
`coduorglotacao` varchar(50) DEFAULT NULL,
`codigo_servo_exercicio` varchar(50) DEFAULT NULL,
`nomeguerra` varchar(100) DEFAULT NULL,
`situacao_funcional` varchar(50) DEFAULT NULL,
`codupag` varchar(50) DEFAULT NULL,
`dataexercicionoorgao` varchar(50) DEFAULT NULL,
`funcoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`funcoes`)),
`cpf_chefia_imediata` varchar(50) DEFAULT NULL COMMENT 'Registra CPF da chefia imediata informado pelo Siape.',
`email_chefia_imediata` varchar(50) DEFAULT NULL COMMENT 'Registra e-mail da chefia imediata informado pelo Siape.',
`codigo_situacao_funcional` varchar(50) DEFAULT NULL COMMENT 'Registra Código da Situação Funcional informado pelo Siape.',
`nome_jornada` varchar(100) DEFAULT NULL,
`cod_jornada` int(11) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
questionarios_perguntas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
questionarios_perguntas	1	questionarios_perguntas_questionario_id_foreign	1	questionario_id	A	0	NULL	NULL		BTREE			NO
questionarios_perguntas	1	questionarios_perguntas_origem_id_foreign	1	origem_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## questionarios_perguntas_respostas

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`resposta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Resposta do questionário' CHECK (json_valid(`resposta`)),
`questionario_pergunta_id` char(36) NOT NULL,
`questionario_preenchimento_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `fk_questionario_perg_id` (`questionario_pergunta_id`),
KEY `fk_questionario_preenchimento_id` (`questionario_preenchimento_id`),
CONSTRAINT `fk_questionario_perg_id` FOREIGN KEY (`questionario_pergunta_id`) REFERENCES `questionarios_perguntas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_questionario_preenchimento_id` FOREIGN KEY (`questionario_preenchimento_id`) REFERENCES `questionarios_preenchimentos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| deleted_at | timestamp | YES |  | NULL |
| cpf_ativo | varchar(50) | YES |  | NULL |
| data_modificacao | datetime | YES |  | NULL |
| cpf | varchar(50) | YES |  | NULL |
| nome | varchar(100) | YES |  | NULL |
| emailfuncional | varchar(100) | YES |  | NULL |
| sexo | varchar(50) | YES |  | NULL |
| municipio | varchar(100) | YES |  | NULL |
| uf | varchar(50) | YES |  | NULL |
| data_nascimento | varchar(50) | YES |  | NULL |
| telefone | varchar(50) | YES |  | NULL |
| vinculo_ativo | varchar(50) | YES |  | NULL |
| matriculasiape | varchar(50) | YES |  | NULL |
| codigo_cargo | varchar(100) | YES |  | NULL |
| coduorgexercicio | varchar(50) | YES |  | NULL |
| coduorglotacao | varchar(50) | YES |  | NULL |
| codigo_servo_exercicio | varchar(50) | YES |  | NULL |
| nomeguerra | varchar(100) | YES |  | NULL |
| situacao_funcional | varchar(50) | YES |  | NULL |
| codupag | varchar(50) | YES |  | NULL |
| dataexercicionoorgao | varchar(50) | YES |  | NULL |
| funcoes | longtext | YES |  | NULL |
| cpf_chefia_imediata | varchar(50) | YES |  | NULL |
| email_chefia_imediata | varchar(50) | YES |  | NULL |
| codigo_situacao_funcional | varchar(50) | YES |  | NULL |
| nome_jornada | varchar(100) | YES |  | NULL |
| cod_jornada | int(11) | YES |  | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| resposta | longtext | YES |  | NULL |
| questionario_pergunta_id | char(36) | NO | MUL | NULL |
| questionario_preenchimento_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
integracao_servidores	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## integracao_unidades

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
questionarios_perguntas_respostas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
questionarios_perguntas_respostas	1	fk_questionario_perg_id	1	questionario_pergunta_id	A	0	NULL	NULL		BTREE			NO
questionarios_perguntas_respostas	1	fk_questionario_preenchimento_id	1	questionario_preenchimento_id	A	0	NULL	NULL		BTREE			NO
```

---

## questionarios_preenchimentos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`id_servo` varchar(50) DEFAULT NULL,
`pai_servo` varchar(50) DEFAULT NULL,
`codigo_siape` varchar(50) DEFAULT NULL,
`pai_siape` varchar(50) DEFAULT NULL,
`codupag` varchar(50) DEFAULT NULL,
`nomeuorg` varchar(200) DEFAULT NULL,
`siglauorg` varchar(50) DEFAULT NULL,
`telefone` varchar(50) DEFAULT NULL,
`email` varchar(100) DEFAULT NULL,
`natureza` varchar(50) DEFAULT NULL,
`fronteira` varchar(50) DEFAULT NULL,
`fuso_horario` varchar(50) DEFAULT NULL,
`cod_uop` varchar(50) DEFAULT NULL,
`cod_unidade` varchar(50) DEFAULT NULL,
`tipo` varchar(50) DEFAULT NULL,
`tipo_desc` varchar(100) DEFAULT NULL,
`na_rodovia` varchar(50) DEFAULT NULL,
`logradouro` varchar(100) DEFAULT NULL,
`bairro` varchar(100) DEFAULT NULL,
`cep` varchar(50) DEFAULT NULL,
`ptn_ge_coordenada` varchar(50) DEFAULT NULL,
`municipio_siafi_siape` varchar(100) DEFAULT NULL,
`municipio_siscom` varchar(100) DEFAULT NULL,
`municipio_ibge` varchar(50) DEFAULT NULL,
`municipio_nome` varchar(100) DEFAULT NULL,
`municipio_uf` varchar(50) DEFAULT NULL,
`ativa` varchar(50) DEFAULT NULL,
`regimental` varchar(50) DEFAULT NULL,
`data_modificacao` datetime DEFAULT NULL,
`und_nu_adicional` varchar(50) DEFAULT NULL,
`cnpjupag` varchar(60) DEFAULT NULL,
`cpf_titular_autoridade_uorg` varchar(14) DEFAULT NULL,
`cpf_substituto_autoridade_uorg` varchar(14) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_preenchimento` datetime NOT NULL COMMENT 'Data e hora das respostas',
`editavel` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Possibilidade de editar as respostas',
`versao` int(11) NOT NULL COMMENT 'Versao do questionario',
`questionario_id` char(36) NOT NULL,
`usuario_id` char(36) NOT NULL,
`resumo_resposta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Resumo da resposta do questionario' CHECK (json_valid(`resumo_resposta`)),
PRIMARY KEY (`id`),
KEY `questionarios_respostas_questionario_id_foreign` (`questionario_id`),
KEY `questionarios_respostas_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `questionarios_respostas_questionario_id_foreign` FOREIGN KEY (`questionario_id`) REFERENCES `questionarios` (`id`) ON UPDATE CASCADE,
CONSTRAINT `questionarios_respostas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| id_servo | varchar(50) | YES |  | NULL |
| pai_servo | varchar(50) | YES |  | NULL |
| codigo_siape | varchar(50) | YES |  | NULL |
| pai_siape | varchar(50) | YES |  | NULL |
| codupag | varchar(50) | YES |  | NULL |
| nomeuorg | varchar(200) | YES |  | NULL |
| siglauorg | varchar(50) | YES |  | NULL |
| telefone | varchar(50) | YES |  | NULL |
| email | varchar(100) | YES |  | NULL |
| natureza | varchar(50) | YES |  | NULL |
| fronteira | varchar(50) | YES |  | NULL |
| fuso_horario | varchar(50) | YES |  | NULL |
| cod_uop | varchar(50) | YES |  | NULL |
| cod_unidade | varchar(50) | YES |  | NULL |
| id | char(36) | NO | PRI | NULL |
| tipo | varchar(50) | YES |  | NULL |
| created_at | timestamp | YES |  | NULL |
| tipo_desc | varchar(100) | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| na_rodovia | varchar(50) | YES |  | NULL |
| data_preenchimento | datetime | NO |  | NULL |
| logradouro | varchar(100) | YES |  | NULL |
| editavel | tinyint(4) | NO |  | 1 |
| bairro | varchar(100) | YES |  | NULL |
| versao | int(11) | NO |  | NULL |
| cep | varchar(50) | YES |  | NULL |
| questionario_id | char(36) | NO | MUL | NULL |
| ptn_ge_coordenada | varchar(50) | YES |  | NULL |
| usuario_id | char(36) | NO | MUL | NULL |
| municipio_siafi_siape | varchar(100) | YES |  | NULL |
| municipio_siscom | varchar(100) | YES |  | NULL |
| resumo_resposta | longtext | YES |  | NULL |

### Índices

```sql
| municipio_ibge | varchar(50) | YES |  | NULL |
| municipio_nome | varchar(100) | YES |  | NULL |
| municipio_uf | varchar(50) | YES |  | NULL |
| ativa | varchar(50) | YES |  | NULL |
| regimental | varchar(50) | YES |  | NULL |
| data_modificacao | datetime | YES |  | NULL |
| und_nu_adicional | varchar(50) | YES |  | NULL |
| cnpjupag | varchar(60) | YES |  | NULL |
| cpf_titular_autoridade_uorg | varchar(14) | YES |  | NULL |
| cpf_substituto_autoridade_uorg | varchar(14) | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
questionarios_preenchimentos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
questionarios_preenchimentos	1	questionarios_respostas_questionario_id_foreign	1	questionario_id	A	0	NULL	NULL		BTREE			NO
questionarios_preenchimentos	1	questionarios_respostas_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
```

---

## reacoes

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
integracao_unidades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## integracoes

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`tipo` enum('like','love','care','haha','wow','sad','angry') NOT NULL DEFAULT 'like' COMMENT 'Tipo do react',
`usuario_id` char(36) NOT NULL,
`atividade_id` char(36) DEFAULT NULL,
`plano_trabalho_entrega_id` char(36) DEFAULT NULL,
`plano_entrega_entrega_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `reacoes_usuario_id_foreign` (`usuario_id`),
KEY `reacoes_atividade_id_foreign` (`atividade_id`),
KEY `reacoes_plano_trabalho_entrega_id_foreign` (`plano_trabalho_entrega_id`),
KEY `reacoes_plano_entrega_entrega_id_foreign` (`plano_entrega_entrega_id`),
CONSTRAINT `reacoes_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `reacoes_plano_entrega_entrega_id_foreign` FOREIGN KEY (`plano_entrega_entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `reacoes_plano_trabalho_entrega_id_foreign` FOREIGN KEY (`plano_trabalho_entrega_id`) REFERENCES `planos_trabalhos_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `reacoes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_execucao` datetime NOT NULL COMMENT 'Data em que a rotina de integração foi executada',
`atualizar_unidades` tinyint(1) NOT NULL COMMENT 'Define se a rotina deve atualizar as unidades',
`atualizar_servidores` tinyint(1) NOT NULL COMMENT 'Define se a rotina deve atualizar os servidores',
`atualizar_gestores` tinyint(1) NOT NULL COMMENT 'Define se a rotina deve atualizar os gestores',
`usar_arquivos_locais` tinyint(1) NOT NULL COMMENT 'Define se a rotina deve importar os dados de um arquivo local em formato XML',
`gravar_arquivos_locais` tinyint(1) NOT NULL COMMENT 'Define se a rotina deve salvar os dados importados do SIAPE em um arquivo local em formato XML',
`resultado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Resultado da execução da rotina de integração' CHECK (json_valid(`resultado`)),
`entidade_id` char(36) NOT NULL,
`usuario_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `integracoes_entidade_id_foreign` (`entidade_id`),
KEY `integracoes_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `integracoes_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `integracoes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| tipo | enum('like','love','care','haha','wow','sad','angry') | NO |  | like |
| usuario_id | char(36) | NO | MUL | NULL |
| atividade_id | char(36) | YES | MUL | NULL |
| plano_trabalho_entrega_id | char(36) | YES | MUL | NULL |
| plano_entrega_entrega_id | char(36) | YES | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_execucao | datetime | NO |  | NULL |
| atualizar_unidades | tinyint(1) | NO |  | NULL |
| atualizar_servidores | tinyint(1) | NO |  | NULL |
| atualizar_gestores | tinyint(1) | NO |  | NULL |
| usar_arquivos_locais | tinyint(1) | NO |  | NULL |
| gravar_arquivos_locais | tinyint(1) | NO |  | NULL |
| resultado | longtext | NO |  | NULL |
| entidade_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
reacoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
reacoes	1	reacoes_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
reacoes	1	reacoes_atividade_id_foreign	1	atividade_id	A	0	NULL	NULL	YES	BTREE			NO
reacoes	1	reacoes_plano_trabalho_entrega_id_foreign	1	plano_trabalho_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
reacoes	1	reacoes_plano_entrega_entrega_id_foreign	1	plano_entrega_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## sequences

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
integracoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
integracoes	1	integracoes_entidade_id_foreign	1	entidade_id	A	0	NULL	NULL		BTREE			NO
integracoes	1	integracoes_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## materiais_servicos

### Estrutura da Tabela

```sql
`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`template_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numeria do número do template',
`plano_entrega_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numérica do plano de entregas',
`plano_trabalho_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numérica do plano de trabalho',
`projeto_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequência numerica do Projeto',
`documento_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numeria do número do documento',
`atividade_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numeria do número da atividade',
`notificacao_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numeria do número da notificação',
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`tipo` enum('MATERIAL','SERVICO') NOT NULL DEFAULT 'MATERIAL' COMMENT 'Tipo',
`codigo` varchar(100) DEFAULT NULL COMMENT 'Código',
`referencia` varchar(100) DEFAULT NULL COMMENT 'Referência',
`descricao` varchar(256) NOT NULL COMMENT 'Descrição',
`unidade_medida` enum('UNIDADE','CAIXA','METRO','KILO','LITRO','DUZIA','MONETARIO','HORAS','DIAS','PACOTE') NOT NULL COMMENT 'Unidade',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | bigint(20) unsigned | NO | PRI | NULL | auto_increment |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| template_numero | int(11) | NO |  | 0 |
| plano_entrega_numero | int(11) | NO |  | 0 |
| plano_trabalho_numero | int(11) | NO |  | 0 |
| projeto_numero | int(11) | NO |  | 0 |
| documento_numero | int(11) | NO |  | 0 |
| atividade_numero | int(11) | NO |  | 0 |
| notificacao_numero | int(11) | NO |  | 0 |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| tipo | enum('MATERIAL','SERVICO') | NO |  | MATERIAL |
| codigo | varchar(100) | YES |  | NULL |
| referencia | varchar(100) | YES |  | NULL |
| descricao | varchar(256) | NO |  | NULL |
| unidade_medida | enum('UNIDADE','CAIXA','METRO','KILO','LITRO','DUZIA','MONETARIO','HORAS','DIAS','PACOTE') | NO |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
sequences	0	PRIMARY	1	id	A	1	NULL	NULL		BTREE			NO
```

---

## siape_consultaDadosFuncionais

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
materiais_servicos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## migrations

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`response` longtext NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`processado` tinyint(1) NOT NULL DEFAULT 0,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`migration` varchar(255) NOT NULL,
`batch` int(11) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| response | longtext | NO |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| processado | tinyint(1) | NO |  | 0 |

### Índices

```sql
| id | int(10) unsigned | NO | PRI | NULL | auto_increment |
| migration | varchar(255) | NO |  | NULL |
| batch | int(11) | NO |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
siape_consultadadosfuncionais	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## siape_consultaDadosPessoais

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
migrations	0	PRIMARY	1	id	A	226	NULL	NULL		BTREE			NO
```

---

## notificacoes

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`response` longtext NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`processado` tinyint(1) NOT NULL DEFAULT 0,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número da mensagem (Gerado pelo sistema)',
`codigo` varchar(255) NOT NULL COMMENT 'Código da mensagem',
`data_registro` datetime NOT NULL COMMENT 'Data e hora da inclusão da mensagem',
`mensagem` longtext NOT NULL COMMENT 'Mensagem',
`remetente_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `notificacoes_numero_unique` (`numero`),
KEY `notificacoes_remetente_id_foreign` (`remetente_id`),
CONSTRAINT `notificacoes_remetente_id_foreign` FOREIGN KEY (`remetente_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| response | longtext | NO |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| id | char(36) | NO | PRI | NULL |
| processado | tinyint(1) | NO |  | 0 |
| created_at | timestamp | YES |  | NULL |

### Índices

```sql
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| numero | int(11) | NO | UNI | 0 |
| codigo | varchar(255) | NO |  | NULL |
| data_registro | datetime | NO |  | NULL |
| mensagem | longtext | NO |  | NULL |
| remetente_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
notificacoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
notificacoes	0	notificacoes_numero_unique	1	numero	A	0	NULL	NULL		BTREE			NO
notificacoes	1	notificacoes_remetente_id_foreign	1	remetente_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## notificacoes_destinatarios

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
siape_consultadadospessoais	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## siape_dadosUORG

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`tipo` enum('PETRVS','EMAIL','WHATSAPP') NOT NULL DEFAULT 'PETRVS' COMMENT 'Tipo do envio',
`data_leitura` datetime DEFAULT NULL COMMENT 'Data e hora da leitura',
`data_envio` datetime DEFAULT NULL COMMENT 'Data e hora do envio, utilizado quando realmente a mensagem foi despachada',
`opcoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Opções' CHECK (json_valid(`opcoes`)),
`notificacao_id` char(36) NOT NULL,
`usuario_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `notificacoes_destinatarios_notificacao_id_foreign` (`notificacao_id`),
KEY `notificacoes_destinatarios_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `notificacoes_destinatarios_notificacao_id_foreign` FOREIGN KEY (`notificacao_id`) REFERENCES `notificacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `notificacoes_destinatarios_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`response` longtext NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`processado` tinyint(1) NOT NULL DEFAULT 0,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| tipo | enum('PETRVS','EMAIL','WHATSAPP') | NO |  | PETRVS |
| id | char(36) | NO | PRI | NULL |
| response | longtext | NO |  | NULL |
| data_leitura | datetime | YES |  | NULL |
| data_envio | datetime | YES |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| opcoes | longtext | YES |  | NULL |
| notificacao_id | char(36) | NO | MUL | NULL |
| processado | tinyint(1) | NO |  | 0 |

### Índices

```sql
| usuario_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
siape_dadosuorg	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## siape_listaServidores

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
notificacoes_destinatarios	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
notificacoes_destinatarios	1	notificacoes_destinatarios_notificacao_id_foreign	1	notificacao_id	A	0	NULL	NULL		BTREE			NO
notificacoes_destinatarios	1	notificacoes_destinatarios_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
```

---

## notificacoes_whatsapp

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`response` longtext NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`processado` tinyint(1) NOT NULL DEFAULT 0,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_inicio_sessao` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Data hora do início da sessão',
`data_fim_sessao` datetime DEFAULT NULL COMMENT 'Data hora do final da sessão (utilizado posteriormente para alertar o usuário que seu atendimento acabou)',
`data_ultima_interacao` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Data hora utilizada para fazer o controle do tempo de sessão',
`interacoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT json_array() COMMENT 'Interações (histórico do campo atual)' CHECK (json_valid(`interacoes`)),
`atual` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Informações da posição atual no menu',
`usuario_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `notificacoes_whatsapp_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `notificacoes_whatsapp_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| response | longtext | NO |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| id | char(36) | NO | PRI | NULL |
| processado | tinyint(1) | NO |  | 0 |
| created_at | timestamp | YES |  | NULL |

### Índices

```sql
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_inicio_sessao | datetime | NO |  | current_timestamp() |
| data_fim_sessao | datetime | YES |  | NULL |
| data_ultima_interacao | datetime | NO |  | current_timestamp() |
| interacoes | longtext | NO |  | json_array() |
| atual | tinyint(4) | NO |  | 0 |
| usuario_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
siape_listaservidores	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## siape_listaUORG

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
notificacoes_whatsapp	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
notificacoes_whatsapp	1	notificacoes_whatsapp_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## ocorrencias

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`response` longtext NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`processado` tinyint(1) NOT NULL DEFAULT 0,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_inicio` datetime NOT NULL COMMENT 'Data inicial da consolidacão',
`data_fim` datetime NOT NULL COMMENT 'Data final da consolidação',
`descricao` longtext NOT NULL COMMENT 'Descrição da ocorrência',
`plano_trabalho_id` char(36) DEFAULT NULL,
`usuario_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `ocorrencias_plano_trabalho_id_foreign` (`plano_trabalho_id`),
KEY `ocorrencias_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `ocorrencias_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `ocorrencias_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| response | longtext | NO |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| processado | tinyint(1) | NO |  | 0 |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | NO |  | NULL |
| descricao | longtext | NO |  | NULL |
| plano_trabalho_id | char(36) | YES | MUL | NULL |
| usuario_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
siape_listauorg	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## solucao_produtos_servicos

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
ocorrencias	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
ocorrencias	1	ocorrencias_plano_trabalho_id_foreign	1	plano_trabalho_id	A	0	NULL	NULL	YES	BTREE			NO
ocorrencias	1	ocorrencias_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
```

---

## okrs

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`nome` varchar(250) NOT NULL,
`sigla` varchar(20) NOT NULL,
`unidade_id` char(36) NOT NULL,
`descricao` text NOT NULL,
`url` varchar(250) NOT NULL,
`status` int(11) NOT NULL DEFAULT 0,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_ativado` timestamp NULL DEFAULT NULL,
`data_desativado` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `solucao_produtos_servicos_unidade_id_foreign` (`unidade_id`),
CONSTRAINT `solucao_produtos_servicos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_inicio` datetime NOT NULL COMMENT 'Data de início do OKR',
`data_fim` datetime NOT NULL COMMENT 'Data final do OKR',
`data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento do OKR',
`nome` varchar(256) NOT NULL COMMENT 'Nome do OKR',
`unidade_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `okrs_unidade_id_foreign` (`unidade_id`),
CONSTRAINT `okrs_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| nome | varchar(250) | NO |  | NULL |
| sigla | varchar(20) | NO |  | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| descricao | text | NO |  | NULL |
| url | varchar(250) | NO |  | NULL |
| status | int(11) | NO |  | 0 |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_ativado | timestamp | YES |  | NULL |
| data_desativado | timestamp | YES |  | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | NO |  | NULL |
| data_arquivamento | datetime | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| unidade_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
solucao_produtos_servicos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
solucao_produtos_servicos	1	solucao_produtos_servicos_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
```

---

## status_justificativas

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
okrs	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
okrs	1	okrs_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## okrs_objetivos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`codigo` enum('ATIVO','AVALIADO','CANCELADO','CONCLUIDO','HOMOLOGANDO','AGUARDANDO_ASSINATURA','INCLUIDO','INICIADO','EM_RECURSO','SUSPENSO') NOT NULL COMMENT 'Status do artefato (plano de entregas, plano de trabalho, consolidação ou atividade)',
`justificativa` text NOT NULL COMMENT 'Justificativa da mudança para este status',
`plano_entrega_id` char(36) DEFAULT NULL,
`plano_trabalho_id` char(36) DEFAULT NULL,
`plano_trabalho_consolidacao_id` char(36) DEFAULT NULL,
`atividade_id` char(36) DEFAULT NULL,
`usuario_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `status_justificativas_plano_entrega_id_foreign` (`plano_entrega_id`),
KEY `status_justificativas_plano_trabalho_id_foreign` (`plano_trabalho_id`),
KEY `status_justificativas_plano_trabalho_consolidacao_id_foreign` (`plano_trabalho_consolidacao_id`),
KEY `status_justificativas_atividade_id_foreign` (`atividade_id`),
KEY `status_justificativas_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `status_justificativas_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `status_justificativas_plano_entrega_id_foreign` FOREIGN KEY (`plano_entrega_id`) REFERENCES `planos_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `status_justificativas_plano_trabalho_consolidacao_id_foreign` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `status_justificativas_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `status_justificativas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`sequencia` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequência utilizada para ordenar os objetivos',
`fundamentacao` varchar(256) NOT NULL COMMENT 'Fundamentação do objetivo',
`nome` varchar(256) NOT NULL COMMENT 'Nome do objetivo',
`cor` varchar(100) NOT NULL COMMENT 'Cor do objetivo',
`okr_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `okrs_objetivos_okr_id_foreign` (`okr_id`),
CONSTRAINT `okrs_objetivos_okr_id_foreign` FOREIGN KEY (`okr_id`) REFERENCES `okrs` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| codigo | enum('ATIVO','AVALIADO','CANCELADO','CONCLUIDO','HOMOLOGANDO','AGUARDANDO_ASSINATURA','INCLUIDO','INICIADO','EM_RECURSO','SUSPENSO') | NO |  | NULL |
| justificativa | text | NO |  | NULL |
| plano_entrega_id | char(36) | YES | MUL | NULL |
| plano_trabalho_id | char(36) | YES | MUL | NULL |
| plano_trabalho_consolidacao_id | char(36) | YES | MUL | NULL |
| atividade_id | char(36) | YES | MUL | NULL |
| id | char(36) | NO | PRI | NULL |
| usuario_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| sequencia | int(11) | NO |  | 0 |
| fundamentacao | varchar(256) | NO |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| cor | varchar(100) | NO |  | NULL |
| okr_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
status_justificativas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
status_justificativas	1	status_justificativas_plano_entrega_id_foreign	1	plano_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
status_justificativas	1	status_justificativas_plano_trabalho_id_foreign	1	plano_trabalho_id	A	0	NULL	NULL	YES	BTREE			NO
status_justificativas	1	status_justificativas_plano_trabalho_consolidacao_id_foreign	1	plano_trabalho_consolidacao_id	A	0	NULL	NULL	YES	BTREE			NO
status_justificativas	1	status_justificativas_atividade_id_foreign	1	atividade_id	A	0	NULL	NULL	YES	BTREE			NO
status_justificativas	1	status_justificativas_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
```

---

## templates

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
okrs_objetivos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
okrs_objetivos	1	okrs_objetivos_okr_id_foreign	1	okr_id	A	0	NULL	NULL		BTREE			NO
```

---

## okrs_objetivos_resultados_chaves

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`codigo` varchar(255) DEFAULT NULL COMMENT 'Código opcional para o template',
`numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número do template (Gerado pelo sistema)',
`especie` enum('SEI','TCR','OUTRO','NOTIFICACAO','RELATORIO') DEFAULT NULL,
`titulo` varchar(256) NOT NULL COMMENT 'Título do template',
`conteudo` longtext DEFAULT NULL COMMENT 'Comentário predefinida para a tarefa',
`dataset` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Dados da parametrização' CHECK (json_valid(`dataset`)),
`entidade_id` char(36) DEFAULT NULL,
`unidade_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `templates_numero_unique` (`numero`),
KEY `templates_entidade_id_foreign` (`entidade_id`),
KEY `templates_unidade_id_foreign` (`unidade_id`),
CONSTRAINT `templates_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `templates_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_inicio` datetime NOT NULL COMMENT 'Data inicial',
`data_fim` datetime DEFAULT NULL COMMENT 'Data final',
`descricao` varchar(256) NOT NULL COMMENT 'Descrição',
`meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Meta para a entrega' CHECK (json_valid(`meta`)),
`confianca` decimal(5,2) DEFAULT 0.00 COMMENT 'Nível % de confiança para atingir a meta',
`realizado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Valor realizado da entrega' CHECK (json_valid(`realizado`)),
`cor` varchar(100) NOT NULL COMMENT 'Cor do objetivo',
`okr_objetivo_id` char(36) NOT NULL,
`entrega_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `okrs_objetivos_resultados_chaves_okr_objetivo_id_foreign` (`okr_objetivo_id`),
KEY `okrs_objetivos_resultados_chaves_entrega_id_foreign` (`entrega_id`),
CONSTRAINT `okrs_objetivos_resultados_chaves_entrega_id_foreign` FOREIGN KEY (`entrega_id`) REFERENCES `entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `okrs_objetivos_resultados_chaves_okr_objetivo_id_foreign` FOREIGN KEY (`okr_objetivo_id`) REFERENCES `okrs_objetivos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| codigo | varchar(255) | YES |  | NULL |
| numero | int(11) | NO | UNI | 0 |
| especie | enum('SEI','TCR','OUTRO','NOTIFICACAO','RELATORIO') | YES |  | NULL |
| titulo | varchar(256) | NO |  | NULL |
| conteudo | longtext | YES |  | NULL |
| dataset | longtext | YES |  | NULL |
| id | char(36) | NO | PRI | NULL |
| entidade_id | char(36) | YES | MUL | NULL |
| created_at | timestamp | YES |  | NULL |
| unidade_id | char(36) | YES | MUL | NULL |

### Índices

```sql
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | YES |  | NULL |
| descricao | varchar(256) | NO |  | NULL |
| meta | longtext | NO |  | NULL |
| confianca | decimal(5,2) | YES |  | 0.00 |
| realizado | longtext | YES |  | NULL |
| cor | varchar(100) | NO |  | NULL |
| okr_objetivo_id | char(36) | NO | MUL | NULL |
| entrega_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
templates	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
templates	0	templates_numero_unique	1	numero	A	0	NULL	NULL		BTREE			NO
templates	1	templates_entidade_id_foreign	1	entidade_id	A	0	NULL	NULL	YES	BTREE			NO
templates	1	templates_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## tipos_atividades

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
okrs_objetivos_resultados_chaves	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
okrs_objetivos_resultados_chaves	1	okrs_objetivos_resultados_chaves_okr_objetivo_id_foreign	1	okr_objetivo_id	A	0	NULL	NULL		BTREE			NO
okrs_objetivos_resultados_chaves	1	okrs_objetivos_resultados_chaves_entrega_id_foreign	1	entrega_id	A	0	NULL	NULL		BTREE			NO
```

---

## perfis

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do tipo de atividade',
`esforco` double(8,2) NOT NULL COMMENT 'Tempo previsto para a execução da atividade (Horas decimais)',
`dias_planejado` double(8,2) NOT NULL COMMENT 'Sugestão de dias para conclusão da atividade independente de quando iniciado (influência no prazo da atividade)',
`etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Nome das etiquetas para a atividade' CHECK (json_valid(`etiquetas`)),
`checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Nome dos checklist para a atividade' CHECK (json_valid(`checklist`)),
`comentario` text DEFAULT NULL COMMENT 'Comentário predefinido para a atividade',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nivel` int(11) NOT NULL COMMENT 'Evita que usuários de nível inferior atribuam perfis de nível superior',
`nome` varchar(256) NOT NULL COMMENT 'Nome do perfil',
`descricao` text NOT NULL COMMENT 'Descrição do perfil',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| esforco | double(8,2) | NO |  | NULL |
| dias_planejado | double(8,2) | NO |  | NULL |
| etiquetas | longtext | YES |  | NULL |
| checklist | longtext | YES |  | NULL |
| comentario | text | YES |  | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nivel | int(11) | NO |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| descricao | text | NO |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_atividades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_avaliacoes

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
perfis	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## personal_access_tokens

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do tipo de avaliação',
`tipo` set('QUALITATIVO','QUANTITATIVO') NOT NULL COMMENT 'Se a nota será um número ou um conceito',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
`tokenable_type` varchar(255) NOT NULL,
`tokenable_id` char(36) NOT NULL,
`name` varchar(255) NOT NULL,
`token` varchar(64) NOT NULL,
`abilities` text DEFAULT NULL,
`last_used_at` timestamp NULL DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| tipo | set('QUALITATIVO','QUANTITATIVO') | NO |  | NULL |

### Índices

```sql
| id | bigint(20) unsigned | NO | PRI | NULL | auto_increment |
| tokenable_type | varchar(255) | NO | MUL | NULL |
| tokenable_id | char(36) | NO |  | NULL |
| name | varchar(255) | NO |  | NULL |
| token | varchar(64) | NO | UNI | NULL |
| abilities | text | YES |  | NULL |
| last_used_at | timestamp | YES |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_avaliacoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_avaliacoes_justificativas

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
personal_access_tokens	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
personal_access_tokens	0	personal_access_tokens_token_unique	1	token	A	0	NULL	NULL		BTREE			NO
personal_access_tokens	1	personal_access_tokens_tokenable_type_tokenable_id_index	1	tokenable_type	A	0	NULL	NULL		BTREE			NO
personal_access_tokens	1	personal_access_tokens_tokenable_type_tokenable_id_index	2	tokenable_id	A	0	NULL	NULL		BTREE			NO
```

---

## planejamentos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`tipo_avaliacao_nota_id` char(36) NOT NULL,
`tipo_justificativa_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `tipos_avaliacoes_justificativas_tipo_avaliacao_nota_id_foreign` (`tipo_avaliacao_nota_id`),
KEY `tipos_avaliacoes_justificativas_tipo_justificativa_id_foreign` (`tipo_justificativa_id`),
CONSTRAINT `tipos_avaliacoes_justificativas_tipo_avaliacao_nota_id_foreign` FOREIGN KEY (`tipo_avaliacao_nota_id`) REFERENCES `tipos_avaliacoes_notas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `tipos_avaliacoes_justificativas_tipo_justificativa_id_foreign` FOREIGN KEY (`tipo_justificativa_id`) REFERENCES `tipos_justificativas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do planejamento institucional',
`missao` text NOT NULL COMMENT 'Missão da entidade/unidade',
`visao` text NOT NULL COMMENT 'Visão da entidade/unidade',
`data_inicio` datetime NOT NULL COMMENT 'Data de início do planejamento institucional',
`data_fim` datetime NOT NULL COMMENT 'Data final do planejamento institucional',
`data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento do planejamento institucional',
`valores` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Valores da unidade' CHECK (json_valid(`valores`)),
`resultados_institucionais` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Resultados da unidade' CHECK (json_valid(`resultados_institucionais`)),
`entidade_id` char(36) NOT NULL,
`unidade_id` char(36) NOT NULL,
`planejamento_superior_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `planejamentos_entidade_id_foreign` (`entidade_id`),
KEY `planejamentos_unidade_id_foreign` (`unidade_id`),
KEY `planejamentos_planejamento_superior_id_foreign` (`planejamento_superior_id`),
CONSTRAINT `planejamentos_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planejamentos_planejamento_superior_id_foreign` FOREIGN KEY (`planejamento_superior_id`) REFERENCES `planejamentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planejamentos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| tipo_avaliacao_nota_id | char(36) | NO | MUL | NULL |
| tipo_justificativa_id | char(36) | NO | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| missao | text | NO |  | NULL |
| visao | text | NO |  | NULL |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | NO |  | NULL |
| data_arquivamento | datetime | YES |  | NULL |
| valores | longtext | NO |  | NULL |
| resultados_institucionais | longtext | YES |  | NULL |
| entidade_id | char(36) | NO | MUL | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| planejamento_superior_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_avaliacoes_justificativas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
tipos_avaliacoes_justificativas	1	tipos_avaliacoes_justificativas_tipo_avaliacao_nota_id_foreign	1	tipo_avaliacao_nota_id	A	0	NULL	NULL		BTREE			NO
tipos_avaliacoes_justificativas	1	tipos_avaliacoes_justificativas_tipo_justificativa_id_foreign	1	tipo_justificativa_id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_avaliacoes_notas

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planejamentos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planejamentos	1	planejamentos_entidade_id_foreign	1	entidade_id	A	0	NULL	NULL		BTREE			NO
planejamentos	1	planejamentos_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
planejamentos	1	planejamentos_planejamento_superior_id_foreign	1	planejamento_superior_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## planejamentos_objetivos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`sequencia` int(11) NOT NULL COMMENT 'Sequencia da nota (serve para ordenar as notas de forma crescente)',
`nota` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Nota' CHECK (json_valid(`nota`)),
`descricao` varchar(255) NOT NULL COMMENT 'Descrição da nota',
`pergunta` varchar(255) NOT NULL COMMENT 'Pergunta motivacional',
`aprova` tinyint(4) NOT NULL COMMENT 'Se essa nota aprova, quando aplicável',
`justifica` tinyint(4) NOT NULL COMMENT 'Se é obrigatório justificar essa nota',
`icone` varchar(100) NOT NULL COMMENT 'Classe do icone',
`cor` varchar(100) NOT NULL COMMENT 'Código da cor em hex',
`codigo` varchar(50) DEFAULT NULL COMMENT 'Código de integração',
`tipo_avaliacao_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `tipos_avaliacoes_notas_tipo_avaliacao_id_foreign` (`tipo_avaliacao_id`),
CONSTRAINT `tipos_avaliacoes_notas_tipo_avaliacao_id_foreign` FOREIGN KEY (`tipo_avaliacao_id`) REFERENCES `tipos_avaliacoes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`sequencia` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequência utilizada para ordenar os objetivos',
`fundamentacao` varchar(256) NOT NULL COMMENT 'Fundamentação do objetivo',
`nome` text NOT NULL,
`path` text DEFAULT NULL COMMENT 'IDs dos nós ascendentes separados por /, ou NULL caso seja um nó raiz',
`planejamento_id` char(36) NOT NULL,
`eixo_tematico_id` char(36) NOT NULL,
`objetivo_pai_id` char(36) DEFAULT NULL,
`objetivo_superior_id` char(36) DEFAULT NULL,
`integra_okr` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Objetivos que serão visíveis no OKR',
PRIMARY KEY (`id`),
KEY `planejamentos_objetivos_planejamento_id_foreign` (`planejamento_id`),
KEY `planejamentos_objetivos_eixo_tematico_id_foreign` (`eixo_tematico_id`),
KEY `planejamentos_objetivos_objetivo_pai_id_foreign` (`objetivo_pai_id`),
KEY `planejamentos_objetivos_objetivo_superior_id_foreign` (`objetivo_superior_id`),
CONSTRAINT `planejamentos_objetivos_eixo_tematico_id_foreign` FOREIGN KEY (`eixo_tematico_id`) REFERENCES `eixos_tematicos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planejamentos_objetivos_objetivo_pai_id_foreign` FOREIGN KEY (`objetivo_pai_id`) REFERENCES `planejamentos_objetivos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planejamentos_objetivos_objetivo_superior_id_foreign` FOREIGN KEY (`objetivo_superior_id`) REFERENCES `planejamentos_objetivos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planejamentos_objetivos_planejamento_id_foreign` FOREIGN KEY (`planejamento_id`) REFERENCES `planejamentos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| sequencia | int(11) | NO |  | NULL |
| nota | longtext | NO |  | NULL |
| descricao | varchar(255) | NO |  | NULL |
| pergunta | varchar(255) | NO |  | NULL |
| aprova | tinyint(4) | NO |  | NULL |
| justifica | tinyint(4) | NO |  | NULL |
| icone | varchar(100) | NO |  | NULL |
| cor | varchar(100) | NO |  | NULL |
| id | char(36) | NO | PRI | NULL |
| codigo | varchar(50) | YES |  | NULL |
| created_at | timestamp | YES |  | NULL |
| tipo_avaliacao_id | char(36) | NO | MUL | NULL |
| updated_at | timestamp | YES |  | NULL |

### Índices

```sql
| deleted_at | timestamp | YES |  | NULL |
| sequencia | int(11) | NO |  | 0 |
| fundamentacao | varchar(256) | NO |  | NULL |
| nome | text | NO |  | NULL |
| path | text | YES |  | NULL |
| planejamento_id | char(36) | NO | MUL | NULL |
| eixo_tematico_id | char(36) | NO | MUL | NULL |
| objetivo_pai_id | char(36) | YES | MUL | NULL |
| objetivo_superior_id | char(36) | YES | MUL | NULL |
| integra_okr | tinyint(1) | NO |  | 1 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_avaliacoes_notas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
tipos_avaliacoes_notas	1	tipos_avaliacoes_notas_tipo_avaliacao_id_foreign	1	tipo_avaliacao_id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_capacidades

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planejamentos_objetivos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planejamentos_objetivos	1	planejamentos_objetivos_planejamento_id_foreign	1	planejamento_id	A	0	NULL	NULL		BTREE			NO
planejamentos_objetivos	1	planejamentos_objetivos_eixo_tematico_id_foreign	1	eixo_tematico_id	A	0	NULL	NULL		BTREE			NO
planejamentos_objetivos	1	planejamentos_objetivos_objetivo_pai_id_foreign	1	objetivo_pai_id	A	0	NULL	NULL	YES	BTREE			NO
planejamentos_objetivos	1	planejamentos_objetivos_objetivo_superior_id_foreign	1	objetivo_superior_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## planos_entregas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`codigo` varchar(256) NOT NULL COMMENT 'Código da rotina no sistema (acesso)',
`descricao` text NOT NULL COMMENT 'Descrição da capacidade (acesso)',
`grupo_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `tipos_capacidades_codigo_unique` (`codigo`),
KEY `tipos_capacidades_grupo_id_foreign` (`grupo_id`),
CONSTRAINT `tipos_capacidades_grupo_id_foreign` FOREIGN KEY (`grupo_id`) REFERENCES `tipos_capacidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número do plano de entrega (Gerado pelo sistema)',
`data_inicio` datetime NOT NULL COMMENT 'Data inicial do plano de entregas',
`data_fim` datetime DEFAULT NULL COMMENT 'Data final do plano de entregas',
`data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento do plano de entregas',
`nome` varchar(256) NOT NULL COMMENT 'Nome do plano de entregas',
`status` enum('INCLUIDO','HOMOLOGANDO','ATIVO','CONCLUIDO','AVALIADO','SUSPENSO','CANCELADO') NOT NULL DEFAULT 'INCLUIDO' COMMENT 'Status atual do plano de entregas',
`planejamento_id` char(36) DEFAULT NULL,
`cadeia_valor_id` char(36) DEFAULT NULL,
`unidade_id` char(36) NOT NULL,
`plano_entrega_id` char(36) DEFAULT NULL,
`programa_id` char(36) NOT NULL,
`criacao_usuario_id` char(36) NOT NULL,
`avaliacao_id` char(36) DEFAULT NULL,
`okr_id` char(36) DEFAULT NULL,
`data_envio_api_pgd` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `planos_entregas_numero_unique` (`numero`),
KEY `planos_entregas_planejamento_id_foreign` (`planejamento_id`),
KEY `planos_entregas_cadeia_valor_id_foreign` (`cadeia_valor_id`),
KEY `planos_entregas_unidade_id_foreign` (`unidade_id`),
KEY `planos_entregas_plano_entrega_id_foreign` (`plano_entrega_id`),
KEY `planos_entregas_programa_id_foreign` (`programa_id`),
KEY `planos_entregas_criacao_usuario_id_foreign` (`criacao_usuario_id`),
KEY `planos_entregas_avaliacao_id_foreign` (`avaliacao_id`),
KEY `planos_entregas_okr_id_foreign` (`okr_id`),
CONSTRAINT `planos_entregas_avaliacao_id_foreign` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_cadeia_valor_id_foreign` FOREIGN KEY (`cadeia_valor_id`) REFERENCES `cadeias_valores` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_criacao_usuario_id_foreign` FOREIGN KEY (`criacao_usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_okr_id_foreign` FOREIGN KEY (`okr_id`) REFERENCES `okrs` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_planejamento_id_foreign` FOREIGN KEY (`planejamento_id`) REFERENCES `planejamentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_plano_entrega_id_foreign` FOREIGN KEY (`plano_entrega_id`) REFERENCES `planos_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_programa_id_foreign` FOREIGN KEY (`programa_id`) REFERENCES `programas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| codigo | varchar(256) | NO | UNI | NULL |
| descricao | text | NO |  | NULL |
| grupo_id | char(36) | YES | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| numero | int(11) | NO | UNI | 0 |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | YES |  | NULL |
| data_arquivamento | datetime | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| status | enum('INCLUIDO','HOMOLOGANDO','ATIVO','CONCLUIDO','AVALIADO','SUSPENSO','CANCELADO') | NO |  | INCLUIDO |
| planejamento_id | char(36) | YES | MUL | NULL |
| cadeia_valor_id | char(36) | YES | MUL | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| plano_entrega_id | char(36) | YES | MUL | NULL |
| programa_id | char(36) | NO | MUL | NULL |
| criacao_usuario_id | char(36) | NO | MUL | NULL |
| avaliacao_id | char(36) | YES | MUL | NULL |
| okr_id | char(36) | YES | MUL | NULL |
| data_envio_api_pgd | timestamp | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_capacidades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
tipos_capacidades	0	tipos_capacidades_codigo_unique	1	codigo	A	0	NULL	NULL		BTREE			NO
tipos_capacidades	1	tipos_capacidades_grupo_id_foreign	1	grupo_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## tipos_clientes

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_entregas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_entregas	0	planos_entregas_numero_unique	1	numero	A	0	NULL	NULL		BTREE			NO
planos_entregas	1	planos_entregas_planejamento_id_foreign	1	planejamento_id	A	0	NULL	NULL	YES	BTREE			NO
planos_entregas	1	planos_entregas_cadeia_valor_id_foreign	1	cadeia_valor_id	A	0	NULL	NULL	YES	BTREE			NO
planos_entregas	1	planos_entregas_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
planos_entregas	1	planos_entregas_plano_entrega_id_foreign	1	plano_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
planos_entregas	1	planos_entregas_programa_id_foreign	1	programa_id	A	0	NULL	NULL		BTREE			NO
planos_entregas	1	planos_entregas_criacao_usuario_id_foreign	1	criacao_usuario_id	A	0	NULL	NULL		BTREE			NO
planos_entregas	1	planos_entregas_avaliacao_id_foreign	1	avaliacao_id	A	0	NULL	NULL	YES	BTREE			NO
planos_entregas	1	planos_entregas_okr_id_foreign	1	okr_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## planos_entregas_entregas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`nome` varchar(255) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`homologado` tinyint(4) NOT NULL COMMENT 'Se a entrega foi ou não homologada',
`progresso_esperado` decimal(5,2) DEFAULT 0.00 COMMENT 'Percentual esperado de progresso do Plano de Entregas',
`progresso_realizado` decimal(5,2) DEFAULT 0.00 COMMENT 'Percentual realizado de progresso do Plano de Entregas',
`data_inicio` datetime NOT NULL COMMENT 'Data inicial da entrega',
`data_fim` datetime DEFAULT NULL COMMENT 'Data final da entrega',
`descricao` text NOT NULL,
`destinatario` varchar(255) DEFAULT NULL COMMENT 'Destinatário da entrega',
`meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Meta para a entrega' CHECK (json_valid(`meta`)),
`realizado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Valor realizado da entrega' CHECK (json_valid(`realizado`)),
`plano_entrega_id` char(36) NOT NULL,
`entrega_id` char(36) NOT NULL DEFAULT '1' COMMENT '(DC2Type:guid)',
`entrega_pai_id` char(36) DEFAULT NULL,
`unidade_id` char(36) NOT NULL,
`checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Checklist' CHECK (json_valid(`checklist`)),
`etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Etiquetas' CHECK (json_valid(`etiquetas`)),
`descricao_meta` longtext NOT NULL COMMENT 'Descrição da meta',
`descricao_entrega` longtext NOT NULL COMMENT 'Descrição do título da entrega',
PRIMARY KEY (`id`),
KEY `planos_entregas_entregas_plano_entrega_id_foreign` (`plano_entrega_id`),
KEY `planos_entregas_entregas_entrega_id_foreign` (`entrega_id`),
KEY `planos_entregas_entregas_entrega_pai_id_foreign` (`entrega_pai_id`),
KEY `planos_entregas_entregas_unidade_id_foreign` (`unidade_id`),
CONSTRAINT `planos_entregas_entregas_entrega_id_foreign` FOREIGN KEY (`entrega_id`) REFERENCES `entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_entregas_entrega_pai_id_foreign` FOREIGN KEY (`entrega_pai_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_entregas_plano_entrega_id_foreign` FOREIGN KEY (`plano_entrega_id`) REFERENCES `planos_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_entregas_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| nome | varchar(255) | NO |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| homologado | tinyint(4) | NO |  | NULL |
| progresso_esperado | decimal(5,2) | YES |  | 0.00 |
| progresso_realizado | decimal(5,2) | YES |  | 0.00 |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | YES |  | NULL |
| descricao | text | NO |  | NULL |
| destinatario | varchar(255) | YES |  | NULL |
| meta | longtext | NO |  | NULL |
| realizado | longtext | YES |  | NULL |
| plano_entrega_id | char(36) | NO | MUL | NULL |
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_clientes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
| entrega_id | char(36) | NO | MUL | 1 |
| entrega_pai_id | char(36) | YES | MUL | NULL |
```

---

## tipos_cursos

### Estrutura da Tabela

```sql
| unidade_id | char(36) | NO | MUL | NULL |
| checklist | longtext | YES |  | NULL |
| etiquetas | longtext | YES |  | NULL |
| descricao_meta | longtext | NO |  | NULL |
| descricao_entrega | longtext | NO |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do tipo do curso',
`ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Nome ativo ou inativo',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_entregas_entregas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas	1	planos_entregas_entregas_plano_entrega_id_foreign	1	plano_entrega_id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas	1	planos_entregas_entregas_entrega_id_foreign	1	entrega_id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas	1	planos_entregas_entregas_entrega_pai_id_foreign	1	entrega_pai_id	A	0	NULL	NULL	YES	BTREE			NO
planos_entregas_entregas	1	planos_entregas_entregas_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
```

---

## planos_entregas_entregas_objetivos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| ativo | tinyint(4) | NO |  | 1 |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`planejamento_objetivo_id` char(36) NOT NULL COMMENT 'Objetivo do Planejamento institucional ao qual está vinculado este objetivo',
`entrega_id` char(36) NOT NULL COMMENT 'Entrega do Plano de Entregas à qual está vinculado este objetivo',
PRIMARY KEY (`id`),
KEY `fk_plan_entr_entr_obj_id_planej_obj_id` (`planejamento_objetivo_id`),
KEY `fk_plan_ent_ent_id_plan_entr_entr_obj_id` (`entrega_id`),
CONSTRAINT `fk_plan_ent_ent_id_plan_entr_entr_obj_id` FOREIGN KEY (`entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_plan_entr_entr_obj_id_planej_obj_id` FOREIGN KEY (`planejamento_objetivo_id`) REFERENCES `planejamentos_objetivos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_cursos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_documentos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| planejamento_objetivo_id | char(36) | NO | MUL | NULL |
| entrega_id | char(36) | NO | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`codigo` varchar(50) DEFAULT NULL COMMENT 'Código do tipo de documento',
`nome` varchar(256) NOT NULL COMMENT 'Tipo do documento da requisição ou da entrega',
`entregavel` tinyint(4) NOT NULL COMMENT 'Se é um documento de entrega',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_entregas_entregas_objetivos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_objetivos	1	fk_plan_entr_entr_obj_id_planej_obj_id	1	planejamento_objetivo_id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_objetivos	1	fk_plan_ent_ent_id_plan_entr_entr_obj_id	1	entrega_id	A	0	NULL	NULL		BTREE			NO
```

---

## planos_entregas_entregas_processos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`cadeia_processo_id` char(36) NOT NULL,
`entrega_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `planos_entregas_entregas_processos_cadeia_processo_id_foreign` (`cadeia_processo_id`),
KEY `planos_entregas_entregas_processos_entrega_id_foreign` (`entrega_id`),
CONSTRAINT `planos_entregas_entregas_processos_cadeia_processo_id_foreign` FOREIGN KEY (`cadeia_processo_id`) REFERENCES `cadeias_valores_processos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_entregas_processos_entrega_id_foreign` FOREIGN KEY (`entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| deleted_at | timestamp | YES |  | NULL |
| codigo | varchar(50) | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| entregavel | tinyint(4) | NO |  | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| cadeia_processo_id | char(36) | NO | MUL | NULL |
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_documentos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
| entrega_id | char(36) | NO | MUL | NULL |

### Índices

```sql
```

---

## tipos_justificativas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Tipo da justificativa da avaliação',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_entregas_entregas_processos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_processos	1	planos_entregas_entregas_processos_cadeia_processo_id_foreign	1	cadeia_processo_id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_processos	1	planos_entregas_entregas_processos_entrega_id_foreign	1	entrega_id	A	0	NULL	NULL		BTREE			NO
```

---

## planos_entregas_entregas_progressos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`homologado` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se a entrega foi ou não homologada',
`progresso_esperado` decimal(5,2) DEFAULT 0.00 COMMENT 'Percentual esperado de progresso do Plano de Entregas',
`progresso_realizado` decimal(5,2) DEFAULT 0.00 COMMENT 'Percentual realizado de progresso do Plano de Entregas',
`data_inicio` datetime DEFAULT NULL COMMENT 'Data inicial da entrega',
`data_fim` datetime DEFAULT NULL COMMENT 'Data final da entrega',
`meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Meta para a entrega' CHECK (json_valid(`meta`)),
`realizado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Valor realizado da entrega' CHECK (json_valid(`realizado`)),
`data_progresso` date NOT NULL COMMENT 'Data do progresso',
`usuario_id` char(36) NOT NULL,
`plano_entrega_entrega_id` char(36) NOT NULL COMMENT 'Entrega do Plano de Entregas à qual está vinculado este progresso',
PRIMARY KEY (`id`),
KEY `planos_entregas_entregas_progressos_usuario_id_foreign` (`usuario_id`),
KEY `fk_plan_ent_ent_id_plan_entr_entr_pro_id` (`plano_entrega_entrega_id`),
CONSTRAINT `fk_plan_ent_ent_id_plan_entr_entr_pro_id` FOREIGN KEY (`plano_entrega_entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_entregas_entregas_progressos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_justificativas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_modalidades

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| homologado | tinyint(4) | NO |  | 0 |
| progresso_esperado | decimal(5,2) | YES |  | 0.00 |
| progresso_realizado | decimal(5,2) | YES |  | 0.00 |
| data_inicio | datetime | YES |  | NULL |
| data_fim | datetime | YES |  | NULL |
| meta | longtext | YES |  | NULL |
| realizado | longtext | YES |  | NULL |
| data_progresso | date | NO |  | NULL |
| usuario_id | char(36) | NO | MUL | NULL |
| plano_entrega_entrega_id | char(36) | NO | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome da modalidade',
`plano_trabalho_calcula_horas` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se o plano de trabalho calcula horas (considerando a carga horária e os dias)',
`atividade_tempo_despendido` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se calcula tempo despendido na atividade',
`atividade_esforco` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se utiliza esforço (tempo para execução) na atividade',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_entregas_entregas_progressos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_progressos	1	planos_entregas_entregas_progressos_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_progressos	1	fk_plan_ent_ent_id_plan_entr_entr_pro_id	1	plano_entrega_entrega_id	A	0	NULL	NULL		BTREE			NO
```

---

## planos_entregas_entregas_resultados_chaves

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| plano_trabalho_calcula_horas | tinyint(4) | NO |  | 0 |
| atividade_tempo_despendido | tinyint(4) | NO |  | 0 |
| atividade_esforco | tinyint(4) | NO |  | 0 |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`okr_objetivo_resultado_chave_id` char(36) NOT NULL COMMENT 'Resultado chave do OKR',
`entrega_id` char(36) NOT NULL COMMENT 'Entrega do Plano de Entregas à qual está vinculado',
PRIMARY KEY (`id`),
KEY `fk_plan_entr_entr_okr_id_resultado_chave` (`okr_objetivo_resultado_chave_id`),
KEY `fk_plan_ent_ent_id_plan_entr_entr_okr_id` (`entrega_id`),
CONSTRAINT `fk_plan_ent_ent_id_plan_entr_entr_okr_id` FOREIGN KEY (`entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_plan_entr_entr_okr_id_resultado_chave` FOREIGN KEY (`okr_objetivo_resultado_chave_id`) REFERENCES `okrs_objetivos_resultados_chaves` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_modalidades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_motivos_afastamentos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| okr_objetivo_resultado_chave_id | char(36) | NO | MUL | NULL |
| entrega_id | char(36) | NO | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`codigo` varchar(50) DEFAULT NULL COMMENT 'Código SIAPE do afastamento.',
`sigla` varchar(256) NOT NULL COMMENT 'Sigla do afastamento.',
`nome` varchar(256) NOT NULL COMMENT 'Descrição sucinta do afastamento.',
`calculo` enum('ACRESCIMO','DECRESCIMO') NOT NULL DEFAULT 'DECRESCIMO' COMMENT 'Usado para calcular as horas do agente público',
`data_inicio` datetime NOT NULL COMMENT 'Data inicial de ativação do afastamento nos sistemas estruturantes.',
`data_fim` datetime DEFAULT NULL COMMENT 'Data que especifica encerramento do uso do afastamento nos sistemas estruturantes.',
`situacao` varchar(100) NOT NULL COMMENT 'Confirma situação no SIAPE registrada no Sigepe Afastamentos.',
`icone` varchar(100) NOT NULL COMMENT 'Class do ícone relacionado ao afastamento',
`cor` varchar(100) NOT NULL COMMENT 'Código da cor em formato hex',
`horas` tinyint(4) NOT NULL COMMENT 'Se o afastamento é medido em horas',
`integracao` tinyint(4) NOT NULL COMMENT 'Se o tipo de motivo de afastamento é integrado a outro sistema',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_entregas_entregas_resultados_chaves	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_resultados_chaves	1	fk_plan_entr_entr_okr_id_resultado_chave	1	okr_objetivo_resultado_chave_id	A	0	NULL	NULL		BTREE			NO
planos_entregas_entregas_resultados_chaves	1	fk_plan_ent_ent_id_plan_entr_entr_okr_id	1	entrega_id	A	0	NULL	NULL		BTREE			NO
```

---

## planos_trabalhos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| codigo | varchar(50) | YES |  | NULL |
| sigla | varchar(256) | NO |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| calculo | enum('ACRESCIMO','DECRESCIMO') | NO |  | DECRESCIMO |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | YES |  | NULL |
| situacao | varchar(100) | NO |  | NULL |
| icone | varchar(100) | NO |  | NULL |
| cor | varchar(100) | NO |  | NULL |
| horas | tinyint(4) | NO |  | NULL |
| integracao | tinyint(4) | NO |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`carga_horaria` double(8,2) NOT NULL DEFAULT 0.00 COMMENT 'Carga horária diária do usuário',
`tempo_total` double(8,2) NOT NULL DEFAULT 0.00 COMMENT 'Horas úteis de trabalho no período de data_inicio à data_fim considerando carga_horaria, feriados, fins de semana',
`tempo_proporcional` double(8,2) NOT NULL DEFAULT 0.00 COMMENT 'tempo_total menos os afastamentos',
`numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número do plano de trabalho (Gerado pelo sistema)',
`data_inicio` datetime NOT NULL COMMENT 'Inicio do plano de trabalho',
`data_fim` datetime NOT NULL COMMENT 'Fim do plano de trabalho',
`data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento do plano de trabalho',
`forma_contagem_carga_horaria` enum('DIA','SEMANA','MES') NOT NULL DEFAULT 'DIA' COMMENT 'Forma de contagem padrão da carga horária',
`status` enum('INCLUIDO','AGUARDANDO_ASSINATURA','ATIVO','CONCLUIDO','AVALIADO','SUSPENSO','CANCELADO') NOT NULL DEFAULT 'INCLUIDO' COMMENT 'Status atual do plano de trabalho',
`programa_id` char(36) NOT NULL,
`usuario_id` char(36) NOT NULL,
`unidade_id` char(36) NOT NULL,
`tipo_modalidade_id` char(36) NOT NULL,
`criacao_usuario_id` char(36) NOT NULL,
`documento_id` char(36) DEFAULT NULL,
`criterios_avaliacao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT json_array() COMMENT 'Critérios para avaliação' CHECK (json_valid(`criterios_avaliacao`)),
`data_envio_api_pgd` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `planos_trabalhos_numero_unique` (`numero`),
KEY `planos_trabalhos_programa_id_foreign` (`programa_id`),
KEY `planos_trabalhos_usuario_id_foreign` (`usuario_id`),
KEY `planos_trabalhos_unidade_id_foreign` (`unidade_id`),
KEY `planos_trabalhos_tipo_modalidade_id_foreign` (`tipo_modalidade_id`),
KEY `planos_trabalhos_criacao_usuario_id_foreign` (`criacao_usuario_id`),
KEY `planos_trabalhos_documento_id_foreign` (`documento_id`),
CONSTRAINT `planos_trabalhos_criacao_usuario_id_foreign` FOREIGN KEY (`criacao_usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_programa_id_foreign` FOREIGN KEY (`programa_id`) REFERENCES `programas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_tipo_modalidade_id_foreign` FOREIGN KEY (`tipo_modalidade_id`) REFERENCES `tipos_modalidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_motivos_afastamentos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_processos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| carga_horaria | double(8,2) | NO |  | 0.00 |
| tempo_total | double(8,2) | NO |  | 0.00 |
| tempo_proporcional | double(8,2) | NO |  | 0.00 |
| numero | int(11) | NO | UNI | 0 |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | NO |  | NULL |
| data_arquivamento | datetime | YES |  | NULL |
| forma_contagem_carga_horaria | enum('DIA','SEMANA','MES') | NO |  | DIA |
| status | enum('INCLUIDO','AGUARDANDO_ASSINATURA','ATIVO','CONCLUIDO','AVALIADO','SUSPENSO','CANCELADO') | NO |  | INCLUIDO |
| programa_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | NO | MUL | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| tipo_modalidade_id | char(36) | NO | MUL | NULL |
| criacao_usuario_id | char(36) | NO | MUL | NULL |
| documento_id | char(36) | YES | MUL | NULL |
| criterios_avaliacao | longtext | NO |  | json_array() |
| data_envio_api_pgd | timestamp | YES |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` text NOT NULL COMMENT 'Nome do Tipo de Processo',
`codigo` varchar(50) DEFAULT NULL COMMENT 'Código do tipo de Processo',
`etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Nome das etiquetas predefinidas' CHECK (json_valid(`etiquetas`)),
`checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Nome dos checklist predefinidas' CHECK (json_valid(`checklist`)),
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_trabalhos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos	0	planos_trabalhos_numero_unique	1	numero	A	0	NULL	NULL		BTREE			NO
planos_trabalhos	1	planos_trabalhos_programa_id_foreign	1	programa_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos	1	planos_trabalhos_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos	1	planos_trabalhos_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos	1	planos_trabalhos_tipo_modalidade_id_foreign	1	tipo_modalidade_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos	1	planos_trabalhos_criacao_usuario_id_foreign	1	criacao_usuario_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos	1	planos_trabalhos_documento_id_foreign	1	documento_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## planos_trabalhos_consolidacoes

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | text | NO |  | NULL |
| codigo | varchar(50) | YES |  | NULL |
| etiquetas | longtext | NO |  | NULL |
| checklist | longtext | NO |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_inicio` date NOT NULL COMMENT 'Data inicial da consolidacão',
`data_fim` date NOT NULL COMMENT 'Data final da consolidação',
`data_conclusao` datetime DEFAULT NULL COMMENT 'Data da conclusão (usado como referência para o snapshot das atividades)',
`status` enum('INCLUIDO','CONCLUIDO','AVALIADO') NOT NULL DEFAULT 'INCLUIDO' COMMENT 'Status atual da consolidação',
`plano_trabalho_id` char(36) NOT NULL,
`avaliacao_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `planos_trabalhos_consolidacoes_plano_trabalho_id_foreign` (`plano_trabalho_id`),
KEY `planos_trabalhos_consolidacoes_avaliacao_id_foreign` (`avaliacao_id`),
CONSTRAINT `planos_trabalhos_consolidacoes_avaliacao_id_foreign` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_consolidacoes_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_processos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_projetos

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_inicio | date | NO |  | NULL |
| data_fim | date | NO |  | NULL |
| data_conclusao | datetime | YES |  | NULL |
| status | enum('INCLUIDO','CONCLUIDO','AVALIADO') | NO |  | INCLUIDO |
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Descrição do tipo da projeto',
`icone` varchar(100) NOT NULL COMMENT 'Classe do icone',
`cor` varchar(100) NOT NULL COMMENT 'Código da cor em hex',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| plano_trabalho_id | char(36) | NO | MUL | NULL |
| avaliacao_id | char(36) | YES | MUL | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_trabalhos_consolidacoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_consolidacoes	1	planos_trabalhos_consolidacoes_plano_trabalho_id_foreign	1	plano_trabalho_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_consolidacoes	1	planos_trabalhos_consolidacoes_avaliacao_id_foreign	1	avaliacao_id	A	0	NULL	NULL	YES	BTREE			NO
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
```

---

## planos_trabalhos_consolidacoes_afastamentos

### Estrutura da Tabela

```sql
| nome | varchar(256) | NO |  | NULL |
| icone | varchar(100) | NO |  | NULL |
| cor | varchar(100) | NO |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`snapshot` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snapshot do registro de atividades' CHECK (json_valid(`snapshot`)),
`data_conclusao` datetime NOT NULL COMMENT 'Data e hora da conclusao',
`plano_trabalho_consolidacao_id` char(36) DEFAULT NULL COMMENT 'Consolidação do Plano de Trabalho à qual se refere o status',
`afastamento_id` char(36) DEFAULT NULL COMMENT 'Atividade à qual se refere o status',
PRIMARY KEY (`id`),
KEY `fk_plan_trb_cons_afst_id_plan_trb_cons_id` (`plano_trabalho_consolidacao_id`),
KEY `fk_afastamentos_afst_id_afastamentos_id` (`afastamento_id`),
CONSTRAINT `fk_afastamentos_afst_id_afastamentos_id` FOREIGN KEY (`afastamento_id`) REFERENCES `afastamentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_plan_trb_cons_afst_id_plan_trb_cons_id` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_projetos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_tarefas

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| snapshot | longtext | NO |  | NULL |
| data_conclusao | datetime | NO |  | NULL |
| plano_trabalho_consolidacao_id | char(36) | YES | MUL | NULL |
| afastamento_id | char(36) | YES | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do tipo de tarefa',
`tempo_estimado` double(8,2) NOT NULL COMMENT 'Tempo estimado para a execução do tipo de tarefa (Horas decimais)',
`documental` tinyint(4) NOT NULL COMMENT 'Se o tipo de tarefa requer obrigatoriamente um documento',
`comentario` text DEFAULT NULL COMMENT 'Comentário predefinida para o tipo de tarefa',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_trabalhos_consolidacoes_afastamentos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_consolidacoes_afastamentos	1	fk_plan_trb_cons_afst_id_plan_trb_cons_id	1	plano_trabalho_consolidacao_id	A	0	NULL	NULL	YES	BTREE			NO
planos_trabalhos_consolidacoes_afastamentos	1	fk_afastamentos_afst_id_afastamentos_id	1	afastamento_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## planos_trabalhos_consolidacoes_atividades

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| tempo_estimado | double(8,2) | NO |  | NULL |
| documental | tinyint(4) | NO |  | NULL |
| comentario | text | YES |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`snapshot` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snapshot do registro de atividades' CHECK (json_valid(`snapshot`)),
`data_conclusao` datetime NOT NULL COMMENT 'Data e hora da conclusao',
`plano_trabalho_consolidacao_id` char(36) DEFAULT NULL COMMENT 'Consolidação do Plano de Trabalho à qual se refere o status',
`atividade_id` char(36) DEFAULT NULL COMMENT 'Atividade à qual se refere o status',
PRIMARY KEY (`id`),
KEY `fk_plan_trb_cons_id_plan_trb_cons_id` (`plano_trabalho_consolidacao_id`),
KEY `fk_atividades_id_atividades_id` (`atividade_id`),
CONSTRAINT `fk_atividades_id_atividades_id` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_plan_trb_cons_id_plan_trb_cons_id` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_tarefas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## unidades

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| snapshot | longtext | NO |  | NULL |
| data_conclusao | datetime | NO |  | NULL |
| plano_trabalho_consolidacao_id | char(36) | YES | MUL | NULL |
| atividade_id | char(36) | YES | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`codigo` varchar(12) DEFAULT NULL COMMENT 'Código da unidade',
`sigla` varchar(100) NOT NULL COMMENT 'Sigla da unidade',
`nome` varchar(256) NOT NULL COMMENT 'Nome da unidade',
`instituidora` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se a unidade é instituidora (Programas)',
`path` text DEFAULT NULL COMMENT 'Path dos nós pais separados por /, ou NULL caso sejam nós raiz',
`texto_complementar_plano` longtext DEFAULT NULL COMMENT 'Campo de mensagem adicional do plano de trabalho',
`atividades_arquivamento_automatico` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se arquiva automaticamente após conclusão',
`atividades_avaliacao_automatico` tinyint(4) NOT NULL DEFAULT 0,
`planos_prazo_comparecimento` int(11) NOT NULL DEFAULT 10,
`planos_tipo_prazo_comparecimento` varchar(255) NOT NULL DEFAULT 'DIAS',
`data_inativacao` datetime DEFAULT NULL COMMENT 'Data em que a unidade foi inativada, se for o caso',
`distribuicao_forma_contagem_prazos` set('HORAS_CORRIDAS','DIAS_CORRIDOS','HORAS_UTEIS','DIAS_UTEIS') NOT NULL DEFAULT 'DIAS_UTEIS' COMMENT 'Forma da contagem de prazo',
`entrega_forma_contagem_prazos` set('HORAS_CORRIDAS','HORAS_UTEIS') NOT NULL DEFAULT 'HORAS_UTEIS' COMMENT 'Forma da contagem de horas para entrega',
`autoedicao_subordinadas` tinyint(4) NOT NULL DEFAULT 1,
`etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configuração das etiquetas que serão utilizadas nas atividades (contém nome, icone e cor)' CHECK (json_valid(`etiquetas`)),
`checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Nome dos checklist' CHECK (json_valid(`checklist`)),
`notificacoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)' CHECK (json_valid(`notificacoes`)),
`expediente` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configuração de expediente da unidade' CHECK (json_valid(`expediente`)),
`cidade_id` char(36) DEFAULT NULL,
`unidade_pai_id` char(36) DEFAULT NULL,
`entidade_id` char(36) NOT NULL,
`informal` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Sinaliza se unidade é informal',
`data_modificacao` datetime DEFAULT NULL COMMENT 'Data de modificação informada pelo SIAPE.',
PRIMARY KEY (`id`),
KEY `unidades_cidade_id_foreign` (`cidade_id`),
KEY `unidades_unidade_pai_id_foreign` (`unidade_pai_id`),
KEY `unidades_entidade_id_foreign` (`entidade_id`),
KEY `unidades_codigo_index` (`codigo`),
FULLTEXT KEY `unidades_path_fulltext` (`path`),
CONSTRAINT `unidades_cidade_id_foreign` FOREIGN KEY (`cidade_id`) REFERENCES `cidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `unidades_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `unidades_unidade_pai_id_foreign` FOREIGN KEY (`unidade_pai_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_trabalhos_consolidacoes_atividades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_consolidacoes_atividades	1	fk_plan_trb_cons_id_plan_trb_cons_id	1	plano_trabalho_consolidacao_id	A	0	NULL	NULL	YES	BTREE			NO
planos_trabalhos_consolidacoes_atividades	1	fk_atividades_id_atividades_id	1	atividade_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## planos_trabalhos_consolidacoes_ocorrencias

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| codigo | varchar(12) | YES | MUL | NULL |
| sigla | varchar(100) | NO |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| instituidora | tinyint(4) | NO |  | 0 |
| path | text | YES | MUL | NULL |
| texto_complementar_plano | longtext | YES |  | NULL |
| atividades_arquivamento_automatico | tinyint(4) | NO |  | 0 |
| atividades_avaliacao_automatico | tinyint(4) | NO |  | 0 |
| planos_prazo_comparecimento | int(11) | NO |  | 10 |
| planos_tipo_prazo_comparecimento | varchar(255) | NO |  | DIAS |
| data_inativacao | datetime | YES |  | NULL |
| distribuicao_forma_contagem_prazos | set('HORAS_CORRIDAS','DIAS_CORRIDOS','HORAS_UTEIS','DIAS_UTEIS') | NO |  | DIAS_UTEIS |
| entrega_forma_contagem_prazos | set('HORAS_CORRIDAS','HORAS_UTEIS') | NO |  | HORAS_UTEIS |
| autoedicao_subordinadas | tinyint(4) | NO |  | 1 |
| etiquetas | longtext | YES |  | NULL |
| checklist | longtext | YES |  | NULL |
| notificacoes | longtext | YES |  | NULL |
| expediente | longtext | YES |  | NULL |
| cidade_id | char(36) | YES | MUL | NULL |
| unidade_pai_id | char(36) | YES | MUL | NULL |
| entidade_id | char(36) | NO | MUL | NULL |
| informal | tinyint(4) | NO |  | 0 |
| data_modificacao | datetime | YES |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`plano_trabalho_consolidacao_id` char(36) NOT NULL COMMENT 'Consolidação do Plano de Trabalho à qual está associada esta entrega',
`snapshot` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snapshot do registro de atividades' CHECK (json_valid(`snapshot`)),
`data_conclusao` datetime NOT NULL COMMENT 'Data e hora da conclusao',
`ocorrencia_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `fk_plan_trab_cons_id_plan_trab_cons_ocor_id` (`plano_trabalho_consolidacao_id`),
KEY `planos_trabalhos_consolidacoes_ocorrencias_ocorrencia_id_foreign` (`ocorrencia_id`),
CONSTRAINT `fk_plan_trab_cons_id_plan_trab_cons_ocor_id` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_consolidacoes_ocorrencias_ocorrencia_id_foreign` FOREIGN KEY (`ocorrencia_id`) REFERENCES `ocorrencias` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
unidades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
unidades	1	unidades_cidade_id_foreign	1	cidade_id	A	0	NULL	NULL	YES	BTREE			NO
unidades	1	unidades_unidade_pai_id_foreign	1	unidade_pai_id	A	0	NULL	NULL	YES	BTREE			NO
unidades	1	unidades_entidade_id_foreign	1	entidade_id	A	0	NULL	NULL		BTREE			NO
unidades	1	unidades_codigo_index	1	codigo	A	0	NULL	NULL	YES	BTREE			NO
unidades	1	unidades_path_fulltext	1	path	NULL	NULL	NULL	NULL	YES	FULLTEXT			NO
```

---

## unidades_integrantes

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| plano_trabalho_consolidacao_id | char(36) | NO | MUL | NULL |
| snapshot | longtext | NO |  | NULL |
| data_conclusao | datetime | NO |  | NULL |
| ocorrencia_id | char(36) | NO | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`unidade_id` char(36) NOT NULL,
`usuario_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `unidades_integrantes_unidade_id_foreign` (`unidade_id`),
KEY `unidades_integrantes_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `unidades_integrantes_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `unidades_integrantes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_trabalhos_consolidacoes_ocorrencias	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_consolidacoes_ocorrencias	1	fk_plan_trab_cons_id_plan_trab_cons_ocor_id	1	plano_trabalho_consolidacao_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_consolidacoes_ocorrencias	1	planos_trabalhos_consolidacoes_ocorrencias_ocorrencia_id_foreign	1	ocorrencia_id	A	0	NULL	NULL		BTREE			NO
```

---

## planos_trabalhos_entregas

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | NO | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`forca_trabalho` decimal(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Percentual da força de trabalho associado a esta entrega',
`meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Meta para a entrega' CHECK (json_valid(`meta`)),
`orgao` varchar(256) DEFAULT NULL COMMENT 'Órgão externo',
`descricao` text NOT NULL,
`plano_trabalho_id` char(36) NOT NULL,
`plano_entrega_entrega_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `planos_trabalhos_entregas_plano_trabalho_id_foreign` (`plano_trabalho_id`),
KEY `planos_trabalhos_entregas_plano_entrega_entrega_id_foreign` (`plano_entrega_entrega_id`),
CONSTRAINT `planos_trabalhos_entregas_plano_entrega_entrega_id_foreign` FOREIGN KEY (`plano_entrega_entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `planos_trabalhos_entregas_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
unidades_integrantes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
unidades_integrantes	1	unidades_integrantes_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
unidades_integrantes	1	unidades_integrantes_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
```

---

## unidades_integrantes_atribuicoes

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| forca_trabalho | decimal(5,2) | NO |  | 0.00 |
| meta | longtext | YES |  | NULL |
| orgao | varchar(256) | YES |  | NULL |
| descricao | text | NO |  | NULL |
| plano_trabalho_id | char(36) | NO | MUL | NULL |
| plano_entrega_entrega_id | char(36) | YES | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`atribuicao` set('AVALIADOR_PLANO_ENTREGA','AVALIADOR_PLANO_TRABALHO','HOMOLOGADOR_PLANO_ENTREGA','COLABORADOR','GESTOR','GESTOR_SUBSTITUTO','GESTOR_DELEGADO','LOTADO','CURADOR') DEFAULT NULL COMMENT 'Vínculo que o servidor tem com a unidade',
`unidade_integrante_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `unidades_integrantes_atribuicoes_unidade_integrante_id_foreign` (`unidade_integrante_id`),
CONSTRAINT `unidades_integrantes_atribuicoes_unidade_integrante_id_foreign` FOREIGN KEY (`unidade_integrante_id`) REFERENCES `unidades_integrantes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
planos_trabalhos_entregas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_entregas	1	planos_trabalhos_entregas_plano_trabalho_id_foreign	1	plano_trabalho_id	A	0	NULL	NULL		BTREE			NO
planos_trabalhos_entregas	1	planos_trabalhos_entregas_plano_entrega_entrega_id_foreign	1	plano_entrega_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## produto_clientes

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| atribuicao | set('AVALIADOR_PLANO_ENTREGA','AVALIADOR_PLANO_TRABALHO','HOMOLOGADOR_PLANO_ENTREGA','COLABORADOR','GESTOR','GESTOR_SUBSTITUTO','GESTOR_DELEGADO','LOTADO','CURADOR') | YES |  | NULL |
| unidade_integrante_id | char(36) | NO | MUL | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`produto_id` char(36) NOT NULL,
`cliente_id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `produto_clientes_produto_id_foreign` (`produto_id`),
KEY `produto_clientes_cliente_id_foreign` (`cliente_id`),
CONSTRAINT `produto_clientes_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
CONSTRAINT `produto_clientes_produto_id_foreign` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
unidades_integrantes_atribuicoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
unidades_integrantes_atribuicoes	1	unidades_integrantes_atribuicoes_unidade_integrante_id_foreign	1	unidade_integrante_id	A	0	NULL	NULL		BTREE			NO
```

---

## usuarios

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| produto_id | char(36) | NO | MUL | NULL |
| cliente_id | char(36) | NO | MUL | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |

### Índices

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`remember_token` varchar(100) DEFAULT NULL,
`email` varchar(100) NOT NULL COMMENT 'E-mail do usuário',
`nome` varchar(256) NOT NULL COMMENT 'Nome do usuário',
`password` varchar(255) DEFAULT NULL COMMENT 'Senha do usuário',
`cpf` varchar(14) NOT NULL COMMENT 'CPF do usuário',
`matricula` varchar(50) DEFAULT NULL COMMENT 'Matrícula funcional do usuário',
`apelido` varchar(100) NOT NULL COMMENT 'Apelido/Nome de guerra/Nome social',
`telefone` varchar(50) DEFAULT NULL COMMENT 'Telefone do usuário',
`data_nascimento` datetime DEFAULT NULL,
`id_google` varchar(50) DEFAULT NULL COMMENT 'Id associado com o usuário do login do google',
`url_foto` varchar(255) DEFAULT NULL COMMENT 'URL da foto do usuário (temporário)',
`texto_complementar_plano` longtext DEFAULT NULL COMMENT 'Campo de mensagem adicional do plano de trabalho',
`foto_perfil` text DEFAULT NULL COMMENT 'Foto padrão do perfil',
`foto_google` text DEFAULT NULL COMMENT 'Foto do G-Suit (Google)',
`foto_microsoft` text DEFAULT NULL COMMENT 'Foto do Azure (Microsoft)',
`foto_firebase` text DEFAULT NULL COMMENT 'Foto do Firebase (Google, Facebook, Instagram, Twiter, etc...)',
`id_sei` text DEFAULT NULL COMMENT 'Id do usuário no SUPER',
`uf` char(2) DEFAULT NULL COMMENT 'UF do usuário',
`email_verified_at` timestamp NULL DEFAULT NULL COMMENT 'Data de verificação do e-mail do usuário',
`sexo` enum('MASCULINO','FEMININO') DEFAULT NULL COMMENT 'Sexo do usuário',
`situacao_funcional` enum('ATIVO_PERMANENTE','APOSENTADO','CEDIDO/REQUISITADO','NOMEADO_CARGO_COMISSIONADO','SEM_VINCULO','TABELISTA(ESP/EMERG)','NATUREZA_ESPECIAL','ATIVO_EM_OUTRO_ORGAO','REDISTRIBUIDO','ATIVO_TRANSITORIO','EXCEDENTE_A_LOTACAO','EM_DISPONIBILIDADE','REQUISITADO_DE_OUTROS_ORGAOS','INSTITUIDOR_PENSAO','REQUISITADO_MILITAR_FORCAS_ARMADAS','APOSENTADO_TCU733/94','EXERCICIO_DESCENTRALIZADO_CARREIRA','EXERCICIO_PROVISORIO','CELETISTA','ATIVO_PERMANENTE_LEI_8878/94','ANISTIADO_ADCT_CF','CELETISTA/EMPREGADO','CLT_ANS_DECISAO_JUDICIAL','CLT_ANS_JUDICIAL_CEDIDO','CLT_APOS_COMPLEMENTO','CLT_APOS_DECISAO_JUDICIAL','INST_PS_DECISAO_JUDICIAL','EMPREGO_PUBLICO','REFORMA_CBM/PM','RESERVA_CBM/PM','REQUISITADO_MILITAR_GDF','ANISTIADO_PUBLICO_L10559','ANISTIADO_PRIVADO_L10559','ATIVO_DECISAO_JUDICIAL','CONTRATO_TEMPORARIO','COLAB_PCCTAE_E_MAGISTERIO','COLABORADOR_ICT','CLT_ANS_DEC_6657/08','EXERCICIO_7_ART93_8112','CEDIDO_SUS/LEI_8270','INST_ANIST_PUBLICO','INST_ANIST_PRIVADO','CELETISTA_DECISAO_JUDICIAL','CONTRATO_TEMPORARIO_CLT','EMPREGO_PCC/EX-TERRITORIO','EXC_INDISCIPLINA','CONTRATO_PROFESSOR_SUBSTITUTO','ESTAGIARIO','ESTAGIARIO_SIGEPE','RESIDENCIA_E_PMM','APOSENTADO_TEMPORARIRIO','CEDIDO_DF_ESTADO_MUNICIPIO','EXERC_DESCEN_CDT','EXERC_LEI_13681/18','PENSIONISTA','BENEFICIARIO_PENSAO','QE/MRE_CEDIDO','QUADRO_ESPEC_QE/MRE','DESCONHECIDO') NOT NULL DEFAULT 'ATIVO_PERMANENTE' COMMENT 'Vínculo do usuário com a administração.',
`config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações do usuário' CHECK (json_valid(`config`)),
`notificacoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)' CHECK (json_valid(`notificacoes`)),
`metadados` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Metadados do usuário' CHECK (json_valid(`metadados`)),
`perfil_id` char(36) DEFAULT NULL,
`data_modificacao` datetime DEFAULT NULL COMMENT 'Data de modificação informada pelo SIAPE.',
`nome_jornada` varchar(100) DEFAULT NULL COMMENT 'Codigo da Jornada',
`cod_jornada` int(11) DEFAULT NULL COMMENT 'Nome da Jornada',
`data_envio_api_pgd` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `usuarios_email_unique` (`email`),
UNIQUE KEY `usuarios_cpf_unique` (`cpf`),
KEY `usuarios_perfil_id_foreign` (`perfil_id`),
CONSTRAINT `usuarios_perfil_id_foreign` FOREIGN KEY (`perfil_id`) REFERENCES `perfis` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
produto_clientes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
produto_clientes	1	produto_clientes_produto_id_foreign	1	produto_id	A	0	NULL	NULL		BTREE			NO
produto_clientes	1	produto_clientes_cliente_id_foreign	1	cliente_id	A	0	NULL	NULL		BTREE			NO
```

---

## produto_processo_cadeia_valor

### Estrutura da Tabela

```sql
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| remember_token | varchar(100) | YES |  | NULL |
| email | varchar(100) | NO | UNI | NULL |
| nome | varchar(256) | NO |  | NULL |
`id` char(36) NOT NULL,
`produto_id` char(36) NOT NULL,
`cadeia_valor_processo_id` char(36) NOT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `produto_processo_cadeia_valor_produto_id_foreign` (`produto_id`),
KEY `produto_processo_cadeia_valor_cadeia_valor_processo_id_foreign` (`cadeia_valor_processo_id`),
CONSTRAINT `produto_processo_cadeia_valor_cadeia_valor_processo_id_foreign` FOREIGN KEY (`cadeia_valor_processo_id`) REFERENCES `cadeias_valores_processos` (`id`) ON DELETE CASCADE,
CONSTRAINT `produto_processo_cadeia_valor_produto_id_foreign` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| password | varchar(255) | YES |  | NULL |
| cpf | varchar(14) | NO | UNI | NULL |
| matricula | varchar(50) | YES |  | NULL |
| apelido | varchar(100) | NO |  | NULL |
| telefone | varchar(50) | YES |  | NULL |
| data_nascimento | datetime | YES |  | NULL |
| id_google | varchar(50) | YES |  | NULL |
| url_foto | varchar(255) | YES |  | NULL |
| texto_complementar_plano | longtext | YES |  | NULL |
| foto_perfil | text | YES |  | NULL |
| foto_google | text | YES |  | NULL |
| foto_microsoft | text | YES |  | NULL |
| foto_firebase | text | YES |  | NULL |
| id_sei | text | YES |  | NULL |
| uf | char(2) | YES |  | NULL |
| email_verified_at | timestamp | YES |  | NULL |
| sexo | enum('MASCULINO','FEMININO') | YES |  | NULL |
| situacao_funcional | enum('ATIVO_PERMANENTE','APOSENTADO','CEDIDO/REQUISITADO','NOMEADO_CARGO_COMISSIONADO','SEM_VINCULO','TABELISTA(ESP/EMERG)','NATUREZA_ESPECIAL','ATIVO_EM_OUTRO_ORGAO','REDISTRIBUIDO','ATIVO_TRANSITORIO','EXCEDENTE_A_LOTACAO','EM_DISPONIBILIDADE','REQUISITADO_DE_OUTROS_ORGAOS','INSTITUIDOR_PENSAO','REQUISITADO_MILITAR_FORCAS_ARMADAS','APOSENTADO_TCU733/94','EXERCICIO_DESCENTRALIZADO_CARREIRA','EXERCICIO_PROVISORIO','CELETISTA','ATIVO_PERMANENTE_LEI_8878/94','ANISTIADO_ADCT_CF','CELETISTA/EMPREGADO','CLT_ANS_DECISAO_JUDICIAL','CLT_ANS_JUDICIAL_CEDIDO','CLT_APOS_COMPLEMENTO','CLT_APOS_DECISAO_JUDICIAL','INST_PS_DECISAO_JUDICIAL','EMPREGO_PUBLICO','REFORMA_CBM/PM','RESERVA_CBM/PM','REQUISITADO_MILITAR_GDF','ANISTIADO_PUBLICO_L10559','ANISTIADO_PRIVADO_L10559','ATIVO_DECISAO_JUDICIAL','CONTRATO_TEMPORARIO','COLAB_PCCTAE_E_MAGISTERIO','COLABORADOR_ICT','CLT_ANS_DEC_6657/08','EXERCICIO_7_ART93_8112','CEDIDO_SUS/LEI_8270','INST_ANIST_PUBLICO','INST_ANIST_PRIVADO','CELETISTA_DECISAO_JUDICIAL','CONTRATO_TEMPORARIO_CLT','EMPREGO_PCC/EX-TERRITORIO','EXC_INDISCIPLINA','CONTRATO_PROFESSOR_SUBSTITUTO','ESTAGIARIO','ESTAGIARIO_SIGEPE','RESIDENCIA_E_PMM','APOSENTADO_TEMPORARIRIO','CEDIDO_DF_ESTADO_MUNICIPIO','EXERC_DESCEN_CDT','EXERC_LEI_13681/18','PENSIONISTA','BENEFICIARIO_PENSAO','QE/MRE_CEDIDO','QUADRO_ESPEC_QE/MRE','DESCONHECIDO') | NO |  | ATIVO_PERMANENTE |
| config | longtext | YES |  | NULL |
| notificacoes | longtext | YES |  | NULL |
| metadados | longtext | YES |  | NULL |
| perfil_id | char(36) | YES | MUL | NULL |
| data_modificacao | datetime | YES |  | NULL |
| nome_jornada | varchar(100) | YES |  | NULL |
| cod_jornada | int(11) | YES |  | NULL |
| data_envio_api_pgd | timestamp | YES |  | NULL |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| produto_id | char(36) | NO | MUL | NULL |
| cadeia_valor_processo_id | char(36) | NO | MUL | NULL |
| deleted_at | timestamp | YES |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
usuarios	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
usuarios	0	usuarios_email_unique	1	email	A	0	NULL	NULL		BTREE			NO
usuarios	0	usuarios_cpf_unique	1	cpf	A	0	NULL	NULL		BTREE			NO
usuarios	1	usuarios_perfil_id_foreign	1	perfil_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## view_api_pgd

### Estrutura da Tabela

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
produto_processo_cadeia_valor	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
produto_processo_cadeia_valor	1	produto_processo_cadeia_valor_produto_id_foreign	1	produto_id	A	0	NULL	NULL		BTREE			NO
produto_processo_cadeia_valor	1	produto_processo_cadeia_valor_cadeia_valor_processo_id_foreign	1	cadeia_valor_processo_id	A	0	NULL	NULL		BTREE			NO
```

---

## produto_produto

### Estrutura da Tabela

```sql
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
`id` char(36) NOT NULL,
`produto_base_id` char(36) NOT NULL,
`produto_id` char(36) NOT NULL,
`tipo` enum('input','output') NOT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `produto_produto_produto_base_id_produto_id_unique` (`produto_base_id`,`produto_id`),
KEY `produto_produto_produto_id_foreign` (`produto_id`),
CONSTRAINT `produto_produto_produto_base_id_foreign` FOREIGN KEY (`produto_base_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE,
CONSTRAINT `produto_produto_produto_id_foreign` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO |
| tipo | varchar(12) | YES |  | NULL |
| json_audit | longtext | YES |  | NULL |
| fonte | int(2) | NO |  | 0 |

### Índices

```sql
| id | char(36) | NO | PRI | NULL |
| produto_base_id | char(36) | NO | MUL | NULL |
| produto_id | char(36) | NO | MUL | NULL |
| tipo | enum('input','output') | NO |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |

### Índices

```sql
```

---

Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
produto_produto	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
produto_produto	0	produto_produto_produto_base_id_produto_id_unique	1	produto_base_id	A	0	NULL	NULL		BTREE			NO
produto_produto	0	produto_produto_produto_base_id_produto_id_unique	2	produto_id	A	0	NULL	NULL		BTREE			NO
produto_produto	1	produto_produto_produto_id_foreign	1	produto_id	A	0	NULL	NULL		BTREE			NO
```

---

## produtos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`nome` varchar(100) NOT NULL,
`nome_fantasia` varchar(255) DEFAULT NULL,
`tipo` enum('produto','servico') NOT NULL,
`descricao` varchar(255) NOT NULL,
`url` text DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`unidade_id` char(36) NOT NULL,
`data_ativado` timestamp NULL DEFAULT NULL,
`data_desativado` timestamp NULL DEFAULT NULL,
`identificador` bigint(20) unsigned NOT NULL,
PRIMARY KEY (`id`),
KEY `produtos_unidade_id_foreign` (`unidade_id`),
CONSTRAINT `produtos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| nome | varchar(100) | NO |  | NULL |
| nome_fantasia | varchar(255) | YES |  | NULL |
| tipo | enum('produto','servico') | NO |  | NULL |
| descricao | varchar(255) | NO |  | NULL |
| url | text | YES |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| data_ativado | timestamp | YES |  | NULL |
| data_desativado | timestamp | YES |  | NULL |
| identificador | bigint(20) unsigned | NO |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
produtos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
produtos	1	produtos_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
```

---

## programas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(255) NOT NULL COMMENT 'Nome do programa',
`normativa` varchar(255) DEFAULT NULL COMMENT 'Normativa que regula o programa de gestão',
`prazo_max_plano_entrega` int(11) NOT NULL COMMENT 'Limite máximo de dias corridos para o plano de entregas (Zero para não limitar)',
`termo_obrigatorio` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o termo é ou não obrigatório',
`config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações do programa' CHECK (json_valid(`config`)),
`data_inicio` datetime NOT NULL COMMENT 'Inicio da vigência do programa',
`data_fim` datetime NOT NULL COMMENT 'Fim da vigência do programa',
`periodicidade_consolidacao` enum('DIAS','SEMANAL','QUINZENAL','MENSAL','BIMESTRAL','TRIMESTRAL','SEMESTRAL') NOT NULL DEFAULT 'MENSAL' COMMENT 'Período para avaliação do plano de trabalho',
`periodicidade_valor` int(11) NOT NULL DEFAULT 1 COMMENT 'Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do mês para o restante',
`dias_tolerancia_consolidacao` int(11) NOT NULL DEFAULT 10 COMMENT 'Dias de tolerância para o lançamento do registro das atividades na consolidação, após esses dias será liberado automaticamente para avaliação',
`dias_tolerancia_avaliacao` int(11) NOT NULL DEFAULT 20 COMMENT 'Dias de tolerância para realizar a avaliação, considerando a tolerância da consolidação. Caso seja zero não fará nada, caso contrário após esse prazo a consolidação será automaticamente avaliada com a nota padrão',
`dias_tolerancia_recurso_avaliacao` int(11) NOT NULL DEFAULT 20 COMMENT 'Dias de tolerância para recorrer da avaliação',
`nota_padrao_avaliacao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Nota padrão de avaliação, para quando o gestor não realizar a avaliação dentro do prazo' CHECK (json_valid(`nota_padrao_avaliacao`)),
`checklist_avaliacao_entregas_plano_entrega` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Checklist para avaliar das entregas do plano de entrega' CHECK (json_valid(`checklist_avaliacao_entregas_plano_entrega`)),
`checklist_avaliacao_entregas_plano_trabalho` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Checklist para avaliar das entregas do plano de trabalho' CHECK (json_valid(`checklist_avaliacao_entregas_plano_trabalho`)),
`registra_comparecimento` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se utiliza registro de comparecimento nas consolidações do plano de trabalho',
`plano_trabalho_assinatura_participante` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Exigir assinatura do usuário no plano de trabalho',
`plano_trabalho_assinatura_gestor_lotacao` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Exigir assinatura do gestor da unidade de lotação do servidor',
`plano_trabalho_assinatura_gestor_unidade` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Exigir assinatura do gestor da unidade executora do plano de trabalho',
`plano_trabalho_assinatura_gestor_entidade` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Exigir assinatura do gestor da entidade do plano de trabalho',
`tipo_avaliacao_plano_trabalho_id` char(36) NOT NULL,
`tipo_avaliacao_plano_entrega_id` char(36) NOT NULL,
`tipo_justificativa_id` char(36) DEFAULT NULL,
`unidade_id` char(36) NOT NULL,
`template_tcr_id` char(36) DEFAULT NULL,
`tipo_documento_tcr_id` char(36) DEFAULT NULL,
`documento_id` char(36) DEFAULT NULL,
`plano_trabalho_criterios_avaliacao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT json_array() COMMENT 'Critérios para avaliação do plano de trabalho' CHECK (json_valid(`plano_trabalho_criterios_avaliacao`)),
`link_normativa` varchar(255) DEFAULT NULL COMMENT 'Link da normativa que regula o programa de gestão',
`unidade_autorizadora_id` char(36) DEFAULT NULL,
`link_autorizacao` varchar(255) DEFAULT NULL COMMENT 'Link da normativa que autoriza o programa de gestão',
PRIMARY KEY (`id`),
KEY `programas_tipo_avaliacao_plano_trabalho_id_foreign` (`tipo_avaliacao_plano_trabalho_id`),
KEY `programas_tipo_avaliacao_plano_entrega_id_foreign` (`tipo_avaliacao_plano_entrega_id`),
KEY `programas_tipo_justificativa_id_foreign` (`tipo_justificativa_id`),
KEY `programas_unidade_id_foreign` (`unidade_id`),
KEY `programas_template_tcr_id_foreign` (`template_tcr_id`),
KEY `programas_tipo_documento_tcr_id_foreign` (`tipo_documento_tcr_id`),
KEY `programas_documento_id_foreign` (`documento_id`),
KEY `programas_unidade_autorizadora_id_foreign` (`unidade_autorizadora_id`),
CONSTRAINT `programas_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `programas_template_tcr_id_foreign` FOREIGN KEY (`template_tcr_id`) REFERENCES `templates` (`id`) ON UPDATE CASCADE,
CONSTRAINT `programas_tipo_avaliacao_plano_entrega_id_foreign` FOREIGN KEY (`tipo_avaliacao_plano_entrega_id`) REFERENCES `tipos_avaliacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `programas_tipo_avaliacao_plano_trabalho_id_foreign` FOREIGN KEY (`tipo_avaliacao_plano_trabalho_id`) REFERENCES `tipos_avaliacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `programas_tipo_documento_tcr_id_foreign` FOREIGN KEY (`tipo_documento_tcr_id`) REFERENCES `tipos_documentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `programas_tipo_justificativa_id_foreign` FOREIGN KEY (`tipo_justificativa_id`) REFERENCES `tipos_justificativas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `programas_unidade_autorizadora_id_foreign` FOREIGN KEY (`unidade_autorizadora_id`) REFERENCES `unidades` (`id`),
CONSTRAINT `programas_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(255) | NO |  | NULL |
| normativa | varchar(255) | YES |  | NULL |
| prazo_max_plano_entrega | int(11) | NO |  | NULL |
| termo_obrigatorio | tinyint(4) | NO |  | 1 |
| config | longtext | YES |  | NULL |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | NO |  | NULL |
| periodicidade_consolidacao | enum('DIAS','SEMANAL','QUINZENAL','MENSAL','BIMESTRAL','TRIMESTRAL','SEMESTRAL') | NO |  | MENSAL |
| periodicidade_valor | int(11) | NO |  | 1 |
| dias_tolerancia_consolidacao | int(11) | NO |  | 10 |
| dias_tolerancia_avaliacao | int(11) | NO |  | 20 |
| dias_tolerancia_recurso_avaliacao | int(11) | NO |  | 20 |
| nota_padrao_avaliacao | longtext | YES |  | NULL |
| checklist_avaliacao_entregas_plano_entrega | longtext | YES |  | NULL |
| checklist_avaliacao_entregas_plano_trabalho | longtext | YES |  | NULL |
| registra_comparecimento | tinyint(4) | NO |  | 1 |
| plano_trabalho_assinatura_participante | tinyint(4) | NO |  | 1 |
| plano_trabalho_assinatura_gestor_lotacao | tinyint(4) | NO |  | 0 |
| plano_trabalho_assinatura_gestor_unidade | tinyint(4) | NO |  | 0 |
| plano_trabalho_assinatura_gestor_entidade | tinyint(4) | NO |  | 0 |
| tipo_avaliacao_plano_trabalho_id | char(36) | NO | MUL | NULL |
| tipo_avaliacao_plano_entrega_id | char(36) | NO | MUL | NULL |
| tipo_justificativa_id | char(36) | YES | MUL | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| template_tcr_id | char(36) | YES | MUL | NULL |
| tipo_documento_tcr_id | char(36) | YES | MUL | NULL |
| documento_id | char(36) | YES | MUL | NULL |
| plano_trabalho_criterios_avaliacao | longtext | YES |  | json_array() |
| link_normativa | varchar(255) | YES |  | NULL |
| unidade_autorizadora_id | char(36) | YES | MUL | NULL |
| link_autorizacao | varchar(255) | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
programas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
programas	1	programas_tipo_avaliacao_plano_trabalho_id_foreign	1	tipo_avaliacao_plano_trabalho_id	A	0	NULL	NULL		BTREE			NO
programas	1	programas_tipo_avaliacao_plano_entrega_id_foreign	1	tipo_avaliacao_plano_entrega_id	A	0	NULL	NULL		BTREE			NO
programas	1	programas_tipo_justificativa_id_foreign	1	tipo_justificativa_id	A	0	NULL	NULL	YES	BTREE			NO
programas	1	programas_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
programas	1	programas_template_tcr_id_foreign	1	template_tcr_id	A	0	NULL	NULL	YES	BTREE			NO
programas	1	programas_tipo_documento_tcr_id_foreign	1	tipo_documento_tcr_id	A	0	NULL	NULL	YES	BTREE			NO
programas	1	programas_documento_id_foreign	1	documento_id	A	0	NULL	NULL	YES	BTREE			NO
programas	1	programas_unidade_autorizadora_id_foreign	1	unidade_autorizadora_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## programas_participantes

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`habilitado` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o participante está habilitado ou não para o programa',
`programa_id` char(36) NOT NULL,
`usuario_id` char(36) NOT NULL,
`documento_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `programas_participantes_programa_id_foreign` (`programa_id`),
KEY `programas_participantes_usuario_id_foreign` (`usuario_id`),
KEY `programas_participantes_documento_id_foreign` (`documento_id`),
CONSTRAINT `programas_participantes_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`),
CONSTRAINT `programas_participantes_programa_id_foreign` FOREIGN KEY (`programa_id`) REFERENCES `programas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `programas_participantes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| habilitado | tinyint(4) | NO |  | 1 |
| programa_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | NO | MUL | NULL |
| documento_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
programas_participantes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
programas_participantes	1	programas_participantes_programa_id_foreign	1	programa_id	A	0	NULL	NULL		BTREE			NO
programas_participantes	1	programas_participantes_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
programas_participantes	1	programas_participantes_documento_id_foreign	1	documento_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## projetos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número do projeto (Gerado pelo sistema)',
`nome` varchar(256) NOT NULL COMMENT 'Nome do projeto',
`descricao` varchar(256) NOT NULL COMMENT 'Descrição do projeto',
`finalidade` varchar(256) NOT NULL COMMENT 'Descrição do projeto',
`status` enum('PLANEJADO','INICIADO','CONCLUIDO','SUSPENSO','CANCELADO') NOT NULL COMMENT 'Status do projeto',
`data_inicio` datetime NOT NULL COMMENT 'Inicio do projeto',
`data_fim` datetime NOT NULL COMMENT 'Fim do projeto',
`data_inicio_baseline` datetime DEFAULT NULL COMMENT 'Inicio do projeto (Baseline)',
`data_fim_baseline` datetime DEFAULT NULL COMMENT 'Fim do projeto (Baseline)',
`custo` decimal(15,2) NOT NULL COMMENT 'Custo: Será a soma dos recursos, ou a soma dos filhos caso tem_filhos e soma_custos_filhos',
`calcula_custos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o projeto calcula custos',
`tempo_corrido` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se o tempo é corrido ou usa a configuração de fins de semana, feriados e horário do expediente (quando usar horas)',
`usa_baseline` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o projeto utiliza baseline',
`usa_horas` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se usa horas nas datas',
`calcula_intervalo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se calcula o início e término automaticamente pelos filhos',
`agrupador` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso)',
`soma_progresso_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos)',
`aloca_proprios_recursos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se possui recursos próprios',
`soma_recusos_alocados_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Mostra o somatório dos recursos filhos',
`custos_proprios` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se possui custos próprios',
`soma_custos_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Mostra o somatório dos custos filhos',
`duracao` double(8,2) NOT NULL COMMENT 'Duração do projeto',
`progresso` decimal(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Percentual de progresso do projeto',
`kanban_dockers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configuração das Labels das swimlanes do quadro Kanban' CHECK (json_valid(`kanban_dockers`)),
`expediente` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configuração de expediente' CHECK (json_valid(`expediente`)),
`usuario_id` char(36) DEFAULT NULL,
`tipo_projeto_id` char(36) DEFAULT NULL,
`fase_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `projetos_numero_unique` (`numero`),
KEY `projetos_usuario_id_foreign` (`usuario_id`),
KEY `projetos_tipo_projeto_id_foreign` (`tipo_projeto_id`),
KEY `projetos_fase_id_foreign` (`fase_id`),
CONSTRAINT `projetos_fase_id_foreign` FOREIGN KEY (`fase_id`) REFERENCES `projetos_fases` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_tipo_projeto_id_foreign` FOREIGN KEY (`tipo_projeto_id`) REFERENCES `tipos_projetos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| numero | int(11) | NO | UNI | 0 |
| nome | varchar(256) | NO |  | NULL |
| descricao | varchar(256) | NO |  | NULL |
| finalidade | varchar(256) | NO |  | NULL |
| status | enum('PLANEJADO','INICIADO','CONCLUIDO','SUSPENSO','CANCELADO') | NO |  | NULL |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | NO |  | NULL |
| data_inicio_baseline | datetime | YES |  | NULL |
| data_fim_baseline | datetime | YES |  | NULL |
| custo | decimal(15,2) | NO |  | NULL |
| calcula_custos | tinyint(4) | NO |  | 1 |
| tempo_corrido | tinyint(4) | NO |  | 0 |
| usa_baseline | tinyint(4) | NO |  | 1 |
| usa_horas | tinyint(4) | NO |  | 1 |
| calcula_intervalo | tinyint(4) | NO |  | 1 |
| agrupador | tinyint(4) | NO |  | 0 |
| soma_progresso_filhos | tinyint(4) | NO |  | 1 |
| aloca_proprios_recursos | tinyint(4) | NO |  | 1 |
| soma_recusos_alocados_filhos | tinyint(4) | NO |  | 1 |
| custos_proprios | tinyint(4) | NO |  | 1 |
| soma_custos_filhos | tinyint(4) | NO |  | 1 |
| duracao | double(8,2) | NO |  | NULL |
| progresso | decimal(5,2) | NO |  | 0.00 |
| kanban_dockers | longtext | YES |  | NULL |
| expediente | longtext | YES |  | NULL |
| usuario_id | char(36) | YES | MUL | NULL |
| tipo_projeto_id | char(36) | YES | MUL | NULL |
| fase_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos	0	projetos_numero_unique	1	numero	A	0	NULL	NULL		BTREE			NO
projetos	1	projetos_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL	YES	BTREE			NO
projetos	1	projetos_tipo_projeto_id_foreign	1	tipo_projeto_id	A	0	NULL	NULL	YES	BTREE			NO
projetos	1	projetos_fase_id_foreign	1	fase_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## projetos_alocacoes

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`descricao` varchar(256) NOT NULL COMMENT 'Descrição',
`quantidade` double(8,2) NOT NULL COMMENT 'Quantidade do recurso',
`projeto_id` char(36) NOT NULL,
`tarefa_id` char(36) DEFAULT NULL,
`recurso_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `projetos_alocacoes_projeto_id_foreign` (`projeto_id`),
KEY `projetos_alocacoes_tarefa_id_foreign` (`tarefa_id`),
KEY `projetos_alocacoes_recurso_id_foreign` (`recurso_id`),
CONSTRAINT `projetos_alocacoes_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_alocacoes_recurso_id_foreign` FOREIGN KEY (`recurso_id`) REFERENCES `projetos_recursos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_alocacoes_tarefa_id_foreign` FOREIGN KEY (`tarefa_id`) REFERENCES `projetos_tarefas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| descricao | varchar(256) | NO |  | NULL |
| quantidade | double(8,2) | NO |  | NULL |
| projeto_id | char(36) | NO | MUL | NULL |
| tarefa_id | char(36) | YES | MUL | NULL |
| recurso_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_alocacoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_alocacoes	1	projetos_alocacoes_projeto_id_foreign	1	projeto_id	A	0	NULL	NULL		BTREE			NO
projetos_alocacoes	1	projetos_alocacoes_tarefa_id_foreign	1	tarefa_id	A	0	NULL	NULL	YES	BTREE			NO
projetos_alocacoes	1	projetos_alocacoes_recurso_id_foreign	1	recurso_id	A	0	NULL	NULL		BTREE			NO
```

---

## projetos_alocacoes_regras

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`projeto_alocacao_id` char(36) NOT NULL,
`regra_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `projetos_alocacoes_regras_projeto_alocacao_id_foreign` (`projeto_alocacao_id`),
KEY `projetos_alocacoes_regras_regra_id_foreign` (`regra_id`),
CONSTRAINT `projetos_alocacoes_regras_projeto_alocacao_id_foreign` FOREIGN KEY (`projeto_alocacao_id`) REFERENCES `projetos_alocacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_alocacoes_regras_regra_id_foreign` FOREIGN KEY (`regra_id`) REFERENCES `projetos_regras` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| projeto_alocacao_id | char(36) | NO | MUL | NULL |
| regra_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_alocacoes_regras	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_alocacoes_regras	1	projetos_alocacoes_regras_projeto_alocacao_id_foreign	1	projeto_alocacao_id	A	0	NULL	NULL		BTREE			NO
projetos_alocacoes_regras	1	projetos_alocacoes_regras_regra_id_foreign	1	regra_id	A	0	NULL	NULL		BTREE			NO
```

---

## projetos_fases

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_inicio` datetime DEFAULT NULL COMMENT 'Inicio (opcional)',
`data_fim` datetime DEFAULT NULL COMMENT 'Fim (opcional)',
`cor` varchar(100) NOT NULL COMMENT 'Código da cor em formato hex',
`nome` varchar(100) NOT NULL COMMENT 'Nome',
`descricao` varchar(256) NOT NULL COMMENT 'Descrição',
`projeto_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `projetos_fases_projeto_id_foreign` (`projeto_id`),
CONSTRAINT `projetos_fases_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_inicio | datetime | YES |  | NULL |
| data_fim | datetime | YES |  | NULL |
| cor | varchar(100) | NO |  | NULL |
| nome | varchar(100) | NO |  | NULL |
| descricao | varchar(256) | NO |  | NULL |
| projeto_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_fases	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_fases	1	projetos_fases_projeto_id_foreign	1	projeto_id	A	0	NULL	NULL		BTREE			NO
```

---

## projetos_historicos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_modificacao` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Data e hora da modificação',
`completo` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se o delta corresponde ao objeto completo',
`delta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Delta do objeto (ou objeto completo)' CHECK (json_valid(`delta`)),
`projeto_id` char(36) NOT NULL,
`usuario_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `projetos_historicos_projeto_id_foreign` (`projeto_id`),
KEY `projetos_historicos_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `projetos_historicos_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_historicos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_modificacao | datetime | NO |  | current_timestamp() |
| completo | tinyint(4) | NO |  | 0 |
| delta | longtext | NO |  | NULL |
| projeto_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_historicos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_historicos	1	projetos_historicos_projeto_id_foreign	1	projeto_id	A	0	NULL	NULL		BTREE			NO
projetos_historicos	1	projetos_historicos_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
```

---

## projetos_recursos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do recurso',
`tipo` enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO') NOT NULL COMMENT 'Tipo do recurso',
`unidade_medida` enum('UNIDADE','CAIXA','METRO','KILO','LITRO','DUZIA','MONETARIO','HORAS','DIAS','PACOTE') NOT NULL COMMENT 'Unidade do recurso',
`valor` decimal(15,2) NOT NULL COMMENT 'Valor',
`projeto_id` char(36) NOT NULL,
`usuario_id` char(36) DEFAULT NULL,
`unidade_id` char(36) DEFAULT NULL,
`material_servico_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `projetos_recursos_projeto_id_foreign` (`projeto_id`),
KEY `projetos_recursos_usuario_id_foreign` (`usuario_id`),
KEY `projetos_recursos_unidade_id_foreign` (`unidade_id`),
KEY `projetos_recursos_material_servico_id_foreign` (`material_servico_id`),
CONSTRAINT `projetos_recursos_material_servico_id_foreign` FOREIGN KEY (`material_servico_id`) REFERENCES `materiais_servicos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_recursos_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_recursos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_recursos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| tipo | enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO') | NO |  | NULL |
| unidade_medida | enum('UNIDADE','CAIXA','METRO','KILO','LITRO','DUZIA','MONETARIO','HORAS','DIAS','PACOTE') | NO |  | NULL |
| valor | decimal(15,2) | NO |  | NULL |
| projeto_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | YES | MUL | NULL |
| unidade_id | char(36) | YES | MUL | NULL |
| material_servico_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_recursos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_recursos	1	projetos_recursos_projeto_id_foreign	1	projeto_id	A	0	NULL	NULL		BTREE			NO
projetos_recursos	1	projetos_recursos_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL	YES	BTREE			NO
projetos_recursos	1	projetos_recursos_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL	YES	BTREE			NO
projetos_recursos	1	projetos_recursos_material_servico_id_foreign	1	material_servico_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## projetos_regras

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome da regra',
`tipo_recurso` enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO') NOT NULL DEFAULT 'MATERIAL' COMMENT 'Tipo do recurso que se aplica a regra',
`finalidade` enum('OUTRA','ESCRITORIO_PROJETO','GERENTE_PROJETO','GERENTE_RISCO','GERENTE_COMUNICACAO','GERENTE_RECURSO','PATROCINADOR','GESTOR_NEGOCIAL','MEMBRO') NOT NULL COMMENT 'Finalidade/Papel',
`perfis` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Perfis de capacidade aplicáveis a quem possuir a regra' CHECK (json_valid(`perfis`)),
`projeto_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `projetos_regras_projeto_id_foreign` (`projeto_id`),
CONSTRAINT `projetos_regras_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| tipo_recurso | enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO') | NO |  | MATERIAL |
| finalidade | enum('OUTRA','ESCRITORIO_PROJETO','GERENTE_PROJETO','GERENTE_RISCO','GERENTE_COMUNICACAO','GERENTE_RECURSO','PATROCINADOR','GESTOR_NEGOCIAL','MEMBRO') | NO |  | NULL |
| perfis | longtext | YES |  | NULL |
| projeto_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_regras	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_regras	1	projetos_regras_projeto_id_foreign	1	projeto_id	A	0	NULL	NULL		BTREE			NO
```

---

## projetos_tarefas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`indice` int(11) NOT NULL COMMENT 'Indice da sequencia da tarefa',
`path` text NOT NULL COMMENT 'Path dos nós pais',
`nome` varchar(256) NOT NULL COMMENT 'Nome da tarefa',
`descricao` varchar(256) NOT NULL COMMENT 'Descricao da tarefa',
`data_inicio` datetime DEFAULT NULL COMMENT 'Inicio da tarefa',
`data_fim` datetime DEFAULT NULL COMMENT 'Fim da tarefa',
`data_inicio_baseline` datetime DEFAULT NULL COMMENT 'Inicio do projeto (Baseline)',
`data_fim_baseline` datetime DEFAULT NULL COMMENT 'Fim do projeto (Baseline)',
`duracao` double(8,2) NOT NULL COMMENT 'Duração da atividade. Se a duração for 0 e sintéfico for falso então irá se comportar apenas como um grupo',
`progresso` decimal(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Percentual de progresso da tarefa',
`inicio_marco` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se o início é um marco',
`termino_marco` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se o término é um marco',
`tem_filhos` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se é um registro sintético (resumo)',
`agrupador` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso)',
`soma_progresso_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos)',
`status` enum('PLANEJADO','INICIADO','CONCLUIDO','FALHO','SUSPENSO','CANCELADO','AGUARDANDO') NOT NULL COMMENT 'Status',
`contraido` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se esta contraído',
`custo` decimal(15,2) NOT NULL COMMENT 'Custo: Será a soma dos recursos, ou a soma dos filhos caso tem_filhos e soma_custos_filhos',
`calcula_intervalo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se calcula o início e término automaticamente pelos filhos (somente se tem_filhos)',
`aloca_proprios_recursos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se possui recursos próprios (somente se tem_filhos)',
`soma_recusos_alocados_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Mostra o somatório dos recursos filhos (somente se tem_filhos)',
`custos_proprios` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se possui custos próprios (somente se tem_filhos), se não tem filhos sempre será true',
`soma_custos_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Mostra o somatório dos custos filhos (somente se tem_filhos)',
`etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Etiquetas' CHECK (json_valid(`etiquetas`)),
`documento_id` char(36) DEFAULT NULL,
`projeto_id` char(36) NOT NULL,
`tarefa_pai_id` char(36) DEFAULT NULL,
`tarefa_projeto_id` char(36) DEFAULT NULL,
`atividade_id` char(36) DEFAULT NULL,
`usuario_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `projetos_tarefas_documento_id_foreign` (`documento_id`),
KEY `projetos_tarefas_projeto_id_foreign` (`projeto_id`),
KEY `projetos_tarefas_tarefa_pai_id_foreign` (`tarefa_pai_id`),
KEY `projetos_tarefas_tarefa_projeto_id_foreign` (`tarefa_projeto_id`),
KEY `projetos_tarefas_atividade_id_foreign` (`atividade_id`),
KEY `projetos_tarefas_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `projetos_tarefas_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_tarefas_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_tarefas_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_tarefas_tarefa_pai_id_foreign` FOREIGN KEY (`tarefa_pai_id`) REFERENCES `projetos_tarefas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_tarefas_tarefa_projeto_id_foreign` FOREIGN KEY (`tarefa_projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_tarefas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| indice | int(11) | NO |  | NULL |
| path | text | NO |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| descricao | varchar(256) | NO |  | NULL |
| data_inicio | datetime | YES |  | NULL |
| data_fim | datetime | YES |  | NULL |
| data_inicio_baseline | datetime | YES |  | NULL |
| data_fim_baseline | datetime | YES |  | NULL |
| duracao | double(8,2) | NO |  | NULL |
| progresso | decimal(5,2) | NO |  | 0.00 |
| inicio_marco | tinyint(4) | NO |  | 0 |
| termino_marco | tinyint(4) | NO |  | 0 |
| tem_filhos | tinyint(4) | NO |  | 0 |
| agrupador | tinyint(4) | NO |  | 0 |
| soma_progresso_filhos | tinyint(4) | NO |  | 1 |
| status | enum('PLANEJADO','INICIADO','CONCLUIDO','FALHO','SUSPENSO','CANCELADO','AGUARDANDO') | NO |  | NULL |
| contraido | tinyint(4) | NO |  | 0 |
| custo | decimal(15,2) | NO |  | NULL |
| calcula_intervalo | tinyint(4) | NO |  | 1 |
| aloca_proprios_recursos | tinyint(4) | NO |  | 1 |
| soma_recusos_alocados_filhos | tinyint(4) | NO |  | 1 |
| custos_proprios | tinyint(4) | NO |  | 1 |
| soma_custos_filhos | tinyint(4) | NO |  | 1 |
| etiquetas | longtext | YES |  | NULL |
| documento_id | char(36) | YES | MUL | NULL |
| projeto_id | char(36) | NO | MUL | NULL |
| tarefa_pai_id | char(36) | YES | MUL | NULL |
| tarefa_projeto_id | char(36) | YES | MUL | NULL |
| atividade_id | char(36) | YES | MUL | NULL |
| usuario_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_tarefas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_tarefas	1	projetos_tarefas_documento_id_foreign	1	documento_id	A	0	NULL	NULL	YES	BTREE			NO
projetos_tarefas	1	projetos_tarefas_projeto_id_foreign	1	projeto_id	A	0	NULL	NULL		BTREE			NO
projetos_tarefas	1	projetos_tarefas_tarefa_pai_id_foreign	1	tarefa_pai_id	A	0	NULL	NULL	YES	BTREE			NO
projetos_tarefas	1	projetos_tarefas_tarefa_projeto_id_foreign	1	tarefa_projeto_id	A	0	NULL	NULL	YES	BTREE			NO
projetos_tarefas	1	projetos_tarefas_atividade_id_foreign	1	atividade_id	A	0	NULL	NULL	YES	BTREE			NO
projetos_tarefas	1	projetos_tarefas_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## projetos_tarefas_dependencias

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`tarefa_id` char(36) NOT NULL,
`dependencia_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `projetos_tarefas_dependencias_tarefa_id_foreign` (`tarefa_id`),
KEY `projetos_tarefas_dependencias_dependencia_id_foreign` (`dependencia_id`),
CONSTRAINT `projetos_tarefas_dependencias_dependencia_id_foreign` FOREIGN KEY (`dependencia_id`) REFERENCES `projetos_tarefas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `projetos_tarefas_dependencias_tarefa_id_foreign` FOREIGN KEY (`tarefa_id`) REFERENCES `projetos_tarefas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| tarefa_id | char(36) | NO | MUL | NULL |
| dependencia_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
projetos_tarefas_dependencias	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
projetos_tarefas_dependencias	1	projetos_tarefas_dependencias_tarefa_id_foreign	1	tarefa_id	A	0	NULL	NULL		BTREE			NO
projetos_tarefas_dependencias	1	projetos_tarefas_dependencias_dependencia_id_foreign	1	dependencia_id	A	0	NULL	NULL		BTREE			NO
```

---

## questionarios

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`tipo` varchar(256) NOT NULL COMMENT 'Tipo interno | personalizado | anonimo',
`nome` varchar(256) NOT NULL COMMENT 'Nome do questionário',
`codigo` varchar(256) NOT NULL COMMENT 'Código do questionario',
`versao` int(11) NOT NULL DEFAULT 1 COMMENT 'Versao do questionario',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| tipo | varchar(256) | NO |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| codigo | varchar(256) | NO |  | NULL |
| versao | int(11) | NO |  | 1 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
questionarios	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## questionarios_perguntas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`sequencia` tinyint(4) NOT NULL COMMENT 'Sequequencia dos numeros da pergunta no questionario',
`pergunta` text NOT NULL COMMENT 'A pergunta do questionario',
`tipo` enum('EMOJI','SELECT','MULTI_SELECT','TEXT','TEXT_AREA','TIMER','DATE_TIME','NUMBER','RATE','SWITCH','RADIO','RADIO_INLINE','RADIO_BUTTON','CHECK','SEARCH') DEFAULT NULL,
`criado_versao` int(11) NOT NULL COMMENT 'Versão do Questionario que foi criada a pergunta',
`deletado_versao` int(11) DEFAULT NULL COMMENT 'Versão do Questionario que foi deletada a pergunta',
`respostas_possiveis` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Respostas possiveis para a pergunta(DC2Type:json)' CHECK (json_valid(`respostas_possiveis`)),
`questionario_id` char(36) NOT NULL,
`origem_id` char(36) DEFAULT NULL,
`codigo` text DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `questionarios_perguntas_questionario_id_foreign` (`questionario_id`),
KEY `questionarios_perguntas_origem_id_foreign` (`origem_id`),
CONSTRAINT `questionarios_perguntas_origem_id_foreign` FOREIGN KEY (`origem_id`) REFERENCES `questionarios_perguntas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `questionarios_perguntas_questionario_id_foreign` FOREIGN KEY (`questionario_id`) REFERENCES `questionarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| sequencia | tinyint(4) | NO |  | NULL |
| pergunta | text | NO |  | NULL |
| tipo | enum('EMOJI','SELECT','MULTI_SELECT','TEXT','TEXT_AREA','TIMER','DATE_TIME','NUMBER','RATE','SWITCH','RADIO','RADIO_INLINE','RADIO_BUTTON','CHECK','SEARCH') | YES |  | NULL |
| criado_versao | int(11) | NO |  | NULL |
| deletado_versao | int(11) | YES |  | NULL |
| respostas_possiveis | longtext | YES |  | NULL |
| questionario_id | char(36) | NO | MUL | NULL |
| origem_id | char(36) | YES | MUL | NULL |
| codigo | text | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
questionarios_perguntas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
questionarios_perguntas	1	questionarios_perguntas_questionario_id_foreign	1	questionario_id	A	0	NULL	NULL		BTREE			NO
questionarios_perguntas	1	questionarios_perguntas_origem_id_foreign	1	origem_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## questionarios_perguntas_respostas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`resposta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Resposta do questionário' CHECK (json_valid(`resposta`)),
`questionario_pergunta_id` char(36) NOT NULL,
`questionario_preenchimento_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `fk_questionario_perg_id` (`questionario_pergunta_id`),
KEY `fk_questionario_preenchimento_id` (`questionario_preenchimento_id`),
CONSTRAINT `fk_questionario_perg_id` FOREIGN KEY (`questionario_pergunta_id`) REFERENCES `questionarios_perguntas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `fk_questionario_preenchimento_id` FOREIGN KEY (`questionario_preenchimento_id`) REFERENCES `questionarios_preenchimentos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| resposta | longtext | YES |  | NULL |
| questionario_pergunta_id | char(36) | NO | MUL | NULL |
| questionario_preenchimento_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
questionarios_perguntas_respostas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
questionarios_perguntas_respostas	1	fk_questionario_perg_id	1	questionario_pergunta_id	A	0	NULL	NULL		BTREE			NO
questionarios_perguntas_respostas	1	fk_questionario_preenchimento_id	1	questionario_preenchimento_id	A	0	NULL	NULL		BTREE			NO
```

---

## questionarios_preenchimentos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_preenchimento` datetime NOT NULL COMMENT 'Data e hora das respostas',
`editavel` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Possibilidade de editar as respostas',
`versao` int(11) NOT NULL COMMENT 'Versao do questionario',
`questionario_id` char(36) NOT NULL,
`usuario_id` char(36) NOT NULL,
`resumo_resposta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Resumo da resposta do questionario' CHECK (json_valid(`resumo_resposta`)),
PRIMARY KEY (`id`),
KEY `questionarios_respostas_questionario_id_foreign` (`questionario_id`),
KEY `questionarios_respostas_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `questionarios_respostas_questionario_id_foreign` FOREIGN KEY (`questionario_id`) REFERENCES `questionarios` (`id`) ON UPDATE CASCADE,
CONSTRAINT `questionarios_respostas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_preenchimento | datetime | NO |  | NULL |
| editavel | tinyint(4) | NO |  | 1 |
| versao | int(11) | NO |  | NULL |
| questionario_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | NO | MUL | NULL |
| resumo_resposta | longtext | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
questionarios_preenchimentos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
questionarios_preenchimentos	1	questionarios_respostas_questionario_id_foreign	1	questionario_id	A	0	NULL	NULL		BTREE			NO
questionarios_preenchimentos	1	questionarios_respostas_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
```

---

## reacoes

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`tipo` enum('like','love','care','haha','wow','sad','angry') NOT NULL DEFAULT 'like' COMMENT 'Tipo do react',
`usuario_id` char(36) NOT NULL,
`atividade_id` char(36) DEFAULT NULL,
`plano_trabalho_entrega_id` char(36) DEFAULT NULL,
`plano_entrega_entrega_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `reacoes_usuario_id_foreign` (`usuario_id`),
KEY `reacoes_atividade_id_foreign` (`atividade_id`),
KEY `reacoes_plano_trabalho_entrega_id_foreign` (`plano_trabalho_entrega_id`),
KEY `reacoes_plano_entrega_entrega_id_foreign` (`plano_entrega_entrega_id`),
CONSTRAINT `reacoes_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `reacoes_plano_entrega_entrega_id_foreign` FOREIGN KEY (`plano_entrega_entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `reacoes_plano_trabalho_entrega_id_foreign` FOREIGN KEY (`plano_trabalho_entrega_id`) REFERENCES `planos_trabalhos_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `reacoes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| tipo | enum('like','love','care','haha','wow','sad','angry') | NO |  | like |
| usuario_id | char(36) | NO | MUL | NULL |
| atividade_id | char(36) | YES | MUL | NULL |
| plano_trabalho_entrega_id | char(36) | YES | MUL | NULL |
| plano_entrega_entrega_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
reacoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
reacoes	1	reacoes_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
reacoes	1	reacoes_atividade_id_foreign	1	atividade_id	A	0	NULL	NULL	YES	BTREE			NO
reacoes	1	reacoes_plano_trabalho_entrega_id_foreign	1	plano_trabalho_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
reacoes	1	reacoes_plano_entrega_entrega_id_foreign	1	plano_entrega_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## sequences

### Estrutura da Tabela

```sql
`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`template_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numeria do número do template',
`plano_entrega_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numérica do plano de entregas',
`plano_trabalho_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numérica do plano de trabalho',
`projeto_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequência numerica do Projeto',
`documento_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numeria do número do documento',
`atividade_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numeria do número da atividade',
`notificacao_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numeria do número da notificação',
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | bigint(20) unsigned | NO | PRI | NULL | auto_increment |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| template_numero | int(11) | NO |  | 0 |
| plano_entrega_numero | int(11) | NO |  | 0 |
| plano_trabalho_numero | int(11) | NO |  | 0 |
| projeto_numero | int(11) | NO |  | 0 |
| documento_numero | int(11) | NO |  | 0 |
| atividade_numero | int(11) | NO |  | 0 |
| notificacao_numero | int(11) | NO |  | 0 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
sequences	0	PRIMARY	1	id	A	1	NULL	NULL		BTREE			NO
```

---

## siape_consultaDadosFuncionais

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`response` longtext NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`processado` tinyint(1) NOT NULL DEFAULT 0,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| response | longtext | NO |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| processado | tinyint(1) | NO |  | 0 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
siape_consultadadosfuncionais	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## siape_consultaDadosPessoais

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`response` longtext NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`processado` tinyint(1) NOT NULL DEFAULT 0,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| response | longtext | NO |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| processado | tinyint(1) | NO |  | 0 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
siape_consultadadospessoais	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## siape_dadosUORG

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`response` longtext NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`processado` tinyint(1) NOT NULL DEFAULT 0,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| response | longtext | NO |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| processado | tinyint(1) | NO |  | 0 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
siape_dadosuorg	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## siape_listaServidores

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`response` longtext NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`processado` tinyint(1) NOT NULL DEFAULT 0,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| response | longtext | NO |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| processado | tinyint(1) | NO |  | 0 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
siape_listaservidores	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## siape_listaUORG

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`response` longtext NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`processado` tinyint(1) NOT NULL DEFAULT 0,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| response | longtext | NO |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| processado | tinyint(1) | NO |  | 0 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
siape_listauorg	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## solucao_produtos_servicos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`nome` varchar(250) NOT NULL,
`sigla` varchar(20) NOT NULL,
`unidade_id` char(36) NOT NULL,
`descricao` text NOT NULL,
`url` varchar(250) NOT NULL,
`status` int(11) NOT NULL DEFAULT 0,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`data_ativado` timestamp NULL DEFAULT NULL,
`data_desativado` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `solucao_produtos_servicos_unidade_id_foreign` (`unidade_id`),
CONSTRAINT `solucao_produtos_servicos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| nome | varchar(250) | NO |  | NULL |
| sigla | varchar(20) | NO |  | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| descricao | text | NO |  | NULL |
| url | varchar(250) | NO |  | NULL |
| status | int(11) | NO |  | 0 |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| data_ativado | timestamp | YES |  | NULL |
| data_desativado | timestamp | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
solucao_produtos_servicos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
solucao_produtos_servicos	1	solucao_produtos_servicos_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
```

---

## status_justificativas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`codigo` enum('ATIVO','AVALIADO','CANCELADO','CONCLUIDO','HOMOLOGANDO','AGUARDANDO_ASSINATURA','INCLUIDO','INICIADO','EM_RECURSO','SUSPENSO') NOT NULL COMMENT 'Status do artefato (plano de entregas, plano de trabalho, consolidação ou atividade)',
`justificativa` text NOT NULL COMMENT 'Justificativa da mudança para este status',
`plano_entrega_id` char(36) DEFAULT NULL,
`plano_trabalho_id` char(36) DEFAULT NULL,
`plano_trabalho_consolidacao_id` char(36) DEFAULT NULL,
`atividade_id` char(36) DEFAULT NULL,
`usuario_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `status_justificativas_plano_entrega_id_foreign` (`plano_entrega_id`),
KEY `status_justificativas_plano_trabalho_id_foreign` (`plano_trabalho_id`),
KEY `status_justificativas_plano_trabalho_consolidacao_id_foreign` (`plano_trabalho_consolidacao_id`),
KEY `status_justificativas_atividade_id_foreign` (`atividade_id`),
KEY `status_justificativas_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `status_justificativas_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `status_justificativas_plano_entrega_id_foreign` FOREIGN KEY (`plano_entrega_id`) REFERENCES `planos_entregas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `status_justificativas_plano_trabalho_consolidacao_id_foreign` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE,
CONSTRAINT `status_justificativas_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE,
CONSTRAINT `status_justificativas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
status_justificativas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
status_justificativas	1	status_justificativas_plano_entrega_id_foreign	1	plano_entrega_id	A	0	NULL	NULL	YES	BTREE			NO
status_justificativas	1	status_justificativas_plano_trabalho_id_foreign	1	plano_trabalho_id	A	0	NULL	NULL	YES	BTREE			NO
status_justificativas	1	status_justificativas_plano_trabalho_consolidacao_id_foreign	1	plano_trabalho_consolidacao_id	A	0	NULL	NULL	YES	BTREE			NO
status_justificativas	1	status_justificativas_atividade_id_foreign	1	atividade_id	A	0	NULL	NULL	YES	BTREE			NO
status_justificativas	1	status_justificativas_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
```

---

## templates

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`codigo` varchar(255) DEFAULT NULL COMMENT 'Código opcional para o template',
`numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número do template (Gerado pelo sistema)',
`especie` enum('SEI','TCR','OUTRO','NOTIFICACAO','RELATORIO') DEFAULT NULL,
`titulo` varchar(256) NOT NULL COMMENT 'Título do template',
`conteudo` longtext DEFAULT NULL COMMENT 'Comentário predefinida para a tarefa',
`dataset` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Dados da parametrização' CHECK (json_valid(`dataset`)),
`entidade_id` char(36) DEFAULT NULL,
`unidade_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `templates_numero_unique` (`numero`),
KEY `templates_entidade_id_foreign` (`entidade_id`),
KEY `templates_unidade_id_foreign` (`unidade_id`),
CONSTRAINT `templates_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `templates_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| codigo | varchar(255) | YES |  | NULL |
| numero | int(11) | NO | UNI | 0 |
| especie | enum('SEI','TCR','OUTRO','NOTIFICACAO','RELATORIO') | YES |  | NULL |
| titulo | varchar(256) | NO |  | NULL |
| conteudo | longtext | YES |  | NULL |
| dataset | longtext | YES |  | NULL |
| entidade_id | char(36) | YES | MUL | NULL |
| unidade_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
templates	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
templates	0	templates_numero_unique	1	numero	A	0	NULL	NULL		BTREE			NO
templates	1	templates_entidade_id_foreign	1	entidade_id	A	0	NULL	NULL	YES	BTREE			NO
templates	1	templates_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## tipos_atividades

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do tipo de atividade',
`esforco` double(8,2) NOT NULL COMMENT 'Tempo previsto para a execução da atividade (Horas decimais)',
`dias_planejado` double(8,2) NOT NULL COMMENT 'Sugestão de dias para conclusão da atividade independente de quando iniciado (influência no prazo da atividade)',
`etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Nome das etiquetas para a atividade' CHECK (json_valid(`etiquetas`)),
`checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Nome dos checklist para a atividade' CHECK (json_valid(`checklist`)),
`comentario` text DEFAULT NULL COMMENT 'Comentário predefinido para a atividade',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| esforco | double(8,2) | NO |  | NULL |
| dias_planejado | double(8,2) | NO |  | NULL |
| etiquetas | longtext | YES |  | NULL |
| checklist | longtext | YES |  | NULL |
| comentario | text | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_atividades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_avaliacoes

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do tipo de avaliação',
`tipo` set('QUALITATIVO','QUANTITATIVO') NOT NULL COMMENT 'Se a nota será um número ou um conceito',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| tipo | set('QUALITATIVO','QUANTITATIVO') | NO |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_avaliacoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_avaliacoes_justificativas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`tipo_avaliacao_nota_id` char(36) NOT NULL,
`tipo_justificativa_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `tipos_avaliacoes_justificativas_tipo_avaliacao_nota_id_foreign` (`tipo_avaliacao_nota_id`),
KEY `tipos_avaliacoes_justificativas_tipo_justificativa_id_foreign` (`tipo_justificativa_id`),
CONSTRAINT `tipos_avaliacoes_justificativas_tipo_avaliacao_nota_id_foreign` FOREIGN KEY (`tipo_avaliacao_nota_id`) REFERENCES `tipos_avaliacoes_notas` (`id`) ON UPDATE CASCADE,
CONSTRAINT `tipos_avaliacoes_justificativas_tipo_justificativa_id_foreign` FOREIGN KEY (`tipo_justificativa_id`) REFERENCES `tipos_justificativas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| tipo_avaliacao_nota_id | char(36) | NO | MUL | NULL |
| tipo_justificativa_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_avaliacoes_justificativas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
tipos_avaliacoes_justificativas	1	tipos_avaliacoes_justificativas_tipo_avaliacao_nota_id_foreign	1	tipo_avaliacao_nota_id	A	0	NULL	NULL		BTREE			NO
tipos_avaliacoes_justificativas	1	tipos_avaliacoes_justificativas_tipo_justificativa_id_foreign	1	tipo_justificativa_id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_avaliacoes_notas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`sequencia` int(11) NOT NULL COMMENT 'Sequencia da nota (serve para ordenar as notas de forma crescente)',
`nota` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Nota' CHECK (json_valid(`nota`)),
`descricao` varchar(255) NOT NULL COMMENT 'Descrição da nota',
`pergunta` varchar(255) NOT NULL COMMENT 'Pergunta motivacional',
`aprova` tinyint(4) NOT NULL COMMENT 'Se essa nota aprova, quando aplicável',
`justifica` tinyint(4) NOT NULL COMMENT 'Se é obrigatório justificar essa nota',
`icone` varchar(100) NOT NULL COMMENT 'Classe do icone',
`cor` varchar(100) NOT NULL COMMENT 'Código da cor em hex',
`codigo` varchar(50) DEFAULT NULL COMMENT 'Código de integração',
`tipo_avaliacao_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `tipos_avaliacoes_notas_tipo_avaliacao_id_foreign` (`tipo_avaliacao_id`),
CONSTRAINT `tipos_avaliacoes_notas_tipo_avaliacao_id_foreign` FOREIGN KEY (`tipo_avaliacao_id`) REFERENCES `tipos_avaliacoes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| sequencia | int(11) | NO |  | NULL |
| nota | longtext | NO |  | NULL |
| descricao | varchar(255) | NO |  | NULL |
| pergunta | varchar(255) | NO |  | NULL |
| aprova | tinyint(4) | NO |  | NULL |
| justifica | tinyint(4) | NO |  | NULL |
| icone | varchar(100) | NO |  | NULL |
| cor | varchar(100) | NO |  | NULL |
| codigo | varchar(50) | YES |  | NULL |
| tipo_avaliacao_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_avaliacoes_notas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
tipos_avaliacoes_notas	1	tipos_avaliacoes_notas_tipo_avaliacao_id_foreign	1	tipo_avaliacao_id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_capacidades

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`codigo` varchar(256) NOT NULL COMMENT 'Código da rotina no sistema (acesso)',
`descricao` text NOT NULL COMMENT 'Descrição da capacidade (acesso)',
`grupo_id` char(36) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `tipos_capacidades_codigo_unique` (`codigo`),
KEY `tipos_capacidades_grupo_id_foreign` (`grupo_id`),
CONSTRAINT `tipos_capacidades_grupo_id_foreign` FOREIGN KEY (`grupo_id`) REFERENCES `tipos_capacidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| codigo | varchar(256) | NO | UNI | NULL |
| descricao | text | NO |  | NULL |
| grupo_id | char(36) | YES | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_capacidades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
tipos_capacidades	0	tipos_capacidades_codigo_unique	1	codigo	A	0	NULL	NULL		BTREE			NO
tipos_capacidades	1	tipos_capacidades_grupo_id_foreign	1	grupo_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## tipos_clientes

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`nome` varchar(255) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| nome | varchar(255) | NO |  | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_clientes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_cursos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do tipo do curso',
`ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Nome ativo ou inativo',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| ativo | tinyint(4) | NO |  | 1 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_cursos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_documentos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`codigo` varchar(50) DEFAULT NULL COMMENT 'Código do tipo de documento',
`nome` varchar(256) NOT NULL COMMENT 'Tipo do documento da requisição ou da entrega',
`entregavel` tinyint(4) NOT NULL COMMENT 'Se é um documento de entrega',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| codigo | varchar(50) | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| entregavel | tinyint(4) | NO |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_documentos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_justificativas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Tipo da justificativa da avaliação',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_justificativas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_modalidades

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome da modalidade',
`plano_trabalho_calcula_horas` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se o plano de trabalho calcula horas (considerando a carga horária e os dias)',
`atividade_tempo_despendido` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se calcula tempo despendido na atividade',
`atividade_esforco` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se utiliza esforço (tempo para execução) na atividade',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| plano_trabalho_calcula_horas | tinyint(4) | NO |  | 0 |
| atividade_tempo_despendido | tinyint(4) | NO |  | 0 |
| atividade_esforco | tinyint(4) | NO |  | 0 |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_modalidades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_motivos_afastamentos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`codigo` varchar(50) DEFAULT NULL COMMENT 'Código SIAPE do afastamento.',
`sigla` varchar(256) NOT NULL COMMENT 'Sigla do afastamento.',
`nome` varchar(256) NOT NULL COMMENT 'Descrição sucinta do afastamento.',
`calculo` enum('ACRESCIMO','DECRESCIMO') NOT NULL DEFAULT 'DECRESCIMO' COMMENT 'Usado para calcular as horas do agente público',
`data_inicio` datetime NOT NULL COMMENT 'Data inicial de ativação do afastamento nos sistemas estruturantes.',
`data_fim` datetime DEFAULT NULL COMMENT 'Data que especifica encerramento do uso do afastamento nos sistemas estruturantes.',
`situacao` varchar(100) NOT NULL COMMENT 'Confirma situação no SIAPE registrada no Sigepe Afastamentos.',
`icone` varchar(100) NOT NULL COMMENT 'Class do ícone relacionado ao afastamento',
`cor` varchar(100) NOT NULL COMMENT 'Código da cor em formato hex',
`horas` tinyint(4) NOT NULL COMMENT 'Se o afastamento é medido em horas',
`integracao` tinyint(4) NOT NULL COMMENT 'Se o tipo de motivo de afastamento é integrado a outro sistema',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| codigo | varchar(50) | YES |  | NULL |
| sigla | varchar(256) | NO |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| calculo | enum('ACRESCIMO','DECRESCIMO') | NO |  | DECRESCIMO |
| data_inicio | datetime | NO |  | NULL |
| data_fim | datetime | YES |  | NULL |
| situacao | varchar(100) | NO |  | NULL |
| icone | varchar(100) | NO |  | NULL |
| cor | varchar(100) | NO |  | NULL |
| horas | tinyint(4) | NO |  | NULL |
| integracao | tinyint(4) | NO |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_motivos_afastamentos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_processos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` text NOT NULL COMMENT 'Nome do Tipo de Processo',
`codigo` varchar(50) DEFAULT NULL COMMENT 'Código do tipo de Processo',
`etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Nome das etiquetas predefinidas' CHECK (json_valid(`etiquetas`)),
`checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Nome dos checklist predefinidas' CHECK (json_valid(`checklist`)),
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | text | NO |  | NULL |
| codigo | varchar(50) | YES |  | NULL |
| etiquetas | longtext | NO |  | NULL |
| checklist | longtext | NO |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_processos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_projetos

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Descrição do tipo da projeto',
`icone` varchar(100) NOT NULL COMMENT 'Classe do icone',
`cor` varchar(100) NOT NULL COMMENT 'Código da cor em hex',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| icone | varchar(100) | NO |  | NULL |
| cor | varchar(100) | NO |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_projetos	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## tipos_tarefas

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`nome` varchar(256) NOT NULL COMMENT 'Nome do tipo de tarefa',
`tempo_estimado` double(8,2) NOT NULL COMMENT 'Tempo estimado para a execução do tipo de tarefa (Horas decimais)',
`documental` tinyint(4) NOT NULL COMMENT 'Se o tipo de tarefa requer obrigatoriamente um documento',
`comentario` text DEFAULT NULL COMMENT 'Comentário predefinida para o tipo de tarefa',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| tempo_estimado | double(8,2) | NO |  | NULL |
| documental | tinyint(4) | NO |  | NULL |
| comentario | text | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
tipos_tarefas	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
```

---

## unidades

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`codigo` varchar(12) DEFAULT NULL COMMENT 'Código da unidade',
`sigla` varchar(100) NOT NULL COMMENT 'Sigla da unidade',
`nome` varchar(256) NOT NULL COMMENT 'Nome da unidade',
`instituidora` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se a unidade é instituidora (Programas)',
`path` text DEFAULT NULL COMMENT 'Path dos nós pais separados por /, ou NULL caso sejam nós raiz',
`texto_complementar_plano` longtext DEFAULT NULL COMMENT 'Campo de mensagem adicional do plano de trabalho',
`atividades_arquivamento_automatico` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se arquiva automaticamente após conclusão',
`atividades_avaliacao_automatico` tinyint(4) NOT NULL DEFAULT 0,
`planos_prazo_comparecimento` int(11) NOT NULL DEFAULT 10,
`planos_tipo_prazo_comparecimento` varchar(255) NOT NULL DEFAULT 'DIAS',
`data_inativacao` datetime DEFAULT NULL COMMENT 'Data em que a unidade foi inativada, se for o caso',
`distribuicao_forma_contagem_prazos` set('HORAS_CORRIDAS','DIAS_CORRIDOS','HORAS_UTEIS','DIAS_UTEIS') NOT NULL DEFAULT 'DIAS_UTEIS' COMMENT 'Forma da contagem de prazo',
`entrega_forma_contagem_prazos` set('HORAS_CORRIDAS','HORAS_UTEIS') NOT NULL DEFAULT 'HORAS_UTEIS' COMMENT 'Forma da contagem de horas para entrega',
`autoedicao_subordinadas` tinyint(4) NOT NULL DEFAULT 1,
`etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configuração das etiquetas que serão utilizadas nas atividades (contém nome, icone e cor)' CHECK (json_valid(`etiquetas`)),
`checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Nome dos checklist' CHECK (json_valid(`checklist`)),
`notificacoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)' CHECK (json_valid(`notificacoes`)),
`expediente` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configuração de expediente da unidade' CHECK (json_valid(`expediente`)),
`cidade_id` char(36) DEFAULT NULL,
`unidade_pai_id` char(36) DEFAULT NULL,
`entidade_id` char(36) NOT NULL,
`informal` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Sinaliza se unidade é informal',
`data_modificacao` datetime DEFAULT NULL COMMENT 'Data de modificação informada pelo SIAPE.',
PRIMARY KEY (`id`),
KEY `unidades_cidade_id_foreign` (`cidade_id`),
KEY `unidades_unidade_pai_id_foreign` (`unidade_pai_id`),
KEY `unidades_entidade_id_foreign` (`entidade_id`),
KEY `unidades_codigo_index` (`codigo`),
FULLTEXT KEY `unidades_path_fulltext` (`path`),
CONSTRAINT `unidades_cidade_id_foreign` FOREIGN KEY (`cidade_id`) REFERENCES `cidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `unidades_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `unidades_unidade_pai_id_foreign` FOREIGN KEY (`unidade_pai_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| codigo | varchar(12) | YES | MUL | NULL |
| sigla | varchar(100) | NO |  | NULL |
| nome | varchar(256) | NO |  | NULL |
| instituidora | tinyint(4) | NO |  | 0 |
| path | text | YES | MUL | NULL |
| texto_complementar_plano | longtext | YES |  | NULL |
| atividades_arquivamento_automatico | tinyint(4) | NO |  | 0 |
| atividades_avaliacao_automatico | tinyint(4) | NO |  | 0 |
| planos_prazo_comparecimento | int(11) | NO |  | 10 |
| planos_tipo_prazo_comparecimento | varchar(255) | NO |  | DIAS |
| data_inativacao | datetime | YES |  | NULL |
| distribuicao_forma_contagem_prazos | set('HORAS_CORRIDAS','DIAS_CORRIDOS','HORAS_UTEIS','DIAS_UTEIS') | NO |  | DIAS_UTEIS |
| entrega_forma_contagem_prazos | set('HORAS_CORRIDAS','HORAS_UTEIS') | NO |  | HORAS_UTEIS |
| autoedicao_subordinadas | tinyint(4) | NO |  | 1 |
| etiquetas | longtext | YES |  | NULL |
| checklist | longtext | YES |  | NULL |
| notificacoes | longtext | YES |  | NULL |
| expediente | longtext | YES |  | NULL |
| cidade_id | char(36) | YES | MUL | NULL |
| unidade_pai_id | char(36) | YES | MUL | NULL |
| entidade_id | char(36) | NO | MUL | NULL |
| informal | tinyint(4) | NO |  | 0 |
| data_modificacao | datetime | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
unidades	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
unidades	1	unidades_cidade_id_foreign	1	cidade_id	A	0	NULL	NULL	YES	BTREE			NO
unidades	1	unidades_unidade_pai_id_foreign	1	unidade_pai_id	A	0	NULL	NULL	YES	BTREE			NO
unidades	1	unidades_entidade_id_foreign	1	entidade_id	A	0	NULL	NULL		BTREE			NO
unidades	1	unidades_codigo_index	1	codigo	A	0	NULL	NULL	YES	BTREE			NO
unidades	1	unidades_path_fulltext	1	path	NULL	NULL	NULL	NULL	YES	FULLTEXT			NO
```

---

## unidades_integrantes

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`unidade_id` char(36) NOT NULL,
`usuario_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `unidades_integrantes_unidade_id_foreign` (`unidade_id`),
KEY `unidades_integrantes_usuario_id_foreign` (`usuario_id`),
CONSTRAINT `unidades_integrantes_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE,
CONSTRAINT `unidades_integrantes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| unidade_id | char(36) | NO | MUL | NULL |
| usuario_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
unidades_integrantes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
unidades_integrantes	1	unidades_integrantes_unidade_id_foreign	1	unidade_id	A	0	NULL	NULL		BTREE			NO
unidades_integrantes	1	unidades_integrantes_usuario_id_foreign	1	usuario_id	A	0	NULL	NULL		BTREE			NO
```

---

## unidades_integrantes_atribuicoes

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`atribuicao` set('AVALIADOR_PLANO_ENTREGA','AVALIADOR_PLANO_TRABALHO','HOMOLOGADOR_PLANO_ENTREGA','COLABORADOR','GESTOR','GESTOR_SUBSTITUTO','GESTOR_DELEGADO','LOTADO','CURADOR') DEFAULT NULL COMMENT 'Vínculo que o servidor tem com a unidade',
`unidade_integrante_id` char(36) NOT NULL,
PRIMARY KEY (`id`),
KEY `unidades_integrantes_atribuicoes_unidade_integrante_id_foreign` (`unidade_integrante_id`),
CONSTRAINT `unidades_integrantes_atribuicoes_unidade_integrante_id_foreign` FOREIGN KEY (`unidade_integrante_id`) REFERENCES `unidades_integrantes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| atribuicao | set('AVALIADOR_PLANO_ENTREGA','AVALIADOR_PLANO_TRABALHO','HOMOLOGADOR_PLANO_ENTREGA','COLABORADOR','GESTOR','GESTOR_SUBSTITUTO','GESTOR_DELEGADO','LOTADO','CURADOR') | YES |  | NULL |
| unidade_integrante_id | char(36) | NO | MUL | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
unidades_integrantes_atribuicoes	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
unidades_integrantes_atribuicoes	1	unidades_integrantes_atribuicoes_unidade_integrante_id_foreign	1	unidade_integrante_id	A	0	NULL	NULL		BTREE			NO
```

---

## usuarios

### Estrutura da Tabela

```sql
`id` char(36) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
`remember_token` varchar(100) DEFAULT NULL,
`email` varchar(100) NOT NULL COMMENT 'E-mail do usuário',
`nome` varchar(256) NOT NULL COMMENT 'Nome do usuário',
`password` varchar(255) DEFAULT NULL COMMENT 'Senha do usuário',
`cpf` varchar(14) NOT NULL COMMENT 'CPF do usuário',
`matricula` varchar(50) DEFAULT NULL COMMENT 'Matrícula funcional do usuário',
`apelido` varchar(100) NOT NULL COMMENT 'Apelido/Nome de guerra/Nome social',
`telefone` varchar(50) DEFAULT NULL COMMENT 'Telefone do usuário',
`data_nascimento` datetime DEFAULT NULL,
`id_google` varchar(50) DEFAULT NULL COMMENT 'Id associado com o usuário do login do google',
`url_foto` varchar(255) DEFAULT NULL COMMENT 'URL da foto do usuário (temporário)',
`texto_complementar_plano` longtext DEFAULT NULL COMMENT 'Campo de mensagem adicional do plano de trabalho',
`foto_perfil` text DEFAULT NULL COMMENT 'Foto padrão do perfil',
`foto_google` text DEFAULT NULL COMMENT 'Foto do G-Suit (Google)',
`foto_microsoft` text DEFAULT NULL COMMENT 'Foto do Azure (Microsoft)',
`foto_firebase` text DEFAULT NULL COMMENT 'Foto do Firebase (Google, Facebook, Instagram, Twiter, etc...)',
`id_sei` text DEFAULT NULL COMMENT 'Id do usuário no SUPER',
`uf` char(2) DEFAULT NULL COMMENT 'UF do usuário',
`email_verified_at` timestamp NULL DEFAULT NULL COMMENT 'Data de verificação do e-mail do usuário',
`sexo` enum('MASCULINO','FEMININO') DEFAULT NULL COMMENT 'Sexo do usuário',
`situacao_funcional` enum('ATIVO_PERMANENTE','APOSENTADO','CEDIDO/REQUISITADO','NOMEADO_CARGO_COMISSIONADO','SEM_VINCULO','TABELISTA(ESP/EMERG)','NATUREZA_ESPECIAL','ATIVO_EM_OUTRO_ORGAO','REDISTRIBUIDO','ATIVO_TRANSITORIO','EXCEDENTE_A_LOTACAO','EM_DISPONIBILIDADE','REQUISITADO_DE_OUTROS_ORGAOS','INSTITUIDOR_PENSAO','REQUISITADO_MILITAR_FORCAS_ARMADAS','APOSENTADO_TCU733/94','EXERCICIO_DESCENTRALIZADO_CARREIRA','EXERCICIO_PROVISORIO','CELETISTA','ATIVO_PERMANENTE_LEI_8878/94','ANISTIADO_ADCT_CF','CELETISTA/EMPREGADO','CLT_ANS_DECISAO_JUDICIAL','CLT_ANS_JUDICIAL_CEDIDO','CLT_APOS_COMPLEMENTO','CLT_APOS_DECISAO_JUDICIAL','INST_PS_DECISAO_JUDICIAL','EMPREGO_PUBLICO','REFORMA_CBM/PM','RESERVA_CBM/PM','REQUISITADO_MILITAR_GDF','ANISTIADO_PUBLICO_L10559','ANISTIADO_PRIVADO_L10559','ATIVO_DECISAO_JUDICIAL','CONTRATO_TEMPORARIO','COLAB_PCCTAE_E_MAGISTERIO','COLABORADOR_ICT','CLT_ANS_DEC_6657/08','EXERCICIO_7_ART93_8112','CEDIDO_SUS/LEI_8270','INST_ANIST_PUBLICO','INST_ANIST_PRIVADO','CELETISTA_DECISAO_JUDICIAL','CONTRATO_TEMPORARIO_CLT','EMPREGO_PCC/EX-TERRITORIO','EXC_INDISCIPLINA','CONTRATO_PROFESSOR_SUBSTITUTO','ESTAGIARIO','ESTAGIARIO_SIGEPE','RESIDENCIA_E_PMM','APOSENTADO_TEMPORARIRIO','CEDIDO_DF_ESTADO_MUNICIPIO','EXERC_DESCEN_CDT','EXERC_LEI_13681/18','PENSIONISTA','BENEFICIARIO_PENSAO','QE/MRE_CEDIDO','QUADRO_ESPEC_QE/MRE','DESCONHECIDO') NOT NULL DEFAULT 'ATIVO_PERMANENTE' COMMENT 'Vínculo do usuário com a administração.',
`config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações do usuário' CHECK (json_valid(`config`)),
`notificacoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)' CHECK (json_valid(`notificacoes`)),
`metadados` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Metadados do usuário' CHECK (json_valid(`metadados`)),
`perfil_id` char(36) DEFAULT NULL,
`data_modificacao` datetime DEFAULT NULL COMMENT 'Data de modificação informada pelo SIAPE.',
`nome_jornada` varchar(100) DEFAULT NULL COMMENT 'Codigo da Jornada',
`cod_jornada` int(11) DEFAULT NULL COMMENT 'Nome da Jornada',
`data_envio_api_pgd` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `usuarios_email_unique` (`email`),
UNIQUE KEY `usuarios_cpf_unique` (`cpf`),
KEY `usuarios_perfil_id_foreign` (`perfil_id`),
CONSTRAINT `usuarios_perfil_id_foreign` FOREIGN KEY (`perfil_id`) REFERENCES `perfis` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO | PRI | NULL |
| created_at | timestamp | YES |  | NULL |
| updated_at | timestamp | YES |  | NULL |
| deleted_at | timestamp | YES |  | NULL |
| remember_token | varchar(100) | YES |  | NULL |
| email | varchar(100) | NO | UNI | NULL |
| nome | varchar(256) | NO |  | NULL |
| password | varchar(255) | YES |  | NULL |
| cpf | varchar(14) | NO | UNI | NULL |
| matricula | varchar(50) | YES |  | NULL |
| apelido | varchar(100) | NO |  | NULL |
| telefone | varchar(50) | YES |  | NULL |
| data_nascimento | datetime | YES |  | NULL |
| id_google | varchar(50) | YES |  | NULL |
| url_foto | varchar(255) | YES |  | NULL |
| texto_complementar_plano | longtext | YES |  | NULL |
| foto_perfil | text | YES |  | NULL |
| foto_google | text | YES |  | NULL |
| foto_microsoft | text | YES |  | NULL |
| foto_firebase | text | YES |  | NULL |
| id_sei | text | YES |  | NULL |
| uf | char(2) | YES |  | NULL |
| email_verified_at | timestamp | YES |  | NULL |
| sexo | enum('MASCULINO','FEMININO') | YES |  | NULL |
| situacao_funcional | enum('ATIVO_PERMANENTE','APOSENTADO','CEDIDO/REQUISITADO','NOMEADO_CARGO_COMISSIONADO','SEM_VINCULO','TABELISTA(ESP/EMERG)','NATUREZA_ESPECIAL','ATIVO_EM_OUTRO_ORGAO','REDISTRIBUIDO','ATIVO_TRANSITORIO','EXCEDENTE_A_LOTACAO','EM_DISPONIBILIDADE','REQUISITADO_DE_OUTROS_ORGAOS','INSTITUIDOR_PENSAO','REQUISITADO_MILITAR_FORCAS_ARMADAS','APOSENTADO_TCU733/94','EXERCICIO_DESCENTRALIZADO_CARREIRA','EXERCICIO_PROVISORIO','CELETISTA','ATIVO_PERMANENTE_LEI_8878/94','ANISTIADO_ADCT_CF','CELETISTA/EMPREGADO','CLT_ANS_DECISAO_JUDICIAL','CLT_ANS_JUDICIAL_CEDIDO','CLT_APOS_COMPLEMENTO','CLT_APOS_DECISAO_JUDICIAL','INST_PS_DECISAO_JUDICIAL','EMPREGO_PUBLICO','REFORMA_CBM/PM','RESERVA_CBM/PM','REQUISITADO_MILITAR_GDF','ANISTIADO_PUBLICO_L10559','ANISTIADO_PRIVADO_L10559','ATIVO_DECISAO_JUDICIAL','CONTRATO_TEMPORARIO','COLAB_PCCTAE_E_MAGISTERIO','COLABORADOR_ICT','CLT_ANS_DEC_6657/08','EXERCICIO_7_ART93_8112','CEDIDO_SUS/LEI_8270','INST_ANIST_PUBLICO','INST_ANIST_PRIVADO','CELETISTA_DECISAO_JUDICIAL','CONTRATO_TEMPORARIO_CLT','EMPREGO_PCC/EX-TERRITORIO','EXC_INDISCIPLINA','CONTRATO_PROFESSOR_SUBSTITUTO','ESTAGIARIO','ESTAGIARIO_SIGEPE','RESIDENCIA_E_PMM','APOSENTADO_TEMPORARIRIO','CEDIDO_DF_ESTADO_MUNICIPIO','EXERC_DESCEN_CDT','EXERC_LEI_13681/18','PENSIONISTA','BENEFICIARIO_PENSAO','QE/MRE_CEDIDO','QUADRO_ESPEC_QE/MRE','DESCONHECIDO') | NO |  | ATIVO_PERMANENTE |
| config | longtext | YES |  | NULL |
| notificacoes | longtext | YES |  | NULL |
| metadados | longtext | YES |  | NULL |
| perfil_id | char(36) | YES | MUL | NULL |
| data_modificacao | datetime | YES |  | NULL |
| nome_jornada | varchar(100) | YES |  | NULL |
| cod_jornada | int(11) | YES |  | NULL |
| data_envio_api_pgd | timestamp | YES |  | NULL |

### Índices

```sql
Table	Non_unique	Key_name	Seq_in_index	Column_name	Collation	Cardinality	Sub_part	Packed	Null	Index_type	Comment	Index_comment	Ignored
usuarios	0	PRIMARY	1	id	A	0	NULL	NULL		BTREE			NO
usuarios	0	usuarios_email_unique	1	email	A	0	NULL	NULL		BTREE			NO
usuarios	0	usuarios_cpf_unique	1	cpf	A	0	NULL	NULL		BTREE			NO
usuarios	1	usuarios_perfil_id_foreign	1	perfil_id	A	0	NULL	NULL	YES	BTREE			NO
```

---

## view_api_pgd

### Estrutura da Tabela

```sql
```

### Colunas

| Campo | Tipo | Nulo | Chave | Padrão | Extra |
|-------|------|------|-------|--------|-------|
| id | char(36) | NO |
| tipo | varchar(12) | YES |  | NULL |
| json_audit | longtext | YES |  | NULL |
| fonte | int(2) | NO |  | 0 |

### Índices

```sql
```

---

