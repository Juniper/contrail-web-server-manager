/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model'
], function (_, ContrailView, ContrailListModel) {
    var ServerListView = ContrailView.extend({
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

            self.renderView4Config(this.$el, contrailListModel, getServerListViewConfig(viewConfig));
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
                                view: "ZoomScatterChartView",
                                viewConfig: {
                                    loadChartInChunks: true,
                                    chartOptions: {
                                        xLabel: 'CPU Utilization (%)',
                                        yLabel: 'Memory Usage (%)',
                                        forceX: [0, 1],
                                        forceY: [0, 1],
                                        noDataMessage: 'No Data found.',
                                        dataParser: function (response) {
                                            var chartDataValues = [];
                                            for(var i = 0; i < response.length; i++) {
                                                var server = response[i],
                                                    serverUIParams = contrail.handleIfNull(server['ui_added_parameters'], {}),
                                                    serverMonitoring = contrail.handleIfNull(serverUIParams['monitoring'], {});

                                                chartDataValues.push({
                                                    name: contrail.handleIfNull(server['id'], server['mac_address']),
                                                    y: contrail.handleIfNull(serverMonitoring['y'], 0),
                                                    x: contrail.handleIfNull(serverMonitoring['x'], 0),
                                                    size: contrail.handleIfNull(serverMonitoring['size'], 0),
                                                    interface_rt_bytes: serverMonitoring['interface_rt_bytes'],
                                                    mem_usage_mb: serverMonitoring['mem_usage_mb'],
                                                    rawData: serverMonitoring
                                                });
                                            }
                                            return chartDataValues;
                                        },
                                        tooltipConfigCB: serverTooltipFn,
                                        controlPanelConfig: {
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
                                elementId: smwl.SM_SERVER_GRID_VIEW_ID,
                                title: smwl.TITLE_SERVERS,
                                view: "ServerGridView",
                                app: cowc.APP_CONTRAIL_SM,
                                viewConfig: $.extend(true, viewConfig, {
                                    pagerOptions: {
                                        options: {
                                            pageSize: 25,
                                            pageSizeSelect: [25, 50, 100]
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
                    {label: 'CPU Utilization', value: d3.format('.02f')(server['x']) + " %"},
                    {label: 'Memory Usage', value: server['y']  + " % (" + formatBytes(server['mem_usage_mb'] * 1024 * 1024) + ")"},
                    {label: 'Network Traffic', value: cowu.addUnits2Bytes(server['interface_rt_bytes'], false, null, 1, smwc.MONITORING_CONFIG['monitoring_frequency'])}
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

    function getControlPanelLegendConfig() {
        return {
            groups: [
                {
                    id: 'by-node-size',
                    title: 'Server Size',
                    items: [
                        {
                            text: 'Network Traffic',
                            labelCssClass: 'icon-circle',
                            events: {
                                click: function (event) {}
                            }
                        }
                    ]
                }
            ]
        };
    };

    return ServerListView;
});