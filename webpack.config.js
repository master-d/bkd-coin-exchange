var path = require('path');

module.exports = {
    entry: './src/main/resources/js/app.js',
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'target/frontend')
    },
    devServer: {
        contentBase: './src/main/resources/static',
        publicPath: '/target/frontend',
        port: 8090,
        hot: true,
        watchContentBase: true,
        proxy: {
            "/login": {
              target: "http://[::1]:8080", secure: false, changeOrigin: true
            },
            "/register": {
                target: "http://[::1]:8080", secure: false, changeOrigin: true
            },
            "/api/**": {
                target: "http://[::1]:8080", secure: false, changeOrigin: true
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            },
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
