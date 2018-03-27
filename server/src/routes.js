const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  app.post('/register',
    isAuthenticated,
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  )
  app.post('/login',
    AuthenticationController.login
  )
}
