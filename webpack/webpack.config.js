var path = require('path');
var webpack = require('webpack');
var d = path.resolve('src', 'js', 'options.js')
console.log(1, d);

var config = {
  entry: {
    content: path.resolve('src', 'js', 'content.js'),
    lock: path.resolve('src', 'js', 'lock.js'),
    background: path.resolve('src', 'js', 'background.js'),
    options: path.resolve('src', 'js', 'options.js')
  },
  output: {
    filename: "[name].js",
    path: path.resolve('lib', 'js', 'bundle')
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", '.jsx']
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: false,
      mangle: false,
      beautify: true
    })
  ],

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: "source-map-loader"
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
};

module.exports = config;