# Turbo Next.js + NestJS Monorepo

Um monorepo moderno usando Turbo, Next.js, NestJS, Drizzle ORM e Better Auth.

## 🏗️ Estrutura do Projeto

```
├── apps/
│   ├── api/          # API NestJS
│   └── web/          # Frontend Next.js
├── packages/
│   ├── auth/         # Configuração Better Auth compartilhada
│   ├── database/     # Schema Drizzle ORM compartilhado
│   ├── ui/           # Componentes UI (shadcn/ui)
│   ├── eslint-config/# Configuração ESLint compartilhada
│   └── typescript-config/# Configuração TypeScript compartilhada
```

## 🚀 Início Rápido

### Pré-requisitos

- Node.js >= 20
- pnpm >= 8
- PostgreSQL

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd turbo-next-nest

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Configure o banco de dados
pnpm db:push

# Inicie o desenvolvimento
pnpm dev
```

## 📦 Packages

### @workspace/database

Schema do banco de dados compartilhado usando Drizzle ORM.

```typescript
import { user, eq } from "@workspace/database";
```

### @workspace/auth

Configuração de autenticação compartilhada usando Better Auth.

```typescript
import { authClient } from "@workspace/auth/client";
```

### @workspace/ui

Componentes UI baseados em shadcn/ui.

```tsx
import { Button } from "@workspace/ui/components/button";
```

## 🗄️ Banco de Dados

### Comandos Disponíveis

```bash
# Gerar migrações
pnpm db:generate

# Aplicar migrações
pnpm db:migrate

# Push schema (desenvolvimento)
pnpm db:push

# Abrir Drizzle Studio
pnpm db:studio

# Verificar schema
pnpm db:check
```

### Estrutura

- **Users**: Gerenciamento de usuários e autenticação
- **Sessions**: Sessões de autenticação
- **Organizations**: Sistema de organizações/empresas

## 🔧 Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento (todos os apps)
pnpm dev

# Build (todos os packages/apps)
pnpm build

# Lint (todos os packages/apps)
pnpm lint

# Formatação de código
pnpm format
```

### Adicionando Componentes UI

```bash
# Adicionar novos componentes shadcn/ui
pnpm dlx shadcn@latest add button -c packages/ui
```

### Estrutura de Dependências

- **Apps** dependem de **packages**
- **Packages** usam **peer dependencies** para evitar conflitos de versão
- **Database package** re-exporta utilitários do Drizzle
- **Auth package** centraliza configuração do Better Auth

## 🛠️ Stack Tecnológica

- **Monorepo**: Turborepo
- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: NestJS, TypeScript
- **Database**: PostgreSQL, Drizzle ORM
- **Authentication**: Better Auth
- **UI**: shadcn/ui, Tailwind CSS
- **Package Manager**: pnpm
- **Linting**: ESLint, Prettier

## 📋 Arquitetura

### Injeção de Dependências (NestJS)

A API usa injeção de dependências para o Drizzle client:

```typescript
@Injectable()
export class DatabaseService {
  constructor(private readonly config: DatabaseConfig) {
    this.client = drizzle(config.databaseUrl, { schema });
  }
}
```

### Peer Dependencies

Os packages usam peer dependencies para evitar conflitos de versão:

```json
{
  "peerDependencies": {
    "drizzle-orm": "^0.44.5"
  }
}
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
