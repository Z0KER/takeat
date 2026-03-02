# 🍔 Takeat — Frontend

Interface React ágil e inteligente focada em resolver o problema do "Garçom Sem Conexão". Combina a fluidez de estados puramente locais com uma camada de rede assíncrona tolerante a falhas (Strategy Pattern Offline-First).

## 🛠️ Stack Tecnológica

- **React 19** + **Vite** (Build ultra-rápida)
- **Tailwind CSS v4** (Utility first, animações nativas modernas e design polido)
- **Zustand v5** (Store de UI instantânea, + local/session persistence state)
- **React Router v7**

---

## 🚀 Como Iniciar

É essencial que o Backend esteja previamente rodando na porta 3000.

```bash
pnpm install
cp .env.example .env    # Aponta nativamente para http://localhost:3000
pnpm dev                # Executa o Vite e carrega as ferramentas
```

O App iniciará em **http://localhost:5173**

---

## ⚡ Detalhes Arquiteturais e Features

### Tailwind v4 e Identidade Oficial Takeat

O Frontend foi escrito 100% incorporando um Design System nativo configurado via `@theme`. As Fontes foram importadas (`Montserrat`) e todo o layout utiliza paletas do site corporativo Takeat (`#fffef2` Creme, `#c8131b` Vermelho). A barra de scroll, animações de deslize (Slide-down/Slide-up) e Fades foram incluídas explicitamente nos CSS Utilities para maior polimento visual.

### Gerenciamento de Estado sem Boilerplate

`Zustand` gerencia duas esferas inteiramente diferentes:

1. `useCartStore`: Um repositório de memória de alta mutabilidade que calcula valores instantâneos baseando-se nas re-renderizações locais (limpado assim que um request é efetuado).
2. `useQueueStore`: Uma Fila Persistente no disco local (localstorage via Zustand Persist) que gerencia de ponta a ponta as falhas de rede.

### 📡 Offline / Queue Sync

Os garçons que usam esta interface não precisam se preocupar se a internet caiu.

- Em estado "Offline", o botão **`Confirmar Pedido`** se transforma em **`Salvar na Fila`**.
- O pedido cai imediatamente na Queue.
- Um hook invisível assina a reativação da rede (`useOnlineStatus`). Quando a banda é restabelecida, o sistema envia transações em bulk seqüenciais e atualiza o card do front end com o Status exato, exibindo Toasts que notificam imediatamente caso a venda sofra conflito de falta de estoque tardia.

## 🗺️ Mapa de Diretórios

- `api/` : Axios/Fetch Wrappers para o servidor.
- `components/`: UI isolada (Cart, Modais de Erro, Animações de loading).
- `stores/` : Concentrações lógicas via Zustand.
- `pages/` : Controladores de View Principal.
