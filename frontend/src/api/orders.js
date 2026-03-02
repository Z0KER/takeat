const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchOrders() {
    const res = await fetch(`${BASE_URL}/orders`)
    if (!res.ok) throw new Error('Erro ao buscar pedidos')
    return res.json()
}

export async function createOrder(items) {
    const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
    })

    const data = await res.json()

    if (!res.ok) {
        const err = new Error(data.message || 'Erro ao criar pedido')
        err.statusCode = res.status
        err.details = data.details || []
        err.errorType = data.error || 'UnknownError'
        throw err
    }

    return data
}
