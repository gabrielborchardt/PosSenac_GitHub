import axios from 'axios'

const instance = () => {
  return axios.create({
    baseURL: 'https://api.github.com/'
  })
}

export default instance()
