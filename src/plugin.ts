import path from "path";
import rtlcss, { Config } from "rtlcss";
import { Source, RawSource } from "webpack-sources";
import webpack from "webpack";

interface IOptions {
    filename: string;
    sourcemap: boolean | undefined;
    config: Config | undefined;
}

const isCss = (filename: string) => path.extname(filename) === ".css";
const buildError = (error: string) => new Error(`[rtl-css-webpack-plugin] ${error}`);

export default class RtlCssPlugin implements webpack.Plugin {
    private options: IOptions;

    constructor(
        options = {
            filename: "[name].rtl.css",
            sourcemap: undefined,
            config: undefined
        }
    ) {
        if (typeof options !== "object") {
            throw buildError("options must be an object.");
        }
        if (typeof options.filename !== "string") {
            throw buildError("options.filename must be a string.");
        }
        this.options = options;
    }

    public apply(compiler: webpack.Compiler) {
        const { filename, sourcemap, config } = this.options;
        const { devtool } = compiler.options;
        const postcssOptions = {
            map: (sourcemap === undefined && !!devtool) || !!sourcemap
        };

        compiler.hooks.emit.tap("rtl-css-webpack-plugin", compilation => {
            compilation.chunks.forEach(chunk => {
                chunk.files.filter(isCss).forEach((chunkFilename: string) => {
                    const asset: Source = compilation.assets[chunkFilename];
                    const result = rtlcss.configure(config).process(asset.source(), postcssOptions);
                    const rawSource = new RawSource(result.css);
                    const assetFilename = compilation.getPath(filename, {
                        chunk
                    });
                    compilation.assets[assetFilename] = rawSource;
                });
            });
        });
    }
}
