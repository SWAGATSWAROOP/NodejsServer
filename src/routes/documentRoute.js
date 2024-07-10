const { Router } = require("express");
const {
  docsInteract,
  recentDoc,
} = require("../controller/interactWithDocs.js");

const router = Router();

router.route("/documentsinteract").post(docsInteract);
router.route("/recentdoc").get(recentDoc);

module.exports = router;
