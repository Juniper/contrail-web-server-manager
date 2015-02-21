/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore'], function (_) {
    var SMTestMockData = function () {

        this.getSingleImageDetailData = function () {
            return  [
                {"category": "image", "parameters": {"kickstart": "/var/www/html/kickstarts/kickstarts/contrail-ubuntu.ks", "kickseed": "/var/www/html/kickstarts/contrail-ubuntu.seed"}, "version": "12.04.3", "path": "/root/iso/ubuntu-12.04.3-server-amd64.iso", "type": "ubuntu", "id": "ubuntu"}
            ];
        };
        this.getSinglePackageDetailData = function () {
            return  [
                {"category": "package", "parameters": {"puppet_manifest_version": "ubuntu_icehouse_r21_21_t", "kickstart": "", "kickseed": ""}, "version": "R2.01_B21_T", "path": "/root/contrail-install-packages_2.10-21~icehouse_all_t.deb", "type": "contrail-ubuntu-package", "id": "ubuntu_icehouse_r21_21_t"}
            ];
        };
        this.getTagNamesData = function () {
            return ["datacenter", "floor", "hall", "rack", "user_tag"];
        };
    };
    return SMTestMockData;
});
