var express = require("express");
var router = express.Router();
var fs = require("fs");
var uniqid = require("uniqid");
var request = require("sync-request");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dqzczm8yn",
  api_key: "644295341493634",
  api_secret: "k3-SewfFXkEWovoXgwqfImvmvfg",
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/upload", async function (req, res, next) {
  let pictureName = "./tmp/" + uniqid() + ".jpg";

  let resultCopy = await req.files.avatar.mv(pictureName);

  if (!resultCopy) {
    let pictureSaved = await cloudinary.uploader.upload(pictureName);
    fs.unlinkSync(pictureName);
    console.log(pictureSaved);

    let apiUrl = "https://lacapsule-faceapi.herokuapp.com/api/detect";
    let options = {
      json: {
        apiKey: "5c0a5d392c1745d2ae84dc0b1483bfd2",
        image: pictureSaved.url,
      },
    };

    let resultDetectionRaw = await request("POST", apiUrl, options);

    let resultDetection = await resultDetectionRaw.body;
    resultDetection = await JSON.parse(resultDetection);
    console.log(resultDetection);

    let gender;
    let age;
    if (resultDetection.result) {
      gender =
        resultDetection.detectedFaces[0].gender === "male" ? "Homme" : "Femme";

      age = resultDetection.detectedFaces[0].age + " ans";
    }

    console.log(age);

    res.json({ result: true, pictureSaved, age, gender });
  } else {
    res.json({ result: false, error: resultCopy });
  }
});

module.exports = router;
