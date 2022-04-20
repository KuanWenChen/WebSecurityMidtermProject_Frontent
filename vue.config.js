const fs = require("fs");

module.exports = {
  outputDir: "dist",
  filenameHashing: true,
  devServer: {
    host: "localhost",
    port: 8000,
    https: {
      key: fs.readFileSync("./localhost-key.pem"),
      cert: fs.readFileSync("./localhost.pem"),
    },
    headers: {
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Headers": "*",
    },
    proxy: {
      "/api": {
        target: "https://demo.swordgunblue.works/",
        secure: true,
        ws: false,
        changeOrigin: true,
      },
    },
  },
};
