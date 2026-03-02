# 🍔 Takeat — Backend

API RESTful em **Node.js + Express + Sequelize + PostgreSQL**.

O coração do negócio está na gestão atômica de estoque: o sistema não controla apenas a quantidade de um "produto", mas gerencia a ficha técnica. Ao solicitar uma compra, o sistema calcula o consumo consolidado baseando-se na composição do prato, verificando e travando os registros do banco atomicamente (com `SELECT FOR UPDATE`) para evitar `race conditions` em alto tráfego.

## 🛠️ Tecnologias Principais

- Node.js 18+
- Express (Routing e Middleware Setup)
- Sequelize ORM (Relacionamentos complexos e Transações Manuais)
- PostgreSQL (Banco de dados relacional ACID compliance)

---

## 🚀 Como Iniciar

1. Certifique-se de que o **PostgreSQL** está online.
2. Crie uma base `restaurant_db` provida pelo usuário `restaurant_user` (senha: `test`).
3. Instale as dependências com **pnpm**.

```bash
pnpm install
cp .env.example .env     # O padrão aponta para localhost
pnpm run db:migrate      # Prepara o schema no postgres
pnpm run db:seed         # Adiciona produtos base (X-Burger, X-Frango, Ingredientes)
pnpm run dev             # API roda em http://localhost:3000
```

---

## 🗄️ Arquitetura

O projeto adota uma separação rigorosa em MVC-like para maior sustentabilidade:

- **`routes/`**: Define os endpoints que reagem aos mapeamentos HTTP.
- **`controllers/`**: Desempacota o request, valida, invoca serviços e formata a resposta.
- **`services/`**: Concentra TODA a regra de negócio. Controllers nunca tocam diretamente em models de gravação.
- **`models/`**: Definições de entidades e os fluxos Relacionais N:N.

---

## 📌 Rotas / API

### `POST /orders` (Operação Atômica)

Cria um pedido e efetua a baixa automática em cascata por toda a árvore de insumos.
Se faltar saldo de QUALQUER item da composição (ex: faltou pão para o 3º hambúrguer), o backend ativa o `Throw StockError`, a transação efetua Rollback seguro e entrega 409 Conflict especificando quanto de saldo possui versus quanto o pedido tentou gastar.

```json
// POST Body
{
    "items": [{ "productId": 1, "quantity": 1 }]
}
```

Outras rotas acessórias:

- `GET /products` (Lista cardápio com array embutido exibindo Fichas Técnicas)
- `GET /inputs` (Lista estoque cru atual para validação)
- `GET /orders` (Lista pedidos antigos com status de aprovação)
- `GET /health`
