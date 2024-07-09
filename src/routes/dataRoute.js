const { Router } = require("express");
const { receiveData, sendData } = require("../controller/addandgetdata.js");

const router = Router();

router.route("/").get(sendData).post(receiveData);
// router.route("/documents").get();


module.exports = router;
