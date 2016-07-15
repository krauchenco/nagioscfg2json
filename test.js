var nagioscfg2json = require('./nagioscfg2json');

nagioscfg2json.fromFile('./localhost_nagios2.cfg', function (err, json){
	if (err) {
		console.log(err);
		return;
	}
	json = JSON.stringify(json, null, 4);
  console.log(json);
});
