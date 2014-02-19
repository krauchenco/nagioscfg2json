var nagioscfg2json = require('./nagioscfg2json');
nagioscfg2json.parse('./localhost_nagios2.cfg', function (err, json){
	if (err) {
		console.log(err);
		return;
	}
	JSON.stringify(json, null, 4);
});
