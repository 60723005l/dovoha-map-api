const Path = require('path');

const sqlize = require('../database/sqlize')
const Model = require("../model")
const { readFile } = require('fs').promises



const Assetcontents = [
    { name: '民雄人物', type: 'GeoJson',group:'向量圖資', tag: "BaseVector,default show", url: '', data: "../asset/民雄人物-20211018.geojson"},
    { name: '民雄街區走踏路線', type: 'GeoJson',group:'向量圖資', tag: "BaseVector,default show", url: '', data: "../asset/民雄街區走踏路線-20211018.geojson"},
    
]


const clearTables = async () =>
{
    
    await Model.GeoJsonFeature.destroy({ truncate : true, cascade: false })
    await Model.WMTS.destroy({ truncate : true, cascade: false })
    await Model.Asset.destroy({ truncate : true, cascade: false })
}


const insertContents = async () =>
{
    for ( let content of Assetcontents )
    {
        let { name, type, group, tag, url, data } = content
        let asset = await Model.Asset.create( { name, type, group, tag } )
        switch( type )
        {
            case 'GeoJson':
                let rawdata = await readFile(Path.resolve(__dirname, data)),
                    gjson = JSON.parse(rawdata)
                for( feature of gjson.features )
                {
                    let { properties, geometry } = feature
                    if( geometry === null ) console.log(`${name} geometry is null, it won't be written in to db`)
                    else Model.GeoJsonFeature.create( { assetUUID: asset.UUID, geometry, properties: properties } )
                }
                
                break
            case 'WMTS':
                Model.WMTS.create( { url, assetUUID: asset.UUID } )
                break
        }
    }
    
}

const execute = async () =>
{
    // await clearTables()
    await insertContents()
}

execute()












// const insertAllContent = () =>
// {
//     let promises = []
//     for ( let content of contents)
//     {
//         let { name, type, group, tage, url, data } = content
//         switch( type )
//         {
//             case 'GeoJsonFeature':
//                 break
//             case 'WMTS':
//                 break
//         }
//         //----
//         if ( content.data != "")
//         {
//             promises.push( new Promise(( res, rej ) =>
//             {
//                 content.data.then( rawdata =>
//                     {
//                         content.data = rawdata
//                         console.log(content.name)
//                         res( content )
//                         insert2Asset( content )
//                     })
//                     .catch(rej =>
//                     {
//                         console.log(`${content.name} asset insert error:\n`,rej)
//                     })
//             }))

//         }
//         else
//         {
//             insert2Asset( content )
//         }
        
//     }
//     Promise.all( promises )
// }

// insertAllContent()


