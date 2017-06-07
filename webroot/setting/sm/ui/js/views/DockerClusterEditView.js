/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-view",
    "knockback",
    "schema-model",
    "text!sm-basedir/setting/sm/ui/js/schemas/docker.json",
    "sm-basedir/setting/sm/ui/js/views/DockerClusterEditView",
    "sm-constants",
    "sm-labels",
    "sm-utils",
    "sm-model-config",
    "sm-grid-config"
], function (_, ContrailView, Knockback, UISchemaModel, dockerSchema, DockerClusterEditView, smwc, smwl, smwu, smwmc, smwgc) {

    dockerSchema = JSON.parse(dockerSchema);
    var prefixId = smwc.CLUSTER_PREFIX_ID,
        modalId = "configure-" + prefixId,
        editTemplate = contrail.getTemplate4Id(cowc.TMPL_EDIT_FORM);

     DockerClusterEditView = ContrailView.extend({
        modalElementId: "#" + modalId,
         renderDockerConfigure: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this;

            var modalConfig = {"modalId": modalId, "className": "modal-980", "title": options.title, "body": editLayout, "onSave": function () {
                self.model.dockerConfigure({
                    init: function () {
                        self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options.callback();
                        $("#" + modalId).modal("hide");
                        cowch.reset();
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                }); // TODO: Release binding on successful configure
            }, "onCancel": function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal("hide");
            }};

            cowu.createModal(modalConfig);

            var element = $("#" + modalId).find("#" + prefixId + "-form");
            self.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), this.model, options.viewConfig || getDockerConfigureViewConfig(), smwc.KEY_DOCKER_CONFIGURE_VALIDATION, null, null, function() {
                self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                Knockback.applyBindings(self.model, document.getElementById(modalId));
                kbValidation.bind(self);
            });
        }
    });

    function getDockerConfigureViewConfig() {
        var viewConfig = [{
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_DETAILS]),
            title: smwl.TITLE_DETAILS,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "docker_registry", view: "FormInputView",
                                viewConfig: {path: "parameters.provision.contrail_4.docker_registry", dataBindValue: "parameters().provision.contrail_4.docker_registry", class: "col-xs-6"}
                            },
                            {
                                elementId: "docker_registry_insecure", view: "FormDropdownView",
                                viewConfig: {
                                    label: smwl.LABEL_DOCKER_REGISTRY_INSECURE_ACCESS,
                                    path: "parameters.provision.contrail_4.docker_registry_insecure", dataBindValue: "parameters().provision.contrail_4.docker_registry_insecure", class: "col-xs-6", elementConfig: {dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: "analytics_image", view: "FormInputView",
                                viewConfig: {path: "parameters.provision.contrail_4.analytics_image", dataBindValue: "parameters().provision.contrail_4.analytics_image", class: "col-xs-6"}
                            },
                            {
                                elementId: "lb_image", view: "FormInputView",
                                viewConfig: {path: "parameters.provision.contrail_4.lb_image", dataBindValue: "parameters().provision.contrail_4.lb_image", class: "col-xs-6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: "analyticsdb_image", view: "FormInputView",
                                viewConfig: {path: "parameters.provision.contrail_4.analyticsdb_image", dataBindValue: "parameters().provision.contrail_4.analyticsdb_image", class: "col-xs-6"}
                            },
                            {
                                elementId: "agent_image", view: "FormInputView",
                                viewConfig: {path: "parameters.provision.contrail_4.agent_image", dataBindValue: "parameters().provision.contrail_4.agent_image", class: "col-xs-6"}
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: "contrail_compute_mode", view: "FormInputView",
                                viewConfig: {path: "parameters.provision.contrail_4.contrail_compute_mode", dataBindValue: "parameters().provision.contrail_4.contrail_compute_mode", class: "col-xs-6"}
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_GLOBAL_CONFIG]),
            title: smwl.TITLE_GLOBAL_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "log_level", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.global_config.log_level", dataBindValue: "parameters().provision.contrail_4.global_config.log_level", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "cloud_orchestrator", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.global_config.cloud_orchestrator", dataBindValue: "parameters().provision.contrail_4.global_config.cloud_orchestrator", class: "col-xs-6"
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: "external_lb", view: "FormDropdownView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.global_config.external_lb", dataBindValue: "parameters().provision.contrail_4.global_config.external_lb", class: "col-xs-6", elementConfig: {dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}
                                }
                            },
                            {
                                elementId: "external_rabbitmq_servers", view: "FormInputView",
                                viewConfig: {
                                    label: smwl.LABEL_EXTRNL_RABBITMQ_SERVRS,
                                    path: "parameters.provision.contrail_4.global_config.external_rabbitmq_servers", dataBindValue: "parameters().provision.contrail_4.global_config.external_rabbitmq_servers", class: "col-xs-6"
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: "external_zookeeper_servers", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.global_config.external_zookeeper_servers", dataBindValue: "parameters().provision.contrail_4.global_config.external_zookeeper_servers", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "external_cassandra_servers", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.global_config.external_cassandra_servers", dataBindValue: "parameters().provision.contrail_4.global_config.external_cassandra_servers", class: "col-xs-6"
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: "external_configdb_servers", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.global_config.external_configdb_servers", dataBindValue: "parameters().provision.contrail_4.global_config.external_configdb_servers", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "xmpp_auth_enable", view: "FormDropdownView",
                                viewConfig: {
                                    label: smwl.LABEL_ENABLE_XMPP_AUTH,
                                    path: "parameters.provision.contrail_4.global_config.xmpp_auth_enable", dataBindValue: "parameters().provision.contrail_4.global_config.xmpp_auth_enable", class: "col-xs-6", elementConfig: {dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: "xmpp_dns_auth_enable", view: "FormDropdownView",
                                viewConfig: {
                                    label: smwl.LABEL_ENABLE_XMPP_DNS_AUTH,
                                    path: "parameters.provision.contrail_4.global_config.xmpp_dns_auth_enable", dataBindValue: "parameters().provision.contrail_4.global_config.xmpp_dns_auth_enable", class: "col-xs-6", elementConfig: {dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_CONTROL_CONFIG]),
            title: smwl.TITLE_CONTROL_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "log_level", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.control_config.log_level", dataBindValue: "parameters().provision.contrail_4.control_config.log_level", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "log_file", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.control_config.log_file", dataBindValue: "parameters().provision.contrail_4.control_config.log_file", class: "col-xs-6"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_DNS_CONFIG]),
            title: smwl.TITLE_DNS_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "log_level", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.dns_config.log_level", dataBindValue: "parameters().provision.contrail_4.dns_config.log_level", class: "col-xs-6"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_CASSANDRA_CONFIG]),
            title: smwl.TITLE_CASSANDRA_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "commitlog_dir", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.cassandra_config.commitlog_dir", dataBindValue: "parameters().provision.contrail_4.cassandra_config.commitlog_dir", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "data_dirs", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.cassandra_config.data_dirs", dataBindValue: "parameters().provision.contrail_4.cassandra_config.data_dirs", class: "col-xs-6"
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: "java_max_heap_size", view: "FormInputView",
                                viewConfig: {
                                    label: smwl.LABEL_JAVA_MAX_HEAP_SIZE_MB,
                                    path: "parameters.provision.contrail_4.cassandra_config.java_max_heap_size", dataBindValue: "parameters().provision.contrail_4.cassandra_config.java_max_heap_size", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "java_max_heap_newsize", view: "FormInputView",
                                viewConfig: {
                                    label: smwl.LABEL_JAVA_MAX_HEAP_NEW_SIZE_MB,
                                    path: "parameters.provision.contrail_4.cassandra_config.java_max_heap_newsize", dataBindValue: "parameters().provision.contrail_4.cassandra_config.java_max_heap_newsize", class: "col-xs-6"
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: "saved_caches_dir", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.cassandra_config.saved_caches_dir", dataBindValue: "parameters().provision.contrail_4.cassandra_config.saved_caches_dir", class: "col-xs-6"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_API_CONFIG]),
            title: smwl.TITLE_API_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "log_level", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.api_config.log_level", dataBindValue: "parameters().provision.contrail_4.api_config.log_level", class: "col-xs-6"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_SCHEMA_CONFIG]),
            title: smwl.TITLE_SCHEMA_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "log", view: "FormInputView",
                                viewConfig: {
                                    label: smwl.LABEL_LOG_FILE,
                                    path: "parameters.provision.contrail_4.schema_config.log", dataBindValue: "parameters().provision.contrail_4.schema_config.log", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "log_level", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.schema_config.log_level", dataBindValue: "parameters().provision.contrail_4.schema_config.log_level", class: "col-xs-6"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_DEVICE_MNGR_CONFIG]),
            title: smwl.TITLE_DEVICE_MNGR_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "log", view: "FormInputView",
                                viewConfig: {
                                    label: smwl.LABEL_LOG_FILE,
                                    path: "parameters.provision.contrail_4.device_manager_config.log", dataBindValue: "parameters().provision.contrail_4.device_manager_config.log", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "log_level", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.device_manager_config.log_level", dataBindValue: "parameters().provision.contrail_4.device_manager_config.log_level", class: "col-xs-6"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_SVC_MONITOR_CONFIG]),
            title: smwl.TITLE_SVC_MONITOR_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "log", view: "FormInputView",
                                viewConfig: {
                                    label: smwl.LABEL_LOG_FILE,
                                    path: "parameters.provision.contrail_4.svc_monitor_config.log", dataBindValue: "parameters().provision.contrail_4.svc_monitor_config.log", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "log_level", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.svc_monitor_config.log_level", dataBindValue: "parameters().provision.contrail_4.svc_monitor_config.log_level", class: "col-xs-6"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_ALARM_GEN_CONFIG]),
            title: smwl.TITLE_ALARM_GEN_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "log_level", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.alarm_gen_config.log_level", dataBindValue: "parameters().provision.contrail_4.alarm_gen_config.log_level", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "log", view: "FormInputView",
                                viewConfig: {
                                    label: smwl.LABEL_LOG_FILE,
                                    path: "parameters.provision.contrail_4.alarm_gen_config.log", dataBindValue: "parameters().provision.contrail_4.alarm_gen_config.log", class: "col-xs-6"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_ANALYTICS_API_CONFIG]),
            title: smwl.TITLE_ANALYTICS_API_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "log", view: "FormInputView",
                                viewConfig: {
                                    label: smwl.LABEL_LOG_FILE,
                                    path: "parameters.provision.contrail_4.analytics_api_config.log", dataBindValue: "parameters().provision.contrail_4.analytics_api_config.log", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "log_level", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.analytics_api_config.log_level", dataBindValue: "parameters().provision.contrail_4.analytics_api_config.log_level", class: "col-xs-6"
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: "aaa_mode", view: "FormDropdownView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.analytics_api_config.aaa_mode", dataBindValue: "parameters().provision.contrail_4.analytics_api_config.aaa_mode", class: "col-xs-6",
                                    elementConfig: {dataTextField: "text", dataValueField: "id", data: smwc.AAA_MODES}
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_ANALYTICS_COLLECTOR_CONFIG]),
            title: smwl.TITLE_ANALYTICS_COLLECTOR_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "log_level", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.analytics_collector_config.log_level", dataBindValue: "parameters().provision.contrail_4.analytics_collector_config.log_level", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "log", view: "FormInputView",
                                viewConfig: {
                                    label: smwl.LABEL_LOG_FILE,
                                    path: "parameters.provision.contrail_4.analytics_collector_config.log", dataBindValue: "parameters().provision.contrail_4.analytics_collector_config.log", class: "col-xs-6"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_QUERY_ENGINE_CONFIG]),
            title: smwl.TITLE_QUERY_ENGINE_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "log", view: "FormInputView",
                                viewConfig: {
                                    label: smwl.LABEL_LOG_FILE,
                                    path: "parameters.provision.contrail_4.query_engine_config.log", dataBindValue: "parameters().provision.contrail_4.query_engine_config.log", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "log_level", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.query_engine_config.log_level", dataBindValue: "parameters().provision.contrail_4.query_engine_config.log_level", class: "col-xs-6"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_SNMP_COLLECTOR_CONFIG]),
            title: smwl.TITLE_SNMP_COLLECTOR_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "log", view: "FormInputView",
                                viewConfig: {
                                    label: smwl.LABEL_LOG_FILE,
                                    path: "parameters.provision.contrail_4.snmp_collector_config.log", dataBindValue: "parameters().provision.contrail_4.snmp_collector_config.log", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "log_level", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.snmp_collector_config.log_level", dataBindValue: "parameters().provision.contrail_4.snmp_collector_config.log_level", class: "col-xs-6"
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: "introspect_port", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.snmp_collector_config.introspect_port", dataBindValue: "parameters().provision.contrail_4.snmp_collector_config.introspect_port", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "scan_frequencey", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.snmp_collector_config.scan_frequencey", dataBindValue: "parameters().provision.contrail_4.snmp_collector_config.scan_frequencey", class: "col-xs-6"
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: "fast_scan_frequency", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.snmp_collector_config.fast_scan_frequency", dataBindValue: "parameters().provision.contrail_4.snmp_collector_config.fast_scan_frequency", class: "col-xs-6"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_TOPO_CONFIG]),
            title: smwl.TITLE_TOPO_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "log", view: "FormInputView",
                                viewConfig: {
                                    label: smwl.LABEL_LOG_FILE,
                                    path: "parameters.provision.contrail_4.topology_config.log", dataBindValue: "parameters().provision.contrail_4.topology_config.log", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "log_level", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.topology_config.log_level", dataBindValue: "parameters().provision.contrail_4.topology_config.log_level", class: "col-xs-6"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_STORAGE_CEPH_CONFIG]),
            title: smwl.TITLE_STORAGE_CEPH_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "replica_size", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.storage_ceph_config.replica_size", dataBindValue: "parameters().provision.contrail_4.storage_ceph_config.replica_size", class: "col-xs-6"
                                }
                            },
                            {
                                elementId: "ceph_object_storage", view: "FormDropdownView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.storage_ceph_config.ceph_object_storage", dataBindValue: "parameters().provision.contrail_4.storage_ceph_config.ceph_object_storage", class: "col-xs-6", elementConfig: {dataTextField: "text", dataValueField: "id", data: smwc.FLAGS_TRUE_FALSE_BOOLEAN_TYPE}
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: "object_store_pool", view: "FormInputView",
                                viewConfig: {
                                    path: "parameters.provision.contrail_4.storage_ceph_config.object_store_pool", dataBindValue: "parameters().provision.contrail_4.storage_ceph_config.object_store_pool", class: "col-xs-6"
                                }
                            }
                        ]
                    }
                ]
            }
        }];

        return {
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_CONTAINER_EDIT_CONFIG]),
            view: "AccordianView",
            viewConfig: viewConfig
        };
    };

    return DockerClusterEditView;
});
