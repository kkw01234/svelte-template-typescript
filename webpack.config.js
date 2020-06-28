const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LinkTypePlugin = require("html-webpack-link-type-plugin")
  .HtmlWebpackLinkTypePlugin;
const path = require("path");
const config = require("./svelte.config");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  entry: {
    bundle: ["./src/App.ts"],
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
    },
    extensions: [".mjs", ".js", ".svelte", ".tsx", ".ts"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: config,
        },
        // exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
          "scss-loader",
          {
            loader: "sass-loader?sourceMap",
            options: {
              includePaths: [],
              sourceMap: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./public/[name].css",
    }),
    new LinkTypePlugin({
      "**/*.css": "text/css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
  devtool: prod ? false : "source-map",
};
