// const Asset = require("./../model/Asset")
const { readFile } = require('fs').promises
const Model = require("../model")
const Asset = Model.Asset
const getAssets = ( req, res ) =>
{
    Asset.findAll(
        {
            include:[
                {model:Model.GeoJsonFeature},
                {model:Model.WMTS}
            ]
        }
    ).then( asset =>
        {
            res.json(asset)
        })
        .catch( err => 
            {
                res.status(400)
                res.json({msg:err.msg})
            } )
}

const getMapDataByAssetId = async ( req, res ) =>
{
    let { assetUUID } = req.query
    
    try
    {
        let asset = await Asset.findByPk(assetUUID)
        switch(asset.type)
        {
            case 'GeoJson':
                Model.GeoJsonFeature.findAll(
                    {
                        where:{ assetUUID }
                    }
                ).then( data => res.json(data) )
                break
            case "WMTS":
                Model.WMTS.findAll(
                    {
                        where:{ assetUUID }
                    }
                ).then( data => res.json(data) )
                break
        }   
    }
    catch(err)
    {
        res.status(400);
        res.json({msg:`assetUUID ${assetUUID} not found`})
    }
     
}

const createAsset = async ( req, res ) =>
{    
    let data = req.files.data
    let { name, type, group, tag, url } = req.body
    
    try
    {
        let asset = await Model.Asset.create( { name, type, group, tag } )
        switch( type )
        {
            case 'GeoJson':
                let rawData = await readFile( data.path)
                let gjson = JSON.parse(rawData)
                for( feature of gjson.features )
                {
                    let { properties, geometry } = feature
                    if( geometry === null ) console.log(`${name} geometry is null, it won't be written in to db`)
                    else Model.GeoJsonFeature.create( { assetUUID: asset.UUID, geometry, properties } )
                }
                res.json(asset)
                break
            case 'WMTS':
                Model.WMTS.create( { url, assetUUID: asset.UUID } )
                res.json(asset)
                break
        }
    }
    
    catch(err)
    {
        res.status(400);
        res.json({msg:err.msg})
    }
}

const updateAsset = async ( req, res ) =>
{
    let data = req.files.data
    let { name, type, group, tag, url } = req.body
    // let  body = req.body
    let { assetUUID } = req.query
    try
    {
        let asset = await Asset.update( { name, type, group, tag },
            {
                where:
                {
                    UUID: assetUUID
                }
            })
        switch( type )
        {
            case 'GeoJson':
                if( data )
                {
                    let rawData = await readFile( data.path)
                    let gjson = JSON.parse(rawData)
                    for( feature of gjson.features )
                    {
                        let { properties, geometry } = feature
                        if( geometry === null ) console.log(`${name} geometry is null, it won't be written in to db`)
                        else Model.GeoJsonFeature.update( { assetUUID, geometry, properties } )
                    }
                }
    
                break
            case 'WMTS':
                Model.WMTS.update( { url, assetUUID } )
                break
        }
        getAssets( req, res )
    }
    catch(err)
    {
        res.status(400);
        res.json({msg:err.msg})
    }
}

const deleteAsset = async ( req, res ) =>
{
    let { assetUUID } = req.query
    try
    {
        let asset = await Asset.destroy(
            {
                where: { UUID: assetUUID }
            })
        switch( asset.type )
        {
            case 'GeoJson':
                Model.GeoJsonFeature.destroy(
                    {
                        where:{ assetUUID }
                    }
                )
                
                break
            case 'WMTS':
                Model.WMTS.destroy(
                    {
                        where:{ assetUUID }
                    }
                )
                break
        }
        getAssets( req, res )
    }
    catch(err)
    {
        res.status(400);
        res.json({msg:err.msg})
    }
}

module.exports = {
    getAssets,
    createAsset,
    deleteAsset,
    updateAsset,
    getMapDataByAssetId
}