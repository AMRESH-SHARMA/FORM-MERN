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
app.use(cors())

const cpUpload = upload.fields([{ name: 'imageAsset', maxCount: 1 }, { name: 'videoAsset', maxCount: 1 }])
app.post('/', cpUpload, async (req, res) => {
  res.status(200).send("RES BY POST REQ ")
    const empObj = Object.values(req.files).every(value => {
      if (value === null || value === undefined || value === '') {
        return true;
      }
      return false;
    });

    if (!empObj) {
      try {
        console.log("request 111 executed");
        const result1 = await cloudinary.uploader.upload(req.files['imageAsset'][0].path, {
          resource_type: "auto"
        });
        const resImgUrl = result1.secure_url;
        console.log("request 222 executed");
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
      } catch (error) {
        console.log(error);
      }

    } else if (empObj) {
      console.warn("No file received");
    }
  })

app.get('/', cors(), (req,res) => {
  res.send("abc")
});



app.listen(8080, () => {
  console.log('Server Started on Port 8080 ....');
});