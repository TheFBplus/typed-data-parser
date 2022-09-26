import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
	input: "src/index.ts",

	plugins: [
		typescript({
			declarationDir: undefined,
			outDir: undefined,
			declaration: false,
			module: "ESNEXT",
			target: "ES5",
		}),
		terser()
	],

	output: {
		sourcemap: true,
		file: "bin/typedDataParser.js",
		format: "iife",
		name: "typedDataParser",
		extend: false
	}
};
