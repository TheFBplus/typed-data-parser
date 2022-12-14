/** @type {import("typedoc").TypeDocOptions} */

const config = {
	entryPoints: ["../src/index.ts"],
	excludeExternals: false,
	excludePrivate: true,
	excludeProtected: false,
	hideInPageTOC: false,
	readme: "none",
	name: "",

	out: "../docs/md",
	publicPath: "https://github.com/TheFBplus/typed-data-parser/blob/master/docs/md/",
	theme: "default",
	excludeInternal: true,
	pretty: true,
	includeVersion: false,
	gitRemote: "https://github.com/TheFBplus/typed-data-parser",
};

module.exports = config;
