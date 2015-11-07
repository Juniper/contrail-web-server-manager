/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([], function () {
    this.validations = {
        success: [
            {
                id: "main_2624",
                category: "package",
                type: "contrail-ubuntu-package",
                version: "Main_2624_14.04",
                path: "/root/contrail-install-packages_3.0-2624~icehouse_all.deb"

            },
            {
                id: "new_123",
                type: "compute-package",
                version: "49m23-0im43kl2",
                path: "4$234mskd"
            }
        ],
        failure: [
            {
                id: "abcd_1234",
            },
            {

            }
        ]
    };

    this.setAttributes = {
        assertEqual: [
            {
                setData: {
                    id : ""
                },
                expected: {

                }
            },
            {
                setData: {
                    id: "main_2624",
                    category: "package",
                    type: "contrail-ubuntu-package",
                    version: "Main_2624_14.04",
                    path: "/root/contrail-install-packages_3.0-2624~icehouse_all.deb"
                },
                expected: {

                }

            }
        ],
        assertNotEqual: [
            {
                setData: {

                },
                expected: {

                }
            },

        ]
    }

    return {
        validations: validations,
        setAttributes: setAttributes,
    };
});