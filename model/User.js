const Sequelize = require('sequelize')
const sqlize = require('../database/sqlize')


const User = sqlize.define('User', 
{
    ID: 
    {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
    },
    name: 
    {
      type: Sequelize.DataTypes.STRING  ,
      allowNull: false
    },
    age: 
    {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    cash: 
    {
      type: Sequelize.DataTypes.DOUBLE,
      allowNull: false
    }
}, 
{
    freezeTableName: true
});

User.sync()

module.exports = User