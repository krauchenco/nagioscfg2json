# cfg Nagios configuration file to json
## Example
### CFG File (localhost_nagios2.cfg)
```
define hostgroup {
        hostgroup_name       NagiosServer
        alias                NagiosServer
}

define servicegroup {
        servicegroup_name       InfraDigitalServerGroup
        alias                   InfraDigitalServer
}
define host {
        use                     generic-host
        host_name               localhost
        alias                   localhost
        address                 127.0.0.1
        hostgroups NagiosServer
}
define service{
        use                             generic-service
        host_name                       localhost
        service_description             Disk Space
        check_command                   check_all_disks!20%!10%
        servicegroups InfraDigitalServerGroup
        }

define command {
        command_name    check_ssl_exp
        command_line    /usr/lib/nagios/plugins/check_http -H $HOSTADDRESS$ -C $ARG1$
}
```
### Code to use this tool
```
var nagioscfg2json = require('nagioscfg2json');
nagioscfg2json.parse('localhost_nagios2.cfg', function (err, json){
    if (err) {
		console.log(err);
		return;
	}
	JSON.stringify(json, null, 4);
});
```
### Prints
```
{ hostgroup: [ { hostgroup_name: 'NagiosServer', alias: 'NagiosServer' } ],
  servicegroup:
   [ { servicegroup_name: 'InfraDigitalServerGroup',
       alias: 'InfraDigitalServer' } ],
  host:
   [ { use: 'generic-host',
       host_name: 'localhost',
       alias: 'localhost',
       address: '127.0.0.1',
       hostgroups: 'NagiosServer' } ],
  service:
   [ { use: 'generic-service',
       host_name: 'localhost',
       service_description: 'Disk Space',
       check_command: 'check_all_disks!20%!10%',
       servicegroups: 'InfraDigitalServerGroup' } ],
  command:
   [ { command_name: 'check_ssl_exp',
       command_line: '/usr/lib/nagios/plugins/check_http -H $HOSTADDRESS$ -C $ARG1$' } ] }
```

## Install
Use npm
```
nm install nagioscfg2json
```

## License MIT