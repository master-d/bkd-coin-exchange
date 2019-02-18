var path = require('path');

module.exports = {
    entry: './src/main/resources/js/app.js',
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    	query: {
                    		presets: ['@babel/react'],
                    		plugins: [
                    			'@babel/plugin-syntax-dynamic-import',
                    			'@babel/plugin-syntax-import-meta',
                    			['@babel/plugin-proposal-class-properties', { "loose": false }],
                    			'@babel/plugin-proposal-json-strings'
                    		]
                    	}
                }]
            }
        ]
    }
};
/*
options: {
presets: ["@babel/preset-env", "@babel/preset-react"]
}
*/