module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				extensions: [
					'.ios.js',
					'.android.js',
					'.ios.jsx',
					'.android.jsx',
					'.js',
					'.jsx',
					'.json',
					'.ts',
					'.d.ts',
					'.tsx',
				],
				root: ['.'],
				alias: {
					'@assets': './assets',
					'@src': './src',
					'@component': './src/components',
				},
			},
		],
	],
}
