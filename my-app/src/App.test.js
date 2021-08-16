import AppContainer from './App'
import ReactDOM from 'react-dom'

test('renders learn react link', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AppContainer />, div)
  ReactDOM.unmountComponentAtNode(div)
})
