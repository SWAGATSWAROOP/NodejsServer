const { Router } = require("express");
const { receiveData, sendData } = require("../controller/addandgetdata.js");
const { checkAdmin } = require("../middleware/checkAdmin.js");

const router = Router();

router.route("/").get(checkAdmin, sendData).post(receiveData);

module.exports = router;
