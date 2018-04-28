
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            path.join(__dirname, 'src'), // location of your src
            {} // a map of your routes
        ),
        new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path.join(__dirname, './src')),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "main.html",
            openAnalyzer: false,
          }),
    ],
    optimization: {
        splitChunks: {
            // chunks: "async",
            // maxAsyncRequests: 5,
            // maxInitialRequests: 3,
            // automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                // vendor: {
                //     chunks: "initial",
                //     test: "vendor",
                //     name: "vendor",
                //     enforce: true
                //   },
                  vendor: {
                    chunks: "initial",
                    test: path.resolve(__dirname, "node_modules"),
                    name: "vendor",
                    enforce: true
                  }
                // vendor: {
                //     test: /]node_modules/,
                //     priority: -10
                // },
            // default: {
            //         minChunks: 2,
            //         priority: -20,
            //         reuseExistingChunk: true
            //     }
            }
        }
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: path.join(__dirname, 'tsconfig.json') }
                    }, 'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // {
            //     test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            //     loader: 'file-loader?name=assets/[name].[hash].[ext]'
            // },
            // {
            //     test: /\.css$/,
            //     exclude: path.join(__dirname, 'src', 'app'),
            //     loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            // },
            {
                test: /\.css$/,
                include:  path.join(__dirname, 'src', 'app') ,
                loader: 'raw-loader'
            }
        ]
    },
}; 