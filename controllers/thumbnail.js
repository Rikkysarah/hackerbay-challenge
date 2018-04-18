'use strict';


const express = require('express');
let app = express();
let router = express.Router();
const jsonpatch = require('json-patch');
const Jimp = require('jimp');

const authenticate = require('../middlewares/authenticate');


app.use('/api', router);
router.use(authenticate); 


router.get('/', (req, res) => {
  res.status(200).json( req.decoded );
});


router.post('/apply_json_patch', (req, res) => {
  const myObj = req.body.obj;
  const myPatch = req.body.patch;

  if (myObj && myPatch) {
    let result = jsonpatch.apply(myObj, myPatch);
    res.status(200).json(result);
  } else {
    res.status(400).json({
      success: false,
      message: 'Please pass the JSON object and JSON patch array.'
    });
  }
});


router.post('/create_thumbnail', (req, res) => {
  const imageUrl = req.body.imageUrl;
  if (imageUrl) {
  
    Jimp.read(imageUrl, (err, image) => {
      if (err || !image) {
        res.status(500).json({
          success: false,
          message: 'Unable to read the image from the url.'
        });
      } else {
        image.resize(50, 50).getBase64(Jimp.AUTO, (error, img) => {
          res.status(200).send(`<img src='${img}'>`);
        });
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Please pass the imageUrl in the form.'
    });
  }
});

module.exports = app;
