module.exports = {
	sourceDir: 'src',
	artifactsDir: 'build',

	run: {
		browserConsole: false,
		startUrl: ['https://www.familysearch.org/indexing/my-indexing']
	},

	build: {
		overwriteDest: true,
	},
};
