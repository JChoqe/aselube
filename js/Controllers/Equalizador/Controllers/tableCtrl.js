
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
        app.controller('tableCtrl', function ($scope, $rootScope, $q, $translate) {
            $scope.labelRegExp = new RegExp("^='|'$", "g");
            $rootScope.getAltoAcordeon();
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
                //console.log(model)
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


            model.getEffectiveProperties().then(function (i) {
                var _propiedades = i;
                function getTotales() {
                    $scope.tipoTotales = _propiedades.totals.show;
                    $scope.totalesLabel = '';
                    switch ($scope.tipoTotales) {
                        case true:
                            $scope.totalesLabel = $translate.instant('equalizer.label.automatico');
                            break;
                        case false:
                            $scope.totalesLabel = $translate.instant('equalizer.label.personalizado');
                            break;
                        default:
                    }
                }

                $scope.changeTablaTotales = function ($event, tipoTotales) {
                    $scope.tipoTotales = tipoTotales;
                    switch (tipoTotales) {
                        case true:
                            $scope.totalesLabel = $translate.instant('equalizer.label.automatico');
                            break;
                        case false:
                            $scope.totalesLabel = $translate.instant('equalizer.label.personalizado');
                            break;
                        default:
                    }
                    var _patches = [{
                        "qPath": "/totals/show",
                        "qOp": "replace",
                        "qValue": JSON.stringify(tipoTotales)
                    }]
                    $scope.Patches.push(_patches);
                    vis.model.applyPatches(_patches, true);
                }
            
                $scope.posicionTotales = '';
                function getposicionTotales() {
                    $scope.posicionTotales = _propiedades.totals.position;
                }
                $scope.cambiarPosicionTotales = function (valor) {
                    var _position = valor;
                    var _patches = [{
                        "qPath": "/totals/position",
                        "qOp": "replace",
                        "qValue": JSON.stringify(_position)
                    }]
                    $scope.Patches.push(_patches);
                    vis.model.applyPatches(_patches, true).then(function () {
                        $scope.posicionTotales = _position;
                    });
                }

                //inmovilizar primera columna
                function getInmovilizarColumna() {
                    var defer = $q.defer();
                    $scope.inmovilizarColumna = _propiedades.scrolling.keepFirstColumnInView;
                    defer.resolve($scope.inmovilizarColumna);
                    return defer.promise;
                }

                $scope.cambiarInmovilizar = function (valor) {
                    var _inmovilizar = valor;
                    var _patches = [{
                        "qPath": "/scrolling/keepFirstColumnInView",
                        "qOp": "replace",
                        "qValue": JSON.stringify(_inmovilizar)
                    }]
                    $scope.Patches.push(_patches);
                    vis.model.applyPatches(_patches, true).then(function () {
                        $scope.inmovilizarColumna = _inmovilizar;
                    });
                }

                //Desplazamiento Horizontal
                function getDesHorizontal() {
                    var defer = $q.defer();
                    $scope.desHorizontal = _propiedades.scrolling.horizontal;
                    defer.resolve($scope.desHorizontal);
                    return defer.promise;
                }

                $scope.cambiarDesHorizontal = function (valor) {
                    var _desHorizontal = valor;
                    var _patches = [{
                        "qPath": "/scrolling/horizontal",
                        "qOp": "replace",
                        "qValue": JSON.stringify(_desHorizontal)
                    }]
                    $scope.Patches.push(_patches);
                    vis.model.applyPatches(_patches, true).then(function () {
                        $scope.desHorizontal = _desHorizontal;
                    });
                }

                //Wrap Cabeceras
                function getWrapCabeceras() {
                    var defer = $q.defer();
                    $scope.wrapCabeceras = _propiedades.multiline.wrapTextInHeaders;
                    defer.resolve($scope.wrapCabeceras);
                    return defer.promise;
                }

                $scope.cambiarWrapCabeceras = function (valor) {
                    var _wrapCabeceras = valor;
                    var _patches = [{
                        "qPath": "/multiline/wrapTextInHeaders",
                        "qOp": "replace",
                        "qValue": JSON.stringify(_wrapCabeceras)
                    }]
                    $scope.Patches.push(_patches);
                    vis.model.applyPatches(_patches, true).then(function () {
                        $scope.wrapCabeceras = _wrapCabeceras;
                    });
                }

                //Wrap Celdas
                function getWrapCeldas() {
                    var defer = $q.defer();
                    $scope.wrapCeldas = _propiedades.multiline.wrapTextInCells;
                    defer.resolve($scope.wrapCeldas);
                    return defer.promise;
                }

                $scope.cambiarWrapCeldas = function (valor) {
                    var _wrapCeldas = valor;
                    var _patches = [{
                        "qPath": "/multiline/wrapTextInCells",
                        "qOp": "replace",
                        "qValue": JSON.stringify(_wrapCeldas)
                    }]
                    $scope.Patches.push(_patches);
                    vis.model.applyPatches(_patches, true).then(function () {
                        $scope.wrapCeldas = _wrapCeldas;
                    });
                }
            
                function getTitles() {
                    $scope.showTitles = _propiedades.showTitles;
                    $scope.titleObject = _propiedades.title;
                    $scope.subTitleObject = _propiedades.subtitle;
                    $scope.footnoteObject = _propiedades.footnote
                    $scope.titulosLabel = '';
                    switch ($scope.showTitles) {
                        case true:
                            $scope.titulosLabel = $translate.instant('equalizer.label.activado');
                            break;
                        case false:
                            $scope.titulosLabel = $translate.instant('equalizer.label.desactivado');
                            break;
                        default:
                    }
                }

                $scope.changeShowTitles = function ($event, showTitles) {
                    var dataTitles = showTitles;
                    switch (dataTitles) {
                        case true:
                            $scope.titulosLabel = $translate.instant('equalizer.label.activado');
                            break;
                        case false:
                            $scope.titulosLabel = $translate.instant('equalizer.label.desactivado');
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
                getTotales();
                getposicionTotales();
                getInmovilizarColumna();
                getDesHorizontal();
                getWrapCabeceras();
                getWrapCeldas();

            });

            


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
            
            $(window).resize(function () {
                $rootScope.getAltoAcordeon();
                qlik.resize(_idObject)
            });

        });

    });
});





