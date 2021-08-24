import profileReducer, { actions } from './profile-reducer'
// Три этапа в тесте
// 1. Стартовый данные
// 2. Action
// 3. Ожидание

// запуск теста в командной строке:
// npm test src/redux/profile-reducer.test.js

const state = {
  posts: [
    { id: 0, message: 'Hi there!' },
    { id: 1, message: 'Haw are you?' },
    { id: 2, message: 'Lets go!!!' },
    { id: 3, message: 'rrrrrrr' },
  ],
  userProfile: null,
  status: null,
  fake: 1,
}

test('New post should be added', () => {
  const action = actions.addPost('Hello world')

  let newState = profileReducer(state, action)

  expect(newState.posts.length).toBe(5)
})

test('Message of new post should be correct', () => {
  const action = actions.addPost('Hello world')

  let newState = profileReducer(state, action)

  expect(newState.posts[4].message).toBe('Hello world')
})

test('after deleting length of messages should be decrement', () => {
  const action = actions.deletePost(1)

  let newState = profileReducer(state, action)

  expect(newState.posts.length).toBe(3)
})
