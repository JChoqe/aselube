
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
        app.controller('mapCtrl', function ($scope, $rootScope, $q, $translate) {
            $scope.labelRegExp = new RegExp("^='|'$", "g");
            $translate.onReady(function () {
                $scope.rangoburbuja = $translate.instant('equalizer.label.rangoburbuja');
                $scope.rangotriangulo = $translate.instant('equalizer.label.rangotriangulo');
                $scope.rangocuadrado = $translate.instant('equalizer.label.rangocuadrado');
                $scope.rangopentagono = $translate.instant('equalizer.label.rangopentagono');
                $scope.rangohexagono = $translate.instant('equalizer.label.rangohexagono');
                $scope.radioinfluencia = $translate.instant('equalizer.label.radioinfluencia');
                
            });
            $translate('equalizer.label.capa.puntos').then(function (translation) {
                $scope.puntos = translation;
            });
            $translate('equalizer.label.capa.grafico').then(function (translation) {
                $scope.grafico = translation;
            });
            $translate('equalizer.label.capa.lineas').then(function (translation) {
                $scope.lineas = translation;
            });
            $translate('equalizer.label.capa.densidad').then(function (translation) {
                $scope.densidad = translation;
            });
            $translate('equalizer.label.capa.area').then(function (translation) {
                $scope.area = translation;
            });
            $translate('equalizer.label.capa.fondo').then(function (translation) {
                $scope.fondo = translation;
            });

            //Obtenemos la app
            $scope.app = qlik.openApp($('body').attr('data-app'), config);
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

            //Array Patches
            $scope.Patches = [];
            $scope.hasChanged = false;
            $scope.applying = false;
            $scope.canSave = false;
            

            function C(e) {
                return e < 20 ? Math.ceil(e / 2) : e < 40 ? e - 20 + 10 : e < 60 ? 30 + 2 * (e - 40) : 70 + 4 * (e - 60)
            }


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

                //Capas de Mapa
                $scope.layersMapa = [];

                function layersMapa() {
                    var defer = $q.defer();
                    model.getEffectiveProperties().then(function (i) {
                        var _propiedades = i;
                        arrayLayers = _propiedades.gaLayers
                        defer.resolve(arrayLayers);
                    })
                    return defer.promise;                
                }

                function getlayersMapa() {
                    layersMapa().then(function (result) {
                        //console.log(result, 'Capas')
                        result.forEach(function (value, i) {                        
                            capa = {};
                            capa.template = 'js/Controllers/Equalizador/partials/mapPartials/' + value.type + '.html';
                            capa.orden = i;
                            capa.showLabel = value.label.show;
                            if (value.size) {
                                capa.slider = value.size.slider;
                                capa.sliderSingle = value.size.sliderSingle;
                                if (value.size.barHeight) {
                                    capa.barHeight = value.size.barHeight;
                                }
                                if (value.size.barWidth) {
                                    capa.barWidth = value.size.barWidth;
                                }
                                if (value.size.shape) {
                                    capa.shape = getTipoShape(value.size.shape);
                                }
                            
                            }   
                            if (value.chartType) {
                                capa.grafico = value.chartType;
                            }
                            if (value.weightRadius) {
                                capa.radiux = value.weightRadius.radius;
                                capa.radiuxSliderValue = value.weightRadius.radiusSliderValue;
                                capa.radiusUnit = value.weightRadius.radiusUnit;

                            }
                            if (value.size) {
                                capa.radiusMax = value.size.radiusMax;
                            }
                            if (value.size) {
                                capa.radiusMin = value.size.radiusMin;
                            }
                            capa.expanded = false;
                            capa.show = value.showLayer
                            capa.type = value.type;
                            capa.tipo = getTipoCapa(value.type);
                        
                            if (typeof value.title == 'undefined') {
                                if (typeof value.locationOrLatitude.label == 'undefined' || value.locationOrLatitude.label == '') {
                                    $rootScope.getNameByID(value.locationDefault).then(function (res) {                                   
                                        $scope.layersMapa[i].name = res;
                                    });
                                } else {
                                    capa.name = value.locationOrLatitude.label;
                                }                            
                            } else {
                                capa.name = value.title;
                            }                           
                            $scope.layersMapa.push(capa);
                        })
                    })
                }


                $scope.MapSettings = [];

                function MapSettings() {
                    var defer = $q.defer();
                    model.getEffectiveProperties().then(function (i) {
                        var _propiedades = i;
                        var zoomAutomatico = _propiedades.autoZoomOnSelection;
                        var arraySettings = _propiedades.mapSettings;
                        arraySettings["zoomAutomatico"] = zoomAutomatico;
                        defer.resolve(arraySettings);
                    })
                    return defer.promise;
                }

                function getMapSettings() {
                    MapSettings().then(function (result) {
                        $scope.baseMap = result.baseMap;
                        $scope.mapLanguage = result.mapLanguage;
                        $scope.showLegend = result.showLegend;
                        $scope.zoomAutomatico = result.zoomAutomatico;                                    
                    })
                }

                $scope.changeBaseMap = function (BaseMap, Projection) {
                    var tipoMap = BaseMap;
                    var projectionMap = Projection;
                    var _patches = [{
                        "qPath": "/mapSettings/baseMap",
                        "qOp": "replace",
                        "qValue": JSON.stringify(tipoMap)
                    }]

                    var _patchesprojection = [{
                        "qPath": "/mapSettings/projection",
                        "qOp": "replace",
                        "qValue": JSON.stringify(projectionMap)
                    
                    }]
                    $scope.Patches.push(_patches, _patchesprojection);
                    vis.model.applyPatches(_patches, true).then(function () {
                        vis.model.applyPatches(_patchesprojection, true)
                    });
                
                }

                $scope.changeLanguage = function (Language) {
                    var MapLanguage = Language;
                    var _patches = [{
                        "qPath": "/mapSettings/mapLanguage",
                        "qOp": "replace",
                        "qValue": JSON.stringify(MapLanguage)
                    }]
                    $scope.Patches.push(_patches);
                    vis.model.applyPatches(_patches, true);
                
                }

                $scope.changeZoom = function () {
                    var isZomm = $('#zoomAutomatico').prop('checked');
                    var _patches = [{
                        "qPath": "/autoZoomOnSelection",
                        "qOp": "replace",
                        "qValue": JSON.stringify(isZomm)
                    }]
                    $scope.Patches.push(_patches);
                    vis.model.applyPatches(_patches, true);
                
                }

                $scope.changeLegend = function() {
                    var isLegend = $('#showLegend').prop('checked');
                    $scope.showLegend = isLegend;
                    var _patches = [{
                        "qPath": "/mapSettings/showLegend",
                        "qOp": "replace",
                        "qValue": JSON.stringify(isLegend)
                    }]
                    $scope.Patches.push(_patches);
                    vis.model.applyPatches(_patches, true);
                
                }

                function getTipoCapa(type) {
                    var _tipo = type;
                    switch (_tipo) {
                        case 'PointLayer':                        
                            return $scope.puntos;
                            break;
                        case 'ChartLayer':
                            return $scope.grafico;
                            break;
                        case 'LineLayer':
                            return $scope.lineas;
                            break;
                        case 'DensityLayer':
                            return $scope.densidad;
                            break;
                        case 'AreaLayer':
                            return $scope.area;
                            break;
                        case 'GeodataLayer':
                            return $scope.fondo;
                            break;
                        default:
                            return _tipo;
                    }

                }

                function getTipoShape(shape) {
                    var _shape = shape;
                    switch (_shape) {
                        case "points":
                            return $scope.rangoburbuja;
                            break;
                        case "triangles":
                            return $scope.rangotriangulo;
                            break;
                        case "squares":
                            return $scope.rangocuadrado;
                            break;
                        case "pentagons":
                            return $scope.rangopentagono;
                            break;
                        case "hexagons":
                            return $scope.rangohexagono;
                            break;
                        default:
                            return _tipo;
                    }
                }

                $scope.labelSlider = '';

                $scope.expandLayer = function ($event, layer) {
                    //console.log(layer, 'Capa')
                    layer.expanded = layer.expanded === false ? true : false;               
                    if (layer.expanded == true) {
                        switch (layer.type) {
                            case "DensityLayer":
                                DENSITY_RADIUS_VALUES = [{
                                    meter: 1,
                                    feet: 3,
                                    metricStr: "1",
                                    imperialStr: "3"
                                }, {
                                    meter: 1.5,
                                    feet: 5,
                                    metricStr: "1.5",
                                    imperialStr: "5"
                                }, {
                                    meter: 2,
                                    feet: 7,
                                    metricStr: "2",
                                    imperialStr: "7"
                                }, {
                                    meter: 3,
                                    feet: 10,
                                    metricStr: "3",
                                    imperialStr: "10"
                                }, {
                                    meter: 4,
                                    feet: 13,
                                    metricStr: "4",
                                    imperialStr: "13"
                                }, {
                                    meter: 5,
                                    feet: 16,
                                    metricStr: "5",
                                    imperialStr: "16"
                                }, {
                                    meter: 7,
                                    feet: 23,
                                    metricStr: "7",
                                    imperialStr: "23"
                                }, {
                                    meter: 10,
                                    feet: 33,
                                    metricStr: "10",
                                    imperialStr: "33"
                                }, {
                                    meter: 15,
                                    feet: 50,
                                    metricStr: "15",
                                    imperialStr: "50"
                                }, {
                                    meter: 20,
                                    feet: 65,
                                    metricStr: "20",
                                    imperialStr: "65"
                                }, {
                                    meter: 40,
                                    feet: 130,
                                    metricStr: "40",
                                    imperialStr: "130"
                                }, {
                                    meter: 60,
                                    feet: 200,
                                    metricStr: "60",
                                    imperialStr: "200"
                                }, {
                                    meter: 80,
                                    feet: 260,
                                    metricStr: "80",
                                    imperialStr: "260"
                                }, {
                                    meter: 100,
                                    feet: 330,
                                    metricStr: "100",
                                    imperialStr: "330"
                                }, {
                                    meter: 130,
                                    feet: 430,
                                    metricStr: "130",
                                    imperialStr: "430"
                                }, {
                                    meter: 160,
                                    feet: 530,
                                    metricStr: "160",
                                    imperialStr: "530"
                                }, {
                                    meter: 200,
                                    feet: 650,
                                    metricStr: "200",
                                    imperialStr: "650"
                                }, {
                                    meter: 250,
                                    feet: 820,
                                    metricStr: "250",
                                    imperialStr: "820"
                                }, {
                                    meter: 300,
                                    feet: 1e3,
                                    metricStr: "300",
                                    imperialStr: "1000"
                                }, {
                                    meter: 350,
                                    feet: 1200,
                                    metricStr: "350",
                                    imperialStr: "1200"
                                }, {
                                    meter: 400,
                                    feet: 1400,
                                    metricStr: "400",
                                    imperialStr: "1400"
                                }, {
                                    meter: 500,
                                    feet: 2300,
                                    metricStr: "500",
                                    imperialStr: "1600"
                                }, {
                                    meter: 700,
                                    feet: 3300,
                                    metricStr: "700",
                                    imperialStr: "2300"
                                }, {
                                    meter: 1e3,
                                    feet: 3300,
                                    metricStr: "1",
                                    imperialStr: "3300"
                                }, {
                                    meter: 2e3,
                                    feet: 5280,
                                    metricStr: "2",
                                    imperialStr: "1"
                                }, {
                                    meter: 3e3,
                                    feet: 10560,
                                    metricStr: "3",
                                    imperialStr: "2"
                                }, {
                                    meter: 4e3,
                                    feet: 15840,
                                    metricStr: "4",
                                    imperialStr: "3"
                                }, {
                                    meter: 5e3,
                                    feet: 21120,
                                    metricStr: "5",
                                    imperialStr: "4"
                                }, {
                                    meter: 6e3,
                                    feet: 26400,
                                    metricStr: "6",
                                    imperialStr: "5"
                                }, {
                                    meter: 8e3,
                                    feet: 31680,
                                    metricStr: "8",
                                    imperialStr: "6"
                                }, {
                                    meter: 1e4,
                                    feet: 42240,
                                    metricStr: "10",
                                    imperialStr: "8"
                                }, {
                                    meter: 15e3,
                                    feet: 52800,
                                    metricStr: "15",
                                    imperialStr: "10"
                                }, {
                                    meter: 25e3,
                                    feet: 63360,
                                    metricStr: "25",
                                    imperialStr: "12"
                                }, {
                                    meter: 4e4,
                                    feet: 79200,
                                    metricStr: "40",
                                    imperialStr: "15"
                                }, {
                                    meter: 6e4,
                                    feet: 132e3,
                                    metricStr: "60",
                                    imperialStr: "25"
                                }, {
                                    meter: 8e4,
                                    feet: 264e3,
                                    metricStr: "80",
                                    imperialStr: "50"
                                }, {
                                    meter: 1e5,
                                    feet: 316800,
                                    metricStr: "100",
                                    imperialStr: "60"
                                }, {
                                    meter: 13e4,
                                    feet: 422400,
                                    metricStr: "130",
                                    imperialStr: "80"
                                }, {
                                    meter: 17e4,
                                    feet: 528e3,
                                    metricStr: "170",
                                    imperialStr: "100"
                                }, {
                                    meter: 2e5,
                                    feet: 66e4,
                                    metricStr: "200",
                                    imperialStr: "125"
                                }, {
                                    meter: 25e4,
                                    feet: 792e3,
                                    metricStr: "250",
                                    imperialStr: "150"
                                }, {
                                    meter: 35e4,
                                    feet: 1056e3,
                                    metricStr: "350",
                                    imperialStr: "200"
                                }, {
                                    meter: 5e5,
                                    feet: 132e4,
                                    metricStr: "500",
                                    imperialStr: "250"
                                }, {
                                    meter: 65e4,
                                    feet: 2112e3,
                                    metricStr: "650",
                                    imperialStr: "400"
                                }, {
                                    meter: 8e5,
                                    feet: 264e4,
                                    metricStr: "800",
                                    imperialStr: "500"
                                }, {
                                    meter: 1e6,
                                    feet: 3168e3,
                                    metricStr: "1000",
                                    imperialStr: "600"
                                }, {
                                    meter: 125e4,
                                    feet: 4224e3,
                                    metricStr: "1250",
                                    imperialStr: "800"
                                }, {
                                    meter: 15e5,
                                    feet: 528e4,
                                    metricStr: "1500",
                                    imperialStr: "1000"
                                }, {
                                    meter: 175e4,
                                    feet: 5808e3,
                                    metricStr: "1750",
                                    imperialStr: "1100"
                                }, {
                                    meter: 2e6,
                                    feet: 66e5,
                                    metricStr: "2000",
                                    imperialStr: "1250"
                                    }]                                                        
                                $('#slider-densityLayer-' + layer.orden).slider({
                                    range: false,
                                    type: "number",
                                    defaultValue: 10,
                                    min: 0,
                                    max: DENSITY_RADIUS_VALUES.length - 1,
                                    step:1,
                                    values: [layer.radiuxSliderValue],
                                    create: function (event, ui) {
                                   
                                        var i = layer.radiux;
                                        var n = layer.radiuxSliderValue;
                                        switch (layer.radiusUnit) {                                              
                                            case "pixels":
                                                r = 'px';
                                                var $label = $scope.radioinfluencia + ' (' + i + ' ' + r + ')';
                                                $scope.labelSlider = $label;
                                                break;
                                                case "feet":
                                                    r = DENSITY_RADIUS_VALUES[n].feet >= 5280 ? 'mi' : 'ft';
                                                var $label = $scope.radioinfluencia + ' (' + DENSITY_RADIUS_VALUES[n].imperialStr + ' ' + r + ')';
                                                    $scope.labelSlider = $label;

                                                    //return a.default.get("geo.properties.influenceRadius", [e.DENSITY_RADIUS_VALUES[n].imperialStr, r]);
                                                break;
                                            case "meters":
                                                r = DENSITY_RADIUS_VALUES[n].meter >= 1e3 ? 'Km' : 'm';
                                                var $label = $scope.radioinfluencia + ' (' + DENSITY_RADIUS_VALUES[n].metricStr + ' ' + r + ')';
                                                $scope.labelSlider = $label;
                                                break;
                                        }
                                    
                                    },
                                    stop: function (event, ui) {                                      
                                        var _val_1 = ui.values[0];
                                        var n = _val_1;
                                        var i = layer.radiux;
                                        var radio = 0;
                                        switch (layer.radiusUnit) {
                                            case "pixels":
                                                radio = Math.round(5 * _val_1) + 5;
                                                r = 'px';
                                                var $label = $scope.radioinfluencia + ' (' + radio + ' ' + r + ')';
                                                $scope.labelSlider = $label                                            
                                                break;
                                            case "feet":
                                                radio = DENSITY_RADIUS_VALUES[_val_1].feet;
                                                r = DENSITY_RADIUS_VALUES[n].feet >= 5280 ? 'mi' : 'ft';
                                                var $label = $scope.radioinfluencia + ' (' + DENSITY_RADIUS_VALUES[n].imperialStr + ' ' + r + ')';
                                                $scope.labelSlider = $label;
                                                break;
                                            case "meters":
                                                radio = DENSITY_RADIUS_VALUES[_val_1].meter;
                                                r = DENSITY_RADIUS_VALUES[n].meter >= 1e3 ? 'Km' : 'm';
                                                var $label = $scope.radioinfluencia + ' (' + DENSITY_RADIUS_VALUES[n].metricStr + ' ' + r + ')';
                                                $scope.labelSlider = $label;                                            
                                                break
                                        }                                  
                                   



                                        var _patches = [{
                                            "qPath": "/gaLayers/" + layer.orden + "/weightRadius/radius",
                                            "qOp": "replace",
                                            "qValue": "" + radio + ""
                                        }]
                                        $scope.Patches.push(_patches);
                                        vis.model.applyPatches(_patches, true).then(function () {
                                            var _patches = [{
                                                "qPath": "/gaLayers/" + layer.orden + "/weightRadius/radiusSliderValue",
                                                "qOp": "replace",
                                                "qValue": "" + _val_1 + ""
                                            }]
                                        });
                                    }
                                });
                                break;
                            case "LineLayer":
                                $('#slider-lineLayer-' + layer.orden).slider({
                                    range: false,
                                    min: 1,
                                    max: 70,
                                    values: [layer.sliderSingle],
                                    stop: function (event, ui) {
                                        var _val_1 = ui.values[0];
                                        var t = C(_val_1);
                                        var r = Math.ceil(t / 2);
                                        var _radiusMin = t - r;
                                        var _radiusMax = t + r


                                        var _patches = [{
                                            "qPath": "/gaLayers/" + layer.orden + "/size/sliderSingle",
                                            "qOp": "replace",
                                            "qValue": "" + _val_1 + ""
                                        }]
                                        $scope.Patches.push(_patches);
                                        vis.model.applyPatches(_patches, true).then(function () {
                                            var _patches = [{
                                                "qPath": "/gaLayers/" + layer.orden + "/size/radiusMax",
                                                "qOp": "replace",
                                                "qValue": "" + _radiusMax + ""
                                            }]
                                            $scope.Patches.push(_patches);
                                            vis.model.applyPatches(_patches, true).then(function () {
                                                var _patches = [{
                                                    "qPath": "/gaLayers/" + layer.orden + "/size/radiusMin",
                                                    "qOp": "replace",
                                                    "qValue": "" + _radiusMin + ""
                                                }]
                                                $scope.Patches.push(_patches);
                                                vis.model.applyPatches(_patches, true).then(function () {                                                
                                                });
                                            });                                      
                                        });                                    
                                    }
                                });
                                break;
                            case 'PointLayer':                               
                                $('#slider-pointLayer-' + layer.orden).slider({
                                    range: true,
                                    min: 1,
                                    max: 100,
                                    values: [layer.slider[0], layer.slider[1]],
                                    stop: function (event, ui) {
                                        var _val_1 = ui.values[0];
                                        var _val_2 = ui.values[1];

                                        var t = C(ui.values[0]);
                                        var r = C(ui.values[1]);                                 
                                        var _radiusMin = t;
                                        var _radiusMax = r;
                                        console.log(_val_1 + '--' + _val_2 + '--' + _radiusMin + '--' + _radiusMax)

                                        var _patches = [{
                                            "qPath": "/gaLayers/" + layer.orden + "/size/slider",
                                            "qOp": "replace",
                                            "qValue": "[" + _val_1 + "," + _val_2 + "]"
                                        }]
                                        $scope.Patches.push(_patches);
                                        vis.model.applyPatches(_patches, true).then(function () {
                                            var _patches = [{
                                                "qPath": "/gaLayers/" + layer.orden + "/size/radiusMax",
                                                "qOp": "replace",
                                                "qValue": "" + _radiusMax + ""
                                            }]
                                            $scope.Patches.push(_patches);
                                            vis.model.applyPatches(_patches, true).then(function () {
                                                var _patches = [{
                                                    "qPath": "/gaLayers/" + layer.orden + "/size/radiusMin",
                                                    "qOp": "replace",
                                                    "qValue": "" + _radiusMin + ""
                                                }]
                                                $scope.Patches.push(_patches);
                                                vis.model.applyPatches(_patches, true).then(function () {                                                
                                                });
                                            });                                      
                                        });                                   
                                    }
                                });
                                break;
                            case 'ChartLayer':
                                //Entra si el tipo es pieChart o barChart
                                if (layer.grafico) {                                
                                    switch (layer.grafico) {
                                        case 'pieChart':
                                            $('#slider-' + layer.orden).slider({
                                                range: false,
                                                min: 20,
                                                max: 100,
                                                values: [layer.sliderSingle],
                                                stop: function (event, ui) {
                                                    var _val_1 = ui.values[0];
                                                    var t = C(_val_1);
                                                    var r = Math.ceil(t / 2);
                                                    var _radiusMin = t - r;
                                                    var _radiusMax = t + r


                                                    var _patches = [{
                                                        "qPath": "/gaLayers/" + layer.orden + "/size/sliderSingle",
                                                        "qOp": "replace",
                                                        "qValue": "" + _val_1 + ""
                                                    }]
                                                    $scope.Patches.push(_patches);
                                                    vis.model.applyPatches(_patches, true).then(function () {
                                                        var _patches = [{
                                                            "qPath": "/gaLayers/" + layer.orden + "/size/radiusMax",
                                                            "qOp": "replace",
                                                            "qValue": "" + _radiusMax + ""
                                                        }]
                                                        $scope.Patches.push(_patches);
                                                        vis.model.applyPatches(_patches, true).then(function () {
                                                            var _patches = [{
                                                                "qPath": "/gaLayers/" + layer.orden + "/size/radiusMin",
                                                                "qOp": "replace",
                                                                "qValue": "" + _radiusMin + ""
                                                            }]
                                                            $scope.Patches.push(_patches);
                                                            vis.model.applyPatches(_patches, true).then(function () {                                                       
                                                            });
                                                        });                                                  
                                                    });                                                
                                                }
                                            });
                                            break;
                                        case 'barChart':
                                            $('#slider-0').slider({
                                                range: false,
                                                min: 10,
                                                max: 150,
                                                values: [layer.barHeight],
                                                stop: function (event, ui) {
                                                    var _val_1 = ui.values[0];
                                                    var _patches = [{
                                                        "qPath": "/gaLayers/" + layer.orden + "/size/barHeight",
                                                        "qOp": "replace",
                                                        "qValue": "" + _val_1 + ""
                                                    }]
                                                    $scope.Patches.push(_patches);
                                                    vis.model.applyPatches(_patches, true).then(function () {

                                                    });
                                                }
                                            });
                                            $('#slider-1').slider({
                                                range: false,
                                                min: 5,
                                                max: 40,
                                                values: [layer.barWidth],
                                                stop: function (event, ui) {
                                                    var _val_1 = ui.values[0];
                                                    var _patches = [{
                                                        "qPath": "/gaLayers/" + layer.orden + "/size/barWidth",
                                                        "qOp": "replace",
                                                        "qValue": "" + _val_1 + ""
                                                    }]
                                                    $scope.Patches.push(_patches);
                                                    vis.model.applyPatches(_patches, true).then(function () {

                                                    });
                                                }
                                            });
                                    }

                                }
                                break;
                        }



                        //else {


                        //    $('#slider-' + layer.orden).slider({
                        //        range: true,
                        //        min: 0,
                        //        max: 100,
                        //        values: [layer.slider[0], layer.slider[1]],
                        //        slide: function (event, ui) {
                        //            var _val_1 = ui.values[0];
                        //            var _val_2 = ui.values[1];
                        //            var _patches = [{
                        //                "qPath": "/gaLayers/" + layer.orden + "/size/slider", 
                        //                "qOp": "replace",
                        //                "qValue": "[" + _val_1 + "," + _val_2 + "]"
                        //            }]
                        //            $scope.Patches.push(_patches);
                        //            vis.model.applyPatches(_patches, true).then(function () {
                        //                console.log(_patches);
                        //            });
                        //            //$scope.app.doSave();
                        //        }
                        //    });
                        //}

                    
                    }

                }

                $scope.changeCapa = function (layer) {
                    var _show = layer.show;
                    var _patches = [{
                        "qPath": "/gaLayers/" + layer.orden + "/showLayer",
                        "qOp": "replace",
                        "qValue": JSON.stringify(_show)
                    }]
                    $scope.Patches.push(_patches);
                    vis.model.applyPatches(_patches, true);
                }

                $scope.changeLabel = function (layer) {
                    var _show = layer.showLabel;
                    var _patches = [{
                        "qPath": "/gaLayers/" + layer.orden + "/label/show",
                        "qOp": "replace",
                        "qValue": JSON.stringify(_show)
                    }]
                    $scope.Patches.push(_patches);
                    vis.model.applyPatches(_patches, true);
                }



                getlayersMapa();
                getMapSettings();

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

                $scope.needToConfirm = false;
                window.onbeforeunload = askConfirm;
                function askConfirm() {
                    if ($scope.needToConfirm) {
                        return 'Estas seguro?';
                    }
                }

                $scope.$watchCollection('Patches', function (newValue, oldValue) {                    
                    if ($scope.canSave == true) {
                        if ($scope.Patches.length > 0) {
                            $scope.needToConfirm = true;
                        } else {
                            $scope.needToConfirm = false;
                        }
                    }
                }, true);

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





