const GeoJsonFeature = require("./GeoJsonFeature");
const WMTS = require("./WMTS")
const Asset = require("./Asset")

// Asset.sync()
// WMTS.sync()
// GeoJsonFeature.sync()

// console.log(1111,Asset)

// GeoJsonFeature.belongsTo(Asset)
// WMTS.belongsTo(Asset)


module.exports = 
{
    GeoJsonFeature,
    WMTS,
    Asset
}