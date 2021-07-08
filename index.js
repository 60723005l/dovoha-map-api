const config = require('./config.js');
const express  = require('express')
const cors = require('cors');
const formData = require("express-form-data");
const os = require("os");
const query = require("./queries")

const app = express()

app.use(express.json({limit : "30mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};
app.use(formData.parse(options));


const base = '/webgis/minsyong/backend/api'
app.get( base+"/assets" , query.getAssets )

app.get( base+"/mapdata" , query.getMapDataByAssetId )

app.post( base+"/assets/create", query.createAsset )

app.put( base+"/assets/update", query.updateAsset )

app.delete( base+"/assets/delete", query.deleteAsset )




app.listen(config.PORT, () => {
    console.log(`App running on port ${config.PORT}.`)
  })