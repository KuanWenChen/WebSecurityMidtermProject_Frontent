const fs = require("fs");

module.exports = {
  devServer: {
    host: "localhost",
    port: 3000,
    // https: {
    //   key: fs.readFileSync("./localhost-key.pem"),
    //   cert: fs.readFileSync("./localhost.pem"),
    // },
    headers: {
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Headers": "*",
    },
  },
};
