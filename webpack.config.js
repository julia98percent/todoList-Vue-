const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
require("@babel/polyfill");

module.exports = (env, opts) => {
  const config = {
    // 중복되는 옵션들
    resolve: {
      extensions: ['.vue', '.js']
    },
    //진입점, 가장 먼저 실행되어야 할 파일
    entry: {
      app: ["@babel/polyfill", path.join(__dirname, "main.js")],
    },
    //결과물에 대한 설정
    output: {
      filename: "[name].js", //app.js
      path: path.join(__dirname, "dist"), //확장자가 없으면 디렉토리 이름
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: "vue-loader",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                "postcss-loader",
                'sass-loader'
            ]
        }
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "index.html"),
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "assets/",
            to: "",
          },
        ],
      }),
      new CleanWebpackPlugin(),
    ],
  };
  //개발용
  if (opts.mode === "development") {
    return merge(config, {
      //추가 개발용 옵션
      devtool: "eval",
      devServer: {
        open: false,
        hot: true,
      },
    });
  }
  //제품용
  else {
    return merge(config, {
      //추가 제품용 옵션
      devtool: "cheap-module-source-map",
      plugins: [new CleanWebpackPlugin()],
    });
  }
};
