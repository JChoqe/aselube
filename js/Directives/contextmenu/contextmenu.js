/****************************************************************************************************************************************
Obtener el host de la extensión, por ejemplo, en localhost:4848/extensions/NombreExtension/Pagina.html
se obtiene /extensions/NombreExtension/
/***************************************************************************************************************************************/
var href = window.location.pathname;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

define([
    'js/qlik',
    'app',
    'angular',
], function (qlik, app, angular) {

    app.directive('contextmenu', function factory() {
        var directiveDefinitionObject = {
            restrict: 'E',
            transclude: true,
            replace: false,
            scope: {
                objectId: '@',
            },
            templateUrl: 'js/Directives/contextmenu/contextmenu.html',
            link: function (scope, element, $attrs) {
                scope.ObjectId = $attrs.objectId;
                scope.TOP = $attrs.top;
                scope.LEFT = $attrs.left;
            },
            controller: ['$q', '$scope', '$rootScope', '$timeout', 'luiDialog', '$translate', '$attrs', function ($q, $scope, $rootScope, $timeout, luiDialog, $translate, $attrs) {
                var _loading = '<div id="loading-export"><div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>';
                var MODEL;
                var vis;

                $scope.close = function () {
                    $('contextmenu').remove();
                }
                $rootScope.APP = qlik.openApp($('body').attr('data-app'), config);
                $scope.ObjectId = $attrs.objectId;
                $rootScope.APP.getObjectProperties($scope.ObjectId).then(function (model) {
                    MODEL = model;
                    $rootScope.typeObject = model.layout.qInfo.qType;
                })
                $rootScope.APP.visualization.get($scope.ObjectId).then(function (viz) {
                    vis = viz;
                });


                $translate('views.modal.pdf').then(function (translation) {
                    $scope.tituloHeaderPdf = translation;
                });
                $translate('views.modal.tamaniopapel').then(function (translation) {
                    $scope.papel = translation;
                });
                $translate('views.modal.carta').then(function (translation) {
                    $scope.carta = translation;
                });
                $translate('views.modal.orientacion').then(function (translation) {
                    $scope.orientacion = translation;
                });
                $translate('views.modal.vertical').then(function (translation) {
                    $scope.vertical = translation;
                });
                $translate('views.modal.apaisado').then(function (translation) {
                    $scope.apaisado = translation;
                });
                $translate('views.modal.cerrar').then(function (translation) {
                    $scope.cerrar = translation;
                });
                $translate('views.modal.exportar').then(function (translation) {
                    $scope.exportar = translation;
                });
                $translate('views.modal.opcionesaspecto').then(function (translation) {
                    $scope.opcionesaspecto = translation;
                });
                $translate('views.modal.actual').then(function (translation) {
                    $scope.actual = translation;
                });
                $translate('views.modal.ajustar').then(function (translation) {
                    $scope.ajustar = translation;
                });



                $scope.openPopupPDF = function (ID) {
                    $scope.close();
                    var dataIDPDF = ID;
                    var _template = '<div class="lui-dialog" style="width: 600px;">';
                    _template = _template + '<div class="lui-dialog__header"><div class="lui-dialog__title">' + $scope.tituloHeaderPdf + '</div></div>';
                    _template = _template + '<div class="print-dialog lui-dialog__body">';
                    _template = _template + '<div class="section"><div class="section-title">' + $scope.papel + '</div><div class="component-wrapper"><select ng-model="selectedSize" ng-change="onSizeChange(selectedSize)" class="lui-select" id="comboTamanios" style="min-width: 200px"><option value="a3">A3 (420 mm x 297mm)</option><option value="a4" selected>A4 (297 mm x 210mm)</option><option value="a5">A5 (210 mm x 148mm)</option><option value="a6">A6 (148 mm x 105mm)</option><option value="a7">A7 (105 mm x 74mm)</option><option value="letter">' + $scope.carta + ' (279 mm x 215mm)</option></select></div></div><hr />';
                    _template = _template + '<div class="section"><div class="section-title">' + $scope.orientacion + '</div><button type="button" class="btnOrientacion lui-button  lui-dialog__button" id="btnVertical" data-orientacion="portrait" ng-click="addActivo($event,' + "'portrait'" + ')">' + $scope.vertical + '</button><button type="button" class="btnOrientacion lui-button  lui-dialog__button activo" id="btnApaisado" data-orientacion="landscape" ng-click="addActivo($event,' + "'landscape'" + ')">' + $scope.apaisado + '</button></div><hr />';
                    _template = _template + '<div class="section"><div class="section-title">' + $scope.opcionesaspecto + '</div><label lui-class-list="classList" class="print-dialog-radio-single lui-radiobutton"><input class="lui-radiobutton__input" type="radio" ng-value="0" name="print-aspect" value="0" ng-checked="aspectRatio"  ng-model="aspectRatio" ng-change="changeAspectRatio(0)"><div class="lui-radiobutton__radio-wrap"><span class="lui-radiobutton__radio"></span><span class="lui-radiobutton__radio-text">' + $scope.actual + '</span></div></label><label lui-class-list="classList" class="print-dialog-radio-single lui-radiobutton"><input class="lui-radiobutton__input" type="radio" ng-value="2" name="print-aspect" value="2" ng-checked="aspectRatio"  ng-model="aspectRatio" ng-change="changeAspectRatio(2)"><div class="lui-radiobutton__radio-wrap"><span class="lui-radiobutton__radio"></span><span class="lui-radiobutton__radio-text">' + $scope.ajustar + '</span></div></label></div>';
                    _template = _template + '</div>';
                    _template = _template + '<div class="lui-dialog__footer"><button class="lui-button  lui-dialog__button" ng-click="closeDialog();">' + $scope.cerrar + '</button><button class="lui-button  lui-dialog__button  close-button" ng-click="pdfExport();">' + $scope.exportar + '</button></div>';
                    _template = _template + '</div>';


                    var dialog = luiDialog.show({
                        template: _template,
                        closeOnEscape: false,
                        controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                            $scope.selectedSize = 'a4';
                            $scope.orientacion = 'landscape';
                            $scope.aspectRatio = 0;
                            $scope.closeDialog = function () {
                                dialog.close();
                            }
                            //Exportar PDF 
                            $scope.addActivo = function (event, orientacion) {
                                $scope.orientacion = orientacion;
                                $TARGET = event.currentTarget;
                                $('.btnOrientacion').removeClass('activo').promise().done(function () {
                                    $($TARGET).addClass('activo');
                                })
                            }
                            $scope.onSizeChange = function (val) {

                            }

                            $scope.changeAspectRatio = function (val) {

                            }

                            $scope.pdfExport = function () {                                
                                $('body').prepend(_loading);
                                dialog.close();
                                qlik.theme.apply($rootScope.ThemesImage).then(function (result) {
                                    var tamanioPapel = $scope.selectedSize;
                                    var _width, _height;
                                    var _objectWidth = $('#' + dataIDPDF).width();
                                    var _objectHeigth = $('#' + dataIDPDF).height();
                                    switch (tamanioPapel) {
                                        case 'a3':
                                            _width = '420';
                                            _height = '297';
                                            break;
                                        case 'a4':
                                            _width = '297';
                                            _height = '210';
                                            break;
                                        case 'a5':
                                            _width = '210';
                                            _height = '148';
                                            break;
                                        case 'a6':
                                            _width = '148';
                                            _height = '105';
                                            break;
                                        case 'a7':
                                            _width = '105';
                                            _height = '74';
                                            break;
                                        case 'letter':
                                            _width = '279';
                                            _height = '215';
                                            break;
                                        default:
                                        // code block
                                    }
                                    if ($scope.aspectRatio == 0) {
                                        var settings = {
                                            documentSize: { height: _height, width: _width },
                                            objectSize: { height: _objectHeigth, width: _objectWidth },
                                            orientation: $scope.orientacion,
                                        };
                                    } else {
                                        var settings = {
                                            documentSize: { height: _height, width: _width },
                                            aspectRatio: $scope.aspectRatio,
                                            orientation: $scope.orientacion
                                        };
                                    }

                                    $rootScope.APP.visualization.get(dataIDPDF).then(function (visual) {
                                        visual.exportPdf(settings).then(function (result) {
                                            window.location.href = result;
                                            qlik.theme.apply($rootScope.ThemesInit);
                                            setTimeout(function () {
                                                $('#loading-export').remove();
                                            }, 600);
                                        }).catch(function (error) {
                                            console.log(error)
                                        });
                                    });
                                });
                            }
                        }]
                    });
                }


                $scope.exportDatos = function (ID) {
                    $('body').prepend(_loading);
                    $scope.close();
                    $rootScope.APP.visualization.get(ID).then(function (visual) {
                        visual.exportData({ download: true }).then(function (result) {
                            window.location.href = result;
                            $('#loading-export').remove();
                        }).catch(function (error) {
                            console.log(error)
                        });
                    });
                }

                $scope.ExportImage = function (ID) { 
                    qlik.theme.apply($rootScope.ThemesImage).then(function (result) {
                        $rootScope.APP.visualization.get(ID).then(function (visual) {
                            $scope.close();
                            $('body').prepend(_loading);
                            var element = document.getElementById(ID);
                            var settings = { format: 'JPG', height: element.offsetHeight, width: element.offsetWidth };                            
                            visual.exportImg(settings).then(function (res) {
                                window.location.href = res;
                                qlik.theme.apply($rootScope.ThemesInit);
                                $('#loading-export').remove();
                            }).catch(function (error) {
                                console.log(error);
                                $('#loading-export').remove();
                            });
                        })
                    });
                }

                $scope.isTableView = $scope.isTableView;
                //Ver datos
                $scope.verDatos = function (ID) {
                    var ID = ID;
                    $scope.close();
                    var result = $rootScope.ITEMS.filter(obj => {
                        return obj.id === ID;
                    })
                    var visual = result[0].vis;

                    visual.toggleDataView().then(function (toggled) {
                        $scope.isTableView = true;
                    });
                }
                $scope.verGrafico = function (ID) {
                    var ID = ID;
                    $scope.close();
                    var result = $rootScope.ITEMS.filter(obj => {
                        return obj.id === ID;
                    })
                    var visual = result[0].vis;

                    visual.toggleDataView().then(function (toggled) {
                        $scope.isTableView = false;
                    });
                }

                $scope.tableView = function (ID) {
                    var _idBox = ID;
                    var item = document.getElementById(_idBox);
                    var isVisible = $(item).find('.qv-object-wrapper').hasClass('qv-view-original');
                    switch (isVisible) {
                        case true:
                            return true;
                            break;
                        case false:
                            return false;
                            break;
                    }
                }



                $scope.showEqualizador = function (valor) {
                    return valor;
                }

                $scope.isPivotTable = function () {
                    if ($rootScope.typeObject == 'pivot-table') {
                        return true;
                    } else {
                        return false;
                    }
                }

                $scope.expandirTodo = function () {
                    var _patches = [{
                        "qPath": "/qHyperCubeDef/qAlwaysFullyExpanded",
                        "qOp": "replace",
                        "qValue": "true"
                    }]
                    vis.model.applyPatches(_patches, true).then(function () {
                        $scope.close();
                    })
                }
                $scope.contraerTodo = function () {
                    var _patches = [{
                        "qPath": "/qHyperCubeDef/qAlwaysFullyExpanded",
                        "qOp": "replace",
                        "qValue": "false"
                    }]
                    vis.model.applyPatches(_patches, true).then(function () {
                        $scope.close();
                    })

                    //var url = MODEL.session.rpc.url
                    //MODEL.session.rpc.createSocket(url)

                    //var msg = {
                    //    "jsonrpc": "2.0",
                    //    "id": 4,
                    //    "method": "ExpandLeft",
                    //    "handle": 2,
                    //    "params": [
                    //        "/qHyperCubeDef",
                    //        0,
                    //        0,
                    //        false
                    //    ]
                    //}
                    //MODEL.enigmaModel.session.rpc(msg).then(function (response) {
                    //    console.log(response)
                    //});
                    //var msg = {
                    //    "handle": 1,
                    //    "method": "GetMediaList",
                    //    "params": {}
                    //}


                    //$rootScope.APP.model.session.rpc(msg).then(function (response) {
                    //    console.log(response)
                    //});



                }


                $scope.haveEqualizador = function () {
                    switch ($rootScope.typeObject) {
                        case 'linechart':
                            return true;
                            break;
                        case 'barchart':
                            return true;
                            break;
                        case 'scatterplot':
                            return true;
                            break;
                        case 'piechart':
                            return true;
                            break;
                        case 'boxplot':
                            return true;
                            break;
                        case 'distributionplot':
                            return true;
                            break;
                        case 'combochart':
                            return true;
                            break;
                        case 'map':
                            return true;
                            break;
                        case 'treemap':
                            return true;
                            break;
                        case 'histogram':
                            return true;
                            break;
                        case 'table':
                            return true;
                            break;
                        case 'pivot-table':
                            return true;
                            break;
                        default:
                            return false;
                    }
                }

                $scope.haveTableView = function () {
                    switch ($rootScope.typeObject) {
                        case 'map':
                            return false;
                            break;
                        case 'table':
                            return false;
                            break;
                        default:
                            return true;
                    }
                }



                $scope.haveExportarDatos = function () {
                    switch ($rootScope.typeObject) {
                        case 'map':
                            return false;
                            break;
                        default:
                            return true;
                    }
                }

            }]
        };
        return directiveDefinitionObject;
    });

});