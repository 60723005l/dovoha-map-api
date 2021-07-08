const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
  });
  
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3333,
    DBNAME: process.env.DBNAME || 'dovoha',
    DBUSERNAME: process.env.DBUSERNAME || 'dovoha',
    DBPW: process.env.DBPW || 'dovoha',
    DBHOST: process.env.DBHOST || '127.0.0.1',
    DBPORT: process.env.DBPORT || 5432
}