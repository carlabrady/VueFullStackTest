const {ReportPortalUserStore} = require('../models')
const _ = require('lodash')

module.exports = {
  async getUserStores (req, res) {
    try {
      const userId = req.user.ReportPortalUserID
      const stores = await ReportPortalUserStore.findAll({
          where: {
            ReportPortalUserID: userId
          }
      })
        .then(stores => stores.map(store => store.StoreID));
        console.log(`stores: ${stores}`)
      res.send(stores)
    } catch (err) {
      res.status(400).send({
        error: 'Failed to load stores.'
      })
    }
  }
}
