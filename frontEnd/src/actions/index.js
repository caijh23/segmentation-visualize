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

export const runModel = (image_id_lists) => ({
  type: CLICK_RUN_BUTTON,
  image_id_lists
})

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

export const getImageId = ({index, imgId}) => ({
  type: UPLOAD_IMAGES,
  index,
  imgId
})

export const createModel = ({input_name_lists, output_name_lists, path}) => ({
  type: CREATE_MODEL,
  input_name_lists,
  output_name_lists,
  path
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

export const  outputContentChange = ({value, index}) => ({
  type: OUTPUT_CONTENT_CHANGE,
  value,
  index
})

export const cancelCreateModel = () => ({
  type: CANCEL_MODEL
})

export const clickMenu = (menuId) => ({
  type: CLICK_MENU_ITEM,
  menuId
})

export const refreshOutput = () => ({
  type: CLICK_REFRESH_BUTTON
})