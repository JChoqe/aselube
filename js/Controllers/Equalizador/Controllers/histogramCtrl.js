

/****************************************************************************************************************************************
Obtener el host de la extensión, por ejemplo, en localhost:4848/extensions/NombreExtension/Pagina.html
se obtiene /extensions/NombreExtension/
/***************************************************************************************************************************************/
var href = window.location.pathname;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

define([
    'js/qlik',
    'app',
    'underscore'
], function (qlik, app, us) {
        app.controller('histogramCtrl', function ($scope, $rootScope, $q, $translate) {
            $scope.labelRegExp = new RegExp("^='|'$", "g");
            $translate.onReady(function () {
                $scope.automatico = $translate.instant('equalizer.label.automatico');
                $scope.desactivado = $translate.instant('equalizer.label.desactivado');
                $scope.activado = $translate.instant('equalizer.label.activado');
            });
            qlik.on("error", function (error) {
                if (error.code == 8) {
                    $translate('equalizer.modal.errormensaje').then(function (translation) {
                        $scope.errormensaje = translation;
                        $translate('equalizer.btn.cerrar').then(function (translation) {
                            $scope.cerrar = translation;
                            var customModal = $('<div id="custom-modal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">' + error.message + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><h3>' + $scope.errormensaje + '</h3></div><div class="modal-footer"><button class="btn btn-default close-error" type="button" data-dismiss="modal">' + $scope.cerrar + '</button></div></div></div></div>')
                            $('body').append(customModal);
                            var dlgElem = angular.element("#custom-modal");
                            if (dlgElem) {
                                dlgElem.modal("show");
                            }
                        });
                    });
                }
                $(document).on('click', '.close-error', function () {
                    $scope.clearPatches();
                });
            });

            $scope.blockEquializador = false;
            var _idObject = $rootScope.OBJECTID;

            //Obtenemos la app
            $scope.app = qlik.openApp($('body').attr('data-app'), config);
       
            //Array Patches
            $scope.Patches = [];
            $scope.hasChanged = false;
            $scope.applying = false;
            $scope.canSave = false;

            //Cerrar Equializador
            $scope.closeEqualizador = function () {
                if ($scope.canSave == false) {
                    $scope.AddStoragePatches();
                    $('.box_object').removeClass('object-full-size-equializador');
                    $('#box_equalizador').removeClass('active');
                    setTimeout(function () {
                        $('#box_equalizador').empty();
                        $('body').removeClass('open-equalizador');
                        qlik.resize();
                    }, 300);
                } else {
                    if ($scope.Patches.length > 0) {
                        var dlgElem = angular.element("#modalDlg");
                        if (dlgElem) {
                            dlgElem.modal("show");
                        }
                    } else {
                        $('.box_object').removeClass('object-full-size-equializador');
                        $('#box_equalizador').removeClass('active');
                        setTimeout(function () {
                            $('#box_equalizador').empty();
                            $('body').removeClass('open-equalizador');
                            qlik.resize();
                        }, 300);
                    }
                }
            }

            $scope.app.getObjectProperties(_idObject).then(function (model) {
                console.log(model)
                $scope.ARRDIMENSIONS = model.properties.qHyperCubeDef.qDimensions;
                $scope.ARRDIMENSIONSALTERNATIVES = model.properties.qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qDimensions;
                $scope.ALLDIMENSIONS = $scope.ARRDIMENSIONS.concat($scope.ARRDIMENSIONSALTERNATIVES);

                var ObjectPrivileges = model.pureLayout.qMeta.privileges;
                $scope.canSave = ObjectPrivileges.includes('update');

                if (sessionStorage.length > 0) {
                    if (sessionStorage["Object" + _idObject]) {
                        $scope.Patches = JSON.parse(sessionStorage.getItem("Object" + _idObject));
                        $scope.hasChanged = true;
                    }
                }

                var vis;
                $scope.app.visualization.get(_idObject).then(function (viz) {
                    vis = viz;
                });

                /*Datos Dimensiones*/
                function getDimensions() {
                    var defer = $q.defer();
                    model.getEffectiveProperties().then(function (i) {
                        //console.log(i);
                        var _propiedades = i;
                        var layoutDimensiones = model.layout.qHyperCube.qDimensionInfo;
                        var arrayDimensiones = _propiedades.qHyperCubeDef.qDimensions;
                        var numDimensionesAlternativas = _propiedades.qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qDimensions.length;

                        $scope.expandibleDimensions = false;

                        if (numDimensionesAlternativas > 0) {
                            $scope.expandibleDimensions = true;
                        }

                        var listDimensiones = [];
                        arrayDimensiones.forEach(function (value, i) {
                            var $dim = $scope.ALLDIMENSIONS.filter(obj => {
                                if (obj.qDef.cId == value.qDef.cId) {
                                    return obj;
                                }
                            });
                            v = {};
                            v.orden = arrayDimensiones.map(function (e) { return e.qDef.cId; }).indexOf(value.qDef.cId);
                            v.index = arrayDimensiones.map(function (e) { return e.qDef.cId; }).indexOf(value.qDef.cId);
                            v.active = '';
                            v.sortable = value.qDef.autoSort;
                            v.iconSortable = arrayDimensiones.length > 1 ? true : false;
                            v.showAlternatives = false;
                            var result = layoutDimensiones.filter(obj => {
                                if (obj.cId == value.qDef.cId) {
                                    return obj;
                                }
                            })
                            v.name = result[0].hasOwnProperty('title') ? result[0].title : result[0].qFallbackTitle;
                            v.id = value.qDef.cId;
                            v.isField = true;
                            v.uniqueId = $rootScope.randomString(20, '');
                            v.DATOS = $dim[0]
                            listDimensiones.push(v);

                        })
                        if (arrayDimensiones.length > 1) {
                            $("#sortableListDimensiones").sortable({
                                "forcePlaceholderSize": false,
                                "forceHelperSize": true,
                                "placeholder": "sortable-placeholder",
                                "axis": "y",
                                "cursor": "move",
                                "containment": "parent",
                                "distance": 10,
                                "revert": true,
                                "tolerance": "pointer",
                                "opacity": 1,
                                "items": "li:not(.noSort)",
                                "helper": function (e, item) {
                                    var _clone = item.clone();
                                    _clone = $(_clone).find('.mz-list_header-title').html();
                                    _clone = '<li class="itemClone"><div class="mz-list_header-title">' + _clone + '</div></li>';
                                    return _clone;
                                },
                                start: function (event, ui) {
                                    var _placeholder = ui.item;
                                    _placeholder = $(_placeholder).find('.mz-list_header-title').html();
                                    _placeholder = '<li class="itemClone"><div class="mz-list_header-title">' + _placeholder + '</div></li>';
                                    ui.placeholder.html(_placeholder);
                                    angular.forEach($scope.arrDimensiones, function (value, key) {
                                        $scope.arrDimensiones[key].showAlternatives = false;
                                        $scope.rebuild();
                                    });

                                },
                                update: function (event, ui) {
                                    var _new_orden_list = [];
                                    $("#sortableListDimensiones > li.itemDimension").each(function (index) {
                                        var _thisItem = $(this).attr('data-item');
                                        _new_orden_list.push(angular.fromJson(_thisItem));
                                    });
                                    _new_orden_list.forEach(function (value, i) {
                                        var _patches = [
                                            {
                                                "qPath": "/qHyperCubeDef/qDimensions/" + i,
                                                "qOp": "replace",
                                                "qValue": JSON.stringify(value.DATOS)
                                            }
                                        ]
                                        $scope.Patches.push(_patches);
                                        vis.model.applyPatches(_patches, true).then(function () {
                                            $scope.rebuild();
                                            model.getEffectiveProperties().then(function (i) {
                                                var _propiedades = i;
                                                var currentDimensiones = _propiedades.qHyperCubeDef.qDimensions;
                                                currentDimensiones.forEach(function (value, i) {
                                                    var $index = currentDimensiones.map(function (e) { return e.qDef.cId; }).indexOf(value.qDef.cId);
                                                    var $oldIndex = $scope.arrDimensiones.map(function (e) { return e.id; }).indexOf(value.qDef.cId);
                                                    $scope.arrDimensiones[$oldIndex].index = $index;
                                                })
                                            })
                                        });
                                    });
                                    
                                }

                            }).disableSelection();
                        }

                        defer.resolve(listDimensiones);

                    })




                    return defer.promise;
                }

                function getDimensionsAlternativas(item) {
                    var defer = $q.defer();
                    var arrAlt = [];
                    model.getEffectiveProperties().then(function (i) {
                        var _propiedades = i;
                        var arrayDimensionesAlternativas = _propiedades.qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qDimensions;
                        $scope.arrDimensionesAlternativas = [];

                        v = {};
                        v.active = true;
                        v.orden = -1;
                        v.index = item.index;
                        v.sortable = item.sortable;
                        v.iconSortable = item.iconSortable;
                        v.showAlternatives = item.showAlternatives;
                        v.name = item.name;
                        v.id = item.id;
                        v.isField = item.isField;
                        v.uniqueId = $rootScope.randomString(20, '');
                        v.DATOS = item.DATOS;
                        arrAlt.push(v);
                        angular.forEach(arrayDimensionesAlternativas, function (value, i) {
                            $rootScope.getNombreDimensionAlternativaCampo(value).then(function (rest) {
                                var $dim = $scope.ALLDIMENSIONS.filter(obj => {
                                    if (obj.qDef.cId == value.qDef.cId) {
                                        return obj;
                                    }
                                })
                                v = {};
                                v.orden = arrayDimensionesAlternativas.map(function (e) { return e.qDef.cId; }).indexOf(value.qDef.cId);
                                v.index = arrayDimensionesAlternativas.map(function (e) { return e.qDef.cId; }).indexOf(value.qDef.cId);
                                v.active = '';
                                v.sortable = value.qDef.autoSort;
                                v.iconSortable = $scope.arrDimensiones.length > 1 ? true : false;
                                v.showAlternatives = false;
                                v.name = rest;
                                v.id = value.qDef.cId;
                                v.isField = true;
                                v.uniqueId = $rootScope.randomString(20, '');
                                v.DATOS = $dim[0];
                                arrAlt.push(v);

                            })
                            defer.resolve(arrAlt);
                        })
                    });
                    return defer.promise;
                }

                $scope.dimensionCliked = function (event, item) {
                    if (item.showAlternatives == true) {
                        item.showAlternatives = false;
                    } else {
                        getDimensionsAlternativas(item).then(function (res) {
                            $scope.rebuild();
                            $scope.arrDimensionesAlternativas = res;
                            resetShowAlternatives().then(function (rest) {
                                setTimeout(function () {
                                    item.showAlternatives = item.showAlternatives === false ? true : false;
                                }, 100);
                            })
                        })
                    }
                }

                $scope.alternativeDimensionItemClicked = function ($event, dimension, dimensionAlternativa) {
                    if (!dimensionAlternativa.active) {
                        $scope.blockEquializador = true;
                        var _patches = [
                            {
                                "qPath": "/qHyperCubeDef/qDimensions/" + dimension.index,
                                "qOp": "replace",
                                "qValue": JSON.stringify(dimensionAlternativa.DATOS)
                            },
                            {
                                "qPath": "/qHyperCubeDef/qLayoutExclude/qHyperCubeDef/qDimensions/" + dimensionAlternativa.index,
                                "qOp": "replace",
                                "qValue": JSON.stringify(dimension.DATOS)
                            }
                        ]

                        $scope.Patches.push(_patches);
                        vis.model.applyPatches(_patches, true).then(function () {
                            angular.forEach($scope.arrDimensionesAlternativas, function (value, key) {
                                $scope.arrDimensionesAlternativas[key].active = false;
                            })

                            dimensionAlternativa.active = true;
                            
                            actualizaIndexDimension(dimensionAlternativa.index, dimensionAlternativa.id, dimension.index, dimension.id).then(function (res) {
                                dimension.orden = dimensionAlternativa.orden;
                                dimension.sortable = dimensionAlternativa.sortable;
                                dimension.iconSortable = dimensionAlternativa.iconSortable;
                                dimension.name = dimensionAlternativa.name;
                                dimension.id = dimensionAlternativa.id;
                                dimension.isField = dimensionAlternativa.isField;
                                dimension.DATOS = dimensionAlternativa.DATOS;
                                dimension.active = false;
                                $scope.blockEquializador = false;
                            })
                        });
                    } else {
                        return false;
                    }
                }

                function actualizaIndexDimension(indexAlt, cIdAlt, index, cId) {
                    var defer = $q.defer();
                    var _dimensionIndex = $scope.arrDimensionesAlternativas.map(function (e) { return e.id; }).indexOf(cId);
                    var _dimensionAlternativeIndex = $scope.arrDimensionesAlternativas.map(function (e) { return e.id; }).indexOf(cIdAlt);
                    $scope.arrDimensionesAlternativas[_dimensionIndex].index = indexAlt;
                    $scope.arrDimensionesAlternativas[_dimensionAlternativeIndex].index = index;
                    defer.resolve(_dimensionAlternativeIndex);
                    return defer.promise;
                }

                getDimensions().then(function (res) {
                    $scope.arrDimensiones = res;
                });
                /*Fin Datos Dimensiones*/


                /*Datos Medidas*/
                //function getMedidas() {
                //    var defer = $q.defer();
                //    model.getEffectiveProperties().then(function (i) {
                //        //console.log(i);
                //        var _propiedades = i;
                //        var layoutMeasure = model.layout.qHyperCube.qMeasureInfo;
                //        var arrayMeasures = _propiedades.qHyperCubeDef.qMeasures;
                //        var numMeasuresAlternativas = _propiedades.qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qMeasures.length;


                //        $scope.expandibleMeasures = false;
                //        if (numMeasuresAlternativas > 0) {
                //            $scope.expandibleMeasures = true;
                //        }
                //        var listMeasures = [];
                //        arrayMeasures.forEach(function (value, i) {
                //            var $Measure = $scope.ALLMEASURES.filter(obj => {
                //                if (obj.qDef.cId == value.qDef.cId) {
                //                    return obj;
                //                }
                //            });


                //            v = {};
                //            v.orden = arrayMeasures.map(function (e) { return e.qDef.cId; }).indexOf(value.qDef.cId);
                //            v.index = arrayMeasures.map(function (e) { return e.qDef.cId; }).indexOf(value.qDef.cId);
                //            v.active = '';
                //            v.sortable = value.qDef.autoSort;
                //            v.iconSortable = arrayMeasures.length > 1 ? true : false;
                //            v.showAlternatives = false;
                //            var result = layoutMeasure.filter(obj => {
                //                if (obj.cId == value.qDef.cId) {
                //                    return obj;
                //                }
                //            })
                //            v.name = result[0].hasOwnProperty('title') ? result[0].title : result[0].qFallbackTitle;
                //            v.id = value.qDef.cId;
                //            v.isField = true;
                //            v.DATOS = $Measure[0];
                //            v.uniqueId = $rootScope.randomString(20, '');
                //            listMeasures.push(v);
                //        })
                //        if (arrayMeasures.length > 1) {
                //            $("#sortableListMeasures").sortable({
                //                "forcePlaceholderSize": true,
                //                "placeholder": "sortable-placeholder",
                //                "axis": "y",
                //                "cursor": "move",
                //                "containment": "parent",
                //                "scrollSensitivity": 0,
                //                "distance": 10,
                //                "revert": true,
                //                "tolerance": "pointer",
                //                "opacity": 0.5,
                //                "items": "li:not(.noSort)",
                //                "helper": function (e, item) {
                //                    var _clone = item.clone();
                //                    _clone = $(_clone).find('.mz-list_header-title').html();
                //                    _clone = '<li class="itemClone"><div class="mz-list_header-title">' + _clone + '</div></li>';
                //                    return _clone;
                //                },
                //                start: function (event, ui) {
                //                    var _placeholder = ui.item;
                //                    _placeholder = $(_placeholder).find('.mz-list_header-title').html();
                //                    _placeholder = '<li class="itemClone"><div class="mz-list_header-title">' + _placeholder + '</div></li>';
                //                    ui.placeholder.html(_placeholder);
                //                    angular.forEach($scope.arrMeasures, function (value, key) {
                //                        $scope.arrMeasures[key].showAlternatives = false;
                //                        $scope.rebuild();
                //                    });
                //                    //$(this).sortable("refresh");

                //                },
                //                update: function (event, ui) {
                //                    var _new_orden_list = [];

                //                    $("#sortableListMeasures > li.itemMeasure").each(function (index) {
                //                        var _thisItem = $(this).attr('data-item');
                //                        _new_orden_list.push(angular.fromJson(_thisItem));
                //                    });

                //                    _new_orden_list.forEach(function (value, i) {
                //                        var _patches = [
                //                            {
                //                                "qPath": "/qHyperCubeDef/qMeasures/" + i,
                //                                "qOp": "replace",
                //                                "qValue": JSON.stringify(value.DATOS)
                //                            }
                //                        ]

                //                        $scope.Patches.push(_patches);
                //                        vis.model.applyPatches(_patches, true).then(function () {
                //                            $scope.rebuild();
                                            
                //                            model.getEffectiveProperties().then(function (i) {
                //                                var _propiedades = i;
                //                                var currentMeasures = _propiedades.qHyperCubeDef.qMeasures;
                //                                currentMeasures.forEach(function (value, i) {
                //                                    var $index = currentMeasures.map(function (e) { return e.qDef.cId; }).indexOf(value.qDef.cId);
                //                                    var $oldIndex = $scope.arrMeasures.map(function (e) { return e.id; }).indexOf(value.qDef.cId);
                //                                    $scope.arrMeasures[$oldIndex].index = $index;
                //                                })
                //                            })
                //                        });
                //                    });
                //                }

                //            }).disableSelection();
                //        }

                //        defer.resolve(listMeasures);
                //    });




                //    return defer.promise;
                //}

                //function getMeasuresAlternativas(item) {
                //    var defer = $q.defer();
                //    var arrAlt = [];
                //    model.getEffectiveProperties().then(function (i) {
                //        var _propiedades = i;
                //        var arrayMeasuresAlternativas = _propiedades.qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qMeasures;
                //        $scope.arrMeasuresAlternativas = [];

                //        v = {};
                //        v.active = true;
                //        v.orden = -1;
                //        v.index = item.index;
                //        v.sortable = item.sortable;
                //        v.iconSortable = item.iconSortable;
                //        v.showAlternatives = item.showAlternatives;
                //        v.name = item.name;
                //        v.id = item.id;
                //        v.isField = item.isField;
                //        v.uniqueId = $rootScope.randomString(20, '');
                //        v.DATOS = item.DATOS;
                //        arrAlt.push(v);

                //        angular.forEach(arrayMeasuresAlternativas, function (value, i) {
                //            $rootScope.getNombreMeasureAlternativa(value).then(function (rest) {
                //                var $Measure = $scope.ALLMEASURES.filter(obj => {
                //                    if (obj.qDef.cId == value.qDef.cId) {
                //                        return obj;
                //                    }
                //                })

                //                v = {};
                //                v.orden = arrayMeasuresAlternativas.map(function (e) { return e.qDef.cId; }).indexOf(value.qDef.cId);
                //                v.index = arrayMeasuresAlternativas.map(function (e) { return e.qDef.cId; }).indexOf(value.qDef.cId);
                //                v.active = '';
                //                v.sortable = value.qDef.autoSort;
                //                v.iconSortable = $scope.arrMeasures.length > 1 ? true : false;
                //                v.showAlternatives = false;
                //                v.name = rest;
                //                v.id = value.qDef.cId;
                //                v.isField = true;
                //                v.uniqueId = $rootScope.randomString(20, '');
                //                v.DATOS = $Measure[0];
                //                arrAlt.push(v);

                //            })
                //        })
                //        defer.resolve(arrAlt);
                //    });
                //    return defer.promise;
                //}

                //$scope.measuresCliked = function (event, item) {
                //    if (item.showAlternatives == true) {
                //        item.showAlternatives = false;
                //    } else {
                //        getMeasuresAlternativas(item).then(function (res) {
                //            $scope.rebuild();
                //            $scope.arrMeasuresAlternativas = res;
                //            resetShowAlternatives().then(function (rest) {
                //                item.showAlternatives = item.showAlternatives === false ? true : false;
                //            })
                //        })
                //    }
                //}

                function resetShowAlternatives() {
                    var defer = $q.defer();
                    angular.forEach($scope.arrDimensiones, function (value, key) {
                        $scope.arrDimensiones[key].showAlternatives = false;
                    });
                    //angular.forEach($scope.arrMeasures, function (value, key) {
                    //    $scope.arrMeasures[key].showAlternatives = false;
                    //});

                    defer.resolve(true);
                    return defer.promise;
                }

                //$scope.alternativeMeasuresItemClicked = function ($event, medida, medidaAlternativa) {
                //    if (!medidaAlternativa.active) {
                //        $scope.blockEquializador = true;
                //        var _patches = [
                //            {
                //                "qPath": "/qHyperCubeDef/qMeasures/" + medida.index,
                //                "qOp": "replace",
                //                "qValue": JSON.stringify(medidaAlternativa.DATOS)
                //            },
                //            {
                //                "qPath": "/qHyperCubeDef/qLayoutExclude/qHyperCubeDef/qMeasures/" + medidaAlternativa.index,
                //                "qOp": "replace",
                //                "qValue": JSON.stringify(medida.DATOS)
                //            }
                //        ]


                //        $scope.Patches.push(_patches);
                //        vis.model.applyPatches(_patches, true).then(function () {
                //            angular.forEach($scope.arrMeasuresAlternativas, function (value, key) {
                //                $scope.arrMeasuresAlternativas[key].active = false;
                //            })

                //            medidaAlternativa.active = true;
                            
                //            actualizaIndexMeasure(medidaAlternativa.index, medidaAlternativa.id, medida.index, medida.id).then(function (res) {
                //                medida.orden = medidaAlternativa.orden;
                //                medida.sortable = medidaAlternativa.sortable;
                //                medida.iconSortable = medidaAlternativa.iconSortable;
                //                medida.showAlternatives = true;
                //                medida.name = medidaAlternativa.name;
                //                medida.id = medidaAlternativa.id;
                //                medida.isField = medidaAlternativa.isField;
                //                medida.DATOS = medidaAlternativa.DATOS;
                //                medida.active = false;
                //                $scope.blockEquializador = false;
                //            })
                //        });


                //    } else {
                //        return false;
                //    }
                //}

                //function actualizaIndexMeasure(indexAlt, cIdAlt, index, cId) {
                //    var defer = $q.defer();
                //    var _medidaIndex = $scope.arrMeasuresAlternativas.map(function (e) { return e.id; }).indexOf(cId);
                //    var _medidaAlternativeIndex = $scope.arrMeasuresAlternativas.map(function (e) { return e.id; }).indexOf(cIdAlt);
                //    $scope.arrMeasuresAlternativas[_medidaIndex].index = indexAlt;
                //    $scope.arrMeasuresAlternativas[_medidaAlternativeIndex].index = index;
                //    defer.resolve(_medidaAlternativeIndex);
                //    return defer.promise;
                //}
                //getMedidas().then(function (res) {
                //    $scope.arrMeasures = res;
                //});
                /*Fin Datos Medidas*/



           
                function getTitles() {
                    model.getEffectiveProperties().then(function (i) {
                        var _propiedades = i;
                        $scope.showTitles = _propiedades.showTitles;
                        $scope.titleObject = _propiedades.title;
                        $scope.subTitleObject = _propiedades.subtitle;
                        $scope.footnoteObject = _propiedades.footnote
                        $scope.titulosLabel = '';
                        switch ($scope.showTitles) {
                            case true:
                                $scope.titulosLabel = $scope.activado;
                                break;
                            case false:
                                $scope.titulosLabel = $scope.desactivado;
                                break;
                            default:
                        }
                    })
                }

                $scope.changeShowTitles = function ($event, showTitles) {
                    var dataTitles = showTitles;
                    switch (dataTitles) {
                        case true:
                            $scope.titulosLabel = $scope.activado;
                            break;
                        case false:
                            $scope.titulosLabel = $scope.desactivado;
                            break;
                        default:
                    }
                    var _patches = [{
                        "qPath": "/showTitles",
                        "qOp": "replace",
                        "qValue": JSON.stringify(dataTitles)
                    }]
                    $scope.Patches.push(_patches);
                    vis.model.applyPatches(_patches, true);
                }

                $scope.changeTitle = function (valor) {
                    var Titles = valor;
                    var _patches = [{
                        "qPath": "/title",
                        "qOp": "replace",
                        "qValue": JSON.stringify(Titles)
                    }]
                    $scope.Patches.push(_patches);
                    vis.model.applyPatches(_patches, true);
                }

                $scope.changeSubTitle = function (valor) {
                    var SubTitle = valor;
                    var _patches = [{
                        "qPath": "/subtitle",
                        "qOp": "replace",
                        "qValue": JSON.stringify(SubTitle)
                    }]
                    $scope.Patches.push(_patches);
                    vis.model.applyPatches(_patches, true);

                }
                $scope.changeFootnote = function (valor) {
                    var Footnote = valor;
                    var _patches = [{
                        "qPath": "/footnote",
                        "qOp": "replace",
                        "qValue": JSON.stringify(Footnote)
                    }]
                    $scope.Patches.push(_patches);
                    vis.model.applyPatches(_patches, true);
                }

                getTitles();
                $scope.rebuild = function () {
                    setTimeout(function () {
                        $scope.$apply();
                    }, 300);

                }
                $scope.rebuild();

                $scope.clearPatchesModal = function () {
                    $scope.clearPatches();
                }
                $scope.clearPatches = function () {
                    $scope.app.visualization.get(_idObject).then(function (viz) {
                        $scope.Patches = [];
                        viz.model.clearSoftPatches().then(function () {
                            if (sessionStorage["Object" + _idObject]) {
                                sessionStorage.removeItem("Object" + _idObject);
                            }
                            $scope.closeEqualizador();
                        });
                    });
                }

                $scope.addPatchesModal = function ($event) {
                    $scope.addPatches();
                    setTimeout(function () {
                        $scope.closeEqualizador();
                    }, 400);

                }

                $scope.IsApplying = function ($event) {
                    $event.stopPropagation();
                    $scope.applying = true;
                    var dlgElem = angular.element("#modalDlg");
                    if (dlgElem) {
                        dlgElem.modal("hide");
                    }
                }

                $scope.cancelConfirm = function ($event) {
                    $event.stopPropagation();
                    $scope.applying = false;
                }


                $scope.addPatches = function ($event) {
                    $('body').append('<div class="flex-loader-cover"><div class="loaderEquializador">Loading...</div></div>');
                    var IDOBJECT = $rootScope.OBJECTID;
                    asyncpatches(IDOBJECT).then(function (res) {
                        $scope.app.doReload().then(function (result) {
                            $scope.app.doSave();
                            $scope.applying = false;
                            $scope.Patches = [];
                            $('.flex-loader-cover').remove();
                            $scope.closeEqualizador();
                        });
                    })
                }

                function asyncpatches(IDOBJECT) {
                    var defer = $q.defer();
                    // model.getEffectiveProperties().then(function (reply) {
                    // model.setProperties(reply);
                    // defer.resolve(model);
                    // });

                    $scope.app.visualization.get(IDOBJECT).then(function (vis) {
                        var _viz = vis;
                        var _count = 0;
                        angular.forEach($scope.Patches, function (value, key) {
                            _viz.model.applyPatches(value, false);
                            _count = key;
                        });
                        defer.resolve(_count);
                    });
                    return defer.promise;
                }

                $scope.checkPatches = function () {
                    if ($scope.Patches.length > 0) {
                        return false;
                    } else {
                        return true;
                    }
                }
                $scope.AddStoragePatches = function () {
                    if ($scope.Patches.length > 0) {
                        sessionStorage.setItem("Object" + _idObject, JSON.stringify($scope.Patches));
                    }

                };

                $(window).bind('beforeunload', function () {
                    if ($scope.canSave == true) {
                        if ($scope.Patches.length > 0) {
                            return 'Estas seguro?';
                        }
                    }
                });

                model.Validated.bind(function () {
                    if (model.layout.qHasSoftPatches) {
                        $scope.hasChanged = model.layout.qHasSoftPatches;
                    }
                });


                $rootScope.getAltoAcordeon();
                $(window).resize(function () {
                    $rootScope.getAltoAcordeon();
                    qlik.resize(_idObject)
                });

            });

    });
});





