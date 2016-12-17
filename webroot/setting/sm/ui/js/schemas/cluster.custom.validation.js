/*
 * Copyright (c) 2016 Juniper Networks, Inc. All rights reserved.
 */
define([
], function () {
    var validations = {
        "parameters.provision.openstack.amqp.use_ssl": function(val, attr, computed) {
            if ("false" === val) {
                return;
            }
            var openstackAMQP =
                getValueByJsonPath(computed, "parameters;provision;openstack;openstack_manage_amqp",
                                   null);
            if ((false === openstackAMQP) && ("true" === val)) {
                return "openstack manage amqp is set as false";
            }
        }
    }
    return validations;
});

