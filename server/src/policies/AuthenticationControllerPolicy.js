const Joi = require('joi')

//Validation of req JSON
module.exports = {
  register (req, res, next) {
    const schema = {
      FirstName: Joi.string(),
      LastName: Joi.string(),
      Email: Joi.string().email(),
      Password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      IsUserAdministrator: Joi.boolean(),
      IsStoreAdministrator: Joi.boolean()
    }

    const {error} = Joi.validate(req.body.NewUser, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'Email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'Password':
          res.status(400).send({
            error: 'The password provided failed to match the following rules:<br>1. It must contain ONLY the following characters: lower case, upper case, numerics.<br>2. It must be atleast 8 characters in leangth and not greater than 32 characters in length.'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}
