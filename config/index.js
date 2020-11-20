require("dotenv").config()

const conf = {}
conf.environment = process.env.ENV //environment
conf.sequelize = {}
conf.sequelize.username = process.env.DB_USER //database username
conf.sequelize.password = process.env.DB_PASS //database password kosongkan jika tidak pakai password
conf.sequelize.database = process.env.DB_NAME //isi dengan nama database
conf.sequelize.host = process.env.DB_HOST //isi dengan db host localhost atay 127.0.0.1
conf.sequelize.dialect = 'mysql'
conf.sequelize.port = 3306
conf.sequelize.define = {
  charset: 'utf8mb4', 
    dialectOptions: {
    collate: 'utf8mb4_unicode_ci'
  }
}
conf.ROUND_SALT = 8
module.exports = conf