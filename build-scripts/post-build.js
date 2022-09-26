let ambientTypes = `interface Window {
	typedDataParser: typeof import("./dts");
}

declare const typedDataParser: typeof import("./dts");
`;

const { writeFile } = require("fs").promises;

(async function () {
	try {
		await writeFile("bin/typedDataParser.d.ts", ambientTypes);
	} catch (error) {
		console.log(error);
	}
})();
