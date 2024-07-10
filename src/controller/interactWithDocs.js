const { createSession } = require("../utils/createSession.js");
const { querySession } = require("../utils/querySession.js");
const { Company } = require("../models/company.js");

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

const recentDoc = async (_, res) => {
  try {
    // Fetch all companies with recent document uploads
    const companies = await Company.find(
      {},
      { _id: 0, portfoliocompanyname: 1, recentdocumentuploads: 1 }
    );

    // Flatten the documents and add company name to each upload
    let uploads = [];
    companies.forEach((company) => {
      company.recentdocumentuploads.forEach((upload) => {
        uploads.push({
          portfoliocompanyname: company.portfoliocompanyname,
          name: upload.name,
          date: upload.date,
          time: upload.time,
        });
      });
    });

    // Sort uploads by date and time in descending order
    uploads.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Return response with sorted recent document uploads
    res.json(uploads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { docsInteract, recentDoc };
