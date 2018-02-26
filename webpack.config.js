var webpack = require("webpack");
const path = require("path");

var devSettings = {
  bundleName: "bundle_dev.js",
  apiURL: "http://localhost/",
  fbAppID: "822489027938447"
};

var prodSettings = {
  bundleName: "bundle_prod.js",
  apiURL: "http://marketplace-staging.us-east-2.elasticbeanstalk.com/",
  fbAppID: "175852563003044"
};

// Alter settings based on NODE_ENV variable passed in
var settings = process.env.NODE_ENV === "dev" ? devSettings : prodSettings;

var config = {
  entry: "./src/index.js",
  output: {
    filename: settings.bundleName,
    path: path.resolve(__dirname, "../backend/market/static")
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
  plugins: [
    new webpack.DefinePlugin({
      "API_URL": JSON.stringify(settings.apiURL),
      "FB_APP_ID": JSON.stringify(settings.fbAppID)
    })
  ],
  module: {
    loaders: [
     {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
           presets: ["es2015", "react"],
           plugins: ["transform-object-rest-spread"]
        }
     },
     {
        test: /\.css$/,
        loader: "style-loader"
     }, 
     {
        test: /\.css$/,
        loader: "css-loader"
      }
    ]
  }
};

module.exports = config;
