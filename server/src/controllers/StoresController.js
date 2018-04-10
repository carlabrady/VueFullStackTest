const {ReportPortalUserStoreInformation} = require('../models')
const {StoreInformation} = require('../models')
const _ = require('lodash')

module.exports = {
  async getStores (req, res) {
    try {
      const userId = req.user.ReportPortalUserID
      const stores = await ReportPortalUserStoreInformation.findAll({
          where: {
            ReportPortalUserID: userId
          },
          include: [{
            model: StoreInformation,
            attributes: ['StoreID']
          }]
      })
        .then(stores => stores.map(store => store.StoreInformation.StoreID));
      res.send(stores)
    } catch (err) {
      res.status(400).send({
        error: 'Failed to load stores.'
      })
    }
  }
}
