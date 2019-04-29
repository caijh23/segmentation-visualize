import {
  INPUT_NUM_CHANGE,
  OUTPUT_NUM_CHANGE,
  INPUT_CONTENT_CHANGE,
  OUTPUT_CONTENT_CHANGE,
  CANCEL_MODEL,
  MENUS_RECEIVE,
  CREATE_MODEL,
  MODEL_PATH_ON_CHANGE,
  MODEL_NAME_ON_CHANGE,
  CLICK_MENU_ITEM,
  CLEAR_INPUT_OUTPUT,
  CREATE_MENU_CLICK
} from '../actions'

const initialState = {
  template_lists: [
    {icon: 'form', text: '创建模板', templateId: -1}
  ],
  template_creating: {
    input_lists: [''],
    output_lists: [''],
    path: '',
    text: ''
  },
  isFetching: false,
  selectedId: -1,
  reload: false
}

const handleReload = (state = false, action) => {
  switch(action.type) {
    case CLEAR_INPUT_OUTPUT:
      return true
    case CREATE_MENU_CLICK:
      return false
    default:
      return state
  }
}

const handleSelectedId = (state = -1, action) => {
  switch(action.type) {
    case CLICK_MENU_ITEM:
      return action.templateId
    case CANCEL_MODEL:
      return -1
    case CREATE_MODEL:
      return -1
    default:
      return state
  }
}

const handlePath = (state = '', action) => {
  switch(action.type) {
    case MODEL_PATH_ON_CHANGE:
      return action.value
    default:
      return state
  }
}

const handleName = (state = '', action) => {
  switch(action.type) {
    case MODEL_NAME_ON_CHANGE:
      return action.value
    default:
      return state
  }
}

const handleTemplateLists = (state = initialState.template_lists, action) => {
  switch(action.type) {
    case MENUS_RECEIVE:
      return [...initialState.template_lists, ...action.menu_list]
    case CREATE_MODEL:
      return [...state, action.template_created]
    default:
      return state
  }
}

const handleIsFetching = (state = false, action) => {
  switch(action.type) {
    case MENUS_RECEIVE:
      return true
    default:
      return state
  }
}

const onInputChange = (state = [''], action) => {
  switch(action.type) {
    case INPUT_NUM_CHANGE:
      {
        let retArr = []
        if (action.value > state.length) {
          const newArr = new Array(action.value - state.length).fill('')
          retArr = [...state, ...newArr]
        }
        else {
          retArr = state.slice(0,action.value)
        }
        return retArr
      }
    case INPUT_CONTENT_CHANGE:
      return state.map((item, idx) => {
        return idx === action.index ? action.value : item
      })
    case CANCEL_MODEL:
      return initialState.template_creating.input_lists
    default:
      return state
  }
}

const onOutputChange = (state = [''], action) => {
  switch(action.type) {
    case OUTPUT_NUM_CHANGE:
      {
        let retArr = []
        if (action.value > state.length) {
          const newArr = new Array(action.value - state.length).fill('')
          retArr = [...state, ...newArr]
        }
        else {
          retArr = state.slice(0,action.value)
        }
        return retArr
      }
    case OUTPUT_CONTENT_CHANGE:
      return state.map((item, idx) => {
        return idx === action.index ? action.value  : item
      })
    case CANCEL_MODEL:
      return initialState.template_creating.output_lists
    default:
      return state
  }
}

const handleTemplate = (state = initialState, action) => {
  return {
    isFetching: handleIsFetching(state.isFetching, action),
    selectedId: handleSelectedId(state.selectedId, action),
    reload: handleReload(state.reload, action),
    template_lists: handleTemplateLists(state.template_lists, action),
    template_creating: {
      input_lists: onInputChange(state.template_creating.input_lists, action),
      output_lists: onOutputChange(state.template_creating.output_lists, action),
      path: handlePath(state.template_creating.path, action),
      text: handleName(state.template_creating.text, action)
    }
  }
}

export default handleTemplate;
