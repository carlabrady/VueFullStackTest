const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const StoresController = require('./controllers/StoresController')

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
  app.get('/getUsers',
    isAuthenticated,
    AuthenticationController.getUsers
  )

  app.get('/stores',
    isAuthenticated,
    StoresController.getUserStoresWithReports
  )
}
