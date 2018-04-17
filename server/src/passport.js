const passport = require('passport')
const {ReportPortalUser} = require('./models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    console.log('getting past jwt')
    try {
      const user = await ReportPortalUser.findOne({
        where: {
          ReportPortalUserID: jwtPayload.ReportPortalUserID
        }
      })
      if (!user) {
        return done(new Error(), false)
      }
      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  }),
)

module.exports = null
