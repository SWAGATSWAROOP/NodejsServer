const { createSession } = require("../utils/createSession.js");
const { querySession } = require("../utils/querySession.js");

const docsInteract = async (req, res) => {
  try {
    const str = req.body.text;
    const sessionid = await createSession();
    console.log(sessionid);
    const queryData = await querySession(sessionid, str);
    console.log(queryData);

    return res.status(200).json({ message: queryData });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { docsInteract };
