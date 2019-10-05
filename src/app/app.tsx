// Bootstrapping for entire application
import React, { useState, useMemo } from 'react'
import { changeString, changeNumber } from '@helpers'
import { Behavior } from 'bloc-utils'
import 'bloc-utils/react'

export function App({ name }) {
  const $message = useMemo(() => new Behavior(name), [name])
  const $count = useMemo(() => new Behavior(0), [])
  const onChangeUpdateMessage = changeString(newValue =>
    $message.next(newValue)
  )
  const onChangeUpdateCount = changeNumber(newCount => $count.next(newCount))

  return (
    <div>
      <h1>
        <$message.react />
        &nbsp;
        <$count.react />
      </h1>
      <button onClick={() => $count.next($count.value + 1)}>Increment</button>
      <$message.react
        next={message => (
          <input type="text" onChange={onChangeUpdateMessage} value={message} />
        )}
      />
      <$count.react
        next={count => (
          <input type="number" onChange={onChangeUpdateCount} value={count} />
        )}
      />
    </div>
  )
}
