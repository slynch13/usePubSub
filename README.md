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
### Use with react contexts
```jsx
import React, { useContext, useReducer, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import usePubSub, { DefaultPubSubContext } from "./usePubSub";

const SeperateContext = React.createContext();
function App() {
  let { PubSubContext, publish, subscribe, unsubscribe } = usePubSub();
  let pubsub = usePubSub();
  let abunch = () => {
    for (let i = 1; i <= 10; i++) {
      publish("Increment");
      console.log(i);
    }
  };
  return (
    <div className="App">
      <PubSubContext.Provider value={{ publish, subscribe, unsubscribe }}>
        <SeperateContext.Provider
          value={{
            publish: pubsub.publish,
            subscribe: pubsub.subscribe,
            unsubscribe: pubsub.unsubscribe
          }}
        >
          <div>
            <h1>Click below to Increment the counters</h1>
            <Text key="1">
              <Text2 key="2" />
              <Text>
                <Text />
              </Text>
              <Text />
            </Text>
          </div>
        </SeperateContext.Provider>
      </PubSubContext.Provider>
      <button onClick={() => publish("Increment")}>Default Context</button>
      <button onClick={() => pubsub.publish("Increment")}>
        Seperate Context
      </button>
      <button onClick={abunch}>10 times</button>
    </div>
  );
}
const Text = props => {
  let context = useContext(DefaultPubSubContext);
  let [state, setState] = useState(0);

useEffect(() => {
    let handler = () => {
      setState(prev => prev + 1);
    };
    let unsub = context.subscribe("Increment", handler);
    return unsub;
  }, [state]);

  return (
    <div
      onClick={() => {
        context.publish("Increment");
      }}
    >
      Count from DefaultContext: {state}
      {props.children}
    </div>
  );
};
const Text2 = props => {
  let context = useContext(SeperateContext);
  let [state, setState] = useState(0);
  useEffect(() => {
    let handler = () => {
      setState(prev => prev + 1);
    };
    let unsub = context.subscribe("Increment", handler);
    return unsub;
  }, [state]);

  return (
    <div
      onClick={e => {
        context.publish("Increment");
        e.stopPropagation();
      }}
    >
      Count from SeperateContext: {state}
      {props.children}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## License

MIT © [slynch13](https://github.com/slynch13)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
