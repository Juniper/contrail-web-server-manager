/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-view"
], function (_, ContrailView) {
    var ServerView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this, viewConfig = this.attributes.viewConfig,
                serverId = viewConfig.serverId;

            self.renderServerTabs(serverId);
        },

        renderServerTabs: function(serverId) {
            var serverViewConfig = getServerViewConfig(serverId);
            this.renderView4Config(this.$el, null, serverViewConfig, null, null, null);
        }
    });

    function getServerViewConfig(serverId) {
        return {
            elementId: smwl.SM_SERVER_SECTION_ID,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_TAB_VIEW_ID,
                                view: "ServerTabView",
                                app: cowc.APP_CONTRAIL_SM,
                                viewConfig: {serverId: serverId}
                            }
                        ]
                    }
                ]
            }
        };
    }

    return ServerView;
});
