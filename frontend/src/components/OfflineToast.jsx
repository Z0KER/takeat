import { useEffect, useState } from 'react'
import { LuWifiOff, LuRefreshCw, LuCircleX, LuX } from 'react-icons/lu'
import { useQueueStore } from '../stores/useQueueStore'

export function OfflineToast({ isOnline }) {
    const { queue, isSyncing } = useQueueStore()
    const [lateFailures, setLateFailures] = useState([])
    const [dismissed, setDismissed] = useState([])

    useEffect(() => {
        const failed = queue.filter(
            e => e.status === 'failed' && !dismissed.includes(e.id),
        )
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLateFailures(failed)
    }, [queue, dismissed])

    const dismissFailure = id => {
        setDismissed(prev => [...prev, id])
        useQueueStore.getState().removeEntry(id)
    }

    const pendingCount = queue.filter(e => e.status === 'pending').length

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none">
            {!isOnline && (
                <div className="bg-white shadow-sm border border-brand-red/60 text-brand-red text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 pointer-events-auto animate-slide-down">
                    <LuWifiOff size={16} />
                    <span>
                        Sem conexão — pedidos salvos na fila
                        {pendingCount > 0 &&
                            ` (${pendingCount} pendente${pendingCount > 1 ? 's' : ''})`}
                    </span>
                </div>
            )}

            {isOnline && isSyncing && (
                <div className="bg-white shadow-sm border border-blue-500/60 text-blue-300 text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 pointer-events-auto animate-slide-down">
                    <LuRefreshCw size={16} className="animate-spin" />
                    <span>Sincronizando pedidos da fila...</span>
                </div>
            )}

            {lateFailures.map(entry => (
                <div
                    key={entry.id}
                    className="bg-white shadow-sm border border-red-500/60 text-red-300 text-sm px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 pointer-events-auto animate-slide-down"
                >
                    <LuCircleX size={16} className="shrink-0" />
                    <span className="flex-1">
                        <strong>Pedido antigo falhou:</strong>{' '}
                        {entry.error || 'Estoque insuficiente ao sincronizar.'}
                    </span>
                    <button
                        onClick={() => dismissFailure(entry.id)}
                        className="text-gray-500 hover:text-brand-red transition-colors ml-2 cursor-pointer"
                    >
                        <LuX size={14} />
                    </button>
                </div>
            ))}
        </div>
    )
}
