const { table } = require("../controller/gettable.js");
const { Router } = require("express");
const router = Router();

router.route("/gettable").get(table);

module.exports = router;
