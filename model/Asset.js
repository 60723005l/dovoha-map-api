const Sequelize = require('sequelize')
const sqlize = require('../database/sqlize')
const GeoJsonFeature = require('./GeoJsonFeature')
const WMTS = require("./WMTS")


const Asset = sqlize.define('Asset', 
{
    UUID: 
    {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
      primaryKey: true
    },
    name: 
    {
      type: Sequelize.DataTypes.STRING  ,
      allowNull: false
    },
    type: 
    {
      type: Sequelize.DataTypes.STRING  ,
      allowNull: false
    },
    group: 
    {
      type: Sequelize.DataTypes.STRING  ,
      allowNull: false
    },
    tag: 
    {
      type: Sequelize.DataTypes.STRING  ,
      allowNull: false,
      defaultValue: ""
    },
}, 
{
    freezeTableName: true
});

// Asset.sync()
Asset.hasMany(GeoJsonFeature, {foreignKey: 'assetUUID'})
Asset.hasOne(WMTS, {foreignKey: 'assetUUID'})
module.exports = Asset