const state = {
  profilePage: {
    posts: [
      { id: 0, message: 'Hi there!' },
      { id: 1, message: 'Haw are you?' },
      { id: 2, message: 'Lets go!!!' },
      { id: 3, message: 'rrrrrrr' },
    ],
    newPostText: '',
  },

  dialogsPage: {
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
  },
}

let rerenderEntireTree = (state) => {
  console.log('state was changed')
}

export const subscriber = (observer) => {
  rerenderEntireTree = observer
}

export const updateNewPostText = (newPostText) => {
  state.profilePage.newPostText = newPostText
  rerenderEntireTree(state)
}

export const addPost = () => {
  const newPost = {
    id: 4,
    message: state.profilePage.newPostText,
  }
  state.profilePage.posts.push(newPost)
  state.profilePage.newPostText = ''
  rerenderEntireTree(state)
}

export const updateNewMessageText = (newMessageText) => {
  state.dialogsPage.newMessageText = newMessageText
  rerenderEntireTree(state)
}

export const addMessage = () => {
  const newMessage = {
    id: 5,
    message: state.dialogsPage.newMessageText,
  }
  state.dialogsPage.messages.push(newMessage)
  state.dialogsPage.newMessageText = ''
  rerenderEntireTree(state)
}

export default state

window.state = state
