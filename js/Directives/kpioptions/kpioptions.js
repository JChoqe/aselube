/****************************************************************************************************************************************
Obtener el host de la extensión, por ejemplo, en localhost:4848/extensions/NombreExtension/Pagina.html
se obtiene /extensions/NombreExtension/
/***************************************************************************************************************************************/
var href = window.location.pathname;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

define([
    'js/qlik',
    'app',
    'underscore',
    './text!./kpi-options-template.html',
    './text!./kpi-confi-template.html',
    './text!./css/kpioptions.css'
], function (qlik, app, us, kpiOptionTemplate, kpiConfigTemplate,cssContent) {
        $('<style>').html(cssContent).appendTo('head')
        app.directive('kpioptions', [function () {
            return {
                restrict: 'E',
                scope: false,
                templateUrl: 'js/Directives/kpioptions/kpioptions.html',
                link: function (scope, element, attrs) {

                },
                controller: ['$compile', '$q', '$scope', '$rootScope', 'luiDialog', '$translate', 'InitConfig', function ($compile, $q, $scope, $rootScope, luiDialog, $translate, InitConfig) {

                    $scope.showOptionsKpi = function ($event) {
                        var _item = $($event.currentTarget).parents('.item-inner-kpi').find('.qlik-embed');

                        var _template = kpiOptionTemplate;
                        var dialogParent = luiDialog.show({
                            template: _template,
                            closeOnEscape: true,
                            controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                                $scope.closeDialogParent = function () {
                                    dialogParent.close();
                                }

                                $rootScope._thisCurrentApp.getAppObjectList('sheet', function (reply) {
                                    $scope.arrayObject = [];
                                    $.each(reply.qAppObjectList.qItems, function (key, value) {
                                        $.each(value.qData.cells, function (key, val) {
                                            //console.log(val.type);
                                            if (val.type === 'MzKPI' || val.type === 'kpi') {  
                                                $rootScope._thisCurrentApp.getObjectProperties(val.name).then(function (model) {                                                                                                      
                                                    _option = {};
                                                    _option.ID = val.name;
                                                    _option.descripcion = ''; 
                                                    $scope.arrayObject.push(_option)
                                                })

                                            }
                                        })          
                                    });                                    
                                });


                                setTimeout(function () {
                                    var _itemHome = $('#cover_object .qlik-embed').length;
                                    var round = 0;
                                    $("#cover_object .qlik-embed").each(function () {
                                        $scope.noInteraction = $(this).attr('data-noInteraction') || false;
                                        var qvid = $(this).data("qlik-objid").trim();
                                        var $this = $(this);
                                        $rootScope._thisCurrentApp.visualization.get(qvid, { noInteraction: $scope.noInteraction }).then(function (vis) {
                                            vis.show($this, {
                                                onRendered: function () {
                                                    var index = $scope.arrayObject.map(function (e) { return e.ID; }).indexOf(qvid);
                                                    if (vis.model.layout.qHyperCube.qMeasureInfo) {
                                                        $scope.arrayObject[index].descripcion = vis.model.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
                                                    }                                                    
                                                    round = round + 1;
                                                    $rootScope.lstModel.push(vis);
                                                    if (round >= _itemHome) {
                                                        $('#loader-cover').fadeOut();
                                                    }

                                                }
                                            })
                                        });
                                    });
                                }, 300)

                                $scope.openConfigKpi = function ($event, ID) {                                    
                                    var _templateConfiguracion = kpiConfigTemplate;
                                    var dialogChildren = luiDialog.show({
                                        template: _templateConfiguracion,
                                        closeOnEscape: true,
                                        controller: ['$scope', '$rootScope', '$q', '$state', '$translate', '$compile', function ($scope, $rootScope, $q, $state, $translate, $compile) {
                                            $translate.onReady(function () {
                                                $scope.desactivado = $translate.instant('equalizer.label.desactivado');
                                                $scope.activado = $translate.instant('equalizer.label.activado');
                                                $scope.etiquetaUrl = $scope.desactivado;                                               
                                            });

                                            $scope.closeDialogChildren = function () {
                                                dialogChildren.close();
                                            }
                                            
                                            var $this = $('#kpi-mod');
                                            $rootScope._thisCurrentApp.visualization.get(ID).then(function (vis) {
                                                vis.show($this)
                                            });

                                            //Add KPI
                                            $scope.valSheet = '';
                                            $scope.activeUrlSheet = false;
                                            
                                            $scope.changeActiveUrlSheet = function (active) {
                                                var dataUrl = active;                                                
                                                switch (dataUrl) {
                                                    case true:                                                        
                                                        $scope.etiquetaUrl = $scope.activado;
                                                        $scope.activeUrlSheet = true;
                                                        break;
                                                    case false:
                                                        $scope.etiquetaUrl = $scope.desactivado;
                                                        $scope.activeUrlSheet = false;
                                                        break;
                                                    default:
                                                }
                                            }


                                            $scope.addKpi = function () {
                                                $(_item).removeAttr('data-url-page').promise().done(function () {
                                                    $(_item).attr({
                                                        'id': ID,
                                                        'data-qlik-objid': ID
                                                    }).promise().done(function () {
                                                        $rootScope._thisCurrentApp.visualization.get(ID).then(function (vis) {                                                             
                                                            vis.show(_item, {
                                                                onRendered: function () {
                                                                    dialogChildren.close();
                                                                    dialogParent.close();
                                                                    var hasUrl = us.isEmpty($scope.valSheet);
                                                                    switch (hasUrl) {
                                                                        case false:
                                                                            $(_item).attr('data-url-page', $scope.valSheet);
                                                                            break;
                                                                        default:
                                                                            break;
                                                                    }

                                                                                                                                       
                                                                }
                                                            });
                                                            
                                                        });
                                                    });
                                                })

                                            }

                                            function getStates() {
                                                var defer = $q.defer();
                                                var _states = $state.get();
                                                var statesUrl = []
                                                $.each(_states, function (key, value) {
                                                    if (value.url && value.name != '') {
                                                        _options = {};
                                                        _options.id = key;
                                                        _options.name = value.name.replace('App.', '');
                                                        _options.value = value.name;
                                                        statesUrl.push(_options);
                                                    }
                                                })
                                                defer.resolve(statesUrl);
                                                return defer.promise;
                                            }
                                            
                                            getStates().then(function (res) {
                                                $scope.statesUrl = res;
                                                $("#lui-select").select2({ 
                                                    //minimumResultsForSearch: -1,
                                                    allowClear: true,
                                                    placeholder: $translate.instant('template.label.seleccionarhoja'),
                                                });
                                            })

                                            $scope.captureValue = function (val) {
                                                $scope.valSheet = val.value;
                                            }



                                            //var _states = $state.get();
                                            //$scope.statesUrl = [];
                                            //$scope.statesUrlSelected;
                                            //$.each(_states, function (key, value) {
                                            //    if (value.url && value.name != '') {
                                            //        _options = {};
                                            //        _options.name = value.name.replace('App.', '');
                                            //        _options.value = value.url.replace('/', '');
                                            //        $scope.statesUrl.push(_options);
                                            //    }
                                            //})

                                            //$scope.showSelect = false;

                                            

                                            ////function showSelect() {
                                            ////    var defer = $q.defer();
                                            ////    $scope.showSelect = true;
                                            ////    defer.resolve($scope.showSelect);
                                            ////    return defer.promise;
                                            ////}

                                            //$scope.onSelectSheet = function ($event) {
                                            //    $scope.statesUrl = [];
                                            //    getStates().then(function (res) {
                                            //        $scope.statesUrl = res;
                                            //        //showSelect().then(function () {
                                            //        //    //setTimeout(function () {
                                            //        //    //    var _select = $event.currentTarget;
                                            //        //    //    var _offset = $(_select).offset();
                                            //        //    //    var _left = _offset.left;
                                            //        //    //    var _top = _offset.top;
                                            //        //    //    var _width = _select.clientWidth;
                                            //        //    //    $('.mz-select-panel').attr('style', 'width:' + _width + 'px ; top:' + _top + 'px; left:' + _left + 'px ; opacity:1;');
                                            //        //    //}, 100)

                                            //        //})                                                    
                                            //    })
                                            //}

                                            //$scope.hideSelect = function () {
                                            //    $scope.showSelect = false;
                                            //}


                                        }]
                                    });
                                }

                            }]
                        });
                    }


                    
                    
                }]
            };
        }]);

});