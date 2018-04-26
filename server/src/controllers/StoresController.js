const {ReportPortalUserStore, ReportAccessConfiguration, Report} = require('../models')
const _ = require('lodash')

module.exports = {
  async getUserStoresWithReports (req, res) {
    try {
      const userId = req.user.ReportPortalUserID
      const stores = await ReportPortalUserStore.findAll({
          where: {
            ReportPortalUserID: userId
          },
          include: [{
            model: ReportAccessConfiguration,
            as: 'ReportAccessConfiguration',
            include: [{
              model: Report,
              as: 'Report'
            }]
          }]
      })
        .then(stores => {
          return JSON.stringify(stores)
        });
        console.log(`stores: ${stores}`)
      res.send(stores)
    } catch (err) {
      res.status(400).send({
        error: 'Failed to load stores.'
      })
    }
  }
}
