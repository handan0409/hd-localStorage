const path = require("path");
const htmlPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', 
  entry: {
    app: "./test/test.js"
  },
  output:{
    path: path.resolve(__dirname, "./dist/"),
    filename: "./[name].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    compress: true,
    port: 9000,
  },
  // module: {
  //   rules: [
  //     {   //解析js和jsx的loader
  //       test: /\.(js|jsx)$/,
  //       exclude: /(node_modules|bower_components)/,
  //       use: {
  //         loader: 'babel-loader',   //使用babel解析一下
  //         options: {
  //           presets: ['env']
  //         }
  //       }
  //     },
  //   ]
  // }

    //插件，如，可以打包html的插件
    plugins: [
      new htmlPlugin({
        template: path.resolve(__dirname, './public/test.html'),
        filename: 'app.html',
      }),
    ],
}