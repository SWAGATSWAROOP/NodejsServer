const { Router } = require("express");
const { analytics } = require("../controller/analytics.js");

const router = Router();

router.route("/").get(analytics);

module.exports = router;
