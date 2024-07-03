const { Router } = require("express");
const { getAllUsers } = require("../controller/getUsers.js");

const router = Router();

router.route("/getusers").get(getAllUsers);

module.exports = router;
