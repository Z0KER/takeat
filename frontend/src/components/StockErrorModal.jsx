import { LuTriangleAlert, LuX } from 'react-icons/lu'

export function StockErrorModal({ error, onRemoveItem, onClose }) {
    if (!error) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white shadow-sm border border-red-500/40 rounded-2xl shadow-2xl max-w-md w-full p-6 flex flex-col gap-5 animate-fade-in">
                <div className="flex items-start gap-3">
                    <LuTriangleAlert
                        size={30}
                        className="text-red-400 shrink-0 mt-0.5"
                    />
                    <div>
                        <h2 className="text-gray-900 font-bold text-lg">
                            Estoque insuficiente
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Alguns ingredientes estão em falta. Remova os itens
                            problemáticos e tente novamente.
                        </p>
                    </div>
                </div>

                <div className="bg-gray-100 rounded-xl divide-y divide-gray-700">
                    {error.details?.map(d => (
                        <div
                            key={d.inputId}
                            className="flex items-center justify-between px-4 py-3"
                        >
                            <div>
                                <p className="text-gray-900 text-sm font-medium">
                                    {d.inputName}
                                </p>
                                <p className="text-red-400 text-xs">
                                    Precisa: {d.required} · Disponível:{' '}
                                    {d.available}
                                </p>
                            </div>
                            <LuX size={16} className="text-red-500" />
                        </div>
                    ))}
                </div>

                {error.affectedProducts?.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold">
                            Remover do carrinho:
                        </p>
                        {error.affectedProducts.map(p => (
                            <button
                                key={p.productId}
                                onClick={() => onRemoveItem(p.productId)}
                                className="flex items-center justify-between bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium rounded-xl px-4 py-3 transition-colors cursor-pointer"
                            >
                                <span>{p.name}</span>
                                <span className="text-xs">Remover →</span>
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-500 hover:text-brand-red transition-colors px-4 py-2 cursor-pointer"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    )
}
