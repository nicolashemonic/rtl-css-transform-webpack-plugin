# RTL CSS Transform Webpack Plugin 💎

Webpack plugin that implements [RTLCSS](https://github.com/MohammadYounes/rtlcss) framework for transforming Left-To-Right (LTR) Cascading Style Sheets (CSS) to Right-To-Left (RTL).

Before you should use a CSS extraction plugin. For Webpack v4 we use [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to extract CSS from JS.

```rtl-css-transform-webpack-plugin``` creates RTL CSS file per LTR CSS file:

style.css 

```css
.example {
   direction: ltr;
   margin: 0;
   padding: 1em 2em .5em 1em;
   background-color: #353639;
   font-family: "Droid Sans", sans-serif/*rtl:prepend:"Droid Arabic Kufi",*/;
   font-size: 16px/*rtl:14px*/;
}
```

style.rtl.css 

```css
.example {
   direction: rtl;
   margin: 0;
   padding: 1em 1em .5em 2em;
   background-color: #353639;
   font-family: "Droid Arabic Kufi","Droid Sans", sans-serif;
   font-size: 14px;
}
```

### Features 😛

- [x] Full [RTLCSS](http://rtlcss.com/learn/usage-guide/options) options, plugins & hooks support
- [x] CSS modules & Code splitting compatible
- [x] Source map for debugging
- [x] Support Webpack v4

## Install

```cli
npm install rtl-css-transform-webpack-plugin --save-dev
```

## Usage

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RtlCssPlugin = require("rtl-css-transform-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        chunkFilename: "[name].js" // only for code splitting
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new RtlCssPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    }
}
```

### Filename

This option determines the name of each output bundle.

The default file name is ```[name].rtl.css```.

See [webpack output filename](https://webpack.js.org/configuration/output/#output-filename) for more details.

```js
new RtlCssPlugin({
    filename: "rtl/[name].css" // create a rtl folder
})
```

### Sourcemap

Produces inline source map. Disabled by default.

Source mapping can be enabled via ```sourcemap``` option.

```js
new RtlCssPlugin({
    sourcemap: true
})
```

Alternatively it can be enabled using [webpack devtool option](https://webpack.js.org/configuration/devtool/#devtool).

```cli
webpack --devtool source-map
```

### Minification

Using built-in webpack minification via production option.

```cli
webpack -p
```

Alternatively see [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin/blob/master/README.md#minimizing-for-production) minification recommendation for futur Webpack v5.

### RTLCSS options

RTLCSS usage can be customized using object config.

Options are same as [RTLCSS options](http://rtlcss.com/learn/usage-guide/options).     
Plugins are same as [RTLCSS plugins](http://rtlcss.com/learn/extending-rtlcss/writing-a-plugin).    
Hooks are same as [RTLCSS hooks](http://rtlcss.com/learn/usage-guide/hooks).   

```js
new RtlCssPlugin({
    config: {
        options: {},
        plugins: [],
        hooks: []
    }
})
```

----

💐 Special thanks to @MohammadYounes for RTLCSS.