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

export const useAsync = initialState => {
  const [state, dispatch] = React.useReducer(stateReducer, {
    status: 'idle',
    // 🐨 this will need to be "data" instead of "pokemon"
    data: initialState.data,
    error: initialState.error,
    ...initialState,
  })

  const run = React.useCallback(promise => {
    dispatch({type: 'pending'})
    promise.then(
      data => dispatch({type: 'resolved', data}),
      error => {
        dispatch({type: 'rejected', error})
      },
    )
  }, [])

  return {...state, run}
}
