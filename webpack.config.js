const path = require ("path");
const webpack = require ("webpack");
const UglifyJsPlugin = require ("uglifyjs-webpack-plugin");

//const { isModuleNamespaceObject } = require("util/types");
//const { resolve } = require("path");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    modules: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {presets: ["@babel/env"] },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader",]
            },
        ],
    }
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js",
    },
    devServer: {
        ContentBase: path.join(__dirname, "/")
        port: 3000,
        publicPath: "http;//localhost:3000/dist/",
        watchContentBase: true,
        historyApiFallback: true,
    },
    optimizamtion: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    mangle: {
                        keep_fnames: true, 
                    }
                },
            }),
        ],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
};