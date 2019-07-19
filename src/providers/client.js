import axios from 'axios'

const instance = () => {
  return axios.create({
    baseURL: 'https://api.github.com/v3/'
  })
}

export default instance()
