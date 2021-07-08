const Sequelize = require('sequelize')
const config = require('../config');


const DB_NAME = config.DBNAME
const USER_NAME = config.DBUSERNAME
const PASSWORD = config.DBPW
const options = 
{
  host: config.DBHOST,
  port: config.DBPORT,
  dialect: 'postgres',
  logging: config.NODE_ENV === 'development' ? console.log : false
}


const sqlize = new Sequelize( DB_NAME, USER_NAME, PASSWORD, options );
sqlize.sync()

module.exports = sqlize