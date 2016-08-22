/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore"
], function (_) {
    this.PACKAGE_LIST_VIEW_COMMON_TEST_MODULE = "Package List view - Common Tests";
    this.CLUSTER_LIST_VIEW_COMMON_TEST_MODULE = "Cluster List view - Common Tests";
    this.CLUSTER_TAB_VIEW_COMMON_TEST_MODULE = "Cluster Tab view - Common Tests";
    this.SERVER_TAB_VIEW_COMMON_TEST_MODULE = "Server Tab view - Common Tests";
    this.SERVER_LIST_VIEW_COMMON_TEST_MODULE = "Server List view - Common Tests";
    this.IMAGE_LIST_VIEW_COMMON_TEST_MODULE = "Image List view - Common Tests";
    this.PACKAGE_MODEL_TEST_MODULE = "Package Model - Form Edit Tests";
    this.CLUSTER_LIST_VIEW_CUSTOM_TEST_MODULE = "Cluster List view - Custom Tests";

    this.get = function () {
        var args = arguments;
        return args[0].replace(/\{(\d+)\}/g, function (m, n) {
            n = parseInt(n) + 1;
            return args[n];
        });
    };
    return {
        PACKAGE_LIST_VIEW_COMMON_TEST_MODULE: PACKAGE_LIST_VIEW_COMMON_TEST_MODULE,
        CLUSTER_LIST_VIEW_COMMON_TEST_MODULE: CLUSTER_LIST_VIEW_COMMON_TEST_MODULE,
        CLUSTER_TAB_VIEW_COMMON_TEST_MODULE: CLUSTER_TAB_VIEW_COMMON_TEST_MODULE,
        SERVER_TAB_VIEW_COMMON_TEST_MODULE: SERVER_TAB_VIEW_COMMON_TEST_MODULE,
        SERVER_LIST_VIEW_COMMON_TEST_MODULE: SERVER_LIST_VIEW_COMMON_TEST_MODULE,
        IMAGE_LIST_VIEW_COMMON_TEST_MODULE: IMAGE_LIST_VIEW_COMMON_TEST_MODULE,
        PACKAGE_MODEL_TEST_MODULE: PACKAGE_MODEL_TEST_MODULE,
        CLUSTER_LIST_VIEW_CUSTOM_TEST_MODULE: CLUSTER_LIST_VIEW_CUSTOM_TEST_MODULE,
        get: get
    };
});
