import { InferActionsType } from './store'

type DialogType = {
  id: number
  name: string
}

type MessageType = {
  id: number
  message: string
}

const initialState = {
  dialogs: [
    { id: 0, name: 'Alex' },
    { id: 1, name: 'Stive' },
    { id: 2, name: 'Fred' },
    { id: 3, name: 'Erika' },
    { id: 4, name: 'Liza' },
  ] as Array<DialogType>,

  messages: [
    { id: 0, message: 'Heello' },
    { id: 1, message: 'haw are you?' },
    { id: 2, message: 'yo!' },
    { id: 3, message: 'hey' },
    { id: 4, message: 'lol' },
  ] as Array<MessageType>,
}

const dialogsReducers = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      const newMessage = {
        id: 5,
        message: action.newMessage,
      }
      return {
        ...state,
        messages: [...state.messages, newMessage],
      }

    default:
      return state
  }
}

export default dialogsReducers

export const actions = {
  sendMessage: (newMessage: string) =>
    ({
      type: 'SEND_MESSAGE',
      newMessage,
    } as const),
}

// выводим тип для inititalSate
type InitialStateType = typeof initialState
// выводим тип для actions
type ActionsType = InferActionsType<typeof actions>
