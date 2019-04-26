import {
  INPUT_NUM_CHANGE,
  OUTPUT_NUM_CHANGE,
  INPUT_CONTENT_CHANGE,
  OUTPUT_CONTENT_CHANGE,
  CANCEL_MODEL
} from '../actions'

const initialState = {
  template_lists: [],
  template_creating: {
    input_description: [''],
    output_description: ['']
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
      return initialState.template_creating.input_description
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
      return initialState.template_creating.output_description
    default:
      return state
  }
}

const handleTemplate = (state = initialState, action) => {
  return {
    template_lists: [],
    template_creating: {
      input_description: onInputChange(state.template_creating.input_description, action),
      output_description: onOutputChange(state.template_creating.output_description, action)
    }
  }
}

export default handleTemplate;
