import { useCountStore } from '@/store'

function App() {
    const count = useCountStore((state) => state.count)
    const increaseCount = useCountStore((state) => state.increase)
    const decreaseCount = useCountStore((state) => state.decrease)

    const handleIncrease = () => {
        increaseCount()
    }

    const handleDecrease = () => {
        decreaseCount()
    }

    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <p className="mb-2 text-4xl font-semibold text-gray-800">{count}</p>
            <div>
                <button
                    className="inline-flex bg-red-500 text-white rounded px-4 py-2 mr-2"
                    onClick={handleDecrease}
                >
                    -
                </button>
                <button
                    className="inline-flex bg-blue-500 text-white rounded px-4 py-2"
                    onClick={handleIncrease}
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default App
