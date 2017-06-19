module.exports = function() {
	var build = './build/';
	var dist = './dist/';
	var src = './src/'; 

	var config = {
		build: ['./build/'],
		src: ['./dist/'],
		dist: ['./src/'],
		jadeSrc: ['./index.jade'],
		htmlSrc: ['./index.html'],
		cssSrc: ['./css/style.css'],
		jsSrc: ['./js/script.js'],
		sassSrc: ['./scss/**/*.scss'],
		imgSrc: ['./images/**/*.*'],
		bower: {
			json: require('./bower.json'),
			directory: './bower_components/',
			ignore_path: '../..'
		}
	};

	/*config.getDefaultWiredepOptions = function() {
		var options = {
			bower_json: config.bower.json,
			directory: config.bower.directory,
			ignore_path: config.bower.ignorePath
		};

		return options;
	};*/

	return config;
};