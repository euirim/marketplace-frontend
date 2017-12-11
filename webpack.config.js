const path = require("path");

var config = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../backend/market/assets")
  },
  devServer: {
    inline: true,
    port: 3000
  },
  resolve: {
    modules: [
      path.resolve("./src"),
      path.resolve("./node_modules")
    ]
  },
  module: {
    loaders: [
     {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
           presets: ["es2015", "react"]
        }
     }
    ]
  }
};

module.exports = config;