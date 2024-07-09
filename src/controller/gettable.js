const axios = require("axios");

function cleanApiResponse(response) {
  return response.map((entry) => {
    const cleanedFields = {};

    for (const [key, value] of Object.entries(entry.fields)) {
      const cleanedKey = key.replace(
        /^founder_education include:|^founder_names include:|^seed_round: |^series_b: /g,
        ""
      );
      cleanedFields[cleanedKey] = value;
    }

    return {
      ...entry,
      fields: cleanedFields,
    };
  });
}

const table = async (req, res) => {
  try {
    const response = await axios.post(
      "https://swagat-app-endpoint.purplegrass-4e23b3bc.eastus2.azurecontainerapps.io/get_table_rows",
      req.body
    );
    const cleanres = cleanApiResponse(response.data);
    return res.json(cleanres);
  } catch (error) {
    console.error("Error making POST request:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

module.exports = { table };
