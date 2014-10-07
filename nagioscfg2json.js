module.exports = function (){
	'use strict';

	String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};

	function fromFile (filename, next) {

		var fs = require('fs');
		fs.readFile(filename, function (err, data){
			if (err) {
				console.log(err);
				return;
			}
			parse(data,next);
		});
	};

       function parse (data,next) { 
	   
		var txt = data.toString();
	        var lines = txt.split('\n');
		var tag = '';
		var service = {};
		var cfg = {};

		lines.forEach(function (data, i) {
			var linetrim = lines[i].trim();
			if (linetrim.indexOf('#')==0) return;
			if (linetrim.length == 0) return;
			
			var ss = data.split(/\s+/g);
			if (ss.length > 0) {
				if (ss[0] === 'define') {
					// open tag
					tag = ss[1].replace(/{/g, '');
				} else if (ss.indexOf('}') >= 0){
					// close tag
					if (!eval('cfg.'+tag)) {
						eval('cfg.'+tag+' = [];');
					}
					eval('cfg.'+tag+'.push(service);');
					service = {};
					tag = null;

				} else {
					if (ss.length > 1) {
						if (tag) {
							var i1 = lines[i].indexOf(ss[1])+ss[1].length;
							eval('service.'+ss[1]+' = "'+lines[i].substr(i1, lines[i].length-i1).trim().replace(/"/g, '\\"').replace(/'/g, '\\\'')+'";');
						}
					}
				}
			}
		});
		next(cfg);
	};
    
	return {
	    parse: parse,
	    fromFile: fromFile
	}
}();
