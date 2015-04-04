/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'contrail-list-model'
], function (_, Backbone, ContrailListModel) {
    var ServerListView = Backbone.View.extend({
        render: function () {
            var self = this, viewConfig = this.attributes.viewConfig,
                prefixId = smwc.SERVER_PREFIX_ID,
                queryString = smwu.getQueryString4ServersUrl(viewConfig['hashParams']),
                hashParams = viewConfig['hashParams'];

            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: smwu.getObjectDetailUrl(prefixId) + queryString
                    },
                    hlRemoteConfig: smwgc.getServerMonitoringHLazyRemoteConfig(viewConfig, smwp.serverMonitoringDataParser)
                }
            };

            if(queryString == '') {
                listModelConfig['cacheConfig'] = {
                    ucid: smwc.UCID_ALL_SERVER_LIST
                };
            } else if(hashParams['cluster_id'] != null && hashParams['tag'] == null) {
                listModelConfig['cacheConfig'] = {
                    ucid: smwc.get(smwc.UCID_CLUSTER_SERVER_LIST, hashParams['cluster_id'])
                };
            }

            var contrailListModel = new ContrailListModel(listModelConfig);

            cowu.renderView4Config(this.$el, contrailListModel, getServerListViewConfig(viewConfig));
        }
    });

    function getServerListViewConfig(viewConfig) {
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
                                    loadChartInChunks: true,
                                    parseFn: function (response) {
                                        return {
                                            d: [{
                                                key: 'Servers',
                                                values: response
                                            }],
                                            xLbl: '% CPU Utilization',
                                            yLbl: '% Memory Usage',
                                            forceX: [0, 1],
                                            forceY: [0, 1],
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
                                viewConfig: $.extend(true, viewConfig, {
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
        var tooltipConfig = {
            title: {
                name: server.name,
                type: 'server'
            },
            content: {
                iconClass: false,
                info: [
                    {label: '% CPU Utilization', value: d3.format('.02f')(server['x'])},
                    {label: '% Memory Usage', value: server['y']},
                    {label: 'Memory Usage', value: formatBytes(server['mem_usage_mb'] * 1024 * 1024)},
                    {label: 'Network Traffic', value: formatBytes(server['total_interface_rt_bytes'])},
                    {label: 'Disk Read | Write', value: formatBytes(server['total_disk_rw_MB'] * 1024 * 1024)}
                ],
                actions: [
                    {
                        type: 'link',
                        text: 'View',
                        iconClass: 'icon-external-link',
                        callback: function(data) {
                            var serverId = data['name'],
                                hashObj = {server_id: serverId};

                            layoutHandler.setURLHashParams(hashObj, {p: "setting_sm_servers", merge: false, triggerHashChange: true});
                        }
                    }
                ]
            }
        };

        return tooltipConfig;
    };

    return ServerListView;
});