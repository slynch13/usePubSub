import React, { useContext, useReducer, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import usePubSub, { DefaultPubSubContext } from "./usePubSub";
import "./styles.css";

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
  // let [state, dispatch] = useReducer((state, action) => {
  //   console.log("t", state);
  //   return state + 1;
  // }, 0);
  useEffect(
    () => {
      let handler = () => {
        //setState(state+1);
        setState(prev => prev + 1);
      };
      let unsub = context.subscribe("Increment", handler);
      return unsub;
    },
    [state]
  );

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
  useEffect(
    () => {
      let handler = () => {
        setState(prev => prev + 1);
      };
      let unsub = context.subscribe("Increment", handler);
      return unsub;
    },
    [state]
  );

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
