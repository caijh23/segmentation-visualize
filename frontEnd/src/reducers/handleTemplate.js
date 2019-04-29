import {
  INPUT_NUM_CHANGE,
  OUTPUT_NUM_CHANGE,
  INPUT_CONTENT_CHANGE,
  OUTPUT_CONTENT_CHANGE,
  CANCEL_MODEL,
  MENUS_RECEIVE,
  CREATE_MODEL
} from '../actions'

const initialState = {
  template_lists: [
    {icon: 'form', text: '创建模板', templateId: -1}
  ],
  template_creating: {
    input_lists: [''],
    output_lists: ['']
  },
  isFetching: false
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
    template_lists: handleTemplateLists(state.template_lists, action),
    template_creating: {
      input_lists: onInputChange(state.template_creating.input_lists, action),
      output_lists: onOutputChange(state.template_creating.output_lists, action)
    }
  }
}

export default handleTemplate;
