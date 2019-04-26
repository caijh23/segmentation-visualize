import 
{ CLICK_REFRESH_BUTTON,
  CLICK_RUN_BUTTON,
  CREATE_MODEL,
  CLICK_MENU_ITEM } from '../actions'

const initialState = {
  shown: true,
  output_lists: [
    {description: 'mask1' ,imgUrl: './assets/images/test.jpeg'},
    {description: 'mask2', imgUrl: './assets/images/test.jpeg'}
  ]
}

const refreshOutput = (state = true, action) => {
  switch (action.type) {
    case CLICK_REFRESH_BUTTON:
      return false
    default:
      return state
  }
}

const handleOutputLists = (state = [], action) => {
  switch (action.type) {
    case CREATE_MODEL:
      return action.output_name_lists.map((item) => ({
        description: item,
        imgUrl: ''
      }))
    case CLICK_RUN_BUTTON:
      return state //add api call here
    case CLICK_MENU_ITEM:
      return state // call api here to get output_name_lists
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