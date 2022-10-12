import * as React from 'react'

function stateReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      // 🐨 replace "pokemon" with "data"
      return {status: 'pending', data: null, error: null}
    }
    case 'resolved': {
      // 🐨 replace "pokemon" with "data" (in the action too!)
      return {status: 'resolved', data: action.data, error: null}
    }
    case 'rejected': {
      // 🐨 replace "pokemon" with "data"
      return {status: 'rejected', data: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const useAsync = (asyncCallback, initialState, depsList) => {
  const [state, dispatch] = React.useReducer(stateReducer, {
    status: 'idle',
    // 🐨 this will need to be "data" instead of "pokemon"
    data: initialState.data,
    error: initialState.error,
    ...initialState,
  })

  React.useEffect(() => {
    // 💰 this first early-exit bit is a little tricky, so let me give you a hint:
    // const promise = asyncCallback()
    // if (!promise) {
    //   return
    // }
    // then you can dispatch and handle the promise etc...
    const promise = asyncCallback()
    if (!promise) {
      return
    } else {
      dispatch({type: 'pending'})
      promise.then(
        data => dispatch({type: 'resolved', data}),
        error => {
          dispatch({type: 'rejected', error})
        },
      )
    }
    // 🐨 you'll accept dependencies as an array and pass that here.
    // 🐨 because of limitations with ESLint, you'll need to ignore
    // the react-hooks/exhaustive-deps rule. We'll fix this in an extra credit.
  }, depsList)
  return state
}
