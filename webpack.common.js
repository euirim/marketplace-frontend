var webpack = require("webpack");
const path = require("path");

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
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      "API_URL": JSON.stringify(settings.apiURL),
      "ROOT_URL": JSON.stringify(settings.rootURL),
      "FB_APP_ID": JSON.stringify(settings.fbAppID),
      "S3_URL": JSON.stringify(settings.s3URL)
    }),
    new MinifyPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CompressionPlugin({   
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  module: {
   rules: [
     {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
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
