const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    // 起点となるjsを指定
    entry: './src/index.js',
    // 出力するフォルダとファイル名を指定
    output: {
      path: `${__dirname}/dist`,
      filename: 'main.js'
    },
    // サーバーの情報を設定
    devServer: {
      // ルートディレクトリを指定
      contentBase: './dist'
    },
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            //'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(gif|png|jpg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 51200,
                name: './images/[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.(csv|tsv)$/,
          use: [
            'csv-loader'
          ]
        },
        {
          test: /\.(html)$/,
          exclude: /index.html$/,
          use: {
            loader: 'html-loader',
            // url-loaderで処理する属性
            options: {
              attributes: {
                list: [
                  {
                    tag: 'img',
                    attribute: 'src',
                    type: 'src'
                  },
                  {
                    attribute: 'data-src',
                    type: 'src'
                  }
                ]
              }
            }
          }
        },
        {
          test: /\.xml$/,
          use: [
            'xml-loader'
          ]
        },
        {
          test: /\.ts$/,
          use: 'ts-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            },
            {
              loader: "eslint-loader",
              options: {
                fix: false,
                failOnError: true,
              }
            }
          ],
        },
      ]
    },
    // プラグインの登録
    plugins: [
      new MiniCssExtractPlugin({filename: 'style.css'}),
      new HtmlWebpackPlugin({
        //title: '速習webpack',
        filename:"index.html",
        template:"src/html/index.html",
      }),
      new CleanWebpackPlugin(),
    ],
    // インポート時に認識する拡張子
    resolve: {
      extensions: ['.ts', '.js', '.json']
    }
  };
