import { useState } from 'react'

function Counter() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <div className="component-container">
                <h2>Counter</h2>
                <p className="display-text">{count}</p>
                <div className="button-group">
                    <button onClick={() => setCount((count) => count + 1)}>Increment</button>
                    <button onClick={() => setCount((count) => count - 1)}>Decrement</button>
                </div>
            </div>
        </div>
    )
}

export default Counter;