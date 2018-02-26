var webpack = require('webpack');
const path = require("path");

var devSettings = {
  bundleName: JSON.stringify("bundle_dev.js"),
  apiURL: JSON.stringify("http://localhost/"),
  fbLoginID: JSON.stringify("822489027938447")
};

var prodSettings = {
  bundleName: JSON.stringify("bundle_prod.js"),
  apiURL: JSON.stringify("http://marketplace-staging.us-east-2.elasticbeanstalk.com/"),
  fbAppID: JSON.stringify("175852563003044"),
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
      "API_URL": settings.apiURL,
      "FB_APP_ID": settings.fbAppID
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
