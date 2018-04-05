import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://serverrebuild-dev2.us-west-2.elasticbeanstalk.com/'
  })
}
