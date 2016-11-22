/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-view",
    "sm-basedir/setting/sm/ui/js/models/DhcpSubnetModel",
    "sm-basedir/setting/sm/ui/js/views/DhcpSubnetEditView",
    "json-model", "json-edit-view", "text!sm-basedir/setting/sm/ui/js/schemas/dhcpsubnet.json",
    "sm-constants",
    "sm-labels",
    "sm-utils",
    "sm-model-config",
    "sm-grid-config",
    "sm-detail-tmpls"
], function (_, ContrailView, DhcpSubnetModel, DhcpSubnetEditView, JsonModel, JsonEditView, DhcpSubnetSchema, smwc, smwl, smwu, smwmc, smwgc, smwdt) {

    dhcpsubnetSchema = JSON.parse(DhcpSubnetSchema);
    var prefixId = smwc.DHCP_SUBNET_PREFIX_ID,
        gridElId = "#" + smwl.SM_DHCP_SUBNET_GRID_ID;

    var DhcpSubnetGridView = ContrailView.extend({
        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                pagerOptions = viewConfig.pagerOptions;

            self.renderView4Config(self.$el, self.model, getDhcpSubnetGridViewConfig(pagerOptions));
        }
    });

    function getHeaderActionConfig(gridElId) {
        var defaultJSONData = {
            "default_lease_time": 21600,
            "dhcp_range": null,
            "dns_server_list": "['127.0.0.1']",
            "max_lease_time": 43200,
            "search_domains_list": "['abc.net']",
            "subnet_address": "",
            "subnet_domain": "abc.net",
            "subnet_gateway": "",
            "subnet_mask": ""
        };

        return [
            {
                "type": "link",
                "title": smwl.TITLE_ADD_DHCP_SUBNET,
                "iconClass": "fa fa-plus",
                "onClick": function () {
                    var jsonModel = new JsonModel({json : defaultJSONData, schema : dhcpsubnetSchema}),
                        jsonEditView = new JsonEditView();

                    jsonEditView.model = jsonModel;
                    jsonEditView.renderEditor({
                        title: smwl.TITLE_ADD_DHCP_SUBNET,
                        type : smwc.DHCP_SUBNET_PREFIX_ID,
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
                    dhcpSubnetModel = new DhcpSubnetModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_DEL_DHCP_HOST + " ("+ dataItem.subnet_address +")",
                    dhcpSubnetEditView = new DhcpSubnetEditView();

                dhcpSubnetEditView.model = dhcpSubnetModel;
                dhcpSubnetEditView.renderDeleteDhcpSubnet({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            })
        ];
    }

    function getDhcpSubnetGridViewConfig(pagerOptions) {
        return {
            elementId: cowu.formatElementId([smwl.SM_DHCP_SUBNET_GRID_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_DHCP_SUBNET_GRID_ID,
                                title: smwl.TITLE_DHCP_SUBNET,
                                view: "GridView",
                                viewConfig: {
                                    elementConfig: getDhcpSubnetGridConfig(pagerOptions)
                                }
                            }
                        ]
                    }
                ]
            }
        };
    }

    function getDhcpSubnetGridConfig(pagerOptions) {
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_DHCP_SUBNET

                },
                advanceControls: getHeaderActionConfig(gridElId)
            },
            columnHeader: {
                columns: smwgc.DHCP_SUBNET_COLUMNS
            },
            body: {
                options: {
                    actionCell: getRowActionConfig(gridElId),
                    fixedRowHeight: 30,
                    detail: {
                        template: cowu.generateDetailTemplateHTML(smwdt.getDHCPSubnetDetailsTemplate(), cowc.APP_CONTRAIL_SM)
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

    return DhcpSubnetGridView;
});

