import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    LuArrowLeft,
    LuRefreshCw,
    LuChevronDown,
    LuChevronUp,
    LuLoaderCircle,
    LuClipboardList,
} from 'react-icons/lu'
import { fetchOrders } from '../api/orders'
import { fetchProducts } from '../api/products'

const STATUS_LABEL = {
    pending: {
        label: 'Pendente',
        color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    },
    confirmed: {
        label: 'Confirmado',
        color: 'text-green-400 bg-green-400/10 border-green-400/30',
    },
    preparing: {
        label: 'Preparando',
        color: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    },
    delivered: {
        label: 'Entregue',
        color: 'text-gray-500 bg-gray-400/10 border-gray-400/30',
    },
    cancelled: {
        label: 'Cancelado',
        color: 'text-red-400 bg-red-400/10 border-red-400/30',
    },
}

export function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [expandedId, setExpandedId] = useState(null)

    const load = () => {
        setLoading(true)
        setError(null)
        Promise.all([fetchOrders(), fetchProducts()])
            .then(([ordersData, productsData]) => {
                setOrders(ordersData)
                setProducts(productsData)
            })
            .catch(() => setError('Não foi possível carregar os pedidos.'))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        load()
    }, [])

    const getIngredients = productId => {
        const product = products.find(p => p.id === productId)
        return product?.productInputs || []
    }

    const toggleExpand = orderId => {
        setExpandedId(prev => (prev === orderId ? null : orderId))
    }

    return (
        <div className="min-h-screen bg-brand-bg flex flex-col">
            <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-4 flex items-center gap-4">
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
                <span className="text-gray-500 text-sm ml-1">/ Pedidos</span>
                <button
                    onClick={load}
                    className="ml-auto text-sm text-gray-500 hover:text-brand-red flex items-center gap-2 transition-colors cursor-pointer"
                >
                    <LuRefreshCw size={15} />
                    Atualizar
                </button>
            </header>

            <main className="flex-1 px-4 md:px-6 py-8 max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-gray-900 font-bold text-2xl">
                        Pedidos Realizados
                    </h2>
                    {!loading && (
                        <span className="text-gray-500 text-sm">
                            {orders.length} pedido
                            {orders.length !== 1 ? 's' : ''}
                        </span>
                    )}
                </div>

                {loading && (
                    <div className="flex items-center justify-center h-48 gap-3 text-gray-500">
                        <LuLoaderCircle size={24} className="animate-spin" />
                        <span>Carregando pedidos...</span>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-5 py-4 text-sm">
                        {error}
                    </div>
                )}

                {!loading && !error && orders.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-48 gap-3 text-gray-600">
                        <LuClipboardList size={48} />
                        <p className="text-sm">
                            Nenhum pedido realizado ainda.
                        </p>
                    </div>
                )}

                {!loading && !error && orders.length > 0 && (
                    <div className="flex flex-col gap-4">
                        {orders.map(order => {
                            const status =
                                STATUS_LABEL[order.status] ||
                                STATUS_LABEL.pending
                            const createdAt = new Date(
                                order.createdAt,
                            ).toLocaleString('pt-BR')
                            const isExpanded = expandedId === order.id

                            return (
                                <div
                                    key={order.id}
                                    className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden"
                                >
                                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-900 font-bold text-sm">
                                                Pedido #{order.id}
                                            </span>
                                            <span
                                                className={`text-xs font-semibold px-3 py-1 rounded-full border ${status.color}`}
                                            >
                                                {status.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-brand-green font-bold">
                                                    R${' '}
                                                    {parseFloat(
                                                        order.total,
                                                    ).toLocaleString('pt-BR', {
                                                        minimumFractionDigits: 2,
                                                    })}
                                                </p>
                                                <p className="text-gray-500 text-xs mt-0.5">
                                                    {createdAt}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    toggleExpand(order.id)
                                                }
                                                className="text-gray-500 hover:text-orange-400 transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
                                            >
                                                {isExpanded ? (
                                                    <>
                                                        <LuChevronUp
                                                            size={14}
                                                        />{' '}
                                                        Fechar
                                                    </>
                                                ) : (
                                                    <>
                                                        <LuChevronDown
                                                            size={14}
                                                        />{' '}
                                                        Detalhes
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="divide-y divide-gray-800/60">
                                        {order.items?.map(item => {
                                            const ingredients = getIngredients(
                                                item.productId,
                                            )
                                            const subtotal =
                                                parseFloat(item.unitPrice) *
                                                item.quantity

                                            return (
                                                <div key={item.id}>
                                                    <div className="flex items-center justify-between px-5 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-brand-red font-bold text-sm w-6 text-center">
                                                                ×{item.quantity}
                                                            </span>
                                                            <div>
                                                                <span className="text-gray-800 text-sm font-medium">
                                                                    {item
                                                                        .product
                                                                        ?.name ||
                                                                        `Produto #${item.productId}`}
                                                                </span>
                                                                <span className="text-gray-600 text-xs ml-2">
                                                                    R${' '}
                                                                    {parseFloat(
                                                                        item.unitPrice,
                                                                    ).toLocaleString(
                                                                        'pt-BR',
                                                                        {
                                                                            minimumFractionDigits: 2,
                                                                        },
                                                                    )}{' '}
                                                                    / un
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <span className="text-gray-700 text-sm font-semibold">
                                                            R${' '}
                                                            {subtotal.toLocaleString(
                                                                'pt-BR',
                                                                {
                                                                    minimumFractionDigits: 2,
                                                                },
                                                            )}
                                                        </span>
                                                    </div>

                                                    {isExpanded &&
                                                        ingredients.length >
                                                            0 && (
                                                            <div className="px-5 pb-4">
                                                                <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-2">
                                                                    Ficha
                                                                    técnica —{' '}
                                                                    {
                                                                        item
                                                                            .product
                                                                            ?.name
                                                                    }
                                                                </p>
                                                                <div className="bg-gray-50 rounded-xl divide-y divide-gray-700/50">
                                                                    {ingredients.map(
                                                                        pi => (
                                                                            <div
                                                                                key={
                                                                                    pi.id ||
                                                                                    pi.inputId
                                                                                }
                                                                                className="flex items-center justify-between px-4 py-2.5"
                                                                            >
                                                                                <div className="flex items-center gap-2">
                                                                                    <span className="text-gray-500 text-xs">
                                                                                        •
                                                                                    </span>
                                                                                    <span className="text-gray-700 text-sm">
                                                                                        {
                                                                                            pi
                                                                                                .input
                                                                                                ?.name
                                                                                        }
                                                                                    </span>
                                                                                    <span className="text-gray-600 text-xs">
                                                                                        (
                                                                                        {
                                                                                            pi
                                                                                                .input
                                                                                                ?.unit
                                                                                        }

                                                                                        )
                                                                                    </span>
                                                                                </div>
                                                                                <span className="text-gray-500 text-xs">
                                                                                    ×
                                                                                    {
                                                                                        item.quantity
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {isExpanded && (
                                        <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                                            <span className="text-gray-500 text-xs">
                                                {order.items?.reduce(
                                                    (s, i) => s + i.quantity,
                                                    0,
                                                )}{' '}
                                                item(s) · {order.items?.length}{' '}
                                                produto(s)
                                            </span>
                                            <span className="text-brand-green font-bold">
                                                Total: R${' '}
                                                {parseFloat(
                                                    order.total,
                                                ).toLocaleString('pt-BR', {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </main>
        </div>
    )
}
