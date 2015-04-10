/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'contrail-list-model'
], function (_, Backbone, ContrailListModel) {
    var ClusterListView = Backbone.View.extend({
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
            cowu.renderView4Config(this.$el, contrailListModel, getClusterListViewConfig());
        }
    });

    function getClusterListViewConfig() {
        return {
            elementId: cowu.formatElementId([smwl.SM_CLUSTER_LIST_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    /*{
                        columns: [
                            {
                                elementId: smwl.SM_CLUSTER_SCATTER_CHART_ID,
                                title: smwl.TITLE_CLUSTERS,
                                view: "ScatterChartView",
                                viewConfig: {
                                    class: "port-distribution-chart",
                                    loadChartInChunks: true,
                                    parseFn: function (response) {
                                        var chartDataValues = [];
                                        for(var i = 0; i < response.length; i++) {
                                            var cluster = response[i],
                                                serverStatus = cluster['ui_added_parameters']['servers_status'];

                                            chartDataValues.push({
                                                name: cluster['id'],
                                                x: serverStatus['total_servers'],
                                                y: cluster['avg_disk_rw_MB'],
                                                color: (serverStatus['total_servers'] == serverStatus['provisioned_servers']) ? "#2ca02c" : null,
                                                size: cluster['total_interface_rt_bytes'],
                                                rawData: cluster
                                            });
                                        }
                                        return {
                                            d: [{
                                                key: 'Clusters',
                                                values: chartDataValues
                                            }],
                                            xLbl: 'Total Servers',
                                            yLbl: 'Avg. Disk Read | Write',
                                            forceX: [0, 20],
                                            yLblFormat: function(yValue) {
                                                var formattedValue = formatBytes(yValue * 1024 * 1024, false, null, 1);
                                                return formattedValue;
                                            },
                                            chartOptions: {tooltipFn: getClusterTooltipConfig, clickFn: onScatterChartClick},
                                            hideLoadingIcon: false
                                        }
                                    }
                                }
                            },
                        ]
                    },
                    */
                    {
                        columns: [
                            {
                                elementId: smwl.SM_CLUSTER_SCATTER_CHART_ID,
                                title: smwl.TITLE_CLUSTERS,
                                view: "ZoomScatterChartView",
                                viewConfig: {
                                    loadChartInChunks: true,
                                    chartOptions: {
                                        xLabel: 'Total Servers',
                                        yLabel: 'Avg. Disk Read | Write',
                                        forceX: [0, 20],
                                        forceY: [0, 10],
                                        yLabelFormat: function(yValue) {
                                            var formattedValue = formatBytes(yValue * 1024 * 1024, false, null, 1);
                                            return formattedValue;
                                        },
                                        dataParser: function (response) {
                                            var chartDataValues = [];
                                            for(var i = 0; i < response.length; i++) {
                                                var cluster = response[i],
                                                    serverStatus = cluster['ui_added_parameters']['servers_status'];

                                                chartDataValues.push({
                                                    name: cluster['id'],
                                                    x: serverStatus['total_servers'],
                                                    y: contrail.handleIfNull(cluster['avg_disk_rw_MB'], 0),
                                                    color: (serverStatus['total_servers'] == serverStatus['provisioned_servers']) ? "okay" : "default",
                                                    size: contrail.handleIfNull(cluster['total_interface_rt_bytes'], 0),
                                                    rawData: cluster
                                                });
                                            }
                                            return chartDataValues;
                                        },
                                        tooltipConfigCB: getClusterTooltipConfig,
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
        }
    };

    function onScatterChartClick(chartConfig) {
        var clusterID = chartConfig.name, hashObj = { cluster_id: clusterID };

        layoutHandler.setURLHashParams(hashObj, {p: "setting_sm_clusters", merge: false, triggerHashChange: true});
    };

    function getClusterTooltipConfig(data) {
        var cluster = data.rawData,
            serverStatus = data.rawData['ui_added_parameters']['servers_status'];

        var tooltipConfig = {
            title: {
                name: data.name,
                type: 'cluster'
            },
            content: {
                iconClass: false,
                info: [
                    {label:'Avg. Disk Read | Write', value: formatBytes(cluster['avg_disk_rw_MB'] * 1024 * 1024, false, null, 1)},
                    {label:'Total Network Traffic', value: formatBytes(cluster['total_interface_rt_bytes'])},
                    {label:'In-Provision', value: serverStatus['inprovision_servers']},
                    {label:'Provisioned', value: serverStatus['provisioned_servers'] + ' out of ' + serverStatus['total_servers']}
                ],
                actions: [
                    {
                        type: 'link',
                        text: 'View',
                        iconClass: 'icon-external-link',
                        callback: function(data) {
                            var clusterID = data.name,
                                hashObj = { cluster_id: clusterID };
                            layoutHandler.setURLHashParams(hashObj, {p: "setting_sm_clusters", merge: false, triggerHashChange: true});
                        }
                    }
                ]
            }
        };

        return tooltipConfig;
    };

    return ClusterListView;
});