module.exports = {
	root: true,
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
	plugins: ["@typescript-eslint"],
	overrides: [],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: "latest"
	},
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	rules: {}
};
