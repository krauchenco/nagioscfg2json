# Nagios Object Configuration to JSON Parser

Nagioscfg2json turns Nagios Object Configuration files into
Javascript Objects.

## Usage

Given a configuration-file `localhost_nagios2.cfg` such as: 

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

Our `app.js` may look like this:


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
Running our `app.js` from the commandline would result in the following output on STDOUT:

```shell
 $> node app.js
```

```javascript
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

This (though with a much larger output) also works on Nagios' objects.cache file.

## Installation

Use npm
```
nm install nagioscfg2json
```

# License 

MIT
