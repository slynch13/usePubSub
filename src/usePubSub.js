import React, { useReducer, useEffect, useRef } from 'react'

// Provide an app wide pub sub context
const DefaultPubSubContext = React.createContext()
const usePubSub = context => {
  let PubSubContext = DefaultPubSubContext

  if (context !== undefined) PubSubContext = context
  // eslint-disable-next-line no-unused-vars
  const [subscriptionManager, dispatch] = useReducer(
    (state, action) => {
      let current = { ...state }
      switch (action.type) {
        case 'Subscribe':
          current.channels = { ...state.channels }
          let handlers = current.channels[action.channel] || []
          handlers = [...handlers]

          handlers.push(action.handler)
          current.channels[action.channel] = handlers
          break
        case 'Unsubscribe':
          let unsubHandlers = current.channels[action.channel] || []
          unsubHandlers = [...unsubHandlers]

          let i = unsubHandlers.indexOf(action.handler)
          if (i > -1) unsubHandlers.splice(i, 1)

          current.channels[action.channel] = unsubHandlers

          break
        case 'Publish':
          let channel = current.channels[action.channel] || []
          for (let i = 0; i < channel.length; i++) {
            channel[i](action.message)
          }
          break

        default:
          // Return exiting state
          return state
      }
      return current
    },
    { channels: {} }
  )
  let ref = useRef({ dispatch })
  useEffect(
    () => {
      ref.current = { dispatch }
    },
    [dispatch]
  )

  let subscribe = (channel, handler) => {
    if (!ref.current) return () => { }
    ref.current.dispatch({ type: 'Subscribe', channel, handler })
    return () => unsubscribe(channel, handler)
  }
  let unsubscribe = (channel, handler) => {
    if (!ref.current) return () => { }
    ref.current.dispatch({ type: 'Unsubscribe', channel, handler })
  }
  let publish = (channel, message) => {
    if (!ref.current) return () => { }
    ref.current.dispatch({ type: 'Publish', channel, message })
  }
  return {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    publish: publish,
    PubSubContext
  }
}
export default usePubSub
export { DefaultPubSubContext }
