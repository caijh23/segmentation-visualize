import { CREATE_MODEL, UPLOAD_IMAGES, CLICK_MENU_ITEM } from '../actions';

const initialState = [
  {description: '前景图像', id: ''},
  {description: '背景图像', id: ''}
]

const initialInput = (state = [], action) => {
  switch (action.type) {
    case CREATE_MODEL:
      return action.input_name_lists.map((item) => ({
        description: item,
        id: ''
      }))
    default:
      return state
  }
}

const getInputSize = (state = [], action) => {
  switch (action.type) {
    case CLICK_MENU_ITEM:
      return state // call api here to get input_name_lists
    default:
      return state
  }
}

const uploadInput = (state = [],action) => {
  switch (action.type) {
    case UPLOAD_IMAGES:
      return state.map((item) => ({
        description: item.description,
        id: '' // call api here to get image id
      }))
    default:
      return state
  }
}

const handleInput = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MODEL:
      return initialInput(state, action)
    case UPLOAD_IMAGES:
      return uploadInput(state, action)
    case CLICK_MENU_ITEM:
      return getInputSize(state, action)
    default:
      return state
  }
}

export default handleInput;