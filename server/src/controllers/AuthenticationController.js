const {ReportPortalUser} = require('../models')
const jwt = require ('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    console.log('is this getting hit', req.body)
    try {
      const user = await ReportPortalUser.create(req.body.NewUser)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
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

      if (!user) {
        return res.status(400).send({
          error: 'The login information was incorrect.'
        })
      }

      const isPasswordValid = await user.comparePassword(Password)
      if (!isPasswordValid) {
        return res.status(400).send({
          error: 'The login information was incorrect.'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login.'
      })
    }
  }
}
