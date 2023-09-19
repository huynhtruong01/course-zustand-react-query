## React Query + Zustand + TS

- [React Query + Zustand + TS](#react-query--zustand--ts)
  - [Install Zustand](#install-zustand)
  - [Create store \& Bind it to component to `Update state`](#create-store--bind-it-to-component-to-update-state)
  - [Middleware](#middleware)

---

### Install Zustand

```sh
npm install zustand
# or
yarn add zustand
```

[🔝 Back to top](#react-query--zustand--ts)

---

### Create store & Bind it to component to `Update state`

- The store is a hook. We can put anything in it: primitives, objects, function,...

```ts
import { create } from 'zustand'

interface ICountStore {
    count: number
    increase: () => void
    decrease: () => void
}

const useCountStore = create<ICountStore>((set) => ({
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 1 })),
}))
```

- Then we can bind it to `component` and `Update state` like this:

<!-- Counter.tsx -->
```tsx
import { useCountStore } from '@/store/countStore.ts'

function Counter() {
    const count = useCountStore((state) => state.count)
    const increase = useCountStore((state) => state.increase)
    const decrease = useCountStore((state) => state.decrease)

    const handleIncrease = () => {
        increase()
    }

    const handleDecrease = () => {
        decrease()
    }

    return (
        <div>{count}</div>
        <div>
            <button onClick={handleDecrease}>-</button>
            <button onClick={handleIncrease}>+</button>
        </div>
    )
}
```

[🔝 Back to top](#react-query--zustand--ts)

---

### Middleware

1. `Persist` store data

- We can import `persist` from `zustand/middleware`

```ts
import { persist } from 'zustand/middleware'
import { create } from 'zustand'

const useCountStore = create(
    persist<ICountStore>((set) => ({
        count: 0,
        increase: () => set((state) => ({ count: state.count + 1 })),
        ....
    }))
)
```

2. `Devtools`

- It will show state in the `redux devtools`

```ts
import { persist, devtools } from 'zustand/middleware'
import { create } from 'zustand'

const useCountStore = create(
    devtools(
        persist<ICountStore>((set) => ({
            count: 0,
            increase: () => set((state) => ({ count: state.count + 1 })),
            ....
        }))
    )
)
```

3. `Immer`

- You should be install `immer` as a direct dependency.

```ts
import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'

export const useCountStore = create(
    immer<...>((set) => ({
        count: 0,
        increase: () => set((state) => ({ count: state.count + 1 }))
    }))
)
```

- Or we can see `todos` when we want to change `done` of item todo with `idTodo`

```ts
export const useTodoStore = create(
  immer<State & Actions>((set) => ({
    todos: {
      '82471c5f-4207-4b1d-abcb-b98547e01a3e': {
        id: '82471c5f-4207-4b1d-abcb-b98547e01a3e',
        title: 'Learn Zustand',
        done: false,
      },
      '354ee16c-bfdd-44d3-afa9-e93679bda367': {
        id: '354ee16c-bfdd-44d3-afa9-e93679bda367',
        title: 'Learn Jotai',
        done: false,
      },
      '771c85c5-46ea-4a11-8fed-36cc2c7be344': {
        id: '771c85c5-46ea-4a11-8fed-36cc2c7be344',
        title: 'Learn Valtio',
        done: false,
      },
      '363a4bac-083f-47f7-a0a2-aeeee153a99c': {
        id: '363a4bac-083f-47f7-a0a2-aeeee153a99c',
        title: 'Learn Signals',
        done: false,
      },
    },
    toggleTodo: (todoId: string) =>
      set((state) => {
        state.todos[todoId].done = !state.todos[todoId].done // it works, don't need to find idx and update it 
      }),
  }))
)
```

[🔝 Back to top](#react-query--zustand--ts)
