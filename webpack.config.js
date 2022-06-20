const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },

  devServer: {
    proxy: {
      "*": "http://localhost:8000"
    },
  },
};

//   "*": "http://localhost:8000"
//"*": "https://api.softestingca.com"
// const path = require('path');
// const webpack = require('webpack');

// module.exports={
//   entry:path.resolve(__dirname,'src','index.js'),
//   output:{
//       path:path.resolve(__dirname,'dist'),
//       filename:'bundle.js'
//   },
//   resolve:{
//       extensions:['.js','.js']
//   },



// module:{
//     entry:'./src/index.js',
//     module:{
//         rules:[
//             {
//                 test: /\.(png|jp(e*)g|svg|gif)/,
//                 use:[
//                     {
//                         loader:'file-loader',
//                         options:{
//                             name:'images/[hash]-[name].[ext]',
//                         }
//                     },
//                 ]
//             }
//         ]
//     }
// }
// }