import service from '../api/unitedInterface'

export const CLICK_MENU_ITEM = 'CLICK_MENU_ITEM'
export const CLICK_RUN_BUTTON = 'CLICK_RUN_BUTTON'
export const CLICK_REFRESH_BUTTON = 'CLICK_REFRESH_BUTTON'
export const CREATE_MODEL = 'CREATE_MODEL'
export const UPLOAD_IMAGES = 'UPLOAD_IMAGES'
export const INPUT_NUM_CHANGE = 'INPUT_NUM_CHANGE'
export const OUTPUT_NUM_CHANGE = 'OUTPUT_NUM_CHANGE'
export const INPUT_CONTENT_CHANGE = 'INPUT_CONTENT_CHANGE'
export const OUTPUT_CONTENT_CHANGE = 'OUTPUT_CONTENT_CHANGE'
export const CANCEL_MODEL = 'CANCEL_MODEL'
export const MENUS_RECEIVE = 'MENUS_RECEIVE'
export const MODEL_PATH_ON_CHANGE = 'MODEL_PATH_ON_CHANGE'
export const MODEL_NAME_ON_CHANGE = 'MODEL_NAME_ON_CHANGE'
export const CLEAR_INPUT_OUTPUT = 'CLEAR_INPUT_OUTPUT'
export const CREATE_MENU_CLICK = 'CREATE_MENU_CLICK'

const runModelReceive = (imgUrl) => ({
  type: CLICK_RUN_BUTTON,
  imgUrl
})

export const clickCreate = () => ({
  type: CREATE_MENU_CLICK
})

export const runModelClick = () => (dispatch, getState) => {
  const image_state = getState().input_lists
  const image_id_lists = image_state.map(item => item.imgId)
  const templateId = getState().template.selectedId
  console.log('fetching...')
  const data = {
    image_id_lists,
    templateId
  }
  return service.runModel(data, res => {
    dispatch(runModelReceive(res['data'].imgUrl))
  })
}

export const initMenu = () => dispatch => {
  return dispatch(fetchMenus())
}

const receiveMenus = ({menu_list}) => ({
  type: MENUS_RECEIVE,
  menu_list
})

const fetchMenus = () => dispatch => {
  return service.getMenuList(res => {
    const templateFromService = res['data'].template_lists.map((item) => ({
      icon: 'line-chart', text: item.text, templateId: item.templateId
    }))
    dispatch(receiveMenus({ menu_list : [...templateFromService] }))
  })
}

const receiveTemplate = ({input_lists, output_lists, templateId}) => ({
  type: CLICK_MENU_ITEM,
  input_lists,
  output_lists,
  templateId
})

const clearInputAndOutput = () => ({
  type: CLEAR_INPUT_OUTPUT
})

export const clickMenu = (menuId) => (dispatch, getState) => {
  console.log(menuId)
  dispatch(clearInputAndOutput())
  const templateId = getState().template.template_lists[menuId].templateId
  return service.getMenuInfoById(menuId, res => {
    const data = res['data']
    dispatch(receiveTemplate({ ...data, templateId }))
  })
}

const createModel = ({template_created}) => ({
  type: CREATE_MODEL,
  template_created
})

export const clickOk = () => (dispatch, getState) => {
  const data = getState().template.template_creating
  console.log('fetching data...')
  return service.createTemplate(data, res => {
    console.log(res['data'])
    const templateFromService = {...res['data'], icon: 'line-chart'}
    console.log(templateFromService)
    dispatch(createModel({template_created: templateFromService}))
  })
}

export const getImageId = ({index, imgId}) => ({
  type: UPLOAD_IMAGES,
  index,
  imgId
})

export const inputNumChange = (value) => ({
  type: INPUT_NUM_CHANGE,
  value
})

export const outputNumChange = (value) =>  ({
  type: OUTPUT_NUM_CHANGE,
  value
})

export const inputContentChanage = ({value, index}) => ({
  type: INPUT_CONTENT_CHANGE,
  value,
  index
})

export const outputContentChange = ({value, index}) => ({
  type: OUTPUT_CONTENT_CHANGE,
  value,
  index
})

export const modelPathChange = (value) => ({
  type: MODEL_PATH_ON_CHANGE,
  value
})

export const modelNameChange = (value) => ({
  type: MODEL_NAME_ON_CHANGE,
  value
})

export const cancelCreateModel = () => ({
  type: CANCEL_MODEL
})

export const refreshOutput = () => ({
  type: CLICK_REFRESH_BUTTON
})