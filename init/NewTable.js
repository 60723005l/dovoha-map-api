const Path = require('path');

const sqlize = require('../database/sqlize')
const Model = require("../model")
const { readFile } = require('fs').promises



const Assetcontents = [
    { name: '民雄人物', type: 'GeoJson',group:'向量圖資', tag: "BaseVector,default show", url: '', data: "../asset/民雄人物.geojson"},
    { name: '民雄村里', type: 'GeoJson',group:'向量圖資', tag: "BaseVector,default show,no popup", url: '', data:"../asset/Minsyong_village.geojson"},
    { name: '民雄鄉', type: 'GeoJson',group:'向量圖資', tag: "BaseVector,default show,no popup", url: '', data: "../asset/Minsyong_town.geojson"},
    { name: '東南亞美食', type: 'GeoJson',group:'向量圖資', tag: "BaseVector,default show", url: '', data:"../asset/southeastasia.geojson"},
    { name: '開放街圖（OSM）', type: 'WMTS',group:'影像圖資', tag: "Basemap", url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png	', data: ""},
    { name: 'Corona衛星影像（1966年）', type: 'WMTS',group:'影像圖資', tag: "Basemap", url: 'https://gis.sinica.edu.tw/tileserver/file-exists.php?img=Taiwan_Corona_1966-jpg-{z}-{x}-{y}', data: ""},
    { name: '經建3版地形圖（2001年）', type: 'WMTS',group:'底圖', tag: "Basemap", url: 'https://gis.sinica.edu.tw/tileserver/file-exists.php?img=TM25K_2001-jpg-{z}-{x}-{y}', data: ""},
    { name: '臺灣堡圖（1921年）', type: 'WMTS',group:'底圖', tag: "Basemap", url: 'https://gis.sinica.edu.tw/tileserver/file-exists.php?img=JM20K_1921-jpg-{z}-{x}-{y}', data: ""},
    { name: '臺灣通用電子地圖', type: 'WMTS',group:'底圖', tag: "Basemap", url: 'https://wmts.nlsc.gov.tw/wmts/EMAP5/default/GoogleMapsCompatible/{z}/{y}/{x}.png', data: ""},
    { name: '臺灣堡圖（1904年）', type: 'WMTS',group:'底圖', tag: "Basemap", url: 'https://gis.sinica.edu.tw/tileserver/file-exists.php?img=JM20K_1904-jpg-{z}-{x}-{y}', data: ""},
    { name: '正射影像圖(通用)', type: 'WMTS',group:'底圖', tag: "Basemap", url: 'https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}.png', data: ""},
    
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


