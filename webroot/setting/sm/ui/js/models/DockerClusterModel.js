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
    "json-validator",
    "backbone",
    "knockout",
    "sm-constants",
    "sm-labels",
    "sm-messages",
    "sm-utils",
    "sm-model-config"
], function (_, ContrailModel, ClusterEditView, Knockback, UISchemaModel, schema, stSchema, customSchema, JsonValidator, Backbone, Knockout, smwc, smwl, smwm, smwu, smwmc) {

    var prefixId = smwc.CLUSTER_PREFIX_ID,
        defaultSchema = JSON.parse(schema),
        schemaModel = new UISchemaModel(defaultSchema, stSchema, customSchema).schema,
        jsonValidator = new JsonValidator(prefixId, smwmc.getDockerClusterModel());

    var getValidationByKey = function (key) {
        var configureValidation = {};
        jsonValidator.addValidation(schemaModel, configureValidation);
        return configureValidation;
    };

    var DockerClusterModel = ContrailModel.extend({

        defaultConfig: smwmc.getDockerClusterModel(),

        dockerConfigure: function (callbackObj, ajaxMethod, validation) {
            var ajaxConfig = {}, returnFlag = false,
                putData = {
                    "cluster": []
                },
                contrail4Data = {
                    "parameters": {
                        "provision": {
                            "contrail_4": {}
                        }
                    }
                };

            var data_dirs = this.model().attributes.parameters.provision.contrail_4.cassandra_config.data_dirs, dataDirsArr = [];

            if (!Array.isArray(data_dirs)) {
                dataDirsArr = data_dirs.split(",");
                for (var i=0; i< dataDirsArr.length; i++) {
                    dataDirsArr[i] = dataDirsArr[i].trim();
                }
                this.model().attributes.parameters.provision.contrail_4.cassandra_config.data_dirs = dataDirsArr;
            }

            contrail4Data.id = this.model().attributes.id;
            contrail4Data.parameters.provision.contrail_4 = this.model().attributes.parameters.provision.contrail_4;

            putData.cluster.push(contrail4Data);

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

        return returnFlag;
        },

        validations: {
            configureValidation: getValidationByKey("configureValidation")
        }
    });

    return DockerClusterModel;
});
