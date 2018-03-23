module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'VueFullStackTest',
    user: process.env.DB_USER || 'VueFullStackTest',
    password: process.env.DB_PASS || 'VueFullStackTest',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './VueFullStackTest'
    }
  }
}
