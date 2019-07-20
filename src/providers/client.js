import axios from 'axios'

const instance = () => {
  return axios.create({
    baseURL: 'https://api.github.com/',
    headers: {'Authorization': 'Basic ZXJpY2tsb2Rpb246R2l0aHViIzEyMw=='}
  })
}

export default instance()
