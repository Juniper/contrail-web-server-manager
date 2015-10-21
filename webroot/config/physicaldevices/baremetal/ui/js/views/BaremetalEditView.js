/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'knockback'
], function (_, ContrailView, Knockback) {
    var prefixId = smwc.BAREMETAL_PREFIX_ID,
        modalId = 'configure-' + prefixId,
        editTemplate = contrail.getTemplate4Id(smwc.TMPL_BM_EDIT_FORM);

    var localVnsMap = {};

    var BaremetalEditView = ContrailView.extend({
        modalElementId: '#' + modalId,
        
        renderAddBaremetal: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this;

            //fetch the virtual networks for pupulating the dropdown
            this.model.getVirtualNetworks();
            cowu.createWizardModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {}, 'onCancel': function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).find('.contrailWizard').data('contrailWizard').destroy();
                $("#" + modalId).modal('hide');
            }});

            self.renderView4Config($("#" + modalId).find("#bm-" + prefixId + "-form"), this.model, getAddBaremetalViewConfig(self.model, options['callback']), smwc.KEY_ADD_VALIDATION);
            
            this.model.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_SELECT_SERVER]) + cowc.FORM_SUFFIX_ID, false);
            this.model.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_CONFIGURE_SERVER]) + cowc.FORM_SUFFIX_ID, false);
            
            Knockback.applyBindings(this.model, document.getElementById(modalId));
            kbValidation.bind(this);
        },
        
        renderEditBaremetal: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                data = options['checkedRows'],
                self = this;

            cowu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                var vnTxt = $('#'+ cowu.formatElementId([prefixId, smwl.TITLE_EDIT_BAREMETAL_VN]) + '_dropdown').data('contrailDropdown').value();
                var newVN = localVnsMap[vnTxt];
                data[0]['vnData'] = newVN;

                self.model.editBaremetal(data,{
                    init: function () {
                        self.model.showErrorAttr(prefixId + smwc.TITLE_EDIT_CONFIG, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(prefixId + smwc.TITLE_EDIT_CONFIG, error.responseText);
                        });
                    }
                });
                // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal('hide');
            }});

            self.renderView4Config($("#" + modalId).find("#bm-" + prefixId + "-form"), this.model, getEditViewConfig(options['checkedRows']), "configureValidation");

            //TODO: As a workaround doing get vn sepearatly for edit
            self.model.getVN({
                init : function() {
                    self.model.showErrorAttr(prefixId + smwc.TITLE_EDIT_CONFIG, false);
                    //cowu.enableModalLoading(modalId);
                },
                success: function(res) {
                    var formattedData = parseVns(res);
                    var vnDropdown = $('#'+ cowu.formatElementId([prefixId, smwl.TITLE_EDIT_BAREMETAL_VN]) + '_dropdown').data('contrailDropdown');
                    vnDropdown.setData(formattedData);
                    var selText = '';
                    for(var i =0; i < formattedData.length; i++) {
                        if(formattedData[i].key === data[0].vnUuid) {
                            selText = formattedData[i].text;
                            break;
                        }
                    }
                    vnDropdown.value(selText);
                },
                error: function(error) {
                    cowu.disableModalLoading(modalId, function () {
                        self.model.showErrorAttr(prefixId + smwc.TITLE_EDIT_CONFIG, error.responseText);
                    });
                }
            })        
            this.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
            
            Knockback.applyBindings(this.model, document.getElementById(modalId));
            kbValidation.bind(this);
        },
        
        renderReimage: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                self = this;

            cowu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                self.model.reimage(options['checkedRows'],{
                    init: function () {
                        self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, error.responseText);
                        });
                    }
                });
                // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal('hide');
            }});

            self.renderView4Config($("#" + modalId).find("#bm-" + prefixId + "-form"), this.model, reimageViewConfig, "configureValidation");
            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            kbValidation.bind(this);
        },
        
        renderDeleteBaremetal: function (options) {
            var textTemplate = contrail.getTemplate4Id("bm-delete-server-template"),
                elId = 'deleteBaremetal',
                that = this,
                checkedRows = options['checkedRows'],
                serversToBeDeleted = {'serverId': [], 'elementId': elId};
            serversToBeDeleted['serverId'].push(checkedRows['id']);

            cowu.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'btnName': 'Confirm', 'body': textTemplate(serversToBeDeleted), 'onSave': function () {
                that.model.deleteBaremetal(options['checkedRows'], {
                    init: function () {
                        that.model.showErrorAttr(elId, false);
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            that.model.showErrorAttr(elId, error.responseText);
                        });
                    }
                });
            }, 'onCancel': function () {
                $("#" + modalId).modal('hide');
            }});

            this.model.showErrorAttr(elId, false);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            kbValidation.bind(this);
        }
    });
    
    var selectServerViewConfig = [{
        elementId: cowu.formatElementId([prefixId, smwl.TITLE_SELECT_BAREMETAL_SERVER]),
        title: smwl.TITLE_SELECT_BAREMETAL_SERVER,
        view: "SectionView",

        viewConfig: {
            rows: [
                {
                    columns: [
                        {
                            elementId: cowu.formatElementId([prefixId, smwl.TITLE_SELECT_BAREMETAL_SERVER, smwl.TITLE_FILTER_BAREMETALS]),
                            view: "FormGridView",
                            viewConfig: {
                                path: 'id',
                                class: "span12",
                                elementConfig: getSelectedServerGridElementConfig('select-baremetal', 'filterInNull=cluster_id')
                            }
                        }
                    ]
                }
            ]
        }
    }];      
    
    var configureServerViewConfig = [{
        elementId: cowu.formatElementId([prefixId, smwl.TITLE_SELECT_INTERFACE]),
        title: smwl.TITLE_SELECT_INTERFACE,
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                   /* columns : [

                               {
                                   elementId: cowu.formatElementId([prefixId, smwl.TITLE_SELECT_INTERFACE, smwl.TITLE_BAREMETAL_INTERFACES]),
                                   view: "FormDynamicGridView",
                                   viewConfig: {
                                       path: 'network.interfaces',
                                       class: "span12",
                                       modelAttributePath: 'network.interfaces',
                                       elementConfig: {
                                           options: {
                                               uniqueColumn: 'interface',
                                               events: {
                                                   onUpdate: function () {
//                                                       var interfaces = $('#baremetal_select_interface_baremetal_interfaces').data('contrailDynamicgrid')._grid.getData(),
//                                                           managementInterfacePrevData = $('#management_interface_dropdown').data('contrailDropdown').getAllData(),
//                                                           managementInterfaceData = [],
//                                                           controlDataInterfacePrevData = $('#control_data_interface_dropdown').data('contrailDropdown').getAllData(),
//                                                           controlDataInterfaceData = [],
//                                                           bondMemberInterfaces = [];
//
//                                                       $.each(interfaces, function(interfaceKey, interfaceValue) {
//                                                           bondMemberInterfaces = bondMemberInterfaces.concat(interfaceValue.member_interfaces);
//                                                       });
//
//                                                       $.each(interfaces, function (interfaceKey, interfaceValue) {
//                                                           if (interfaceValue.name != '' && bondMemberInterfaces.indexOf(interfaceValue.name) == -1) {
//                                                               if (interfaceValue.type == 'physical') {
//                                                                   managementInterfaceData.push({
//                                                                       id: interfaceValue.name,
//                                                                       text: interfaceValue.name
//                                                                   });
//                                                               }
//
//                                                               controlDataInterfaceData.push({
//                                                                   id: interfaceValue.name,
//                                                                   text: interfaceValue.name
//                                                               });
//                                                           }
//                                                       });
//
//                                                       if (JSON.stringify(managementInterfacePrevData) != JSON.stringify(managementInterfaceData)) {
//                                                           $('#management_interface_dropdown').data('contrailDropdown').setData(managementInterfaceData)
//                                                       }
//                                                       if (JSON.stringify(controlDataInterfacePrevData) != JSON.stringify(controlDataInterfaceData)) {
//                                                           $('#control_data_interface_dropdown').data('contrailDropdown').setData(controlDataInterfaceData)
//                                                       }
                                                   }
                                               }
                                           },
                                           columns: [
//                                                {
//                                                    id: "name", name: "Name", field: "name", width: 85,
//                                                    editor: ContrailGrid.Editors.Text,
//                                                    formatter: ContrailGrid.Formatters.Text,
//                                                    elementConfig: {
//                                                        placeholder: 'Dummy field'
//                                                    }
//                                                },
                                               {
                                                   id: "baremetal_interface", name: "Interface", field: "interface", width: 250,
                                                   //defaultValue: 'physical',
                                                   editor: ContrailGrid.Editors.ContrailDropdown,
//                                                   formatter: function (r, c, v, cd, dc) {
//                                                       var ContrailGrid.Formatters.ContrailDropdown(r, c, v, cd, dc) ;
//                                                       return 
//                                                   },
                                                   editEnabler: function (dc) {
                                                       return (dc.type == 'bond');
                                                   },
                                                   initSetData: function (args, $contrailDropdown) {
                                                       var checkedRows =  $('#' + cowu.formatElementId([prefixId, smwl.TITLE_SELECT_BAREMETAL_SERVER, smwl.TITLE_FILTER_BAREMETALS]))
                                                                           .data('contrailGrid').getCheckedRows()[0];
//                                                       var dummydata = smwc.DUMMY_DATA[0];//TODO remove and use the original data from checked rows
                                                       if(checkedRows != null){
//                                                           checkedRows['network'] = dummydata.network;
                                                           var interfaceData = [];
                                                           var interfaces = jsonPath(checkedRows,'$.network.interfaces')[0];
                                                           if(interfaces){
                                                               $.each(interfaces,function(i,intf){
                                                                   interfaceData.push({text:intf.name,value:intf.name});
                                                                   intfsMap[intf.name] = intf.mac_address;
                                                               });
                                                           }
                                                           $contrailDropdown.setData(interfaceData)
                                                       }
                                                   },
                                                   elementConfig: {
                                                       width: 'element',
                                                       placeholder: 'Select Interface',
                                                       dataTextField: "text",
                                                       dataValueField: "value",
                                                       data: [],
//                                                       data : function(){
//                                                           if($('#select-baremetal-filtered-servers').length > 0){
//                                                               var checkedRows =  $('#select-baremetal-filtered-servers').data('contrailGrid').getCheckedRows();
//                                                               var selectedServer = checkedRows[0];
//                                                               return [{text:'Intf1', value:'intf1'}];
//                                                           } else {
//                                                               return [{text:'No Interfaces found', value:'None'}];
//                                                           }
//                                                       }()
                                                       
                                                   }

                                               },
                                               {
                                                   id: "vn", name: "Virtual Network", field: "vn", width: 475,
                                                   //defaultValue: 'physical',
                                                   editor: ContrailGrid.Editors.ContrailDropdown,
                                                   formatter: ContrailGrid.Formatters.Text,
                                                   elementConfig: {
                                                       width: 'element',
                                                       placeholder: 'Select Network',
                                                       dataTextField: "text",
                                                       dataValueField: "value",
                                                       dataSource : {
                                                           type : 'remote',
                                                           url : smwc.URL_NETWORKS,
                                                           parse: parseVns
                                                       },
                                                       formatter:function(r,c,v,cd,dc) {
                                                           return dc.text;
                                                        },
                                                   }
                                               }
                                           ]
                                       }
                                   }
                               }
                           
                    ]*/
                    columns: [
                              {
                                  elementId: cowu.formatElementId([prefixId, smwl.TITLE_SELECT_INTERFACE, smwl.TITLE_BAREMETAL_INTERFACES]),
                                  view: "FormEditableGridView",
                                  viewConfig: {
                                      path: "interfaces",
//                                      validation: 'bondValidation',
                                      collection: "filterInterfaces()",
                                        columns : [
                                            {
                                                elementId : 'baremetal_interface',
                                                name : 'Baremetal Interface',
                                                view : "FormDropdownView",
                                                class : "",
                                                viewConfig : {
                                                    templateId: cowc.TMPL_EDITABLE_GRID_DROPDOWN_VIEW,
                                                    path : 'baremetal_interface',
                                                    dataBindValue : 'baremetal_interface()',
                                                    dataBindOptionList : '$root.getBaremetalInterfaces()',
                                                    width : 200,
                                                    elementConfig : {
                                                        placeholder : 'Select baremetal interface'
                                                    }
                                                }
                                            },
                                            {
                                                elementId : 'vn',
                                                name : 'Virtual Network',
                                                view : "FormDropdownView",
                                                class : "",
                                                viewConfig : {
                                                    templateId: cowc.TMPL_EDITABLE_GRID_DROPDOWN_VIEW,
                                                    path : 'vn',
                                                    dataBindValue : 'vn()',
                                                    dataBindOptionList : '$root.populateVirtualNetworks()',
                                                    width : 500,
                                                    elementConfig : {
                                                        placeholder : 'Select Virtual Network'
                                                    }
                                                }
                                            }
                                      ],
                                      rowActions: [
                                          {onClick: "function() { $root.deleteInterface($data, this); }", iconClass: 'icon-minus'}
                                      ],
                                      gridActions: [
                                          {onClick: "function() { addInterface(); }", buttonTitle: "Add"}
                                      ]
                                  }
                              }
                          ]
                }
            ]
        }
    
    },
    {
        elementId: cowu.formatElementId([prefixId, smwl.TITLE_SELECT_IMAGE]),
        title: smwl.TITLE_SELECT_IMAGE,
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {
                            elementId: 'base_image_id',
                            view: "FormDropdownView",
                            viewConfig : {
                                path : 'base_image_id',
                                class : "span6",
                                dataBindValue : 'base_image_id',
                                elementConfig : {
                                    placeholder : smwl.SELECT_IMAGE,
                                    dataTextField : "id",
                                    dataValueField : "id",
                                    dataSource : {
                                        type : 'remote',
                                        url : smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInImages')
                                    }
                                }
                            }
                        },
                        {
                            elementId: 'reimage',
                            view: "FormCheckboxView",
                            viewConfig : {
                                path : 'baremetal_reimage',
                                class : "span6",
                                dataBindValue : 'baremetal_reimage',
                                elementConfig : {
                                    label:'Reimage',
                                    isChecked:false
                                }
                            }
                        }
                    ]
                }
            ]
        }
    }];

    var configureInterfacesViewConfig = [{
        elementId: cowu.formatElementId([prefixId, smwl.TITLE_CONFIGURE_INTERFACES]),
        title: smwl.TITLE_CONFIGURE_INTERFACES,
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                           {
                            elementId : 'interface',
                            view : "FormDropdownView",
                            viewConfig : {
                                path : 'parameters.server',
                                dataBindValue : 'parameters().servers',
                                class : "span6",
                                elementConfig : {
                                    dataTextField : "text",
                                    dataValueField : "id",
                                    data : smwc.STATES
                                }
                            }
                        },
                    ]
                }
            ]
        }
    }];
    
    function getAddBaremetalViewConfig(baremetalModel, callback) {
        var addBaremetalViewConfig = {
                elementId: cowu.formatElementId([prefixId, smwl.TITLE_SELECT_BAREMETAL_SERVER]),
                view: "WizardView",
                viewConfig: {
                    steps: []
                }
            },
            steps = [],
            selectServerStepViewConfig = null,
            configureServerStepViewConfig = null,
            configureInterfacesStepViewConfig = null;
        
        /*
        Appending Select Server Steps
        */
        selectServerStepViewConfig = [{
            elementId: cowu.formatElementId([prefixId, smwl.TITLE_SELECT_SERVER]),
            view: "AccordianView",
            viewConfig: selectServerViewConfig,
            title: smwl.TITLE_CREATE,
            stepType: 'step',
            onInitRender: true,
            onNext: function (params) {
                var checkedRows =  $('#' + cowu.formatElementId([prefixId, smwl.TITLE_SELECT_BAREMETAL_SERVER, smwl.TITLE_FILTER_BAREMETALS])).data('contrailGrid').getCheckedRows();
                if(checkedRows.length == 0){
                    baremetalModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_SELECT_SERVER]) + cowc.FORM_SUFFIX_ID,'Please select a server');
                    return false
                } else if(checkedRows.length > 1){
                    baremetalModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_SELECT_SERVER]) + cowc.FORM_SUFFIX_ID,'Please select only one server');
                    return false;
                } else {
                    baremetalModel.selectedServer = checkedRows[0]
                }
                return true;
            },
            buttons: {
                next: {
                    label: smwl.TITLE_NEXT
                },
                previous: {
                    visible: false
                }
            }
        }];
        steps = steps.concat(selectServerStepViewConfig);
        
        /*
        Appending Configure Server Steps
        */
        configureServerStepViewConfig = [{
                elementId: cowu.formatElementId([prefixId, smwl.TITLE_CONFIGURE_SERVER]),
                view: "AccordianView",
                viewConfig: configureServerViewConfig,
                title: smwl.TITLE_CONFIGURE_SERVER,
                stepType: 'step',
                onInitRender: true,
                onNext: function (params) {
                    var htmlDataRows = $('#' + cowu.formatElementId([prefixId, smwl.TITLE_SELECT_INTERFACE , smwl.TITLE_BAREMETAL_INTERFACES])).find('.data-row');
                    var interfaceMappings = [];
                    for(var i =0 ; i < htmlDataRows.length; i++){
                        var bmIntf = $(htmlDataRows[i]).find('#baremetal_interface').find('select').val();
                        var vn = $(htmlDataRows[i]).find('#vn').find('select').val();
                        interfaceMappings.push({'interface' : bmIntf, 'vn':vn});
                    }
                    
//                    var interfaceMappings = $('#' + cowu.formatElementId([prefixId, smwl.TITLE_SELECT_INTERFACE , smwl.TITLE_BAREMETAL_INTERFACES]))
//                                                .data('contrailDynamicgrid')._grid.getData();
                    var selectedServer = $('#' + cowu.formatElementId([prefixId, smwl.TITLE_SELECT_BAREMETAL_SERVER, smwl.TITLE_FILTER_BAREMETALS]))
                                                .data('contrailGrid').getCheckedRows()[0];
//                    var serverAttrs = parms.model().attributes;
//                    var selectedImage = $('#base_image_id').data('contrailDropdown').value();
                   var isReimage = $('#reimage').find('input').is(":checked");
                   var serverManagementMac = selectedServer['mac_address'];
                   var ip = selectedServer.ip_address.trim();
                    if(interfaceMappings.length == 0){
                        baremetalModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_CONFIGURE_SERVER]) + cowc.FORM_SUFFIX_ID,'Please map atleast one interface');
                    } else if(!checkIfInterfaceRepeated(interfaceMappings)){
                        $.each(interfaceMappings,function(i,interfaceMapping){
                            var mac = params.model.baremetalIntfMap[interfaceMapping['interface']];
                            var subNet = '';
                            var subNetArry = interfaceMapping['vn'].split(' ');
                            var interfaces = selectedServer['network']['interfaces'];
                            var intfIP = null;
                            if(interfaces != null){
                                for(var i=0; i < interfaces.length; i++){
                                    if(interfaces[i]['name'] == interfaceMapping['interface']){
                                        intfIP = interfaces[i]['ip_address']; 
                                        break;
                                    }
                                }
                            }
                            if(intfIP != null){
                                var isIPinRange = true;
                                if(subNetArry.length > 2) {
                                      for(var i = 2; i < subNetArry.length; i++) {
                                          if(subNetArry[i] != undefined) {
                                              subNet = subNetArry[i].replace('(', '').replace(')', '').replace(',','');
                                              if(isIPBoundToRange(subNet.trim(), intfIP)){
                                                  isIPinRange = true;
                                                  break
                                              } else {
                                                  isIPinRange = false;
                                              }
                                          }
                                      }
                                }
                                if(!isIPinRange) {
                                    baremetalModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_CONFIGURE_SERVER]) + cowc.FORM_SUFFIX_ID,'IP ' + intfIP + ' is not in the CIDR ' + subNet);
                                    return;
                                }
                            }
                            var vnData = params.model.vnsMap[interfaceMapping['vn']];
                            var moreDetails = getMoreDetailsForInterface(selectedServer['network']['interfaces'], mac);
                            var data = {
                                "vnData" : vnData,
                                'vnText' : interfaceMapping['vn'],
                                "macAddress" : mac,
                                "mgmtMacAddress" : serverManagementMac,
                                moreDetails : moreDetails,
                                "serverId" : selectedServer.id,
    //                            'base_image_id' : selectedImage,
                               'isReimage' : isReimage,
                               'interfaceIp' : intfIP 
                            }; 
                            configureBaremetal(data,params,baremetalModel);
                        });
                    } else {
                        baremetalModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_CONFIGURE_SERVER]) + cowc.FORM_SUFFIX_ID,'Please select different interfaces');
                    }
                },
                buttons: {
                    finish: {
                        label: 'Save'
                    },
                    previous: {
                        visible: false
                    }
                }
            }];
        steps = steps.concat(configureServerStepViewConfig);
                
        addBaremetalViewConfig.viewConfig.steps = steps;

        return addBaremetalViewConfig;
    }
    
    function checkIfInterfaceRepeated(interfaceMappings){
        var isRepeated = false
        for(i in interfaceMappings){
            var found = interfaceMappings.some(function (el,j) {
                if(i != j){
                    return el.interface === interfaceMappings[i].interface;
                } else {
                    return false;
                }
              });
            if(found){
                isRepeated = true;
                break;
            }
        };
        return isRepeated;
    }
    
    function configureBaremetal(data,params,baremetalModel){
        params.model.createVMI(data, {
            init: function () {
                baremetalModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_CONFIGURE_SERVER]) + cowc.FORM_SUFFIX_ID, false);
                cowu.enableModalLoading(modalId);
            },
            success: function (response) {
                var vmiDetails = response['virtual-machine-interface']['fq_name'];
                createVM(vmiDetails,data,params,baremetalModel);
            },
            error: function (error) {
                cowu.disableModalLoading(modalId, function () {
                    baremetalModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_CONFIGURE_SERVER]) + cowc.FORM_SUFFIX_ID, error.responseText);
                });
            }
        });
    }
    
    function createVM(vmiDetails,data,params,baremetalModel){
        params.model.createVM(vmiDetails[2], data.serverId,  {
            init: function () {
                baremetalModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_CONFIGURE_SERVER]) + cowc.FORM_SUFFIX_ID, false);
            },
            success: function () {
                createLogicalInterface(data,vmiDetails,params,baremetalModel);
            },
            error: function (error) {
                cowu.disableModalLoading(modalId, function () {
                    baremetalModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_CONFIGURE_SERVER]) + cowc.FORM_SUFFIX_ID, error.responseText);
                });
            }
        });
    }
    
    function createLogicalInterface(data,vmiDetails,params,baremetalModel){
        params.model.createLogicalInterface(data,vmiDetails, {
            init: function () {
                baremetalModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_CONFIGURE_SERVER]) + cowc.FORM_SUFFIX_ID, false);
            },
            success: function () {
                cowu.disableModalLoading(modalId, function () {
                    $('#' + modalId).modal('hide');
                    //reimage if it is specified
                   if(data['isReimage']){
                        var reimageData = [{'serverId':data['serverId']}];
                        params.model.reimage(reimageData,{
                            success:function(){
                                loadFeature({p: smwc.URL_HASH_BM_SERVERS});
                            },
                            error:function(error){
                                cowu.disableModalLoading(modalId, function () {
                                    baremetalModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_CONFIGURE_SERVER]) + cowc.FORM_SUFFIX_ID, error.responseText);
                                });
//                                loadFeature({p: smwc.URL_HASH_BM_SERVERS});
                            }
                        });
                   } else {
                       loadFeature({p: smwc.URL_HASH_BM_SERVERS});
                   }
                });
            },
            error: function (error) {
                cowu.disableModalLoading(modalId, function () {
                    baremetalModel.showErrorAttr(cowu.formatElementId([prefixId, smwl.TITLE_CONFIGURE_SERVER]) + cowc.FORM_SUFFIX_ID, error.responseText);
                });
            }
        });
    }
    
    function getMoreDetailsForInterface(interfaces,mac){
        var res = {};
        $.each(interfaces,function(i,intf){
           if(intf['mac_address'] === mac){
               res = { tor:intf['tor'],
                       tor_port:intf['tor_port'],
                       ip_address:intf['ip_address']};
           } 
        });
        return res;
    }
    
    function getSelectedServerGridElementConfig(gridPrefix, urlParam) {
        var filteredServerGrid = '#' + gridPrefix + '-filtered-servers',
            gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_SELECT_SERVERS
                },
                defaultControls: {
                    refreshable: true
                },
                advanceControls: [
                    /*{
                        "type": "link",
                        "title": 'Select Servers',
                        "iconClass": "icon-plus",
                        "onClick": function () {
                            var checkedRows = $(filteredServerGrid).data('contrailGrid').getCheckedRows();
                            updateSelectedServer(gridPrefix, 'add', checkedRows);
                        }
                    }, */
                    {
                        type: 'checked-multiselect',
                        iconClass: 'icon-filter',
                        title: 'Filter Servers',
                        placeholder: 'Filter Servers',
                        elementConfig: {
                            elementId: 'tagsCheckedMultiselect',
                            dataTextField: 'text',
                            dataValueField: 'id',
                            filterConfig: {
                                placeholder: 'Search Tags'
                            },
                            parse: formatData4Ajax,
                            minWidth: 200,
                            height: 250,
                            emptyOptionText: smwm.NO_TAGS_FOUND,
                            dataSource: {
                                type: 'GET',
                                url: smwu.getTagsUrl('')
                            },
                            click: function(event, ui){
                                applyServerTagFilter(filteredServerGrid, event, ui)
                            },
                            optgrouptoggle: function(event, ui){
                                applyServerTagFilter(filteredServerGrid, event, ui)
                            },
                            control: false
                        }
                    }
                ]

            },
            columnHeader: {
                columns: smwgc.EDIT_SERVERS_ROLES_COLUMNS
            },
            body: {
                /*options: {
                    actionCell: {
                        type: 'link',
                        iconClass: 'icon-plus',
                        onclick: function(e, args) {
                            var selectedRow = $(filteredServerGrid).data('contrailGrid')._dataView.getItem(args.row);
                            updateSelectedServer(gridPrefix, 'add', [selectedRow]);
                        }
                    }
                },*/
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwu.getObjectDetailUrl(smwc.SERVER_PREFIX_ID) + '?' + urlParam
                        },
//                        dataParser: removeAlreadyConfiguredBaremetals
                    }
                },
                statusMessages: {
                    empty: {
                        type: 'status',
                        iconClasses: '',
                        text: smwm.NO_SERVERS_2_SELECT
                    }
                }
            }
        };
        return gridElementConfig;
    }
    
    var reimageViewConfig = {
        elementId: prefixId,
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {
                            elementId: 'base_image_id',
                            view: "FormDropdownView",
                            viewConfig : {
                                path : 'base_image_id',
                                dataBindValue : 'base_image_id',
                                class : "span6",
                                elementConfig : {
                                    placeholder : smwl.SELECT_IMAGE,
                                    dataTextField : "id",
                                    dataValueField : "id",
                                    dataSource : {
                                        type : 'remote',
                                        url : smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, 'filterInImages')
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        }
    };
    
    
    
    function getEditViewConfig(checkedRows){
        var selectedServer = checkedRows[0];
        var editViewConfig = {
                elementId: cowu.formatElementId([prefixId, smwl.TITLE_EDIT_BAREMETAL_SERVER]),
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: cowu.formatElementId([prefixId, smwl.TITLE_EDIT_BAREMETAL_VN]),
                                    view: "FormDropdownView",
                                    viewConfig:{
                                        path : 'interfaces',
                                        class : "span6",
                                        dataBindValue : 'interfaces()',
                                       elementConfig: {
                                           width: 'element',
                                           placeholder: 'Select Network',
                                           dataTextField: "text",
                                           dataValueField: "value",
//                                           TODO use this when its implemented in formdropdownview
//                                           dataSource : {
//                                               type : 'remote',
//                                               url : smwc.URL_NETWORKS,
//                                               parse: parseVns
//                                           },
                                           
                                           data : [
                                                   {text: 'vn2',value:'1a4edcdb-3489-4faf-8044-468f7c021fc8'}
                                           ],
                                           formatter:function(r,c,v,cd,dc) {
                                               return dc.text;
                                            }
                                       }
                                    }
                               }
                            ]
                        }
                    ]
                }
            };
        return editViewConfig;
    }
    
    function applyServerTagFilter(filteredServerGrid, event, ui) {
        var checkedRows = $('#tagsCheckedMultiselect').data('contrailCheckedMultiselect').getChecked();
        $(filteredServerGrid).data('contrailGrid')._dataView.setFilterArgs({
            checkedRows: checkedRows
        });
        $(filteredServerGrid).data('contrailGrid')._dataView.setFilter(serverTagGridFilter);
    };
    
    function formatData4Ajax(response) {
        var filterServerData = [];
        $.each(response, function (key, value) {
            var childrenData = [],
                children = value;
            $.each(children, function (k, v) {
                childrenData.push({'id': v, 'text': v});
            });
            filterServerData.push({'id': key, 'text': smwl.get(key), children: childrenData});
        });
        return filterServerData;
    };
    
    function parseVns (result){
        var vnDataSrc = [];//[{text : 'None', value : 'none'}];
        if(result != null && result['data'] != null && result['data'].length > 0) {
            var vns =  result['data'];
            for(var i = 0; i < vns.length; i++) {
                var vn = vns[i]['virtual-network'];
                var fqn = vn.fq_name;
                var subnetStr = '';
                if('network_ipam_refs' in vn) {
                    var ipamRefs = vn['network_ipam_refs'];
                    for(var j = 0; j < ipamRefs.length; j++) {
                        if('subnet' in ipamRefs[j]) {
                            if(subnetStr === '') {
                                subnetStr = ipamRefs[j].subnet.ipam_subnet;
                            } else {
                                subnetStr += ', ' + ipamRefs[j].subnet.ipam_subnet;
                            }
                        }
                    }
                }
                var textVN = fqn[2] + " (" + fqn[0] + ":" + fqn[1] + ")";
                if(subnetStr != '') {
                    textVN += ' (' + subnetStr + ')';  
                }
                vnDataSrc.push({ text : textVN, value : textVN, key : vn.uuid, vnData : JSON.stringify(vn)});
                localVnsMap[textVN] = JSON.stringify(vn);//store in the map for using while saving
            }
        } else {
            vnDataSrc.push({text : 'No Virtual Network found', value : 'empty'});
        }
        return vnDataSrc;
    }
    
    function updateSelectedServer(gridPrefix, method, serverList){
        var filteredServerGridElement = $('#' + gridPrefix + '-filtered-servers'),
            confirmServerGridElement = $('#' + gridPrefix + '-confirm-servers'),
            currentSelectedServer = filteredServerGridElement.data('serverData').selectedServers,
            serverIds = filteredServerGridElement.data('serverData').serverIds;

        if(method == 'add') {
            var cgrids = [];
            currentSelectedServer = currentSelectedServer.concat(serverList);
            filteredServerGridElement.data('serverData').selectedServers = currentSelectedServer;

            $.each(serverList, function(serverListKey, serverListValue){
                cgrids.push(serverListValue.cgrid);
                serverIds.push(serverListValue.id);
            });
            filteredServerGridElement.data('contrailGrid')._dataView.deleteDataByIds(cgrids);
        }
        else if(method == 'remove') {
            var cgrids = [];

            $.each(serverList, function(serverListKey, serverListValue){
                cgrids.push(serverListValue.cgrid);
                serverIds.splice(serverIds.indexOf(serverListValue.id), 1 );
            });
            confirmServerGridElement.data('contrailGrid')._dataView.deleteDataByIds(cgrids);
            filteredServerGridElement.data('contrailGrid')._dataView.addData(serverList);
        }

        filteredServerGridElement.data('serverData').serverIds = serverIds;
        filteredServerGridElement.data('serverData').selectedServers = currentSelectedServer;
        filteredServerGridElement.parents('section').find('.selectedServerCount')
            .text((currentSelectedServer.length == 0) ? 'None' : currentSelectedServer.length);

        return true;
    }
    
    return BaremetalEditView;
});