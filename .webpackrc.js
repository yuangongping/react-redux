const path = require('path');
const {GenerateSW} = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = ({webpack}) => {

  const production = [
    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, 'dist'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: 'public/*'
      }
    ],
      {
        ignore: [
          '*.html'
        ]
    }),
    new CompressionPlugin({
      cache: true
    }),
    new GenerateSW({
      importWorkboxFrom: 'local',
      cacheId: 'landi-outsource',
      exclude: [/\.html$/],
      skipWaiting: true,
      clientsClaim: true
    }),
    new webpack.DefinePlugin({
      RELEASE: JSON.stringify(process.env.ENV === 'test')
    }),
  ];

  const plugins = process.env.NODE_ENV === 'production'
  ? production
  : [
    new webpack.DefinePlugin({
      RELEASE: JSON.stringify(process.env.ENV === 'test')
    })
  ];

  return {
    output:{
      path: path.resolve('dist')
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@api': path.resolve(__dirname, 'src/api/'),
        '@store': path.resolve(__dirname, 'src/store/'),
        '@utils': path.resolve(__dirname, 'src/utils/')
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 1024 * 1024 * 500,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    plugins
  }
}
