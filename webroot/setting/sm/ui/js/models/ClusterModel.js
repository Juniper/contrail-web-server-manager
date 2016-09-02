/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-model",
    "sm-basedir/setting/sm/ui/js/views/ClusterEditView",
    "knockback",
    "schema-model",
    "text!sm-basedir/setting/sm/ui/js/schemas/cluster.json",
    "sm-cluster-ui-schema",
    "sm-cluster-custom-ui-schema",
    "view-config-generator",
    "backbone",
    "knockout",
    "sm-basedir/setting/sm/ui/js/models/DisksModel"
], function (_, ContrailModel, ClusterEditView, Knockback, UISchemaModel, schema, stSchema, customSchema, VCG, Backbone, Knockout, DiskModel) {


    var prefixId = smwc.CLUSTER_PREFIX_ID,
        defaultSchema = JSON.parse(schema),
        schemaModel = new UISchemaModel(defaultSchema, stSchema, customSchema).schema,
        vcg = new VCG(prefixId, smwmc.getClusterModel());

    var getValidationByKey = function (key) {
        var configureValidation = {};
        vcg.addValidation(schemaModel, configureValidation);

        if (key == "provisionValidation") {
            configureValidation.package_image_id = {
                required: true,
                msg: smwm.getRequiredMessage("package_image_id")
            };
        }
        return configureValidation;
    };

    var ClusterModel = ContrailModel.extend({

        defaultConfig: smwmc.getClusterModel(),
        formatModelConfig : function(modelConfig){
            // Populate DiskModel from network.interfaces
            var disks = (contrail.checkIfExist(modelConfig.parameters.provision.contrail.storage.storage_osd_disks)) ? (modelConfig.parameters.provision.contrail.storage.storage_osd_disks) : [],
                diskModels = [], diskModel,
                diskCollectionModel;

            $.each(disks, function(diskKey, diskValue) {
                diskModel = new DiskModel({disk: diskValue});
                diskModels.push(diskModel);
            });

            diskCollectionModel = new Backbone.Collection(diskModels);
            modelConfig.disks = diskCollectionModel;
            if(contrail.checkIfExist(modelConfig.parameters.disks)) {
                delete modelConfig.parameters.provision.contrail.storage.storage_osd_disks;
            }

            return modelConfig;
        },
        configure: function (callbackObj, ajaxMethod, validation) {
            var ajaxConfig = {}, returnFlag = false;

            validation = (validation == null) ? smwc.KEY_CONFIGURE_VALIDATION : validation;

            if (this.model().isValid(true, validation)) {
                var putData = {}, clusterAttrsEdited = [],
                    clusterAttrs = this.model().attributes,
                    clusterSchema = smwmc.getClusterSchema(),
                    locks = this.model().attributes.locks.attributes;

                clusterAttrsEdited.push(cowu.getEditConfigObj(clusterAttrs, locks, clusterSchema, ""));
                putData[smwc.CLUSTER_PREFIX_ID] = clusterAttrsEdited;

                ajaxConfig.async = false;
                ajaxConfig.type = contrail.checkIfExist(ajaxMethod) ? ajaxMethod : "PUT";
                ajaxConfig.data = JSON.stringify(putData);
                ajaxConfig.url = smwu.getObjectUrl(smwc.CLUSTER_PREFIX_ID);
                contrail.ajaxHandler(ajaxConfig, function () {
                    if (contrail.checkIfFunction(callbackObj.init)) {
                        callbackObj.init();
                    }
                }, function () {
                    if (contrail.checkIfFunction(callbackObj.success)) {
                        callbackObj.success();
                    }
                    returnFlag = true;
                }, function (error) {
                    console.log(error);
                    if (contrail.checkIfFunction(callbackObj.error)) {
                        callbackObj.error(error);
                    }
                    returnFlag = false;
                });
            } else {
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(smwc.CLUSTER_PREFIX_ID));
                }
            }

            return returnFlag;
        },
        addServer: function (serverList, callbackObj) {
            var ajaxConfig = {},
                returnFlag = false;

            var clusterAttrs = this.model().attributes,
                putData = {}, servers = [];

            $.each(serverList, function (key, value) {
                servers.push({"id": value.id, "cluster_id": clusterAttrs.id});
            });
            putData[smwc.SERVER_PREFIX_ID] = servers;

            ajaxConfig.async = false;
            ajaxConfig.type = "PUT";
            ajaxConfig.data = JSON.stringify(putData);
            ajaxConfig.url = smwu.getObjectUrl(smwc.SERVER_PREFIX_ID);

            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function () {
                if (contrail.checkIfFunction(callbackObj.success)) {
                    callbackObj.success();
                }
                returnFlag = true;
            }, function (error) {
                console.log(error);
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(error);
                }
                returnFlag = false;
            });

            return returnFlag;
        },
        removeServer: function (serverList, callbackObj) {
            var ajaxConfig = {},
                returnFlag = false,
                putData = {}, servers = [];

            $.each(serverList, function (key, value) {
                servers.push({"id": value.id, "cluster_id": ""});
            });

            putData[smwc.SERVER_PREFIX_ID] = servers;
            smwu.removeRolesFromServers(putData);

            ajaxConfig.async = false;
            ajaxConfig.type = "PUT";
            ajaxConfig.data = JSON.stringify(putData);
            ajaxConfig.url = smwu.getObjectUrl(smwc.SERVER_PREFIX_ID);

            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function () {
                if (contrail.checkIfFunction(callbackObj.success)) {
                    callbackObj.success();
                }
                returnFlag = true;
            }, function (error) {
                console.log(error);
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(error);
                }
                returnFlag = false;
            });

            return returnFlag;
        },
        assignRoles: function (serverList, callbackObj) {
            var ajaxConfig = {}, returnFlag = false,
                putData = {}, servers = [];

            $.each(serverList, function (key, value) {
                servers.push({"id": value.id, "roles": value.roles});
            });

            putData[smwc.SERVER_PREFIX_ID] = servers;

            ajaxConfig.async = false;
            ajaxConfig.type = "PUT";
            ajaxConfig.data = JSON.stringify(putData);
            ajaxConfig.url = smwu.getObjectUrl(smwc.SERVER_PREFIX_ID);

            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function () {
                if (contrail.checkIfFunction(callbackObj.success)) {
                    callbackObj.success();
                }
                returnFlag = true;
            }, function (error) {
                console.log(error);
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(error);
                }
                returnFlag = false;
            });

            return returnFlag;
        },
        reimage: function (callbackObj) {
            var ajaxConfig = {};
            if (this.model().isValid(true, smwc.KEY_REIMAGE_VALIDATION)) {
                var clusterAttrs = this.model().attributes,
                    putData = {}, clusters = [];

                clusters.push({"cluster_id": clusterAttrs.id, "base_image_id": clusterAttrs.base_image_id});
                putData = clusters;

                ajaxConfig.type = "POST";
                ajaxConfig.data = JSON.stringify(putData);
                ajaxConfig.timeout = smwc.TIMEOUT;
                ajaxConfig.url = smwc.URL_SERVER_REIMAGE;

                contrail.ajaxHandler(ajaxConfig, function () {
                    if (contrail.checkIfFunction(callbackObj.init)) {
                        callbackObj.init();
                    }
                }, function () {
                    if (contrail.checkIfFunction(callbackObj.success)) {
                        callbackObj.success();
                    }
                }, function (error) {
                    console.log(error);
                    if (contrail.checkIfFunction(callbackObj.error)) {
                        callbackObj.error(error);
                    }
                });
            } else {
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(smwc.CLUSTER_PREFIX_ID));
                }
            }
        },
        provision: function (callbackObj) {
            var ajaxConfig = {};
            if (this.model().isValid(true, smwc.KEY_PROVISION_VALIDATION)) {
                var clusterAttrs = this.model().attributes,
                    putData = {}, clusters = [];

                clusters.push({"cluster_id": clusterAttrs.id, "package_image_id": clusterAttrs.package_image_id});
                putData = clusters;

                ajaxConfig.type = "POST";
                ajaxConfig.data = JSON.stringify(putData);
                ajaxConfig.timeout = smwc.TIMEOUT;
                ajaxConfig.url = smwc.URL_SERVER_PROVISION;

                contrail.ajaxHandler(ajaxConfig, function () {
                    if (contrail.checkIfFunction(callbackObj.init)) {
                        callbackObj.init();
                    }
                }, function () {
                    if (contrail.checkIfFunction(callbackObj.success)) {
                        callbackObj.success();
                    }
                }, function (error) {
                    console.log(error);
                    if (contrail.checkIfFunction(callbackObj.error)) {
                        callbackObj.error(error);
                    }
                });
            } else {
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(smwc.CLUSTER_PREFIX_ID));
                }
            }
        },
        deleteCluster: function (checkedRow, callbackObj) {
            var ajaxConfig = {},
                clusterId = checkedRow.id;

            ajaxConfig.type = "DELETE";
            ajaxConfig.url = smwc.URL_OBJ_CLUSTER_ID + clusterId;

            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function () {
                if (contrail.checkIfFunction(callbackObj.success)) {
                    callbackObj.success();
                }
            }, function (error) {
                console.log(error);
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(error);
                }
            });
        },
        runInventory: function (checkedRow, callbackObj) {
            var ajaxConfig = {},
                clusterId = checkedRow.id;

            ajaxConfig.type = "POST";
            ajaxConfig.url = smwc.URL_RUN_INVENTORY + "?cluster_id=" +clusterId;

            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function () {
                if (contrail.checkIfFunction(callbackObj.success)) {
                    callbackObj.success();
                }
            }, function (error) {
                console.log(error);
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(error);
                }
            });
        },
        validations: {
            reimageValidation: {
                "base_image_id": {
                    required: true,
                    msg: smwm.getRequiredMessage("base_image_id")
                }
            },
            provisionValidation: getValidationByKey("provisionValidation"),
            addValidation: {
                "id": {
                    required: true,
                    msg: smwm.getRequiredMessage("id")
                },
                "email": {
                    required: false,
                    pattern: "email",
                    msg: smwm.getInvalidErrorMessage("email")
                }
            },
            configureValidation: getValidationByKey("configureValidation")
        },
        addDisk: function() {
            var disks = this.model().attributes.disks,
                newDisk = new DiskModel({disk: ""});

            disks.add([newDisk]);
        },
        deleteDisk: function(data, kbDisk) {
            var diskCollection = data.model().collection,
                intf = kbDisk.model();

            diskCollection.remove(intf);
        },
        getStorageDisks: function() {
            return Knockout.computed(function () {
                var kbDisks = this.disks(),
                    disks = this.model().attributes.disks,
                    storageDisks = [];

                for (var i = 0; i < disks.length; i++) {
                    storageDisks.push(kbDisks[i]);
                }
                return storageDisks;
            }, this);
        },
        goForward : function(rootViewPath, path, prefixId, rowIndex){
            var self = this;
            var modalId = "configure-" + prefixId;
            $("#" + modalId).modal("hide");
            var viewConfigOptions = {
                rootViewPath : rootViewPath,
                path : path,
                group : "",
                page : "",
                element : prefixId,
                rowIndex: rowIndex,
                formType: "edit"
            };
            var viewConfig = vcg.generateViewConfig(viewConfigOptions, schemaModel, "default", "form"),
                dataItem = $("#" + smwl.SM_CLUSTER_GRID_ID).data("contrailGrid")._dataView.getItem(rowIndex),
                checkedRow = [dataItem],
                title = smwl.TITLE_EDIT_CONFIG + " ("+ dataItem.id +")";

            var clusterEditView = new ClusterEditView();
            clusterEditView.model = self;
            clusterEditView.renderConfigure({"title": title, checkedRows: checkedRow, rowIndex: rowIndex, viewConfig: viewConfig, callback: function () {
                var dataView = $("#" + smwl.SM_CLUSTER_GRID_ID).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});

            clusterEditView.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"), self, viewConfig, smwc.KEY_CONFIGURE_VALIDATION, null, null, function() {
                self.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                Knockback.applyBindings(self, document.getElementById(modalId));
                kbValidation.bind(clusterEditView);
            });

        }
    });

    return ClusterModel;
});
