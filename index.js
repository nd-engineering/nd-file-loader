var loaderUtils = require("loader-utils");
var path = require('path')

module.exports = function(content) {
	this.cacheable && this.cacheable();
	if(!this.emitFile) throw new Error("emitFile is required from module system");

	var query = loaderUtils.parseQuery(this.query);
	var configKey = query.config || "fileLoader";
	var options = this.options[configKey] || {};

	var config = {
		publicPath: false,
		name: "[hash].[ext]"
	};

	// options takes precedence over config
	Object.keys(options).forEach(function(attr) {
		config[attr] = options[attr];
	});

	// query takes precedence over config and options
	Object.keys(query).forEach(function(attr) {
		config[attr] = query[attr];
	});

	var url = loaderUtils.interpolateName(this, config.name, {
		context: config.context || this.options.context,
		// 使用项目里的相对路径
		content: config.usePath ? path.relative(process.cwd(), this.resourcePath) : content,
		regExp: config.regExp
	});
	// console.log(url);
	var publicPath = "__webpack_public_path__ + " + JSON.stringify(url);

	if (config.publicPath) {
		// support functions as publicPath to generate them dynamically
		publicPath = JSON.stringify(
				typeof config.publicPath === "function"
				 ? config.publicPath(url)
				 : config.publicPath + url
		);
	}

	if (query.emitFile === undefined || query.emitFile) {
		this.emitFile(url, content);
	}

	return "module.exports = " + publicPath + ";";
}
module.exports.raw = true;
