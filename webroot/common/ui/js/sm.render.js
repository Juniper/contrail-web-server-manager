/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'setting/sm/ui/js/views/ClusterListView',
    'setting/sm/ui/js/views/ClusterGridView',
    'setting/sm/ui/js/views/ServerListView',
    'setting/sm/ui/js/views/ServerGridView',
    'setting/sm/ui/js/views/ClusterView',
    'setting/sm/ui/js/views/ClusterTabView',
    'setting/sm/ui/js/views/ImageListView',
    'setting/sm/ui/js/views/ImageGridView',
    'setting/sm/ui/js/views/ServerView',
    'setting/sm/ui/js/views/ServerTabView',
    'setting/sm/ui/js/views/PackageListView',
    'setting/sm/ui/js/views/PackageGridView',
    'setting/sm/ui/js/views/ServerInventoryView',
    'setting/sm/ui/js/views/ServerMonitoringView'
], function (_, ClusterListView, ClusterGridView, ServerListView, ServerGridView, ClusterView, ClusterTabView, ImageListView, ImageGridView, ServerView, ServerTabView,
             PackageListView, PackageGridView, ServerInventoryView, ServerMonitoringView) {
    var SMRenderUtils = function () {
        var self = this;

        this.renderView = function (viewName, parentElement, model, viewAttributes, modelMap, rootView) {
            var elementView;

            switch (viewName) {
                case "ClusterListView":
                    elementView = new ClusterListView({ el: parentElement, model: model, attributes: viewAttributes, rootView: rootView  });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    return elementView;

                case "ClusterGridView":
                    elementView = new ClusterGridView({ el: parentElement, model: model, attributes: viewAttributes, rootView: rootView  });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    return elementView;

                case "ServerListView":
                    elementView = new ServerListView({ el: parentElement, model: model, attributes: viewAttributes, rootView: rootView  });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    return elementView;

                case "ServerGridView":
                    elementView = new ServerGridView({ el: parentElement, model: model, attributes: viewAttributes, rootView: rootView  });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    return elementView;

                case "ClusterView":
                    elementView = new ClusterView({ el: parentElement, model: model, attributes: viewAttributes, rootView: rootView  });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    return elementView;

                case "ClusterTabView":
                    elementView = new ClusterTabView({ el: parentElement, model: model, attributes: viewAttributes, rootView: rootView  });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    return elementView;

                case "ImageListView":
                    elementView = new ImageListView({ el: parentElement, model: model, attributes: viewAttributes, rootView: rootView  });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    return elementView;

                case "ImageGridView":
                    elementView = new ImageGridView({ el: parentElement, model: model, attributes: viewAttributes, rootView: rootView  });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    return elementView;

                case "ServerView":
                    elementView = new ServerView({ el: parentElement, model: model, attributes: viewAttributes, rootView: rootView  });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    return elementView;

                case "ServerTabView":
                    elementView = new ServerTabView({ el: parentElement, model: model, attributes: viewAttributes, rootView: rootView  });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    return elementView;

                case "PackageListView":
                    elementView = new PackageListView({ el: parentElement, model: model, attributes: viewAttributes, rootView: rootView  });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    return elementView;

                case "PackageGridView":
                    elementView = new PackageGridView({ el: parentElement, model: model, attributes: viewAttributes, rootView: rootView  });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    return elementView;

                case "ServerInventoryView":
                    elementView = new ServerInventoryView({ el: parentElement, model: model, attributes: viewAttributes, rootView: rootView  });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    return elementView;

                case "ServerMonitoringView":
                    elementView = new ServerMonitoringView({ el: parentElement, model: model, attributes: viewAttributes, rootView: rootView  });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    return elementView;
            }
        };
    };
    return SMRenderUtils;
});
