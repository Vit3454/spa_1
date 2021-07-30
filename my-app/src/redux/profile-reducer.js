const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'
const ADD_POST = 'ADD_POST'

const initialState = {
  posts: [
    { id: 0, message: 'Hi there!' },
    { id: 1, message: 'Haw are you?' },
    { id: 2, message: 'Lets go!!!' },
    { id: 3, message: 'rrrrrrr' },
  ],
  newPostText: '',
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.newPostText,
      }

    case ADD_POST:
      const newPost = {
        id: 4,
        message: state.newPostText,
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      }

    default:
      return state
  }
}

export default profileReducer

export const updateNewPostText = (newPostText) => ({
  type: UPDATE_NEW_POST_TEXT,
  newPostText,
})
export const addPost = () => ({ type: ADD_POST })
