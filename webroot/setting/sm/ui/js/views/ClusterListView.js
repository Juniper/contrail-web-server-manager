/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-view",
    "contrail-list-model"
], function (_, ContrailView, ContrailListModel) {
    var ClusterListView = ContrailView.extend({
        render: function () {
            var self = this, viewConfig = this.attributes.viewConfig,
                prefixId = smwc.CLUSTER_PREFIX_ID;

            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: smwu.getObjectDetailUrl(prefixId, smwc.SERVERS_STATE_PROCESSOR)
                    },
                    hlRemoteConfig: smwgc.getServerMonitoringHLazyRemoteConfig(viewConfig, smwp.clusterMonitoringDataParser)
                },
                cacheConfig: {
                    ucid: smwc.UCID_ALL_CLUSTER_LIST
                }
            };

            var contrailListModel = new ContrailListModel(listModelConfig);
            self.renderView4Config(this.$el, contrailListModel, getClusterListViewConfig());
        }
    });

    function getClusterListViewConfig() {
        return {
            elementId: cowu.formatElementId([smwl.SM_CLUSTER_LIST_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_CLUSTER_SCATTER_CHART_ID,
                                title: smwl.TITLE_CLUSTERS,
                                view: "ZoomScatterChartView",
                                viewConfig: {
                                    loadChartInChunks: true,
                                    chartOptions: {
                                        xLabel: "Max. CPU Utilization (%)",
                                        yLabel: "Total Servers",
                                        forceX: [0, 1],
                                        forceY: [0, 20],
                                        noDataMessage: "No Data found.",
                                        dataParser: function (response) {
                                            var chartDataValues = [];
                                            for(var i = 0; i < response.length; i++) {
                                                var cluster = response[i],
                                                    serverStatus = cluster.ui_added_parameters.servers_status,
                                                    monitoringStatus = contrail.handleIfNull(cluster.ui_added_parameters.monitoring, {});

                                                chartDataValues.push({
                                                    name: cluster.id,
                                                    y: serverStatus.total_servers,
                                                    x: contrail.handleIfNull(monitoringStatus.max_cpu_usage_percentage, 0),
                                                    color: (serverStatus.total_servers == serverStatus.provisioned_servers) ? "okay" : "default",
                                                    size: contrail.handleIfNull(monitoringStatus.interface_rt_bytes, 0),
                                                    rawData: cluster
                                                });
                                            }
                                            return chartDataValues;
                                        },
                                        tooltipConfigCB: getClusterTooltipConfig,
                                        controlPanelConfig: {
                                            filter: {
                                                enable: true,
                                                iconClass: "fa fa-filter",
                                                title: "Filter",
                                                viewConfig: getControlPanelFilterConfig()
                                            },
                                            legend: {
                                                enable: true,
                                                viewConfig: getControlPanelLegendConfig()
                                            }
                                        },
                                        clickCB: onScatterChartClick
                                    }
                                }
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: smwl.SM_CLUSTER_GRID_VIEW_ID,
                                title: smwl.TITLE_CLUSTERS,
                                view: "ClusterGridView",
                                app: cowc.APP_CONTRAIL_SM,
                                viewConfig: {pagerOptions: { options: { pageSize: 8, pageSizeSelect: [8, 25, 50, 100] } }}
                            }
                        ]
                    }
                ]
            }
        };
    }

    function onScatterChartClick(chartConfig) {
        var clusterID = chartConfig.name, hashObj = { cluster_id: clusterID };

        layoutHandler.setURLHashParams(hashObj, {p: "setting_sm_clusters", merge: false, triggerHashChange: true});
    }

    function getClusterTooltipConfig(data) {
        var cluster = data.rawData,
            serverStatus = cluster.ui_added_parameters.servers_status,
            monitoringStatus = cluster.ui_added_parameters.monitoring;

        var tooltipConfig = {
            title: {
                name: data.name,
                type: "cluster"
            },
            content: {
                iconClass: false,
                info: [
                    {label:"Max. CPU Utilization", value: monitoringStatus.max_cpu_usage_percentage + " %"},
                    {label:"Network Traffic", value: cowu.addUnits2Bytes(monitoringStatus.interface_rt_bytes, false, null, 1, smwc.MONITORING_CONFIG.monitoring_frequency)},
                    {label:"In-Provision", value: serverStatus.inprovision_servers},
                    {label:"Provisioned", value: serverStatus.provisioned_servers + " out of " + serverStatus.total_servers}
                ],
                actions: [
                    {
                        type: "link",
                        text: "View",
                        iconClass: "fa fa-external-link",
                        callback: function(data) {
                            var clusterID = data.name,
                                hashObj = { cluster_id: clusterID };
                            layoutHandler.setURLHashParams(hashObj, {p: "setting_sm_clusters", merge: false, triggerHashChange: true});
                        }
                    }
                ]
            },
            delay: cowc.TOOLTIP_DELAY
        };

        return tooltipConfig;
    }

    function getControlPanelFilterConfig() {
        return {
            groups: [
                {
                    id: "by-node-color",
                    title: false,
                    type: "checkbox-circle",
                    items: [
                        {
                            text: "Provisioned Server = Total Servers",
                            labelCssClass: "okay",
                            filterFn: function(d) { return d.total_servers == d.provisioned_servers; }
                        },
                        {
                            text: "Provisioned Server != Total Servers",
                            labelCssClass: "default",
                            filterFn: function(d) { return d.total_servers != d.provisioned_servers;}
                        }
                    ]
                }
            ]
        };
    }

    function getControlPanelLegendConfig() {
        return {
            groups: [
                {
                    id: "by-node-color",
                    title: "Cluster Color",
                    items: [
                        {
                            text: "Provisioned Server = Total Servers",
                            labelCssClass: "fa fa-circle okay",
                            events: {
                                click: function () {}
                            }
                        },
                        {
                            text: "Provisioned Server != Total Servers",
                            labelCssClass: "fa fa-circle medium",
                            events: {
                                click: function () {}
                            }
                        }
                    ]
                },
                {
                    id: "by-node-size",
                    title: "Cluster Size",
                    items: [
                        {
                            text: "Total Network Traffic",
                            labelCssClass: "fa fa-circle",
                            events: {
                                click: function () {}
                            }
                        }
                    ]
                }
            ]
        };
    }

    return ClusterListView;
});
