import { Link } from 'react-router-dom'
import {
    LuClock,
    LuRefreshCw,
    LuCircleCheck,
    LuCircleX,
    LuClipboardList,
    LuX,
} from 'react-icons/lu'
import { useQueueStore } from '../stores/useQueueStore'

const STATUS_CONFIG = {
    pending: {
        Icon: LuClock,
        label: 'Aguardando conexão',
        color: 'text-yellow-400',
        border: 'border-yellow-500/30',
        bg: 'bg-yellow-500/5',
        spin: false,
    },
    syncing: {
        Icon: LuRefreshCw,
        label: 'Enviando...',
        color: 'text-blue-400',
        border: 'border-blue-500/30',
        bg: 'bg-blue-500/5',
        spin: true,
    },
    success: {
        Icon: LuCircleCheck,
        label: 'Pedido confirmado!',
        color: 'text-green-400',
        border: 'border-green-500/30',
        bg: 'bg-green-500/5',
        spin: false,
    },
    failed: {
        Icon: LuCircleX,
        label: 'Falhou',
        color: 'text-red-400',
        border: 'border-red-500/30',
        bg: 'bg-red-500/5',
        spin: false,
    },
}

export function OrderQueue() {
    const { queue, removeEntry } = useQueueStore()

    if (queue.length === 0) return null

    return (
        <div className="border-t border-gray-200 px-4 py-3 flex flex-col gap-2">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
                <LuClipboardList size={12} />
                Fila de pedidos
            </p>

            {queue.map(entry => {
                const cfg = STATUS_CONFIG[entry.status] || STATUS_CONFIG.pending
                const { Icon } = cfg
                const time = new Date(entry.createdAt).toLocaleTimeString(
                    'pt-BR',
                    { hour: '2-digit', minute: '2-digit' },
                )
                const itemCount = entry.items.reduce(
                    (sum, i) => sum + i.quantity,
                    0,
                )

                return (
                    <div
                        key={entry.id}
                        className={`rounded-xl border ${cfg.border} ${cfg.bg} px-3 py-2.5 flex items-start justify-between gap-2`}
                    >
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                            <Icon
                                size={14}
                                className={`mt-0.5 shrink-0 ${cfg.color} ${cfg.spin ? 'animate-spin' : ''}`}
                            />
                            <div className="flex-1 min-w-0">
                                <p
                                    className={`text-xs font-semibold ${cfg.color}`}
                                >
                                    {cfg.label}
                                </p>
                                <p className="text-gray-500 text-xs mt-0.5">
                                    {itemCount} item{itemCount !== 1 ? 's' : ''}{' '}
                                    · {time}
                                </p>

                                {entry.status === 'failed' && entry.error && (
                                    <p className="text-red-400/70 text-xs mt-1 leading-snug">
                                        {entry.error}
                                    </p>
                                )}

                                {entry.status === 'success' && (
                                    <Link
                                        to="/orders"
                                        className="text-green-400 text-xs mt-1.5 inline-flex items-center gap-1 hover:text-green-300 transition-colors font-medium"
                                    >
                                        Ver pedidos →
                                    </Link>
                                )}
                            </div>
                        </div>

                        {(entry.status === 'failed' ||
                            entry.status === 'success') && (
                            <button
                                onClick={() => removeEntry(entry.id)}
                                className="text-gray-600 hover:text-gray-400 transition-colors shrink-0 cursor-pointer mt-0.5"
                                title="Dispensar"
                            >
                                <LuX size={13} />
                            </button>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
