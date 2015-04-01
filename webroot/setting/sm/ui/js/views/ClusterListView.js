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
            var self = this, prefixId = smwc.CLUSTER_PREFIX_ID;

            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: smwu.getObjectDetailUrl(prefixId, smwc.SERVERS_STATE_PROCESSOR)
                    }
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
                    {
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
                                                y: serverStatus['provisioned_servers'],
                                                color: (serverStatus['total_servers'] == serverStatus['provisioned_servers']) ? "green" : null,
                                                size: 6,
                                                rawData: cluster
                                            });
                                        }
                                        return {
                                            d: [{
                                                key: 'Clusters',
                                                values: chartDataValues
                                            }],
                                            xLbl: 'Total Servers',
                                            yLbl: 'Provisioned Servers',
                                            forceX: [0, 20],
                                            forceY: [0, 20],
                                            chartOptions: {tooltipFn: clusterTooltipFn, clickFn: onScatterChartClick},
                                            hideLoadingIcon: false
                                        }
                                    }
                                }
                            },
                        ]
                    },
                    /*
                    {
                        columns: [
                            {
                                elementId: smwl.SM_CLUSTER_SCATTER_CHART_ID,
                                title: smwl.TITLE_CLUSTERS,
                                view: "ZoomScatterChartView",
                                viewConfig: {
                                    loadChartInChunks: false,
                                    chartOptions: {
                                        xLabel: 'Total Servers',
                                        yLabel: 'Provisioned Servers',
                                        forceX: [0, 20],
                                        forceY: [0, 20],
                                        dataParser: function (response) {
                                            var chartDataValues = [];
                                            for(var i = 0; i < response.length; i++) {
                                                var cluster = response[i],
                                                    serverStatus = cluster['ui_added_parameters']['servers_status'];

                                                chartDataValues.push({id: cluster['id'], x: serverStatus['total_servers'], y: serverStatus['provisioned_servers']})
                                            }
                                            return chartDataValues;
                                        }
                                    }
                                }
                            },
                        ]
                    },*/
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
        var clusterID = chartConfig['name'], hashObj = { cluster_id: clusterID };

        layoutHandler.setURLHashParams(hashObj, {p: "setting_sm_clusters", merge: false, triggerHashChange: true});
    };

    function clusterTooltipFn(cluster) {
        var tooltipContents = [
            {lbl:'Id', keyClass: 'span4', value: cluster['name'], valueClass: 'span8'},
            {lbl:'Provisioned', keyClass: 'span4', value:cluster['y'], valueClass: 'span8'},
            {lbl:'Total Servers', keyClass: 'span4', value:cluster['x'], valueClass: 'span8'}
        ];
        return tooltipContents;
    };

    return ClusterListView;
});