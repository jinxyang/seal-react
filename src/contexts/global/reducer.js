import { UPDATE_USER } from './types'

const reducer = (prevState, { type, ...payload }) => {
  const handles = {
    [UPDATE_USER]: ({ user }) => {
      return { ...prevState, user: { ...prevState.user, user } }
    },
  }

  const handle = handles[type]

  if (!handle) return prevState

  const nextState = handle(payload)
  console.group('GlobalContext')
  console.log('PrevState: ', prevState)
  console.log(`Type: ${type}`)
  console.log('Payload: ')
  console.log(payload)
  console.log('NextState: ')
  console.log(nextState)
  console.groupEnd('GlobalContext')
  return nextState
}

export default reducer
