module.exports = (app) => {
  app.post('/register', (req, res) => {
    res.sendStatus(201)
  })
}
