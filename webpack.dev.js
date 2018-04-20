var webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

var settings = {
  bundleName: "bundle_dev.js",
  apiURL: "https://localhost/",
  rootURL: "https://localhost",
  fbAppID: "160970054618560",
  s3URL: "https://localhost/static"
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