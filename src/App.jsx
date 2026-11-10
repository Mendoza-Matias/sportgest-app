import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='app'>
      <h1>SportGest</h1>
      <p>Base del proyecto con Vite + React.</p>
      <button type='button' onClick={() => setCount((count) => count + 1)}>
        Contador: {count}
      </button>
    </main>
  )
}

export default App
