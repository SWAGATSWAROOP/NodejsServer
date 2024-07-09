const { Router } = require("express");
const { getAllUsers, inviteUsers } = require("../controller/users.js");

const router = Router();

router.route("/getusers").get(getAllUsers);
router.route("/invite").post(inviteUsers);

module.exports = router;
