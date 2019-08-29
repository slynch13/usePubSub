# usepubsub

> Simple pubsub hook for react

[![NPM](https://img.shields.io/npm/v/usepubsub.svg)](https://www.npmjs.com/package/usepubsub) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save usepubsub
```

## Usage

```jsx
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
```

## License

MIT © [slynch13](https://github.com/slynch13)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
