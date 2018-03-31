var webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MinifyPlugin = require('babel-minify-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

var settings = {
  bundleName: "bundle_prod.js",
  apiURL: "https://marketplace.chicagomaroon.com/",
  rootURL: "",
  fbAppID: "155579525119529",
  s3URL: "https://s3.us-east-2.amazonaws.com/maroon-marketplace"
};

module.exports = merge(common, {
    output: {
        filename: settings.bundleName
    },
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
    ]
});