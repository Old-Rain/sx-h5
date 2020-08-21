import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer, __REDUX_DEVTOOLS_EXTENSION__?.())

export default store
