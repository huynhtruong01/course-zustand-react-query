import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

interface ICountStore {
    count: number
    increase: () => void
    decrease: () => void
}

export const useCountStore = create(
    devtools(
        persist<ICountStore>(
            (set) => ({
                count: 0,
                increase: () => set((state) => ({ count: state.count + 1 })),
                decrease: () =>
                    set((state) => ({ count: state.count > 0 ? state.count - 1 : 0 })),
            }),
            {
                name: 'count-storage',
                storage: createJSONStorage(() => sessionStorage),
            }
        )
    )
)
