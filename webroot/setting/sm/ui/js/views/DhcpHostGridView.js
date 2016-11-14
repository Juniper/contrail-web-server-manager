/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-view",
    "sm-basedir/setting/sm/ui/js/models/DhcpHostModel",
    "sm-basedir/setting/sm/ui/js/views/DhcpHostEditView",
    "json-model", "json-edit-view", "text!sm-basedir/setting/sm/ui/js/schemas/dhcphost.json"
], function (_, ContrailView, DhcpHostModel, DhcpHostEditView, JsonModel, JsonEditView, DhcpHostSchema) {

    dhcphostSchema = JSON.parse(DhcpHostSchema);
    var prefixId = smwc.DHCP_HOST_PREFIX_ID,
        gridElId = "#" + smwl.SM_DHCP_HOST_GRID_ID;

    var DhcpHostGridView = ContrailView.extend({
        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                pagerOptions = viewConfig.pagerOptions;

            self.renderView4Config(self.$el, self.model, getDhcpHostGridViewConfig(pagerOptions));
        }
    });

    function getHeaderActionConfig(gridElId) {
        var defaultJSONData = {
            "host_fqdn": "",
            "host_name": "",
            "ip_address": "",
            "mac_address": ""
        };
        return [
            {
                "type": "link",
                "title": smwl.TITLE_ADD_DHCP_HOST,
                "iconClass": "fa fa-plus",
                "onClick": function () {
                    var jsonModel = new JsonModel({json : defaultJSONData, schema : dhcphostSchema}),
                        jsonEditView = new JsonEditView();

                    jsonEditView.model = jsonModel;
                    jsonEditView.renderEditor({
                        title: smwl.TITLE_ADD_DHCP_HOST,
                        type : smwc.DHCP_HOST_PREFIX_ID,
                        checkedRows: {},
                        callback: function () {
                            var dataView = $(gridElId).data("contrailGrid")._dataView;
                            dataView.refreshData();
                        }
                    });
                }
            }
        ];
    }

    function getRowActionConfig(gridElId) {
        return [
            smwgc.getDeleteAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    dhcpHostModel = new DhcpHostModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_DEL_DHCP_HOST + " ("+ dataItem.host_fqdn +")",
                    dhcpHostEditView = new DhcpHostEditView();

                dhcpHostEditView.model = dhcpHostModel;
                dhcpHostEditView.renderDeleteDhcpHost({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            })
        ];
    }

    function getDhcpHostGridViewConfig(pagerOptions) {
        return {
            elementId: cowu.formatElementId([smwl.SM_DHCP_HOST_GRID_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_DHCP_HOST_GRID_ID,
                                title: smwl.TITLE_DHCP_HOST,
                                view: "GridView",
                                viewConfig: {
                                    elementConfig: getDhcpHostGridConfig(pagerOptions)
                                }
                            }
                        ]
                    }
                ]
            }
        };
    }

    function getDhcpHostGridConfig(pagerOptions) {
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_DHCP_HOST

                },
                advanceControls: getHeaderActionConfig(gridElId)
            },
            columnHeader: {
                columns: smwgc.DHCP_HOST_COLUMNS
            },
            body: {
                options: {
                    actionCell: getRowActionConfig(gridElId),
                    fixedRowHeight: 30,
                    detail: {
                        template: cowu.generateDetailTemplateHTML(smwdt.getDHCPHostDetailsTemplate(), cowc.APP_CONTRAIL_SM)
                    }
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwu.getObjectDetailUrl(prefixId, smwc.SERVERS_STATE_PROCESSOR)
                        }
                    }
                }
            },
            footer: {
                pager: contrail.handleIfNull(pagerOptions, { options: { pageSize: 50, pageSizeSelect: [50, 100] } })
            }
        };
        return gridElementConfig;
    }

    return DhcpHostGridView;
});

