const { table } = require("../controller/gettable.js");
const { Router } = require("express");
const router = Router();

router.route("/gettable").post(table);

module.exports = router;
