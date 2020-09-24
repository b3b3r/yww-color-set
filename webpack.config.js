const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.js$/, // tous les fichiers js
        exclude: /node_modules/, // excluts node_modules
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      }
    ]
  }
};