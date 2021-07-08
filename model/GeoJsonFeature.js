const Sequelize = require('sequelize')
const sqlize = require('../database/sqlize')
// const Model = require('../model')
// const Asset = require('./Asset')

const GeoJsonFeature = sqlize.define('GeoJsonFeature', 
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
    properties: 
    {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
    },
    geometry: 
    {
      type: Sequelize.DataTypes.GEOMETRY,
      allowNull: false
    }
}, 
{
    freezeTableName: true
});


// GeoJsonFeature.sync()

module.exports = GeoJsonFeature