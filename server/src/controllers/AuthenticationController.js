const {ReportPortalUser} = require('../models')
const {ReportPortalUserChild} = require('../models')
const {ReportPortalUserStore} = require('../models')
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
    try {
      const currentUser = req.body.CurrentUser
      const stores = req.body.NewUserStores
      const user = await ReportPortalUser.create(req.body.NewUser)
        .then(user => {
          return ReportPortalUserChild.create(
            {
              ReportPortalUserID: req.body.CurrentUser,
              ChildID: user.ReportPortalUserID
            }
          )
        })
        .then(user => {
          stores.forEach(store => {
            return ReportPortalUserStore.create({
              ReportPortalUserID: user.ChildID,
              StoreID: store
            })
          })
        })
      res.sendStatus(201)
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
