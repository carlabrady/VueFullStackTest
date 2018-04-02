module.exports = {
    port: process.env.PORT || 8081,
    db: {
      database: process.env.RDS_DB_NAME || 'VueFullStackTest',
      user: process.env.RDS_USERNAME || 'VueFullStackTest',
      password: process.env.RDS_PASSWORD || 'VueFullStackTest',
      options: {
        dialect: process.env.DIALECT || 'mssql',
        host: process.env.RDS_HOSTNAME || 'localhost',
        port: process.env.RDS_PORT,
      }
    },
    authentication: {
      jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
