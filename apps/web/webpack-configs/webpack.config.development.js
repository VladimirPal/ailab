const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const baseWebpackConfig = require("@ailab/webpack-config");
const appWebpackConfig = require("./webpack.config");

require("dotenv").config({ path: path.join(__dirname, "..", ".env.deploy") });

const sslDevPath = path.resolve(__dirname, "../../../devScripts/ssl", "certs");

module.exports = (env) => ({
  ...baseWebpackConfig(env),
  ...appWebpackConfig(env),
  mode: "development",
  devtool: false,
  plugins: [
    new webpack.EvalSourceMapDevToolPlugin({}),
    new HtmlWebpackPlugin({
      template: "entries/index.tpl.html",
      inject: "body",
      filename: "index.html",
      chunks: ["index"],
      loadPlausible: false,
      loadTrello: false,
    }),
    new Dotenv({
      path: path.join(__dirname, "..", "./.env"),
    }),
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.BROWSER": true,
    }),
    new webpack.ProvidePlugin({
      React: "react",
      process: "process/browser.js",
      log: ["@ailab/log", "default"],
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    allowedHosts: [
      "ailab.internal",
      "app.ailab.internal",
      "ailab.lan",
      "app.ailab.lan",
    ],
    historyApiFallback: true,
    static: [
      path.resolve(__dirname, "..", "dist"),
      {
        directory: path.resolve(__dirname, "..", "locales"),
        publicPath: "/locales",
      },
    ],
    client: {
      overlay: { errors: true, warnings: false },
      ...((process.env.WEBSOCKET_URL ?? "").length
        ? {
            webSocketURL: process.env.WEBSOCKET_URL,
          }
        : {}),
    },
    port: process.env.DEV_SERVER_PORT,
    ...(process.env.USE_SSL === "true"
      ? {
          server: {
            type: "https",
            options: {
              ca: fs.readFileSync(path.resolve(sslDevPath, "ca.crt")),
              key: fs.readFileSync(path.resolve(sslDevPath, "nginx.key")),
              cert: fs.readFileSync(
                path.resolve(sslDevPath, "ailab.crt"),
              ),
            },
          },
        }
      : {}),
  },
});
