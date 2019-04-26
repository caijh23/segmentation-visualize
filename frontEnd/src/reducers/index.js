import { combineReducers } from 'redux'
import handleInputList from './handleInputList'
import handleOutputList from './handleOutputList'
import handleTemplate from './handleTemplate'

export default combineReducers({
  input_lists: handleInputList,
  output: handleOutputList,
  template: handleTemplate
})