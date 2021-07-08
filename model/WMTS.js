const Sequelize = require('sequelize')
const sqlize = require('../database/sqlize')
// const Model = require('../model')
// const Asset = require('./Asset')


const WMTS = sqlize.define('WMTS', 
{
    UUID: 
    {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
      primaryKey: true
    },
    assetUUID:
    {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
    },
    url: 
    {
      type: Sequelize.DataTypes.STRING  ,
      allowNull: false
    }
}, 
{
    freezeTableName: true
});


// WMTS.sync()

module.exports = WMTS