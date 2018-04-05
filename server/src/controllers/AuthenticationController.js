const {ReportPortalUser} = require('../models')

module.exports = {
  async register (req, res) {
    try {
      const user = await ReportPortalUser.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },

  async login (req, res) {
    try {
      const {Email, Password} = req.body
      const user = await ReportPortalUser.findOne({
        where: {
          Email: Email
        }
      })
      console.log('back from find one with ', user)
      if (!user) {
        return res.status(400).send({
          error: 'The login information was incorrect.'
        })
      }

      const isPasswordValid = Password === user.Password
      if (!isPasswordValid) {
        return res.status(400).send({
          error: 'The login information was incorrect.'
        })
      }

      const userJSON = user.toJSON()
      res.send({
        user: userJSON
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login.'
      })
    }
  }
}
