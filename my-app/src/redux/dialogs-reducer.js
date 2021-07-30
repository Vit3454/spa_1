const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'
const SEND_MESSAGE = 'SEND_MESSAGE'

const initialState = {
  dialogs: [
    { id: 0, name: 'Alex' },
    { id: 1, name: 'Stive' },
    { id: 2, name: 'Fred' },
    { id: 3, name: 'Erika' },
    { id: 4, name: 'Liza' },
  ],

  messages: [
    { id: 0, message: 'Heello' },
    { id: 1, message: 'haw are you?' },
    { id: 2, message: 'yo!' },
    { id: 3, message: 'hey' },
    { id: 4, message: 'lol' },
  ],
  newMessageText: '',
}

const dialogsReducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      return {
        ...state,
        newMessageText: action.newMessageText,
      }

    case SEND_MESSAGE:
      const newMessage = {
        id: 5,
        message: state.newMessageText,
      }
      return {
        ...state,
        messages: [...state.messages, newMessage],
        newMessageText: '',
      }

    default:
      return state
  }
}

export default dialogsReducers

export const updateNewMessageText = (newMessageText) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newMessageText,
})
export const sendMessage = () => ({ type: SEND_MESSAGE })
