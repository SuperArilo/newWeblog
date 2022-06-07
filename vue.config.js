const webpack = require('webpack')
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 本地环境是否需要使用cdn
const devNeedCdn = false
// cdn链接
const cdn = {
    externals: {},
    css: [],
    js: []
}
 
module.exports = {
    devServer:{
        port: 80
    },
    lintOnSave: false,
    publicPath: '/',
    productionSourceMap: false,
    chainWebpack: config => {
        config.resolve.symlinks(true)
        config.plugin('html').tap(args => {
            if (isProduction || devNeedCdn) args[0].cdn = cdn
            return args
        })
    },
    configureWebpack: config => {
        if (isProduction || devNeedCdn) config.externals = cdn.externals
        if (isProduction) {
            const productionGzipExtensions = ['html', 'js', 'css']
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path][base].gz',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.7,
                    deleteOriginalAssets: false
                })
            )
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_debugger: true,
                            drop_console: true,
                            pure_funcs: ['console.log']
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            )
            config.plugins.push(
                new webpack.ProvidePlugin({
                    $: "jquery",
                    jQuery: "jquery",
                    "windows.jQuery": "jquery"
                })
            )
        }
        config.optimization = {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'all',
                        test: /node_modules/,
                        name: 'vendor',
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 100
                    },
                    common: {
                        chunks: 'all',
                        test: /[\\/]src[\\/]js[\\/]/,
                        name: 'common',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 60
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(sa|sc|c)ss$/,
                        chunks: 'all',
                        enforce: true
                    },
                    runtimeChunk: {
                        name: 'manifest'
                    }
                }
            }
        }
    }
}