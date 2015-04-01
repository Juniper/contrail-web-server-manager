/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var ServerListView = Backbone.View.extend({
        render: function () {
            var self = this, viewConfig = this.attributes.viewConfig;

            cowu.renderView4Config(this.$el, null, getServerListViewConfig(viewConfig));
        }
    });

    function getServerListViewConfig(viewConfig) {
        var queryString = smwu.getQueryString4ServersUrl(viewConfig['hashParams']),
            hashParams = viewConfig['hashParams'];

        queryString = queryString.replace("?", "");

        var listModelConfig = {
            remote: {
                ajaxConfig: {
                    url: smwc.get(smwc.SM_SERVER_MONITORING_INFO_URL, queryString)
                }
            }
        };

        if (queryString == '') {
            listModelConfig['cacheConfig'] = {
                ucid: smwc.UCID_ALL_SERVER_MONITORING_LIST
            };
        } else if (hashParams['cluster_id'] != null && hashParams['tag'] == null) {
            listModelConfig['cacheConfig'] = {
                ucid: smwc.get(smwc.UCID_CLUSTER_SERVER_MONITORING_LIST, hashParams['cluster_id'])
            };
        }

        return {
            elementId: cowu.formatElementId([smwl.SM_SERVER_LIST_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_SCATTER_CHART_ID,
                                title: smwl.TITLE_SERVERS,
                                view: "ScatterChartView",
                                viewConfig: {
                                    class: "port-distribution-chart",
                                    loadChartInChunks: false,
                                    modelConfig: listModelConfig,
                                    parseFn: function (response) {
                                        var chartDataValues = smwp.serverMonitoringDataParser(response);

                                        return {
                                            d: [{
                                                key: 'Servers',
                                                values: chartDataValues
                                            }],
                                            yLbl: '% CPU Usage',
                                            xLbl: 'Memory Usage',
                                            forceY: [0, 1],
                                            xLblFormat: function(xValue) {
                                                var formattedValue = formatBytes(xValue * 1024 * 1024);
                                                return formattedValue;
                                            },
                                            chartOptions: {tooltipFn: serverTooltipFn, clickFn: onScatterChartClick},
                                            hideLoadingIcon: false
                                        }
                                    }
                                }
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_GRID_VIEW_ID,
                                title: smwl.TITLE_SERVERS,
                                view: "ServerGridView",
                                app: cowc.APP_CONTRAIL_SM,
                                viewConfig: $.extend(true, {modelConfig: listModelConfig}, viewConfig, {
                                    pagerOptions: {
                                        options: {
                                            pageSize: 8,
                                            pageSizeSelect: [8, 25, 50, 100]
                                        }
                                    }
                                })
                            }
                        ]
                    }
                ]
            }
        }
    };


    function onScatterChartClick(chartConfig) {
        var serverId = chartConfig['name'],
            hashObj = {server_id: serverId};

        layoutHandler.setURLHashParams(hashObj, {p: "setting_sm_servers", merge: false, triggerHashChange: true});
    };

    function serverTooltipFn(server) {
        var tooltipContents = [
            {lbl:'Id', keyClass: 'span4', value: server['name'], valueClass: 'span8'},
            {lbl: '% CPU Usage', keyClass: 'span6', value: d3.format(',')(server['y']), valueClass: 'span6'},
            {lbl: 'Memory Usage', keyClass: 'span6', value: formatBytes(server['x'] * 1024 * 1024), valueClass: 'span6'},
            {lbl: 'Disk Read/Write', keyClass: 'span6', value: formatBytes(server['total_disk_rw_MB'] * 1024 * 1024), valueClass: 'span6'},
            {lbl: 'Network Traffic', keyClass: 'span6', value: formatBytes(server['total_interface_rt_bytes']), valueClass: 'span6'}
        ];

        return tooltipContents;
    };

    return ServerListView;
});