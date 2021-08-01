const path = require('path')
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
    test: /\.scss$/,
    use: [
        // Creates `style` nodes from JS strings
        "style-loader",
        // Translates CSS into CommonJS
        "css-loader",
        "postcss-loader",
        // Compiles Sass to CSS
        "sass-loader",
    ],
    resolve: {
        alias: {
          '~': path.resolve(__dirname, './node_modules'),
        }
    }
})

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
};
