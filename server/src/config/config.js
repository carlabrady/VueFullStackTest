module.exports = {
    port: process.env.PORT || 8081,
    db: {
      database: process.env.RP_DB_NAME || 'VueFullStackTest',
      user: process.env.DB_USERNAME || 'VueFullStackTest',
      password: process.env.DB_PASSWORD || 'VueFullStackTest',
      options: {
        dialect: process.env.DB_DIALECT || 'mssql',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT,
        operatorsAliases: false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    },
    authentication: {
      jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
