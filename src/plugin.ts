import path from "path";
import rtlcss, { Config } from "rtlcss";
import { Source, RawSource } from "webpack-sources";
import webpack from "webpack";

export interface IOptions {
    filename?: string;
    sourcemap?: boolean | undefined;
    config?: Config | undefined;
}

const pluginName = "rtl-css-transform-webpack-plugin";
const isCss = (filename: string) => path.extname(filename) === ".css";

export default class RtlCssPlugin implements webpack.Plugin {
    private options: IOptions = {
        filename: "[name].rtl.css",
        sourcemap: undefined,
        config: undefined
    };

    constructor(options?: IOptions) {
        if (typeof options === "object") {
            if (typeof options.filename === "string") {
                this.options.filename = options.filename;
            }
            if (typeof options.sourcemap === "boolean") {
                this.options.sourcemap = options.sourcemap;
            }
            if (typeof options.config === "object") {
                this.options.config = options.config;
            }
        }
    }

    public apply(compiler: webpack.Compiler) {
        const { filename, sourcemap, config } = this.options;
        const { devtool } = compiler.options;
        const postcssOptions = {
            map: (sourcemap === undefined && !!devtool) || !!sourcemap
        };

        compiler.hooks.emit.tap(pluginName, compilation => {
            compilation.chunks.forEach(chunk => {
                chunk.files.filter(isCss).forEach((chunkFilename: string) => {
                    const asset: Source = compilation.assets[chunkFilename];
                    const result = rtlcss.configure(config).process(asset.source(), postcssOptions);
                    const rawSource = new RawSource(result.css);
                    const assetFilename = compilation.getPath(filename as string, {
                        chunk
                    });
                    compilation.assets[assetFilename] = rawSource;
                });
            });
        });
    }
}
