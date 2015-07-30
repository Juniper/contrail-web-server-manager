/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore'], function (_) {

    this.getSinglePackageDetailData = function () {
        return [
            {
                "category": "package",
                "parameters": {"puppet_manifest_version": "ubuntu_icehouse_r21_21_t", "kickstart": "", "kickseed": ""},
                "version": "R2.01_B21_T",
                "path": "/root/contrail-install-packages_2.10-21~icehouse_all_t.deb",
                "type": "contrail-ubuntu-package",
                "id": "ubuntu_icehouse_r21_21_t"
            }
        ];
    };
    this.getTagNamesData = function () {
        return ["datacenter", "floor", "hall", "rack", "user_tag"];
    };
    this.formatMockData = function (rawMockData) {
        return {
            'data': {
                'value': rawMockData
            }
        }
    };
    return {
        getSinglePackageDetailData: getSinglePackageDetailData,
        getTagNamesData: getTagNamesData,
        formatMockData: formatMockData
    };
});
