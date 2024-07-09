const axios = require("axios");

const querySession = async (sessionId, str) => {
  try {
    const response = await axios.post(
      `https://gateway-dev.on-demand.io/chat/v1/sessions/${sessionId}/query`,
      {
        endpointId: "predefined-openai-gpt4o",
        query: str,
        pluginIds: ["plugin-1713962163"],
        responseMode: "sync",
      },
      {
        headers: {
          apikey: "ZhWvaHppAVb73riC9DXMPEJH9wjSu2Dg",
          "Content-Type": "application/json",
        },
      }
    );

    const queryData = response.data;
    return queryData;
  } catch (error) {
    console.log("Error in querySession");
    return;
  }
};

module.exports = { querySession };
