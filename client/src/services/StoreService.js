import Api from '@/services/Api'

export default {
  get (params) {
    return Api().get('stores', {
      params: params
    })
  }
}
