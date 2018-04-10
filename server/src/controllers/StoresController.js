const {ReportPortalUserStoreInformation} = require('../models')
const _ = require('lodash')

module.exports = {
  async getStores (req, res) {
      console.log('in getStores with ', req.user.ReportPortalUserID)
    try {
      const userId = req.user.ReportPortalUserID
      const stores = await ReportPortalUserStoreInformation.findAll({
          where: {
            ReportPortalUserID: userId
          },
          attributes: ['StoreInformationID']
      })
        // .map(store => store.toJSON())
        // .map(store => _.extend(
        //   {},
        //   store
        // ))
        .then(stores => stores.map(store => store.StoreInformationID));
      res.send(stores)
    } catch (err) {
      res.status(400).send({
        error: 'Failed to load stores.'
      })
    }
  }
}
