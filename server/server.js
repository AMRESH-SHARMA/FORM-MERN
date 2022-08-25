require("dotenv").config()
const express = require('express');
const cloudinary = require("./utils/cloudinary");
const upload = require("./utils/multer");
// const storage = multer.memoryStorage()
// const upload = multer()
const dbConnect = require('./mongodb');

const app = express();
app.use(express.json());
const cors = require('cors');
const { ObjectId } = require("mongodb");
app.use(cors())

const cpUpload = upload.fields([{ name: 'imageAsset', maxCount: 1 }, { name: 'videoAsset', maxCount: 1 }])
app.post('/', cpUpload, async (req, res) => {

    const empObj = Object.values(req.files).every(value => {
      if (value === null || value === undefined || value === '') {
        return true;
      }
      return false;
    });

    if (!empObj) {
      try {
        // console.log("request 111 executed");
        const result1 = await cloudinary.uploader.upload(req.files['imageAsset'][0].path, {
          resource_type: "auto"
        });
        const resImgUrl = result1.secure_url;
        // console.log("request 222 executed");
        const result2 = await cloudinary.uploader.upload(req.files['videoAsset'][0].path, {
          resource_type: "auto"
        });
        const resVidUrl = result2.secure_url;
        // console.log(resImgUrl,resVidUrl)
        let data = await dbConnect();
        // console.log("database started")
        data.insertMany([
          {
            Title: req.body.title,
            Description: req.body.description,
            ImageUrl: resImgUrl,
            VideoUrl: resVidUrl
          }
        ]);
        // console.log("Query Executed")
        res.send("done ")
      } catch (error) {
        console.log(error);
      }

    } else if (empObj) {
      console.warn("No file received");
    }
  })


app.get('/', cors(), async (req,res) => {
  let data = await dbConnect();
  const result = await data.find().project({ Title: 1, ImageUrl: 1, VideoUrl: 1 }).toArray();
  res.send(result)
});

app.get('/getvideo/:id', cors(), async (req,res) => {
  let data = await dbConnect();
  var o_id = new ObjectId(req.params.id)
  let query =  {_id: o_id}
  let options ={projection: {VideoUrl: 1, _id: 0}}
  const result = await data.findOne(query,options);
  res.send(result)
});

app.listen(8080, () => {
  console.log('Server Started on Port 8080 ....');
});