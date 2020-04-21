const path = require("path");
const outputDir = path.resolve(__dirname, "build");

module.exports = {
  mode: "development",
  entry: "./src/assets/js/main.js",
  devtool: "inline-source-map",
  output: {
    path: outputDir,
    filename: "[name].js",
    publicPath: "/",
    chunkFilename: "../assets/js/[name].js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    chunkIds: "named",
    mergeDuplicateChunks: false,
  },
};
