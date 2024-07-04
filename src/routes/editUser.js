const { Router } = require("express");
const {editUserDetails} = require("../controller/editUser.js");

const router = Router();

router.route("/:userId").put(editUserDetails);

module.exports = router;
