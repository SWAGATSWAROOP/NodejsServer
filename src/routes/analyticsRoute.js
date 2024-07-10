const { Router } = require("express");
const { analytics, totalInvested } = require("../controller/analytics.js");

const router = Router();

router.route("/").get(analytics).post(totalInvested);

module.exports = router;
