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
nagioscfg2json.fromFile('localhost_nagios2.cfg', function (err, json){
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

## API

### parse(data, next)

- Parameters:
  - data: String of Nagios Object Configuration Text
  - next: callback called upon parsing completion

The callback will recieve following arguments:

 - cfg : a Javascript Plain Object containing parsed configuration data

### fromFile(filename,next)

Convenience Method opening and reading configuration from a file and then
turn it into a Plain Object.

- Parameters:
 - filename: File to read and subsequently parse
 - next: callback function passed internally to parse method

## Installation

Use npm
```
npm install nagioscfg2json
```

# License 

MIT
