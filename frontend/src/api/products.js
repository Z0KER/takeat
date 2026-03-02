const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchProducts() {
    const res = await fetch(`${BASE_URL}/products`)
    if (!res.ok) throw new Error('Erro ao buscar produtos')
    return res.json()
}
