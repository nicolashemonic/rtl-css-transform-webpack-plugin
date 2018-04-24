import path from "path";
import webpack from "webpack";
import MemoryFS from "memory-fs";
import RtlCssPlugin, { IOptions } from "../src/plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";

export const resolver = (...args) => path.resolve(__dirname, ...args);

export const buildBundle = (caseName: string, options?: IOptions, minimize = false) =>
    new Promise<MemoryFS>((resolve, reject) => {
        const compiler = webpack({
            entry: resolver("cases", caseName),
            output: {
                path: resolver(),
                filename: "[name].js"
            },
            resolveLoader: {
                modules: [resolver("..", "node_modules")]
            },
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: [MiniCssExtractPlugin.loader, "css-loader"]
                    }
                ]
            },
            plugins: [new MiniCssExtractPlugin(), new RtlCssPlugin(options)],
            optimization: {
                minimizer: minimize ? [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin()] : []
            }
        } as webpack.Configuration);

        compiler.outputFileSystem = new MemoryFS();

        compiler.run((err, stats) => {
            if (err) {
                return reject(err);
            } else if (stats.hasErrors()) {
                return reject(new Error(stats.toString()));
            } else {
                resolve(compiler.outputFileSystem);
            }
        });
    });
