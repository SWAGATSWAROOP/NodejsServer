const { Company } = require("../models/company.js");

const analytics = async (_, res) => {
  try {
    const result = await Company.aggregate([
      {
        $group: {
          _id: "$companyindustrycategory",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          count: 1,
          total: { $sum: "$count" },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$count" },
          categories: { $push: { category: "$_id", count: "$count" } },
        },
      },
      {
        $unwind: "$categories",
      },
      {
        $project: {
          _id: 0,
          category: "$categories.category",
          count: "$categories.count",
          percentage: {
            $multiply: [{ $divide: ["$categories.count", "$total"] }, 100],
          },
        },
      },
    ]);

    return res.status(200).json(result);
  } catch (error) {
    console.log("Error in fetching data in analytics api");
    return res.status(500).json({ message: "Server Error" });
  }
};

const totalInvested = async (_, res) => {
  try {
    // Aggregate to calculate total invested amount and total ROI
    const result = await Company.aggregate([
      {
        $group: {
          _id: null,
          totalInvested: { $sum: "$capitalinvested" },
          totalReturns: {
            $sum: {
              $subtract: ["$currentvaluation", "$capitalinvested"],
            },
          },
        },
      },
    ]);

    // Prepare response data
    const responseData = {
      totalInvested: result.length > 0 ? result[0].totalInvested : 0,
      returns: result.length > 0 ? result[0].totalReturns : 0,
    };

    // Return response with total invested amount and total returns
    res.json(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { analytics, totalInvested };
