const axios = require("axios");

const table = async (req, res) => {
  try {
    console.log("Got here");
    const response = await axios.post(
      "https://swagat-app-endpoint.purplegrass-4e23b3bc.eastus2.azurecontainerapps.io/get_table_rows",
      req.body
    );

    return res.json(response.data);
  } catch (error) {
    console.error("Error making POST request:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

module.exports = { table };
