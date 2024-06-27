const { Company } = require("../models/company.js");

const receiveData = async (req, res) => {
  try {
    const {
      portfolioCompanyName,
      capitalInvested,
      companyIndustryCategory,
      companyLogo,
      investmentDate,
      currentValuation,
      recentExitAmount,
      recentDocuments,
    } = req.body;

    if (
      [
        portfolioCompanyName,
        capitalInvested,
        companyIndustryCategory,
        companyLogo,
        investmentDate,
        currentValuation,
        recentDocuments,
      ].some((field) => field === undefined)
    ) {
      console.log("Some fields are empty");
      return res
        .status(400)
        .json({ message: "Their are some undefined values" });
    }

    if (recentExitAmount === null) {
      const newCompany = new Company({
        portfoliocompanyname: portfolioCompanyName,
        capitalinvested: capitalInvested,
        companyindustrycategory: companyIndustryCategory,
        companylogo: companyLogo,
        investmentdate: new Date(investmentDate),
        currentvaluation: currentValuation,
        recentdocumentuploads: recentDocuments,
      });

      const savedCompany = await newCompany.save();
      return res.status(201).json(savedCompany);
    }

    const newCompany = new Company({
      portfoliocompanyname: portfolioCompanyName,
      capitalinvested: capitalInvested,
      companyindustrycategory: companyIndustryCategory,
      companylogo: companyLogo,
      investmentdate: new Date(investmentDate),
      currentvaluation: currentValuation,
      anyrecentexit: recentExitAmount,
      recentdocumentuploads: recentDocuments,
    });

    const savedCompany = await newCompany.save();
    return res.status(201).json(savedCompany);
  } catch (error) {
    console.log("Error in saving in DB");
    return res.status(500).json({ message: "Server Error" });
  }
};

const sendData = async (_, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({ companies, message: "successfully send data" });
  } catch (error) {
    console.log("Error in sending data");
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { receiveData, sendData };
