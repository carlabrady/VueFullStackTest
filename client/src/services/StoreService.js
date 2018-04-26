import Api from '@/services/Api'

export default {
  getUserStoresAndReports (params) {
    return Api().get('stores', {
      params: params
    })
  }
}
