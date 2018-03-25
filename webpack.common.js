var webpack = require("webpack");
const path = require("path");

var settings = {};

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "../backend/market/static")
    },
    resolve: {
        modules: [
            path.resolve("./src"),
            path.resolve("./node_modules")
        ]
    },
    plugins: [],
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