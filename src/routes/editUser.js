const { Router } = require("express");
const { editUserDetails } = require("../controller/editUser.js");

const router = Router();

router.route("/").put(editUserDetails);

module.exports = router;
