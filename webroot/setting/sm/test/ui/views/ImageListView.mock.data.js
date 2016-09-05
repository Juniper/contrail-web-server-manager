/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([], function () {

    var getSingleImageDetailData = function () {
        return [
            {
                "category": "image",
                "parameters": {
                    "kickstart": "/var/www/html/kickstarts/kickstarts/contrail-ubuntu.ks",
                    "kickseed": "/var/www/html/kickstarts/contrail-ubuntu.seed"
                },
                "version": "12.04.3",
                "path": "/root/iso/ubuntu-12.04.3-server-amd64.iso",
                "type": "ubuntu",
                "id": "ubuntu"
            }
        ];
    };
    var getTagNamesData = function () {
        return ["datacenter", "floor", "hall", "rack", "user_tag"];
    };
    var formatMockData = function (rawMockData) {
        return {
            "data": {
                "value": rawMockData
            }
        };
    };
    return {
        getSingleImageDetailData: getSingleImageDetailData,
        getTagNamesData: getTagNamesData,
        formatMockData: formatMockData
    };
});
