// Bootstrapping for entire application
import React, { useState } from 'react'
import { changeString } from '@helpers'

export function App({ name }) {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')

  return (
    <div>
      <h1>
        {name} {count}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input type="text" onChange={changeString(setMessage)} value={message} />
    </div>
  )
}
