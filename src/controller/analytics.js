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

module.exports = { analytics };
