const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (mode) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["last 2 versions"],
                  },
                  corejs: { version: 3, proposals: true },
                  useBuiltIns: "entry",
                },
              ],
              [
                "@babel/preset-react",
                {
                  development: mode === "development",
                },
              ],
              [
                "@emotion/babel-preset-css-prop",
                {
                  autoLabel: "dev-only",
                  labelFormat: "[local]",
                },
              ],
            ],
            plugins: [
              "babel-plugin-macros",
              [
                "@emotion",
                {
                  autoLabel: "dev-only",
                  labelFormat: "[local]",
                },
              ],
              "@babel/plugin-proposal-export-default-from",
              "@babel/plugin-proposal-do-expressions",
              [
                // used only for babel helpers
                "@babel/plugin-transform-runtime",
                {
                  useESModules: true,
                },
              ],
            ],
            env: {
              development: {
                plugins: ["react-refresh/babel"],
              },
            },
          },
        },
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // WOFF/WOFF2 Fonts
      {
        test: /\.woff(.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
          },
        },
      },
      // TTF Fonts
      {
        test: /\.ttf(.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/octet-stream",
          },
        },
      },
      // SVG
      {
        test: /\.svg(.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "image/svg+xml",
          },
        },
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|eot|webp)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              // name: '[contenthash].[ext]',
            },
          },
        ],
      },
    ],
  },
});
