/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var config = {'sm': {}};

//config.sm.server_ip = '10.204.216.51';
config.sm.server_ip = '10.84.17.1';
//config.sm.server_ip = '10.84.9.17';

//config.sm.server_port = 9001;
config.sm.server_port = 8081;

config.DFLT_SERVER_IP = '127.0.0.1';
config.DFLT_SERVER_PORT = '9001';
config.SM_API_SERVER = 'sm_api_server';

// Export this as a module.
module.exports = config;