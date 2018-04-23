import { buildBundle, resolver } from "./bundle";
import fs from "fs";
import path from "path";

describe("rtl-css-transform-webpack-plugin", () => {
    it("Should transform LTR to RTL", async () => {
        expect.assertions(1);
        const bundle = await buildBundle("simple");
        expect(bundle.readFileSync(resolver("main.rtl.css"), "utf-8")).toEqual(
            fs.readFileSync(resolver("cases", "simple", "expected.css"), "utf-8")
        );
    });

    it("Should change RTL file name", async () => {
        expect.assertions(1);
        const bundle = await buildBundle("filename", { filename: "rtl/[name].css" });
        expect(bundle.readFileSync(resolver("rtl", "main.css"), "utf-8")).toEqual(
            fs.readFileSync(resolver("cases", "filename", "expected.css"), "utf-8")
        );
    });

    it("Should generate RTL source mapping", async () => {
        expect.assertions(1);
        const bundle = await buildBundle("sourcemap", { sourcemap: true });
        expect(bundle.readFileSync(resolver("main.rtl.css"), "utf-8")).toEqual(
            fs.readFileSync(resolver("cases", "sourcemap", "expected.css"), "utf-8")
        );
    });
});
