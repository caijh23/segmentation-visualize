import axios from 'axios'

const getCookie = (name) => {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2) return parts.pop().split(';').shift()
}

/*
  return example
  [
    {"id": 0, "name": "假装有模型"},
    {"id": 1, "name": "ICNet"}
  ]
*/

const getMenuList = (cb) => {
  return axios.get('/api/templates')
    .then(cb)
}

/*
  return example
  {
    "input_lists": ["前景","背景"],
    "output_lists": ["mask1","mask2"]
  }
*/

const getMenuInfoById = (menuId, cb) => {
  return axios.get('/api/templates/' + menuId)
    .then(cb)
}

/*
  return example
  [
    {"description": "mask1","imgUrl": "./assets/images/test.jpeg"}
    {"description": "mask2", "imgUrl": "http://xxxxx.jpg"}
  ]
*/

const runModel = ({imageIds, cb}) => {
  const outputId = imageIds.join('_')
  axios.get('/api/outputs/' + outputId)
    .then(cb)
    .catch(error => {
      console.log(error)
    })
}

/*
  return example
  {
    "id": 2
  }
*/

const createTemplate = ({data, cb}) => {
  const params = JSON.stringify(data)
  axios.post('/api/templates', params, {
    headers:{
      'X-CSRFToken': getCookie('csrftoken'),
      'content-type': 'application/json'
    }
  })
}

export default {
  getMenuList,
  getMenuInfoById,
  runModel,
  createTemplate
}