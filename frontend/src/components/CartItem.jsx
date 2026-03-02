import { useCartStore } from '../stores/useCartStore'

export function CartItem({ item }) {
    const { updateQuantity } = useCartStore()

    return (
        <div className="flex items-center gap-3 py-3 border-b border-gray-200 last:border-0">
            <div className="flex-1 min-w-0">
                <p className="text-gray-900 text-sm font-medium truncate">
                    {item.name}
                </p>
                <p className="text-gray-500 text-xs">
                    R${' '}
                    {item.price.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                    })}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                    }
                    className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-900 flex items-center justify-center text-sm transition-colors cursor-pointer"
                >
                    −
                </button>
                <span className="text-gray-900 text-sm font-semibold w-4 text-center">
                    {item.quantity}
                </span>
                <button
                    onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-900 flex items-center justify-center text-sm transition-colors cursor-pointer"
                >
                    +
                </button>
            </div>

            <span className="text-brand-green text-sm font-bold w-16 text-right">
                R${' '}
                {(item.price * item.quantity).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                })}
            </span>
        </div>
    )
}
