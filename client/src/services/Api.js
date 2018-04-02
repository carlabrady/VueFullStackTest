import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://serverrebuild-dev.us-west-2.elasticbeanstalk.com/'
  })
}
