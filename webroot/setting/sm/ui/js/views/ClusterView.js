/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var ClusterView = Backbone.View.extend({
        render: function () {
            var self = this, viewConfig = this.attributes.viewConfig,
                clusterId = viewConfig['clusterId'];

            self.renderServerTabs(clusterId);
        },

        renderServerTabs: function(clusterId) {
            var currentHashParams = layoutHandler.getURLHashParams(),
                clusterViewConfig = getClusterViewConfig(clusterId);

            cowu.renderView4Config(this.$el, null, clusterViewConfig, null, null, null);
        }
    });

    function getClusterViewConfig(clusterId) {
        return {
            elementId: smwl.SM_CLUSTER_SECTION_ID,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_CLUSTER_TAB_VIEW_ID,
                                view: "ClusterTabView",
                                app: cowc.APP_CONTRAIL_SM,
                                viewConfig: {clusterId: clusterId}
                            }
                        ]
                    }
                ]
            }
        }
    };

    return ClusterView;
});