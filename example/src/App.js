import React, { useState, useEffect } from 'react'
import { usePubSub } from 'usepubsub'

const App = () => {
  let { publish, subscribe } = usePubSub()
  let [clicks, setState] = useState(0)
  useEffect(() => {
    return subscribe('Clicked', () => {
      setState(clicks + 1)
    })
  }, [subscribe, clicks])
  return (
    <div className='App'>
      <h1>Hello CodeSandbox</h1>
      <h2>{clicks}</h2>
      <button onClick={() => publish('Clicked')} >Click Me!</button>
    </div>
  )
}
export default App
