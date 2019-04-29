import 
{ CLICK_REFRESH_BUTTON,
  CLICK_RUN_BUTTON,
  CLICK_MENU_ITEM,
  CANCEL_MODEL } from '../actions'

const initialState = {
  shown: false,
  output_lists: []
}

const refreshOutput = (state = true, action) => {
  switch (action.type) {
    case CLICK_REFRESH_BUTTON:
      return false
    case CLICK_RUN_BUTTON:
      return true
    default:
      return state
  }
}

const handleOutputLists = (state = [], action) => {
  switch (action.type) {
    case CLICK_RUN_BUTTON:
      return state.map((item, idx) => ({
        description: item.description, imgUrl: action.imgUrl[idx]
      }))
    case CLICK_MENU_ITEM:
      return action.output_lists.map(item => ({
        description: item, imgUrl: ''
      }))
    case CANCEL_MODEL:
      return []
    default:
      return state
  }
}

const handleOutput = (state = initialState, action) => {
  return {
    shown: refreshOutput(state.shown, action),
    output_lists: handleOutputLists(state.output_lists, action)
  }
}

export default handleOutput;