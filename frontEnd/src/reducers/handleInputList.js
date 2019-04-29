import {
  UPLOAD_IMAGES,
  CLICK_MENU_ITEM,
  CLEAR_INPUT_OUTPUT,
  CANCEL_MODEL } from '../actions';

const initialState = []

const getInputSize = (state = [], action) => {
  switch (action.type) {
    case CLICK_MENU_ITEM:
      return action.input_lists.map(item => ({
        description: item, imgId: -1
      }))
    default:
      return state
  }
}

const uploadInput = (state = initialState,action) => {
  switch (action.type) {
    case UPLOAD_IMAGES:
      return state.map((item, idx) => {
        return idx === action.index ? {description: item.description, imgId: action.imgId} : item
      })
    default:
      return state
  }
}

const handleInput = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGES:
      return uploadInput(state, action)
    case CLICK_MENU_ITEM:
      return getInputSize(state, action)
    case CANCEL_MODEL:
      return []
    case CLEAR_INPUT_OUTPUT:
      return []
    default:
      return state
  }
}

export default handleInput;