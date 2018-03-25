var webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

var settings = {
  bundleName: "bundle_dev.js",
  apiURL: "http://localhost/",
  rootURL: "http://localhost",
  fbAppID: "822489027938447",
  s3URL: "http://localhost/static"
};

module.exports = merge(common, {
    output: {
        filename: settings.bundleName
    },
    devtool: "eval",
    devServer: {
        inline: true,
        port: 3000
    },
    plugins: [
        new webpack.DefinePlugin({
            "API_URL": JSON.stringify(settings.apiURL),
            "ROOT_URL": JSON.stringify(settings.rootURL),
            "FB_APP_ID": JSON.stringify(settings.fbAppID),
            "S3_URL": JSON.stringify(settings.s3URL)
        }),
    ]
});