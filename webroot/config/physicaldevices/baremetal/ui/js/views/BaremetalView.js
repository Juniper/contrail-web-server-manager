define([
    'underscore',
    'contrail-view',
    'contrail-list-model',
    'sm-basedir/config/physicaldevices/baremetal/ui/js/models/BaremetalModel',
    'sm-basedir/config/physicaldevices/baremetal/ui/js/views/BaremetalEditView',
    "sm-constants",
    "sm-labels",
    "sm-grid-config"
], function (_, ContrailView, ContrailListModel, BaremetalModel, BaremetalEditView, smwc, smwl, smwgc) {
         var prefixId = smwc.BAREMETAL_PREFIX_ID,
         baremetalEditView = new BaremetalEditView(),
         gridElId = '#' + prefixId + cowc.RESULTS_SUFFIX_ID;

    var BaremetalView = ContrailView.extend({
        el: $(contentContainer),

        render: function (viewConfig) {
            var self = this;
            var hashParams = viewConfig['hashParams']
            if (hashParams['server_id'] != null) {
                this.renderServer(hashParams['server_id']);
            } else {
                var remoteAjaxConfig = {
                        remote: {
                            ajaxConfig: {
                                url: smwc.URL_BAREMETAL_SERVER
                            }
                        },
                        cacheConfig: {
                        }
                }
                var contrailListModel = new ContrailListModel(remoteAjaxConfig);
                self.renderView4Config(this.$el, contrailListModel,
                        getBMServersViewConfig(viewConfig));
            }
        },

        
    });
    
    function getBMServersGridConfig (viewConfig) {
        var serverColumnsType = viewConfig['serverColumnsType'],
            showAssignRoles = viewConfig['showAssignRoles'];

        var gridConfig = {
            header: {
                title: {
                    text: smwl.TITLE_BAREMETAL_SERVERS
                },
                advanceControls: headerActionConfig
            },
            columnHeader: {
                columns: smwgc.getBaremetalServerColumns(serverColumnsType)
            },
            body: {
                options: {
                    actionCell: rowActionConfig,
                    /*checkboxSelectable: {
                        onNothingChecked: function (e) {
                            $('#btnActionServers').addClass('disabled-link').removeAttr('data-toggle');
                        },
                        onSomethingChecked: function (e) {
                            $('#btnActionServers').removeClass('disabled-link').attr('data-toggle', 'dropdown');
                        }
                    },*/
                    checkboxSelectable : false,
                    detail: {
                        template: $('#' + smwc.TMPL_BAREMETAL_PAGE_DETAIL).html()
                    }
                },
                dataSource: {
                    data : []
                }
            }
        };
        
        return gridConfig;
    }
    
    function getBMServersViewConfig (viewConfig) {
        return {
            elementId : 'BareMetalServersSection',
            view : "SectionView",
            viewConfig : {
                rows : [ {
                    columns : [ {
                        elementId : 'BareMetalServersGrid',
                        title : smwl.TITLE_BAREMETAL_SERVERS,
                        view : "GridView",
                        viewConfig : {
                            elementConfig :
                                getBMServersGridConfig(viewConfig)
                        }
                    } ]
                } ]
            }
        }
    }
    var rowActionConfig = [
        smwgc.getConfigureAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + cowc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
                baremetalModel = new BaremetalModel(dataItem),
                checkedRow = [dataItem],
                title = smwl.TITLE_EDIT_CONFIG;

            baremetalEditView.model = baremetalModel;
            baremetalEditView.renderEditBaremetal({"title": title, checkedRows: checkedRow, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        }),
        smwgc.getReimageAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + cowc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
                baremetalModel = new BaremetalModel(dataItem),
                checkedRow = [dataItem],
                title = smwl.TITLE_REIMAGE;//+ ' ('+ dataItem['id'] +')';

            baremetalEditView.model = baremetalModel;
            baremetalEditView.renderReimage({"title": title, checkedRows: checkedRow, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        }, true),
        smwgc.getDeleteAction(function (rowIndex) {
            var dataItem = $('#' + prefixId + cowc.RESULTS_SUFFIX_ID).data('contrailGrid')._dataView.getItem(rowIndex),
                baremetalModel = new BaremetalModel(dataItem),
                checkedRow = dataItem,
                title = smwl.TITLE_DEL_SERVER;

            baremetalEditView.model = baremetalModel;
            baremetalEditView.renderDeleteBaremetal({"title": title, checkedRows: checkedRow, callback: function () {
                loadFeature({p: smwc.URL_HASH_BM_SERVERS});
            }});
        }, true)
    ];
    var headerActionConfig = [
          {
              "type": "link",
              "title": smwl.TITLE_ADD_CLUSTER,
              "iconClass": "fa fa-plus",
              "onClick": function () {
                  var baremetalModel = new BaremetalModel();

                  baremetalEditView.model = baremetalModel;
                  baremetalEditView.renderAddBaremetal({"title": smwl.TITLE_BAREMETAL_SERVER, callback: function () {
                      var dataView = $(gridElId).data("contrailGrid")._dataView;
                      dataView.refreshData();
                  }});
              }
          }
      ];
     return BaremetalView;
});
