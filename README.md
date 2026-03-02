# 🍔 Takeat — Sistema de Pedidos com Estoque Atômico

Sistema completo de gerenciamento de pedidos offline-first para restaurantes, construído com Node.js e React. Garante a integridade absoluta do estoque baseado na ficha técnica: ao vender um produto, os ingredientes exatos que o compõem são decrementados atomicamente em uma única transação no banco.

---

## Estrutura do Repositório

```text
takeat/
├── backend/    # API Node.js + Express + Sequelize + PostgreSQL
└── frontend/   # Interface React 19 + Tailwind v4 + Zustand
```

---

## 🛠️ Tecnologias Principais

**Backend:**

- Node.js 18+ com Express
- Sequelize ORM (operações atômicas e row-level locks)
- PostgreSQL (relacional com ACID compliance)

**Frontend:**

- React 19 + Vite
- Tailwind CSS v4
- Zustand v5 (com middleware de persistência e sem código boilerplate)
- React Router DOM v7
- Lucide React (ícones vetoriais modernos)

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js v18 ou superior
- PostgreSQL na máquina local rodando (banco `restaurant_db` / user `restaurant_user`)
- pnpm instalado globalmente (`npm install -g pnpm`)

### 1. Backend

```bash
cd backend
pnpm install
cp .env.example .env    # O padrão funciona out-of-the-box para postgres local
pnpm run db:migrate     # Criação de tabelas
pnpm run db:seed        # População do cardápio e insumos
pnpm run dev            # Inicia servidor na porta 3000
```

### 2. Frontend

```bash
cd frontend
pnpm install
pnpm dev                # Inicia Vite na porta 5173
```

Acesse o sistema em: **`http://localhost:5173`**

---

## 🌟 Diferenciais Técnicos

### Estoque Atômico Transacional (`SELECT FOR UPDATE`)

Se o cliente pedir "3 X-Saladas" e no final "1 Hambúrguer", na transação do backend, fazemos o agrupamento dos insumos na memória, emitimos row-locks para trancar os estoques temporariamente (`LOCK.UPDATE`), comparamos e se faltar uma grama de salada, a transação aborta (_total rollback_) devolvendo `409 Conflict`. Nenhum estoque é descontado nem um pedido parcial é salvo.

### Resiliência Offline-First (Local Fila)

Se a internet cair (ou o ambiente for de cobertura ruim no salão):

1. O painel central avisa o garçom com banners amarelos.
2. O pedido não é recusado. Ele cai em uma **fila local protegida no LocalStorage** (com Zustand `persist`).
3. Quando a internet reconecta, o frontend imediatamente captura o evento `online` do window disparando o sync massivo para a API de forma sequencial, notificando o garçom o status de cada envio sem necessitar que a página paralise.

### UX Responsivo State-of-the-Art

O Front-End usa os novos resources do **Tailwind v4**, trazendo Glassmorphism, animações refinadas e Design System nativo (`@theme` integrando a identidade visual da Takeat — `#c8131b` Red e `#fffef2` Off-White). Suporte responsivo extremo com Drawers no mobile vs Sidebar ampla em desktop.

---

> Desafio criado focando em estabilidade de banco de dados (`Atomicidade`) e experiência de usuário de linha de frente (`Offline-first App`).
