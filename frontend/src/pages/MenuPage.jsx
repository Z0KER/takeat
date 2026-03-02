import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { LuClipboardList, LuShoppingCart, LuX } from 'react-icons/lu'
import { fetchProducts } from '../api/products'
import { createOrder } from '../api/orders'
import { useQueueStore } from '../stores/useQueueStore'
import { useCartStore } from '../stores/useCartStore'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import { ProductCard } from '../components/ProductCard'
import { Cart } from '../components/Cart'
import { OfflineToast } from '../components/OfflineToast'

export function MenuPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState(null)
    const [cartOpen, setCartOpen] = useState(false)

    const isOnline = useOnlineStatus()
    const { setIsSyncing, updateEntry, removeEntry } = useQueueStore()
    const { items } = useCartStore()
    const isSyncingRef = useRef(false)

    const itemCount = items.reduce((s, i) => s + i.quantity, 0)

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch(() => setLoadError('Não foi possível carregar o cardápio.'))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)')
        const handle = e => {
            if (e.matches) setCartOpen(false)
        }
        mq.addEventListener('change', handle)
        return () => mq.removeEventListener('change', handle)
    }, [])

    useEffect(() => {
        if (!isOnline || isSyncingRef.current) return

        const pending = useQueueStore
            .getState()
            .queue.filter(e => e.status === 'pending')

        if (pending.length === 0) return

        isSyncingRef.current = true
        setIsSyncing(true)

        const syncQueue = async () => {
            for (const entry of pending) {
                updateEntry(entry.id, { status: 'syncing' })
                try {
                    await createOrder(entry.items)
                    updateEntry(entry.id, { status: 'success' })
                    setTimeout(() => removeEntry(entry.id), 5000)
                } catch (err) {
                    updateEntry(entry.id, {
                        status: 'failed',
                        error:
                            err.errorType === 'StockError'
                                ? `Estoque insuficiente: ${err.details?.map(d => d.inputName).join(', ')}`
                                : err.message ||
                                  'Erro ao processar pedido da fila.',
                    })
                }
            }
            isSyncingRef.current = false
            setIsSyncing(false)
        }

        syncQueue()
    }, [isOnline]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="min-h-screen bg-brand-bg flex flex-col">
            <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-4 flex items-center gap-3">
                <h1 className="text-gray-900 font-bold text-xl">
                    <Link to="/">
                        <img
                            src="takeat.svg"
                            alt="Takeat"
                            width={93}
                            height={27}
                        />
                    </Link>
                </h1>
                <Link
                    to="/orders"
                    className="ml-auto text-sm text-gray-500 hover:text-brand-red transition-colors flex items-center gap-2"
                >
                    <LuClipboardList size={16} />
                    <span className="hidden sm:inline">Ver Pedidos</span>
                </Link>
            </header>

            <OfflineToast isOnline={isOnline} />

            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6 pb-28 md:pb-6">
                    <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-5">
                        Cardápio
                    </h2>

                    {loading && (
                        <div className="flex items-center justify-center h-48 gap-3 text-gray-500">
                            <span className="animate-spin text-2xl">⏳</span>
                            <span>Carregando produtos...</span>
                        </div>
                    )}

                    {loadError && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-5 py-4 text-sm">
                            {loadError}
                        </div>
                    )}

                    {!loading && !loadError && (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                            {products.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    )}
                </main>

                <div className="hidden md:flex w-96 shrink-0 flex-col h-[calc(100vh-65px)]">
                    <Cart />
                </div>
            </div>

            {!cartOpen && (
                <button
                    onClick={() => setCartOpen(true)}
                    className="md:hidden fixed bottom-6 right-4 z-40 bg-brand-red hover:bg-brand-dark active:scale-95 text-gray-900 font-bold px-5 py-4 rounded-2xl shadow-2xl shadow-orange-500/30 flex items-center gap-3 transition-all duration-150 cursor-pointer"
                >
                    <LuShoppingCart size={20} />
                    {itemCount > 0 ? (
                        <>
                            <span>
                                {itemCount} {itemCount === 1 ? 'item' : 'itens'}
                            </span>
                            <span className="bg-white text-brand-red text-xs font-black px-2 py-0.5 rounded-full">
                                VER
                            </span>
                        </>
                    ) : (
                        <span className="text-sm">Carrinho vazio</span>
                    )}
                </button>
            )}

            {cartOpen && (
                <>
                    <div
                        className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        onClick={() => setCartOpen(false)}
                    />
                    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white shadow-sm rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh] animate-slide-up">
                        <div className="flex items-center justify-between px-5 pt-4 pb-2">
                            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
                            <span className="text-gray-900 font-bold text-lg flex items-center gap-2">
                                <LuShoppingCart
                                    size={18}
                                    className="text-brand-red"
                                />
                                Carrinho
                            </span>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="text-gray-500 hover:text-brand-red transition-colors cursor-pointer"
                            >
                                <LuX size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <Cart hideHeader />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
