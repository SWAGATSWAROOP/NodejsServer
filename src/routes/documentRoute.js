const { Router } = require("express");
const { docsInteract } = require("../controller/interactWithDocs.js");

const router = Router();

router.route("/documentsinteract").post(docsInteract);

module.exports = router;
