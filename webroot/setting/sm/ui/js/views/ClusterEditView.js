/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'knockback'
], function (_, ContrailView, Knockback) {
    var prefixId = smwc.CLUSTER_PREFIX_ID,
        modalId = 'configure-' + prefixId,
        editTemplate = contrail.getTemplate4Id(cowc.TMPL_EDIT_FORM);

    var ClusterEditView = ContrailView.extend({
        modalElementId: '#' + modalId,
        renderConfigure: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this;

            cowu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                //var clusterForm = $('#' + modalId).find('#sm-cluster-edit-form').serializeObject();
                self.model.configure({
                    init: function () {
                        self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                        cowch.reset();
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                }); // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal('hide');
            }});

            self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), this.model, getConfigureViewConfig(), smwc.KEY_CONFIGURE_VALIDATION, null, null, function() {
                self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                Knockback.applyBindings(self.model, document.getElementById(modalId));
                kbValidation.bind(self);
            });
        },

        renderReimage: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this;

            cowu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                self.model.reimage({
                    init: function () {
                        self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                });
                // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal('hide');
            }});

            self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), this.model, reimageViewConfig, smwc.KEY_CONFIGURE_VALIDATION, null, null, function() {
                self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                Knockback.applyBindings(self.model, document.getElementById(modalId));
                kbValidation.bind(self);
            });
        },

        renderAddCluster: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this;

            cowu.createWizardModal({'modalId': modalId, 'className': 'modal-980', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                var wizardId = cowu.formatElementId([prefixId, smwl.TITLE_ADD_CLUSTER]),
                    wizardDataContrailWizard = $('#' + wizardId).data('contrailWizard'),
                    currentStepIndex = wizardDataContrailWizard.getCurrentIndex(),
                    stepsLength = wizardDataContrailWizard.getStepsLength();

                if(currentStepIndex == (stepsLength - 1)) {
                    wizardDataContrailWizard.finish();
                } else {
                    wizardDataContrailWizard.next();
                }
            }, 'onCancel': function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).find('.contrailWizard').data('contrailWizard').destroy();
                $("#" + modalId).modal('hide');
            }});

            self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), this.model, getAddClusterViewConfig(self.model, options['callback']), smwc.KEY_ADD_VALIDATION, null, null, function() {
                if (!contrail.checkIfKnockoutBindingExist(modalId)) {
                    self.model.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_CREATE_CONFIG]) + cowc.FORM_SUFFIX_ID, false);
                    self.model.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_ADD_SERVERS, smwl.TITLE_ADD_TO_CLUSTER]) + smwc.FORM_SUFFIX_ID, false);
                    self.model.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_ASSIGN_ROLES, smwl.TITLE_SELECT_SERVERS]) + smwc.FORM_SUFFIX_ID, false);
                    self.model.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_EDIT_CONFIG]) + cowc.FORM_SUFFIX_ID, false);
                    Knockback.applyBindings(self.model, document.getElementById(modalId));
                    kbValidation.bind(self);
                }
            });
        },

        renderProvision: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this;

            cowu.createModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                self.model.provision({
                    init: function () {
                        self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                }); // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal('hide');
            }});

            self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), this.model, provisionViewConfig, null, null, null, function() {
                self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                Knockback.applyBindings(self.model, document.getElementById(modalId));
                kbValidation.bind(self);
            });
        },

        renderAddServers: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this;

            cowu.createWizardModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                var wizardId = cowu.formatElementId([prefixId, smwl.TITLE_ADD_SERVERS]),
                    wizardDataContrailWizard = $('#' + wizardId).data('contrailWizard'),
                    currentStepIndex = wizardDataContrailWizard.getCurrentIndex(),
                    stepsLength = wizardDataContrailWizard.getStepsLength();

                if(currentStepIndex == (stepsLength - 1)) {
                    wizardDataContrailWizard.finish();
                } else {
                    wizardDataContrailWizard.next();
                }
            }, 'onCancel': function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal('hide');
            }});

            self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), this.model, getAddServerViewConfig(self.model, true, options['callback']), null, null, null, function() {
                if (!contrail.checkIfKnockoutBindingExist(modalId)) {
                    self.model.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_ADD_SERVERS, smwl.TITLE_ADD_TO_CLUSTER]) + cowc.FORM_SUFFIX_ID, false);
                    Knockback.applyBindings(self.model, document.getElementById(modalId));
                    kbValidation.bind(self);
                }
            });
        },

        renderRemoveServers: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this,
                callbackObj = {
                    init: function () {
                        self.model.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_REMOVE_SERVERS, smwl.TITLE_ADD_TO_CLUSTER]) + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                        cowch.reset();
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_REMOVE_SERVERS, smwl.TITLE_ADD_TO_CLUSTER]) + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                };

            cowu.createWizardModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                var wizardId = cowu.formatElementId([prefixId, smwl.TITLE_REMOVE_SERVERS]),
                    wizardDataContrailWizard = $('#' + wizardId).data('contrailWizard'),
                    currentStepIndex = wizardDataContrailWizard.getCurrentIndex(),
                    stepsLength = wizardDataContrailWizard.getStepsLength();

                if(currentStepIndex == (stepsLength - 1)) {
                    wizardDataContrailWizard.finish();
                } else {
                    wizardDataContrailWizard.next();
                }

            }, 'onCancel': function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal('hide');
            }});

            self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), this.model, getRemoveServerViewConfig(self.model, callbackObj), null, null, null, function() {
                if (!contrail.checkIfKnockoutBindingExist(modalId)) {
                    self.model.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_REMOVE_SERVERS, smwl.TITLE_ADD_TO_CLUSTER]) + cowc.FORM_SUFFIX_ID, false);
                    Knockback.applyBindings(self.model, document.getElementById(modalId));
                    kbValidation.bind(self);
                }
            });
        },

        renderAssignRoles: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this;

            cowu.createModal({'modalId': modalId, 'className': 'modal-980', 'title': options['title'], 'body': editLayout,
                'onSave': function () {
                    return saveAssignRoles(self.model, {
                        init: function () {
                            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                            cowu.enableModalLoading(modalId);
                        },
                        success: function () {
                            options['callback']();
                            $("#" + modalId).modal('hide');
                            cowch.reset();
                        },
                        error: function (error) {
                            cowu.disableModalLoading(modalId, function () {
                                self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, error.responseText);
                            });
                        }
                    }, function () {
                        $("#" + modalId).modal('hide');
                    });

                }, 'onCancel': function () {
                    Knockback.release(self.model, document.getElementById(modalId));
                    kbValidation.unbind(self);
                    $("#" + modalId).modal('hide');
                }
            });

            self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), this.model, getAssignRolesViewConfig(self.model), null, null, null, function() {
                self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                Knockback.applyBindings(self.model, document.getElementById(modalId));
                kbValidation.bind(self);
            });
        },

        renderDeleteCluster: function (options) {
            var textTemplate = contrail.getTemplate4Id("sm-delete-cluster-template"),
                elId = 'deleteCluster',
                self = this,
                checkedRows = options['checkedRows'],
                clustersToBeDeleted = {'clusterId': [], 'elementId': elId};
            clustersToBeDeleted['clusterId'].push(checkedRows['id']);
            cowu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'btnName': 'Confirm', 'body': textTemplate(clustersToBeDeleted), 'onSave': function () {
                self.model.deleteCluster(options['checkedRows'], {
                    init: function () {
                        self.model.showErrorAttr(elId, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(elId, error.responseText);
                        });
                    }
                });
            }, 'onCancel': function () {
                $("#" + modalId).modal('hide');
            }});

            this.model.showErrorAttr(elId, false);
            Knockback.applyBindings(this.model, document.getElementById(modalId));
            kbValidation.bind(this);
        },

        renderRunInventory: function (options) {
            var textTemplate = contrail.getTemplate4Id("sm-cluster-run-inventory-template"),
                elId = 'runInventoryCluster',
                self = this,
                checkedRows = options['checkedRows'],
                runInventoryClusters = {'clusterId': [], 'elementId': elId};
            runInventoryClusters['clusterId'].push(checkedRows['id']);

            cowu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'btnName': 'Confirm', 'body': textTemplate(runInventoryClusters), 'onSave': function () {
                self.model.runInventory(options['checkedRows'], {
                    init: function () {
                        self.model.showErrorAttr(elId, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(elId, error.responseText);
                        });
                    }
                });
            }, 'onCancel': function () {
                $("#" + modalId).modal('hide');
            }});

            this.model.showErrorAttr(elId, false);
            Knockback.applyBindings(this.model, document.getElementById(modalId));
            kbValidation.bind(this);
        },
    });

    var createClusterViewConfig = [{
        elementId: cowu.formatElementId([prefixId, smwl.TITLE_DETAILS]),
        title: smwl.TITLE_DETAILS,
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {
                            elementId: 'id', view: "FormInputView",
                            viewConfig: {path: 'id', dataBindValue: 'id', class: "span6"}
                        },
                        {
                            elementId: 'email', view: "FormInputView",
                            viewConfig: {path: 'email', dataBindValue: 'email', class: "span6"}
                        }
                    ]
                }
            ]
        }
    }];

    var configureClusterViewConfig = [
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_OPENSTACK]),
            title: smwl.TITLE_OPENSTACK,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: 'ip', view: "FormInputView",
                                viewConfig: {label: smwl.LABEL_KEYSTONE_IP, path: 'parameters.provision.openstack.keystone.ip', dataBindValue: 'parameters().provision.openstack.keystone.ip', class: "span6"}
                            },
                            {
                                elementId: 'admin_tenant', view: "FormInputView",
                                viewConfig: {label: smwl.LABEL_KEYSTONE_ADMIN_TENANT, path: 'parameters.provision.openstack.keystone.admin_tenant', dataBindValue: 'parameters().provision.openstack.keystone.admin_tenant', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'service_tenant', view: "FormInputView",
                                viewConfig: {label: smwl.LABEL_KEYSTONE_SERVICE_TENANT, path: 'parameters.provision.openstack.keystone.service_tenant', dataBindValue: 'parameters().provision.openstack.keystone.service_tenant', class: "span6"}
                            },
                            {
                                elementId: 'admin_user', view: "FormInputView",
                                viewConfig: {label: smwl.LABEL_KEYSTONE_ADMIN_USER, path: 'parameters.provision.openstack.keystone.admin_user', dataBindValue: 'parameters().provision.openstack.keystone.admin_user', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'keystone_region_name', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.openstack.keystone_region_name', dataBindValue: 'parameters().provision.openstack.keystone_region_name', class: "span6"}
                            },
                            {
                                elementId: 'admin_password', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.openstack.keystone.admin_password', type: 'password', dataBindValue: 'parameters().provision.openstack.keystone.admin_password', class: "span6"}
                            }

                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'enable_lbass', view: "FormDropdownView",
                                viewConfig: {path: 'parameters.provision.contrail.enable_lbass', dataBindValue: 'parameters().provision.contrail.enable_lbass', class: "span6", elementConfig: {dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}}
                            },
                            {
                                elementId: 'enable_ceilometer', view: "FormDropdownView",
                                viewConfig: {
                                    path: 'parameters.provision.openstack.enable_ceilometer', dataBindValue: 'parameters().provision.openstack.enable_ceilometer', class: "span6",
                                    elementConfig: { dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'openstack_manage_amqp', view: "FormDropdownView",
                                viewConfig: {path: 'parameters.provision.openstack.openstack_manage_amqp', dataBindValue: 'parameters().provision.openstack.openstack_manage_amqp', class: "span6", elementConfig: { dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}}
                            },
                            {
                                elementId: 'server_ip', view: "FormInputView",
                                viewConfig: {label: smwl.LABEL_AMQP_SERVER_IP, path: 'parameters.provision.openstack.amqp.server_ip', dataBindValue: 'parameters().provision.openstack.amqp.server_ip', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'keystone_auth_port', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.openstack.keystone_auth_port', dataBindValue: 'parameters().provision.openstack.keystone_auth_port', class: "span6"}
                            },
                            {
                                elementId: 'keystone_auth_protocol', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.openstack.keystone_auth_protocol', dataBindValue: 'parameters().provision.openstack.keystone_auth_protocol', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'port', view: "FormInputView",
                                viewConfig: {label: smwl.LABEL_NEUTRON_PORT, path: 'parameters.provision.openstack.neutron.port', dataBindValue: 'parameters().provision.openstack.neutron.port', class: "span6"}
                            },
                            {
                                elementId: 'service_protocol', view: "FormInputView",
                                viewConfig: {label: smwl.LABEL_NEUTRON_SERVICE_PROTOCOL, path: 'parameters.provision.openstack.neutron.service_protocol', dataBindValue: 'parameters().provision.openstack.neutron.service_protocol', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'root_password', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.openstack.mysql.root_password', type: 'password', dataBindValue: 'parameters().provision.openstack.mysql.root_password', class: "span6"}
                            },
                            {
                                elementId: 'manage_neutron', view: "FormDropdownView",
                                viewConfig: {path: 'parameters.provision.contrail.config.manage_neutron', dataBindValue: 'parameters().provision.contrail.config.manage_neutron', class: "span6", elementConfig: { dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}}
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_CONTRAIL_CONTROLLER]),
            title: smwl.TITLE_CONTRAIL_CONTROLLER,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: 'external_bgp', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.control.external_bgp', dataBindValue: 'parameters().provision.contrail.control.external_bgp', class: "span6"}
                            },
                            {
                                elementId: 'router_asn', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.control.router_asn', dataBindValue: 'parameters().provision.contrail.control.router_asn', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'huge_pages', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.compute.huge_pages', dataBindValue: 'parameters().provision.contrail.compute.huge_pages', class: "span6"}
                            },
                            {
                                elementId: 'core_mask', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.compute.core_mask', dataBindValue: 'parameters().provision.contrail.control.core_mask', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'encapsulation_priority', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.control.encapsulation_priority', dataBindValue: 'parameters().provision.contrail.control.encapsulation_priority', class: "span6"}
                            },
                            {
                                elementId: 'healthcheck_interval', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.config.healthcheck_interval', dataBindValue: 'parameters().provision.contrail.config.healthcheck_interval', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'zookeeper_ip_port', view: "FormInputView",
                                viewConfig: {label: smwl.LABEL_ZOOKEEPER_IP_PORT, path: 'parameters.provision.contrail.config.zookeeper_ip_port', dataBindValue: 'parameters().provision.contrail.config.zookeeper_ip_port', class: "span6"}
                            },
                            {
                                elementId: 'enable', view: "FormDropdownView",
                                viewConfig: {path: 'parameters.provision.contrail.compute.sriov.enable', dataBindValue: 'parameters().provision.contrail.compute.sriov.enable', class: "span6",
                                    elementConfig: {dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'multi_tenancy', view: "FormDropdownView",
                                viewConfig: {path: 'parameters.provision.openstack.multi_tenancy', dataBindValue: 'parameters().provision.openstack.multi_tenancy', class: "span6",
                                    elementConfig: { dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_HA_CONFIG]),
            title: smwl.TITLE_HA_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: 'haproxy_enable', view: "FormDropdownView",
                                viewConfig: {path: 'parameters.provision.contrail.ha.haproxy_enable', dataBindValue: 'parameters().provision.contrail.ha.haproxy_enable', class: "span6",
                                    label: smwl.LABEL_HA_PROXY_ENABLE,
                                    elementConfig: { dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'internal_vip', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.openstack.ha.internal_vip', dataBindValue: 'parameters().provision.openstack.ha.internal_vip', class: "span6"}
                            },
                            {
                                elementId: 'external_vip', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.openstack.ha.external_vip', dataBindValue: 'parameters().provision.openstack.ha.external_vip', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'contrail_internal_vip', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.ha.contrail_internal_vip', dataBindValue: 'parameters().provision.contrail.ha.contrail_internal_vip', class: "span6"}
                            },
                            {
                                elementId: 'contrail_external_vip', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.ha.contrail_external_vip', dataBindValue: 'parameters().provision.contrail.ha.contrail_external_vip', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'internal_virtual_router_id', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.openstack.ha.internal_virtual_router_id', dataBindValue: 'parameters().provision.openstack.ha.internal_virtual_router_id', class: "span6"}
                            },
                            {
                                elementId: 'external_virtual_router_id', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.openstack.ha.external_virtual_router_id', dataBindValue: 'parameters().provision.openstack.ha.external_virtual_router_id', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'contrail_external_virtual_router_id', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.ha.contrail_external_virtual_router_id', dataBindValue: 'parameters().provision.contrail.ha.contrail_external_virtual_router_id', class: "span6"}
                            },
                            {
                                elementId: 'contrail_internal_virtual_router_id', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.ha.contrail_internal_virtual_router_id', dataBindValue: 'parameters().provision.contrail.ha.contrail_internal_virtual_router_id', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'nfs_server', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.openstack.ha.nfs_server', dataBindValue: 'parameters().provision.openstack.ha.nfs_server', class: "span6"}
                            },
                            {
                                elementId: 'nfs_glance_path', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.openstack.ha.nfs_glance_path', dataBindValue: 'parameters().provision.openstack.ha.nfs_glance_path', class: "span6"}
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_ANALYTICS_CONFIG]),
            title: smwl.TITLE_ANALYTICS_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: 'syslog_port', view: "FormInputView",
                                viewConfig: {label: smwl.LABEL_ANALYTICS_SYSLOG_PORT, path: 'parameters.provision.contrail.analytics.syslog_port', dataBindValue: 'parameters().provision.contrail.analytics.syslog_port', class: "span6"}
                            },
                            {
                                elementId: 'topology_scan_frequency', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.analytics.topology_scan_frequency', dataBindValue: 'parameters().provision.contrail.analytics.topology_scan_frequency', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'snmp_scan_frequency', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.analytics.snmp_scan_frequency', dataBindValue: 'parameters().provision.contrail.analytics.snmp_scan_frequency', class: "span6"}
                            },
                            {
                                elementId: 'snmp_fast_scan_frequency', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.analytics.snmp_fast_scan_frequency', dataBindValue: 'parameters().provision.contrail.analytics.snmp_fast_scan_frequency', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'data_ttl', view: "FormInputView",
                                viewConfig: {label: smwl.LABEL_ANALYTICS_DATA_TTL, path: 'parameters.provision.contrail.analytics.data_ttl', dataBindValue: 'parameters().provision.contrail.analytics.data_ttl', class: "span6"}
                            },
                            {
                                elementId: 'flow_ttl', view: "FormInputView",
                                viewConfig: {label: smwl.LABEL_ANALYTICS_FLOW_TTL, path: 'parameters.provision.contrail.analytics.flow_ttl', dataBindValue: 'parameters().provision.contrail.analytics.flow_ttl', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'config_audit_ttl', view: "FormInputView",
                                viewConfig: {label: smwl.LABEL_ANALYTICS_CONFIG_AUDIT_TTL, path: 'parameters.provision.contrail.analytics.config_audit_ttl', dataBindValue: 'parameters().provision.contrail.analytics.config_audit_ttl', class: "span6"}
                            },
                            {
                                elementId: 'statistics_ttl', view: "FormInputView",
                                viewConfig: {label: smwl.LABEL_ANALYTICS_STATISTICS_TTL, path: 'parameters.provision.contrail.analytics.statistics_ttl', dataBindValue: 'parameters().provision.contrail.analytics.statistics_ttl', class: "span6"}
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_DATABASE]),
            title: smwl.TITLE_DATABASE,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: 'ip_port', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.database.ip_port', dataBindValue: 'parameters().provision.contrail.database.ip_port', class: "span6"}
                            },
                            {
                                elementId: 'directory', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.database.directory', dataBindValue: 'parameters().provision.contrail.database.directory', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'data_directory', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.analytics.data_directory', dataBindValue: 'parameters().provision.contrail.analytics.data_directory', class: "span6"}
                            },
                            {
                                elementId: 'ssd_data_directory', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.analytics.ssd_data_directory', dataBindValue: 'parameters().provision.contrail.analytics.ssd_data_directory', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'minimum_diskGB', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.database.minimum_diskGB', dataBindValue: 'parameters().provision.contrail.database.minimum_diskGB', class: "span6"}
                            },
                            {
                                elementId: 'redis_password', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.analytics.redis_password', type: 'password', dataBindValue: 'parameters().provision.contrail.analytics.redis_password', class: "span6"}
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_VMWARE]),
            title: smwl.TITLE_VMWARE,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: 'ip', view: "FormInputView",
                                viewConfig: {label:smwl.LABEL_VMWARE_IP, path: 'parameters.provision.contrail.vmware.ip', dataBindValue: 'parameters().provision.contrail.vmware.ip', class: "span6"}
                            },
                            {
                                elementId: 'vswitch', view: "FormInputView",
                                viewConfig: {label:smwl.LABEL_VMWARE_VSWITCH, path: 'parameters.provision.contrail.vmware.vswitch', dataBindValue: 'parameters().provision.contrail.vmware.vswitch', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'username', view: "FormInputView",
                                viewConfig: {label:smwl.LABEL_VMWARE_USERNAME, path: 'parameters.provision.contrail.vmware.username', dataBindValue: 'parameters().provision.contrail.vmware.username', class: "span6"}
                            },
                            {
                                elementId: 'password', view: "FormInputView",
                                viewConfig: {label:smwl.LABEL_VMWARE_PASSWORD, path: 'parameters.provision.contrail.vmware.password', type: 'password', dataBindValue: 'parameters().provision.contrail.vmware.password', class: "span6"}
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_VIRTUAL_GATEWAY]),
            title: smwl.TITLE_VIRTUAL_GATEWAY,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: 'public_subnet', view: "FormInputView",
                                viewConfig: {label:smwl.LABEL_VGW_PUBLIC_SUBNET, path: 'parameters.provision.contrail.vgw.public_subnet', dataBindValue: 'parameters().provision.contrail.vgw.public_subnet', class: "span6"}
                            },
                            {
                                elementId: 'public_vn_name', view: "FormInputView",
                                viewConfig: {label:smwl.LABEL_VGW_PUBLIC_VN_NAME, path: 'parameters.provision.contrail.vgw.public_vn_name', dataBindValue: 'parameters().provision.contrail.vgw.public_vn_name', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'interface', view: "FormInputView",
                                viewConfig: {label:smwl.LABEL_VGW_INTERFACE, path: 'parameters.provision.contrail.vgw.interface', dataBindValue: 'parameters().provision.contrail.vgw.interface', class: "span6"}
                            },
                            {
                                elementId: 'gateway_routes', view: "FormInputView",
                                viewConfig: {label:smwl.LABEL_VGW_GATEWAY_ROUTES, path: 'parameters.provision.contrail.vgw.gateway_routes', dataBindValue: 'parameters().provision.contrail.vgw.gateway_routes', class: "span6"}
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_CONTRAIL_STORAGE]),
            title: smwl.TITLE_CONTRAIL_STORAGE,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: 'storage_monitor_secret', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.storage.storage_monitor_secret', dataBindValue: 'parameters().provision.contrail.storage.storage_monitor_secret', class: "span6"}
                            },
                            {
                                elementId: 'osd_bootstrap_key', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.storage.osd_bootstrap_key', dataBindValue: 'parameters().provision.contrail.storage.osd_bootstrap_key', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {elementId: 'storage_admin_key', view: "FormInputView", viewConfig: {path: 'parameters.provision.contrail.storage.storage_admin_key', dataBindValue: 'parameters().provision.contrail.storage.storage_admin_key', class: "span6"}},
                            {
                                elementId: 'live_migration_storage_scope', view: "FormDropdownView",
                                viewConfig: {path: 'parameters.provision.contrail.storage.live_migration_storage_scope', dataBindValue: 'parameters().provision.contrail.storage.live_migration_storage_scope', class: "span6", elementConfig: {placeholder: smwl.TITLE_SELECT, dataTextField: "text", dataValueField: "id", data: smwc.STORAGE_SCOPE}}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'live_migration_ip', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.storage.live_migration_ip', dataBindValue: 'parameters().provision.contrail.storage.live_migration_ip', class: "span6"}
                            },
                            {
                                elementId: 'live_migration_host', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.storage.live_migration_host', dataBindValue: 'parameters().provision.contrail.storage.live_migration_host', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'storage_num_osd', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.storage.storage_num_osd', dataBindValue: 'parameters().provision.contrail.storage.storage_num_osd', class: "span6"}
                            },
                            {
                                elementId: 'storage_fsid', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.storage.storage_fsid', dataBindValue: 'parameters().provision.contrail.storage.storage_fsid', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'storage_num_hosts', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.storage.storage_num_hosts', dataBindValue: 'parameters().provision.contrail.storage.storage_num_hosts', class: "span6"}
                            },
                            {
                                elementId: 'storage_enabled',
                                view: 'FormDropdownView',
                                viewConfig: {
                                    path: 'parameters.provision.contrail.storage.storage_enabled',
                                    dataBindValue: 'parameters().provision.contrail.storage.storage_enabled',
                                    class: "span6",
                                    elementConfig: {dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'storage_virsh_uuid', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.storage.storage_virsh_uuid', dataBindValue: 'parameters().provision.contrail.storage.storage_virsh_uuid', class: "span6"}
                            },
                            {
                                elementId: 'storage_cluster_network', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.storage.storage_cluster_network', dataBindValue: 'parameters().provision.contrail.storage.storage_cluster_network', class: "span6"}
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_SERVERS_CONFIG]),
            title: smwl.TITLE_SERVERS_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: 'domain', view: "FormInputView",
                                viewConfig: {path: 'parameters.domain', dataBindValue: 'parameters().domain', class: "span6"}
                            },
                            {
                                elementId: 'password', view: "FormInputView",
                                viewConfig: {path: 'parameters.password', type: 'password', dataBindValue: 'parameters().password', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'subnet_mask', view: "FormInputView",
                                viewConfig: {path: 'parameters.subnet_mask', dataBindValue: 'parameters().subnet_mask', class: "span6"}
                            },
                            {
                                elementId: 'gateway', view: "FormInputView",
                                viewConfig: {path: 'parameters.gateway', dataBindValue: 'parameters().gateway', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'base_image_id',
                                view: "FormDropdownView",
                                viewConfig: {path: 'base_image_id', class: "span6", dataBindValue: 'base_image_id', elementConfig: {placeholder: smwl.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInImages')}}}
                            },
                            {
                                elementId: 'package_image_id',
                                view: "FormDropdownView",
                                viewConfig: {path: 'package_image_id', class: "span6", dataBindValue: 'package_image_id', elementConfig: {placeholder: smwl.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInPackages')}}}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'kernel_upgrade',
                                view: 'FormDropdownView',
                                viewConfig: {
                                    path: 'parameters.provision.contrail.kernel_upgrade',
                                    dataBindValue: 'parameters().provision.contrail.kernel_upgrade',
                                    class: "span6",
                                    elementConfig: {dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}
                                }
                            },
                            {
                                elementId: 'kernel_version', view: "FormInputView",
                                viewConfig: {path: 'parameters.provision.contrail.kernel_version', dataBindValue: 'parameters().provision.contrail.kernel_version', class: "span6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'xmpp_auth_enable',
                                view: 'FormDropdownView',
                                viewConfig: {
                                    path: 'parameters.provision.contrail.xmpp_auth_enable',
                                    dataBindValue: 'parameters().provision.contrail.xmpp_auth_enable',
                                    class: "span6",
                                    elementConfig: {dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}
                                }
                            },
                            {
                                elementId: 'xmpp_dns_auth_enable',
                                view: 'FormDropdownView',
                                viewConfig: {
                                    path: 'parameters.provision.contrail.xmpp_dns_auth_enable',
                                    dataBindValue: 'parameters().provision.contrail.xmpp_dns_auth_enable',
                                    class: "span6",
                                    elementConfig: {dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}
                                }
                            }
                        ]
                    }
                ]
            }
        }
    ];

    function getConfigureViewConfig() {
        var viewConfig = []
        viewConfig = viewConfig.concat(createClusterViewConfig);
        viewConfig = viewConfig.concat(configureClusterViewConfig);
        viewConfig[0].viewConfig.rows[0].columns[0].viewConfig.disabled = true;
        return {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_EDIT_CONFIG]),
            view: "AccordianView",
            viewConfig: viewConfig
        }
    }


    var reimageViewConfig = {
        elementId: prefixId,
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {
                            elementId: 'base_image_id',
                            view: "FormDropdownView",
                            viewConfig: {path: 'base_image_id', dataBindValue: 'base_image_id', class: "span6", elementConfig: {placeholder: smwl.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInImages')}}}
                        }
                    ]
                }
            ]
        }
    };

    function getAddServerViewConfig(clusterModel, modalHideFlag, callback) {
        var gridPrefix = 'add-server',
            url = 'filterInNull=cluster_id',
            addServerViewConfig = {
            elementId:  cowu.formatElementId([prefixId, smwl.TITLE_ADD_SERVERS]),
            view: "WizardView",
            viewConfig: {
                steps: [
                    {
                        elementId:  cowu.formatElementId([prefixId, smwl.TITLE_ADD_SERVERS, smwl.TITLE_SELECT_SERVERS]),
                        title: smwl.TITLE_SELECT_SERVERS,
                        view: "SectionView",
                        viewConfig: {
                            rows: [
                                {
                                    columns: [
                                        {
                                            elementId: 'add-server-filtered-servers',
                                            view: "GridView",
                                            viewConfig: {
                                                elementConfig: getSelectedServerGridElementConfig(gridPrefix, url)
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        stepType: 'step',
                        onInitRender: true,
                        buttons: {
                            previous: {
                                visible: false
                            }
                        },
                        onLoadFromNext: function (params) { 
                            onLoadFilteredServers(gridPrefix, params);
                            $('#add-server-filtered-servers').parents('section').find('.stepInfo').show();
                        },
                        onLoadFromPrevious: function (params) {
                            onLoadFilteredServers(gridPrefix, params);
                            $('#add-server-filtered-servers').parents('section').find('.stepInfo').show();
                        },
                        onNext: function(params) {
                            var checkedRows =  $('#add-server-filtered-servers').data('contrailGrid').getCheckedRows();
                            return updateSelectedServer(gridPrefix, 'add', checkedRows);
                        }
                    },
                    {
                        elementId:  cowu.formatElementId([prefixId, smwl.TITLE_ADD_SERVERS, smwl.TITLE_ADD_TO_CLUSTER]),
                        title: smwl.TITLE_ADD_TO_CLUSTER,
                        view: "SectionView",
                        viewConfig: {
                            rows: [
                                {
                                    columns: [
                                        {
                                            elementId: 'add-server-confirm-servers',
                                            view: "GridView",
                                            viewConfig: {
                                                path: 'id',
                                                class: "span12",
                                                elementConfig: getConfirmServerGridElementConfig(gridPrefix)
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        stepType: 'step',
                        onInitRender: false,
                        onLoadFromNext: function(params) {
                            $('#add-server-confirm-servers').data('contrailGrid')._dataView.setData($('#add-server-filtered-servers').data('serverData').selectedServers);
                            clusterModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_ADD_SERVERS, smwl.TITLE_ADD_TO_CLUSTER]) + cowc.FORM_SUFFIX_ID, false);

                        },
                        onNext: function(params) {
                            var currentSelectedServers = $('#add-server-confirm-servers').data('contrailGrid')._dataView.getItems();
                            var callbackObj = {
                                init: function () {
                                    clusterModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_ADD_SERVERS, smwl.TITLE_ADD_TO_CLUSTER]) + cowc.FORM_SUFFIX_ID, false);
                                    cowu.enableModalLoading(modalId);
                                },
                                success: function () {
                                    cowu.disableModalLoading(modalId, function () {
                                        callback();
                                        if (modalHideFlag) {
                                            $("#" + modalId).modal('hide');
                                        }
                                    });
                                },
                                error: function (error) {
                                    cowu.disableModalLoading(modalId, function () {
                                        clusterModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_ADD_SERVERS, smwl.TITLE_ADD_TO_CLUSTER]) + cowc.FORM_SUFFIX_ID, error.responseText);
                                    });
                                }
                            };
                            return params.model.addServer(currentSelectedServers, callbackObj);
                        }
                    }
                ]
            }
        };

        return addServerViewConfig;
    }

    function getRemoveServerViewConfig(clusterModel, callbackObj) {
        var gridPrefix = 'remove-server',
            url = 'cluster_id=' + clusterModel.model().attributes.id,
            removeServerViewConfig = {
            elementId:  cowu.formatElementId([prefixId, smwl.TITLE_REMOVE_SERVERS]),
            view: "WizardView",
            viewConfig: {
                steps: [
                    {
                        elementId:  cowu.formatElementId([prefixId, smwl.TITLE_REMOVE_SERVERS, smwl.TITLE_SELECT_SERVERS]),
                        title: smwl.TITLE_SELECT_SERVERS,
                        view: "SectionView",
                        viewConfig: {
                            rows: [
                                {
                                    columns: [
                                        {
                                            elementId: gridPrefix + '-filtered-servers',
                                            view: "GridView",
                                            viewConfig: {
                                                path: 'id',
                                                class: "span12",
                                                elementConfig: getSelectedServerGridElementConfig(gridPrefix, url)
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        stepType: 'step',
                        onInitRender: true,
                        buttons: {
                            previous: {
                                visible: false
                            }
                        },
                        onLoadFromNext: function (params) {
                            onLoadFilteredServers(gridPrefix, params);
                            $('#remove-server-filtered-servers').parents('section').find('.stepInfo').show();
                        },
                        onLoadFromPrevious: function (params) {
                            onLoadFilteredServers(gridPrefix, params);
                            $('#remove-server-filtered-servers').parents('section').find('.stepInfo').show();
                        },
                        onNext: function(params) {
                            var checkedRows =  $('#remove-server-filtered-servers').data('contrailGrid').getCheckedRows();
                            return updateSelectedServer(gridPrefix, 'add', checkedRows);
                        }
                    },
                    {
                        elementId:  cowu.formatElementId([prefixId, smwl.TITLE_REMOVE_SERVERS, smwl.TITLE_ADD_TO_CLUSTER]),
                        title: smwl.TITLE_REMOVE_FROM_CLUSTER,
                        view: "SectionView",
                        viewConfig: {
                            rows: [
                                {
                                    columns: [
                                        {
                                            elementId: 'remove-server-confirm-servers',
                                            view: "GridView",
                                            viewConfig: {
                                                path: 'id',
                                                class: "span12",
                                                elementConfig: getConfirmServerGridElementConfig(gridPrefix)
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        stepType: 'step',
                        onInitRender: false,
                        onLoadFromNext: function(params) {
                            $('#remove-server-confirm-servers').data('contrailGrid')._dataView.setData($('#remove-server-filtered-servers').data('serverData').selectedServers);
                            clusterModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_REMOVE_SERVERS, smwl.TITLE_ADD_TO_CLUSTER]) + cowc.FORM_SUFFIX_ID, false);
                        },
                        onNext: function(params) {
                            var currentSelectedServers = $('#remove-server-confirm-servers').data('contrailGrid')._dataView.getItems();
                            return params.model.removeServer(currentSelectedServers, callbackObj);

                        }
                    }
                ]
            }
        };

        return removeServerViewConfig;
    }

    function getAssignRolesViewConfig(clusterModel) {
        var clusterModelAttrs = clusterModel.model().attributes,
            assignRolesViewConfig = {
                elementId:  cowu.formatElementId([prefixId, smwl.TITLE_ASSIGN_ROLES, smwl.TITLE_SELECT_SERVERS]),
                title: smwl.TITLE_SELECT_SERVERS,
                view: "SectionView",
                viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: 'assign-roles-filtered-servers',
                                view: "GridView",
                                viewConfig: {
                                    path: 'id',
                                    class: "span12",
                                    elementConfig: getAssignRolesSelectedServerGridElementConfig(clusterModelAttrs)
                                }
                            }
                        ]
                    }
                ]
            }
        };

        return assignRolesViewConfig;
    }

    function saveAssignRoles(clusterModel, callbackObj, noChangeCallback) {
        if(contrail.checkIfExist($('#assign-roles-filtered-servers').data('serverData'))) {
            var selectedServers = [],
                selectedServerIds = $('#assign-roles-filtered-servers').data('serverData').selectedServers;

            $.each(selectedServerIds, function (selectedServerIdKey, selectedServerIdValue) {
                var selectedServer = $('#assign-roles-filtered-servers').data('contrailGrid')._dataView.getItemById(selectedServerIdValue);
                selectedServers.push(selectedServer)
            });

            return clusterModel.assignRoles(selectedServers, callbackObj);
        } else {
            noChangeCallback();
            return true;
        }
    }

    function getSelectedServerGridElementConfig(gridPrefix, urlParam) {
        var filteredServerGrid = '#' + gridPrefix + '-filtered-servers',
            gridElementConfig = {
                header: {
                    title: {
                        text: smwl.TITLE_SELECT_SERVERS
                    },
                    defaultControls: {
                        refreshable: true
                    },
                    advanceControls: [
                        {
                            "type": "link",
                            "title": 'Select Servers',
                            "iconClass": "icon-plus",
                            "onClick": function () {
                                var checkedRows = $(filteredServerGrid).data('contrailGrid').getCheckedRows();
                                updateSelectedServer(gridPrefix, 'add', checkedRows);
                            }
                        }, {
                            type: 'checked-multiselect',
                            iconClass: 'icon-filter',
                            title: 'Filter Servers',
                            placeholder: 'Filter Servers',
                            elementConfig: {
                                elementId: 'tagsCheckedMultiselect',
                                dataTextField: 'text',
                                dataValueField: 'id',
                                filterConfig: {
                                    placeholder: 'Search Tags'
                                },
                                parse: formatData4Ajax,
                                minWidth: 200,
                                height: 250,
                                emptyOptionText: smwm.NO_TAGS_FOUND,
                                dataSource: {
                                    type: 'GET',
                                    url: smwu.getTagsUrl('')
                                },
                                click: function(event, ui){
                                    applyServerTagFilter(filteredServerGrid, event, ui)
                                },
                                optgrouptoggle: function(event, ui){
                                    applyServerTagFilter(filteredServerGrid, event, ui)
                                },
                                control: false
                            }
                        }
                    ]

                },
                columnHeader: {
                    columns: smwgc.EDIT_SERVERS_ROLES_COLUMNS
                },
                body: {
                    options: {
                        actionCell: {
                            type: 'link',
                            iconClass: 'icon-plus',
                            onclick: function(e, args) {
                                var selectedRow = $(filteredServerGrid).data('contrailGrid')._dataView.getItem(args.row);
                                updateSelectedServer(gridPrefix, 'add', [selectedRow]);
                            }
                        }
                    },
                    dataSource: {
                        remote: {
                            ajaxConfig: {
                                url: smwu.getObjectDetailUrl(smwc.SERVER_PREFIX_ID) + '?' + urlParam
                            }
                        }
                    },
                    statusMessages: {
                        empty: {
                            type: 'status',
                            iconClasses: '',
                            text: smwm.NO_SERVERS_2_SELECT
                        }
                    }
                }
            };
        return gridElementConfig;
    }

    function getAssignRolesSelectedServerGridElementConfig(modelAttrs) {
        var gridPrefix = 'assign-roles',
            filteredServerGrid = '#' + gridPrefix + '-filtered-servers',
            urlParam = 'cluster_id=' + modelAttrs.id,
            gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_SELECT_SERVERS
                },
                defaultControls: {
                    refreshable: true
                },
                advanceControls: [
                    {
                        type: 'checked-multiselect',
                        iconClass: 'icon-filter',
                        title: 'Filter Servers',
                        placeholder: 'Filter Servers',
                        elementConfig: {
                            elementId: 'tagsCheckedMultiselect',
                            dataTextField: 'text',
                            dataValueField: 'id',
                            noneSelectedText: smwl.FILTER_TAGS,
                            selectedText: '# Tags Selected',
                            filterConfig: {
                                placeholder: smwl.SEARCH_TAGS
                            },
                            parse: formatData4Ajax,
                            minWidth: 150,
                            height: 200,
                            emptyOptionText: smwm.NO_TAGS_FOUND,
                            selectedList: 2,
                            dataSource: {
                                type: 'GET',
                                url: smwu.getTagsUrl('')
                            },
                            click: function(event, ui){
                                applyServerTagFilter(filteredServerGrid, event, ui)
                            },
                            optgrouptoggle: function(event, ui){
                                applyServerTagFilter(filteredServerGrid, event, ui)
                            },
                            control: false
                        }
                    },
                    {
                        actionId: 'rolesCheckedMultiselectAction',
                        type: 'checked-multiselect',
                        iconClass: 'icon-check',
                        placeholder: 'Assign Roles',
                        title: 'Assign Roles',
                        disabledLink: true,
                        elementConfig: {
                            elementId: 'rolesCheckedMultiselect',
                            dataTextField: 'text',
                            dataValueField: 'id',
                            noneSelectedText: smwl.SELECT_ROLES,
                            selectedText: '# Roles Selected',
                            filterConfig: {
                                placeholder: smwl.SEARCH_ROLES
                            },
                            minWidth: 150,
                            height: 350,
                            selectedList: 2,
                            data: [
                                {
                                    id: 'roles',
                                    text: 'Roles',
                                    children: smwc.ROLES_OBJECTS
                                }
                            ],
                            tristate: true,
                            open: function(event, ui){
                                var checkedServers = $(filteredServerGrid).data('contrailGrid').getCheckedRows();

                                var checkedRoleCountObj = {},
                                    checkedRoleStateArray = [],
                                    serverCount = checkedServers.length;

                                $.each(smwc.ROLES_ARRAY, function(roleKey, roleValue) {
                                    checkedRoleCountObj[roleValue] = 0;
                                });

                                $.each(checkedServers, function(serverKey, serverValue) {
                                    $.each(serverValue.roles, function(serverRoleKey, serverRoleValue) {
                                        checkedRoleCountObj[serverRoleValue]++;
                                    });
                                });

                                $.each(checkedRoleCountObj, function(roleKey, roleValue) {
                                    var roleState = (roleValue == 0) ? false : ((roleValue == serverCount) ? true : null);
                                    checkedRoleStateArray.push(roleState);
                                });

                                $('#rolesCheckedMultiselectAction').find('.input-icon').data('contrailCheckedMultiselect').setCheckedState(checkedRoleStateArray);

                            },
                            control: [
                                {
                                    label: 'Apply',
                                    cssClass: 'btn-primary',
                                    click: function (self, checkedRows) {
                                        var checkedServers = $(filteredServerGrid).data('contrailGrid').getCheckedRows(),
                                            checkedRoles = checkedRows;

                                        $.each(checkedServers, function (checkedServerKey, checkedServerValue) {
                                            $.each(checkedRoles, function (checkedRoleKey, checkedRoleValue) {
                                                if($.isEmptyObject(checkedServerValue.roles)) {
                                                    checkedServerValue.roles = [];
                                                }
                                                var checkedRoleValueObj = $.parseJSON(unescape($(checkedRoleValue).val())),
                                                    checkedRoleIndex = checkedServerValue.roles.indexOf(checkedRoleValueObj.value),
                                                    serverRoleDirty = false;


                                                if ($(checkedRoleValue).is(':checked') && checkedRoleIndex == -1) {
                                                    checkedServerValue.roles.push(checkedRoleValueObj.value);
                                                    serverRoleDirty = true;
                                                } else if (!$(checkedRoleValue).is(':checked') && checkedRoleIndex != -1) {
                                                    checkedServerValue.roles.splice(checkedRoleIndex, 1);
                                                    serverRoleDirty = true;
                                                }

                                                if (serverRoleDirty) {
                                                    if (!contrail.checkIfExist($(filteredServerGrid).data('serverData'))) {
                                                        $(filteredServerGrid).data('serverData', {
                                                            selectedServers: [checkedServerValue.cgrid]
                                                        });
                                                    } else {
                                                        if ($(filteredServerGrid).data('serverData').selectedServers.indexOf(checkedServerValue.cgrid) == -1) {
                                                            $(filteredServerGrid).data('serverData').selectedServers.push(checkedServerValue.cgrid);
                                                        }
                                                    }

                                                }
                                            })
                                        });

                                        $(filteredServerGrid).data('contrailGrid')._dataView.updateData(checkedServers);
                                        $('#rolesCheckedMultiselectAction').find('.input-icon').data('contrailCheckedMultiselect').setCheckedState(null);
                                        disableRolesCheckedMultiselect(true);
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            columnHeader: {
                columns: smwgc.EDIT_SERVERS_ROLES_COLUMNS.concat(smwgc.getGridColumns4Roles())
            },
            body: {
                options: {
                    actionCell: [],
                    checkboxSelectable: {
                        onNothingChecked: function (e) {
                            disableRolesCheckedMultiselect(true);
                        },
                        onSomethingChecked: function (e) {
                            disableRolesCheckedMultiselect(false);
                        }
                    }
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwu.getObjectDetailUrl(smwc.SERVER_PREFIX_ID) + '?' + urlParam
                        }
                    }
                },
                statusMessages: {
                    empty: {
                        type: 'status',
                        iconClasses: '',
                        text: smwm.NO_SERVERS_2_SELECT
                    }
                }
            }
        };

        return gridElementConfig;
    }

    function disableRolesCheckedMultiselect(flag) {
        if(flag){
            $('#rolesCheckedMultiselectAction').find('.icon-check').addClass('disabled-link');
            $('#rolesCheckedMultiselectAction').find('.input-icon').data('contrailCheckedMultiselect').disable();
        } else {
            $('#rolesCheckedMultiselectAction').find('.icon-check').removeClass('disabled-link');
            $('#rolesCheckedMultiselectAction').find('.input-icon').data('contrailCheckedMultiselect').enable();
        }
    }

    function getConfirmServerGridElementConfig(gridPrefix) {
        var confirmServerGrid = '#' + gridPrefix + '-confirm-servers';
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_SELECTED_SERVERS
                },
                defaultControls: {
                    exportable: false,
                    refreshable: true,
                    searchable: true
                }
            },
            columnHeader: {
                columns: smwgc.EDIT_SERVERS_ROLES_COLUMNS
            },
            body: {
                options: {
                    checkboxSelectable: false,
                    datail: false,
                    actionCell: {
                        type: 'link',
                        iconClass: 'icon-minus',
                        onclick: function(e, args) {
                            var selectedRow = $(confirmServerGrid).data('contrailGrid')._dataView.getItem(args.row);
                            updateSelectedServer(gridPrefix, 'remove', [selectedRow]);
                        }
                    }
                },
                dataSource: {
                    data: []
                },
                statusMessages: {
                    empty: {
                        type: 'status',
                        iconClasses: '',
                        text: smwm.NO_SERVERS_SELECTED
                    }
                }
            },
            footer: {
                pager: {
                    options: {
                        pageSize: 5,
                        pageSizeSelect: [5, 10, 50]
                    }

                }
            }
        };

        return gridElementConfig;
    }

    function formatData4Ajax(response) {
        var filterServerData = [];
        $.each(response, function (key, value) {
            var childrenData = [],
                children = value;
            $.each(children, function (k, v) {
                childrenData.push({'id': v, 'text': v});
            });
            filterServerData.push({'id': key, 'text': smwl.get(key), children: childrenData});
        });
        return filterServerData;
    };

    function applyServerTagFilter(filteredServerGrid, event, ui) {
        var checkedRows = $('#tagsCheckedMultiselect').data('contrailCheckedMultiselect').getChecked();
        $(filteredServerGrid).data('contrailGrid')._dataView.setFilterArgs({
            checkedRows: checkedRows
        });
        $(filteredServerGrid).data('contrailGrid')._dataView.setFilter(serverTagGridFilter);
    };

    /*
     ServerFilter: OR within the category , AND across the category
     */
    function serverTagGridFilter(item, args) {
        if (args.checkedRows.length == 0) {
            return true;
        } else {
            var returnObj = {},
                returnFlag = true;
            $.each(args.checkedRows, function (checkedRowKey, checkedRowValue) {
                var checkedRowValueObj = $.parseJSON(unescape($(checkedRowValue).val()));
                if(!contrail.checkIfExist(returnObj[checkedRowValueObj.parent])){
                    returnObj[checkedRowValueObj.parent] = false;
                }
                returnObj[checkedRowValueObj.parent] = returnObj[checkedRowValueObj.parent] || (item.tag[checkedRowValueObj.parent] == checkedRowValueObj.value);
            });

            $.each(returnObj, function(returnObjKey, returnObjValue) {
                returnFlag = returnFlag && returnObjValue;
            });

            return returnFlag;
        }
    };

    function onLoadFilteredServers(gridPrefix, params) {
        var filteredServerGridElement = $('#' + gridPrefix + '-filtered-servers');
        filteredServerGridElement.data('contrailGrid').refreshView();

        if(!contrail.checkIfExist(filteredServerGridElement.data('serverData'))){
            filteredServerGridElement.data('serverData', {
                selectedServers: [],
                serverIds: []
            });
        }
        else {

        }
    }

    function updateSelectedServer(gridPrefix, method, serverList){
        var filteredServerGridElement = $('#' + gridPrefix + '-filtered-servers'),
            confirmServerGridElement = $('#' + gridPrefix + '-confirm-servers'),
            currentSelectedServer = filteredServerGridElement.data('serverData').selectedServers,
            serverIds = filteredServerGridElement.data('serverData').serverIds;

        if(method == 'add') {
            var cgrids = [];
            currentSelectedServer = currentSelectedServer.concat(serverList);
            filteredServerGridElement.data('serverData').selectedServers = currentSelectedServer;

            $.each(serverList, function(serverListKey, serverListValue){
                cgrids.push(serverListValue.cgrid);
                serverIds.push(serverListValue.id);
            });
            filteredServerGridElement.data('contrailGrid')._dataView.deleteDataByIds(cgrids);
        }
        else if(method == 'remove') {
            var cgrids = [];

            $.each(serverList, function(serverListKey, serverListValue){
                cgrids.push(serverListValue.cgrid);
                serverIds.splice(serverIds.indexOf(serverListValue.id), 1 );
            });
            confirmServerGridElement.data('contrailGrid')._dataView.deleteDataByIds(cgrids);
            filteredServerGridElement.data('contrailGrid')._dataView.addData(serverList);
        }

        filteredServerGridElement.data('serverData').serverIds = serverIds;
        filteredServerGridElement.data('serverData').selectedServers = currentSelectedServer;
        filteredServerGridElement.parents('section').find('.selectedServerCount')
            .text((currentSelectedServer.length == 0) ? 'None' : currentSelectedServer.length);

        return true;
    }

    var provisionViewConfig = {
        elementId:  cowu.formatElementId([prefixId, smwl.TITLE_PROVISIONING]),
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {
                            elementId: 'package_image_id',
                            view: "FormComboboxView",
                            viewConfig: {path: 'package_image_id', class: "span6", dataBindValue: 'package_image_id', elementConfig: {placeholder: smwl.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInPackages')}}}
                        }
                    ]
                }
            ]
        }
    };

    function getParamsFromTags(tagsObject) {
        if(tagsObject.length == 0){
            return '';
        }
        var tagParams = [];

        $.each(tagsObject, function (tagKey, tagValue) {
            if(tagValue != ''){
                tagParams.push(tagKey + '=' + tagValue);
            }
        });
        return (tagParams.length > 0) ? '&tag=' + tagParams.join(',') : '';
    }

    function getAddClusterViewConfig(clusterModel, callback) {
        var addClusterViewConfig = {
                elementId: cowu.formatElementId([prefixId, smwl.TITLE_ADD_CLUSTER]),
                view: "WizardView",
                viewConfig: {
                    steps: []
                }
            },
            steps = [],
            createStepViewConfig = null,
            addServerStepViewConfig = null,
            assignRolesStepViewConfig = null,
            configureStepViewConfig = null;

        /*
            Appending Configure Server Steps
         */
        createStepViewConfig = {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_CREATE_CONFIG]),
            view: "AccordianView",
            viewConfig: createClusterViewConfig,
            title: smwl.TITLE_CREATE,
            stepType: 'step',
            onInitRender: true,
            onNext: function (params) {
                return params.model.configure({
                    init: function () {
                        clusterModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_CREATE_CONFIG]) + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        cowu.disableModalLoading(modalId, function () {
                            callback();
                        });
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            clusterModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_CREATE_CONFIG]) + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                }, "POST", smwc.KEY_ADD_VALIDATION);
            },
            buttons: {
                next: {
                    label: smwl.TITLE_SAVE_NEXT
                },
                previous: {
                    visible: false
                }
            }
        };
        createStepViewConfig.viewConfig[0].viewConfig.rows[0].columns[0].viewConfig.disabled = false;
        steps = steps.concat(createStepViewConfig);

        /*
            Appending Add Server Steps
         */
        addServerStepViewConfig = $.extend(true, {}, getAddServerViewConfig(clusterModel, false, callback).viewConfig).steps;

        addServerStepViewConfig[0].title = smwl.TITLE_ADD_SERVERS_TO_CLUSTER;
        addServerStepViewConfig[0].onPrevious = function(params) {
            return false;
        };
        addServerStepViewConfig[0].buttons = {
            next: {
                label: smwl.TITLE_NEXT
            },
            previous: {
                visible: false
            }
        };

        addServerStepViewConfig[1].stepType = 'sub-step';
        addServerStepViewConfig[1].buttons = {
            next: {
                label: smwl.TITLE_SAVE_NEXT
            }
        };
        steps = steps.concat(addServerStepViewConfig);

        /*
            Appending Assign Roles Steps
         */
        assignRolesStepViewConfig = $.extend(true, {}, getAssignRolesViewConfig(clusterModel), {
            title: smwl.TITLE_ASSIGN_ROLES,
            stepType: 'step',
            onInitRender: true,
            onLoadFromNext: function (params) {
                contrail.ajaxHandler({
                    url: smwu.getObjectDetailUrl(smwc.SERVER_PREFIX_ID) + '?cluster_id=' + clusterModel.model().attributes.id
                }, null, function(response) {
                    $('#assign-roles-filtered-servers').data('contrailGrid')._dataView.setData(response);
                });

                $('#assign-roles-filtered-servers').data('contrailGrid').refreshView();
                clusterModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_ASSIGN_ROLES, smwl.TITLE_SELECT_SERVERS]) + cowc.FORM_SUFFIX_ID, false);
            },
            onNext: function (params) {
                return saveAssignRoles(clusterModel, {
                    init: function () {
                        clusterModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_ASSIGN_ROLES, smwl.TITLE_SELECT_SERVERS]) + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        cowu.disableModalLoading(modalId, function () {
                            callback();
                        });
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            clusterModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_ASSIGN_ROLES, smwl.TITLE_SELECT_SERVERS]) + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                }, function() {});
            },
            onPrevious: function (params) {
                return false;
            },
            buttons: {
                next: {
                    label: smwl.TITLE_SAVE_NEXT
                },
                previous: {
                    visible: false
                }
            }
        });
        steps = steps.concat(assignRolesStepViewConfig);

        /*
         Appending Configure Cluster Steps
         */
        configureStepViewConfig = {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_EDIT_CONFIG]),
            view: "AccordianView",
            title: smwl.TITLE_CONFIGURE,
            stepType: 'step',
            viewConfig: configureClusterViewConfig,
            onInitRender: true,
            onNext: function (params) {
                return params.model.configure({
                    init: function () {
                        clusterModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_EDIT_CONFIG]) + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        cowu.disableModalLoading(modalId, function () {
                            callback();
                            $('#' + modalId).modal('hide');
                        });
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            clusterModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_EDIT_CONFIG]) + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                });
            },
            onPrevious: function (params) {
                return false;
            },
            buttons: {
                finish: {
                    label: 'Save'
                },
                previous: {
                    visible: false
                }
            }
        };
        steps = steps.concat(configureStepViewConfig);

        addClusterViewConfig.viewConfig.steps = steps;

        return addClusterViewConfig;
    }

    return ClusterEditView;
});
