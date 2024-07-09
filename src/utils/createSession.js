const axios = require("axios");

const options = {
  method: "POST",
  url: "https://gateway-dev.on-demand.io/chat/v1/sessions",
  headers: {
    apikey: "ZhWvaHppAVb73riC9DXMPEJH9wjSu2Dg",
    "Content-Type": "application/json",
  },
  data: {
    pluginIds: [],
    externalUserId: "d3cbaaab-4976-4554-82ce-12cec9dc6a66",
  },
};

const createSession = async () => {
  try {
    const response = await axios.request(options);
    return response.data.chatSession.id;
  } catch (error) {
    console.error("Error creating session");
    return null;
  }
};

module.exports = { createSession };
