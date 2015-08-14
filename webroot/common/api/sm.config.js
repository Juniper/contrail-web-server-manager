/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var smConfig = {'sm': {}};

smConfig.sm.server_ip = '127.0.0.1';
smConfig.sm.server_port = 9001;

smConfig.sm.analytics_ip = '127.0.0.1';
smConfig.sm.analytics_port = 8081;

smConfig.sm.introspect_ip = '127.0.0.1';
smConfig.sm.introspect_port = 8106;

// Export this as a module.
module.exports = smConfig;