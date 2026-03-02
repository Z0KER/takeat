import { LuChefHat } from 'react-icons/lu'
import { useCartStore } from '../stores/useCartStore'

export function ProductCard({ product }) {
    const { addItem, items } = useCartStore()

    const cartItem = items.find(i => i.productId === product.id)
    const qty = cartItem?.quantity || 0

    return (
        <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-200 flex flex-col">
            <div className="h-44 bg-gray-200 flex items-center justify-center overflow-hidden">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <LuChefHat size={52} className="text-gray-500" />
                )}
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="text-gray-900 font-semibold text-base leading-tight">
                    {product.name}
                </h3>
                {product.description && (
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                        {product.description}
                    </p>
                )}

                <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-brand-green font-bold text-lg">
                        R${' '}
                        {parseFloat(product.price).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                        })}
                    </span>

                    <button
                        onClick={() => addItem(product)}
                        className="relative bg-brand-dark hover:bg-brand-red active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-150 cursor-pointer"
                    >
                        {qty > 0 && (
                            <span className="absolute -top-2 -right-2 bg-white text-brand-red text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                                {qty}
                            </span>
                        )}
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    )
}
