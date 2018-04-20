declare module "rtlcss" {
    type Options = any;
    type Plugins = any;
    type Hooks = any;
    type Map = any;

    type Configure = (config: Config | undefined) => { process: PostCssProcess };
    type Process = (css: string, options: Options, plugins: Plugins, hooks: Hooks) => string;
    type PostCssProcess = (css: string, options: PostcssOptions | undefined) => Result;

    const rtlcss: {
        configure: Configure;
        process: Process;
    };

    export type Config = {
        options: Options;
        plugins: Plugins[];
        hooks: Hooks[];
    };

    export type PostcssOptions = {
        map: boolean;
    };

    export type Result = {
        css: string;
        map: Map;
    };

    export default rtlcss;
}
