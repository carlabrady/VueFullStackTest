import axios from 'axios'
import store from '@/store/store'

export default () => {
  return axios.create({
    // baseURL: 'http://serverrebuild-dev2.us-west-2.elasticbeanstalk.com/',
    baseURL: 'http://localhost:8081/',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
