const rollupVue = require('rollup-plugin-vue2');

module.exports = {
	input: './src/main.js',
	output: {
		js: '../script.js',
		css: '../style.css'
	},
	namespace: 'BX.NewsManager',
	plugins: {
		resolve: true,
		babel: false,
		custom: [
			rollupVue()
		],
	}
};