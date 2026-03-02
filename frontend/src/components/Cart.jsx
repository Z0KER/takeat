import { useState } from 'react'
import {
    LuShoppingCart,
    LuUtensils,
    LuLoaderCircle,
    LuWifiOff,
    LuCircleCheck,
} from 'react-icons/lu'
import { useCartStore } from '../stores/useCartStore'
import { useQueueStore } from '../stores/useQueueStore'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import { createOrder } from '../api/orders'
import { CartItem } from './CartItem'
import { StockErrorModal } from './StockErrorModal'
import { OrderQueue } from './OrderQueue'

export function Cart({ hideHeader = false }) {
    const { items, clearCart, removeItem } = useCartStore()
    const { enqueue } = useQueueStore()
    const isOnline = useOnlineStatus()

    const [loading, setLoading] = useState(false)
    const [stockError, setStockError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(false)

    const computedTotal = items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
    )

    const handleConfirmOrder = async () => {
        if (items.length === 0) return

        const orderItems = items.map(i => ({
            productId: i.productId,
            quantity: i.quantity,
        }))

        if (!isOnline) {
            enqueue(orderItems)
            clearCart()
            return
        }

        setLoading(true)
        setStockError(null)

        try {
            await createOrder(orderItems)
            clearCart()
            setSuccessMsg(true)
            setTimeout(() => setSuccessMsg(false), 3000)
        } catch (err) {
            if (err.errorType === 'StockError') {
                setStockError({
                    message: err.message,
                    details: err.details,
                    affectedProducts: items.map(i => ({
                        productId: i.productId,
                        name: i.name,
                    })),
                })
            } else {
                enqueue(orderItems)
                clearCart()
            }
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveAffected = productId => {
        removeItem(productId)
        setStockError(null)
    }

    return (
        <>
            <aside className="bg-white shadow-sm border-l border-gray-200 flex flex-col h-full">
                {!hideHeader && (
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h2 className="text-gray-900 font-bold text-lg flex items-center gap-2">
                            <LuShoppingCart
                                className="text-brand-red"
                                size={20}
                            />
                            Carrinho
                            {items.length > 0 && (
                                <span className="bg-brand-red text-white text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                                    {items.reduce((s, i) => s + i.quantity, 0)}
                                </span>
                            )}
                        </h2>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-600">
                            <LuUtensils size={48} />
                            <p className="text-sm">Nenhum item adicionado</p>
                        </div>
                    ) : (
                        items.map(item => (
                            <CartItem key={item.productId} item={item} />
                        ))
                    )}
                </div>

                <OrderQueue />

                <div className="px-6 py-5 border-t border-gray-200 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Total</span>
                        <span className="text-gray-900 font-bold text-xl">
                            R${' '}
                            {computedTotal.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </span>
                    </div>

                    {successMsg && (
                        <div className="bg-green-500/20 border border-green-500/40 text-green-400 text-sm font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2">
                            <LuCircleCheck size={16} />
                            Pedido confirmado!
                        </div>
                    )}

                    <button
                        onClick={handleConfirmOrder}
                        disabled={items.length === 0 || loading}
                        className="w-full bg-brand-yellow hover:-translate-y-1 hover:shadow-xl disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed active:scale-95 text-gray-900 font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {loading ? (
                            <LuLoaderCircle
                                size={18}
                                className="animate-spin"
                            />
                        ) : !isOnline ? (
                            <>
                                <LuWifiOff size={16} />
                                Salvar na fila
                            </>
                        ) : (
                            'Confirmar Pedido'
                        )}
                    </button>

                    {!isOnline && (
                        <p className="text-brand-red text-xs text-center">
                            Offline — o pedido será enviado quando a conexão
                            voltar
                        </p>
                    )}
                </div>
            </aside>

            <StockErrorModal
                error={stockError}
                onRemoveItem={handleRemoveAffected}
                onClose={() => setStockError(null)}
            />
        </>
    )
}
