/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var config = {};

config.core_path = '/usr/src/contrail/contrail-web-core';

config.sm = {};
config.sm.server_ip = '127.0.0.1';
config.sm.server_port = 9001;

config.DFLT_SERVER_IP = '127.0.0.1';
config.SM_API_SERVER = 'sm_api_server'

// Export this as a module.
module.exports = config;