# Padrões de Código - PGD Petrvs MGI

## Princípios SOLID

### Single Responsibility Principle (SRP)
- Cada classe deve ter apenas uma razão para mudar
- Funções devem ter no máximo 20 linhas e fazer apenas uma coisa
- Separe responsabilidades em módulos distintos

### Open/Closed Principle (OCP)
- Classes abertas para extensão, fechadas para modificação
- Use interfaces e abstrações para permitir extensibilidade
- Prefira composição sobre herança

### Liskov Substitution Principle (LSP)
- Subclasses devem ser substituíveis por suas classes base
- Mantenha contratos consistentes em hierarquias

### Interface Segregation Principle (ISP)
- Interfaces específicas são melhores que interfaces genéricas
- Clientes não devem depender de métodos que não usam

### Dependency Inversion Principle (DIP)
- Dependa de abstrações, não de implementações concretas
- Use injeção de dependência quando apropriado

## Convenções de Nomenclatura

### Variáveis e Funções
- Use camelCase: `nomeVariavel`, `calcularSalario()`
- Nomes descritivos e auto-explicativos
- Evite abreviações desnecessárias
- Booleanos devem começar com `is`, `has`, `can`: `isActive`, `hasPermission`

### Classes e Interfaces
- Use PascalCase: `UsuarioService`, `PlanoTrabalho`
- Nomes substantivos para classes
- Interfaces podem usar prefixo `I`: `IUsuarioRepository`

### Constantes
- Use UPPER_SNAKE_CASE: `MAX_TENTATIVAS_LOGIN`, `URL_API_PGD`

### Arquivos e Diretórios
- Use kebab-case para arquivos: `usuario-service.js`, `plano-trabalho.component.ts`
- Diretórios em lowercase: `services`, `components`, `utils`

## Estrutura e Organização

### Arquitetura
- Siga padrões MVC ou Clean Architecture
- Separe camadas: apresentação, negócio, dados
- Use repositórios para acesso a dados
- Implemente services para lógica de negócio

### Modularização
- Agrupe funcionalidades relacionadas em módulos
- Mantenha baixo acoplamento entre módulos
- Use barrel exports para APIs limpas

## Qualidade de Código

### Funções
- Máximo 20 linhas por função
- Máximo 3 parâmetros (use objetos para mais)
- Evite aninhamento profundo (máximo 3 níveis)
- Use early returns para reduzir complexidade

### Comentários
- Código deve ser auto-documentado
- Comente apenas o "porquê", não o "como"
- Use JSDoc/TSDoc para documentação de APIs
- Mantenha comentários atualizados

### Tratamento de Erros
- Use try/catch apropriadamente
- Crie classes de erro específicas
- Log erros com contexto suficiente
- Não ignore exceções silenciosamente

## Segurança

### Validação
- Valide todas as entradas do usuário
- Use sanitização adequada
- Implemente validação tanto no frontend quanto backend

### Autenticação e Autorização
- Nunca exponha credenciais no código
- Use variáveis de ambiente para configurações sensíveis
- Implemente controle de acesso baseado em roles

## Performance

### Otimizações
- Evite loops desnecessários
- Use lazy loading quando apropriado
- Implemente cache estratégico
- Minimize consultas ao banco de dados

### Memória
- Evite vazamentos de memória
- Limpe event listeners e subscriptions
- Use weak references quando apropriado

## Testes

### Cobertura
- Mantenha cobertura mínima de 80%
- Priorize testes de unidade
- Implemente testes de integração para fluxos críticos

### Nomenclatura de Testes
- Use padrão: `should_ReturnExpectedResult_When_ConditionMet`
- Testes devem ser auto-explicativos

## Específico do PGD Petrvs

### Domínio
- Use terminologia oficial do MGI
- Mantenha consistência com documentação oficial
- Referência: https://www.gov.br/servidor/pt-br/assuntos/programa-de-gestao

### Integração
- Siga padrões da API PGD oficial
- Implemente retry logic para chamadas externas
- Use timeouts apropriados

### Logs e Auditoria
- Log todas as operações críticas
- Mantenha trilha de auditoria para alterações
- Use níveis de log apropriados (DEBUG, INFO, WARN, ERROR)

## Ferramentas e Automação

### Linting
- Configure ESLint/TSLint com regras rigorosas
- Use Prettier para formatação consistente
- Integre com pipeline CI/CD

### Versionamento
- Use Semantic Versioning (SemVer)
- Mantenha CHANGELOG.md atualizado
- Use conventional commits

### Documentação
- Mantenha README.md atualizado
- Documente APIs com OpenAPI/Swagger
- Crie guias de instalação e configuração