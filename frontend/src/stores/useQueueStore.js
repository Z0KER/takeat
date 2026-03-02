import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useQueueStore = create(
    persist(
        (set, get) => ({
            queue: [],
            isSyncing: false,

            enqueue: items => {
                const entry = {
                    id: `queue_${Date.now()}_${Math.random().toString(36).slice(2)}`,
                    items,
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    error: null,
                }
                set({ queue: [...get().queue, entry] })
                return entry.id
            },

            updateEntry: (id, patch) => {
                set({
                    queue: get().queue.map(e =>
                        e.id === id ? { ...e, ...patch } : e,
                    ),
                })
            },

            removeEntry: id => {
                set({ queue: get().queue.filter(e => e.id !== id) })
            },

            setIsSyncing: value => set({ isSyncing: value }),
        }),
        {
            name: 'takeat-order-queue',
        },
    ),
)
