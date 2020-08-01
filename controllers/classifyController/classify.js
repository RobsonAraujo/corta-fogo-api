const winston = require("winston");
const ibmCloud = require("../../config/ibmCloud");

const path = require("path");
const fs = require("fs");
const tmpFolder = path.join("temp");

const VisualRecognitionV3 = require("ibm-watson/visual-recognition/v3");
const { IamAuthenticator } = require("ibm-watson/auth");

exports.classifyImage = function (req, res) {
  const { message } = req.body;

  const visualRecognition = new VisualRecognitionV3({
    version: ibmCloud.version,
    authenticator: new IamAuthenticator({
      apikey: ibmCloud.apikey,
    }),
    url:
      "https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/8c23f66a-010b-4c4d-bd73-cad651b1e049",
  });
  const classifyParams = {
    imagesFile: fs.createReadStream(`${tmpFolder}/fire.jpg`),
    owners: ["me"],
    threshold: 0.6,
  };

  visualRecognition
    .classify(classifyParams)
    .then((response) => {
      const classifiedImages = response.result;
      const data = classifiedImages.images[0].classifiers[0].classes;
      return res.status(200).json({
        status: 200,
        message: "Sucessfuly - The request is OK ",
        data,
      });
    })
    .catch((err) => {
      console.log("error:", err);
    });

  // if (!message) {
  //   winston.error(
  //     "classifyImage -> body -  *Bad Request - Missing parameters*"
  //   );
  //   return res.status(400).json({
  //     status: 400,
  //     message: "Bad Request - Missing parameters ",
  //   });
  // }
};
