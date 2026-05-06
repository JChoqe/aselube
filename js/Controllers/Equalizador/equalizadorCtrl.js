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
    'extControllers/Equalizador/Directives/filtersEqualizador/filtersEqualizador',
    'extControllers/Equalizador/Controllers/linechartCtrl',
    'extControllers/Equalizador/Controllers/barchartCtrl',
    'extControllers/Equalizador/Controllers/scatterplotCtrl',
    'extControllers/Equalizador/Controllers/piechartCtrl',
    'extControllers/Equalizador/Controllers/boxplotCtrl',
    'extControllers/Equalizador/Controllers/distributionplotCtrl',
    'extControllers/Equalizador/Controllers/combochartCtrl',
    'extControllers/Equalizador/Controllers/mapCtrl',
    'extControllers/Equalizador/Controllers/treemapCtrl',
    'extControllers/Equalizador/Controllers/histogramCtrl',
    'extControllers/Equalizador/Controllers/tableCtrl',
    'extControllers/Equalizador/Controllers/pivotTableCtrl',

], function (qlik, app, us) {
    app.controller('equalizadorCtrl', function ($scope, $rootScope, $compile, $http, $timeout) {
        $scope.labelRegExp = new RegExp("^'|^='|'$", "g");

        var cssId = 'equalizadorCss';
        if (!document.getElementById(cssId)) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'js/Controllers/Equalizador/css/equalizador.css';
            link.media = 'all';
            head.appendChild(link);
        }



        $rootScope.scrollTop = 0;
        $(window).scroll(function () {
            $rootScope.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        });
        //ID del Objeto
        $rootScope.OBJECTID;
        ////Obtenemos la app
        $scope.app = qlik.openApp($('body').attr('data-app'), config);

        $scope.openEqualizer = function (ID) {
            //Obtenemos la app
            $scope.app = qlik.openApp($('body').attr('data-app'), config);
            $('contextmenu').remove();
            var element = document.getElementById(ID);
            $(element).parents(".box_object").addClass("object-full-size-equializador");
            $timeout(function () {
                qlik.resize();
            }, 100);
            $scope.idobjetoEquializador = ID;
            $scope.getIdObject(ID);

            $rootScope.getNombreDimension = function (ID, index) {
                var dfd = jQuery.Deferred();
                $scope.app.getList('DimensionList', function (reply) {
                    var dimension = new Object;
                    listaDimensiones = reply.qDimensionList.qItems;
                    listaDimensiones = listaDimensiones.filter(function (obj) {
                        var _needle = ID;

                        if (typeof _needle != "undefined" || typeof _needle != "") {
                            if (obj.qInfo.qId == _needle) {
                                dimension = {};
                                dimension.id = ID;
                                dimension.active = false;
                                dimension.hasIcon = false;
                                dimension.name = obj.qMeta.title || '';
                                dimension.inArray = index || '';
                                dimension.orden = '';
                                dfd.resolve(dimension);
                            }
                        }
                    });
                });
                return dfd.promise();
            }

            $rootScope.getNombreDimensionById = function (ID) {
                var dfd = jQuery.Deferred();
                $scope.app.getList('DimensionList', function (reply) {
                    var dimension = new Object;
                    listaDimensiones = reply.qDimensionList.qItems;
                    listaDimensiones = listaDimensiones.filter(function (obj) {
                        var _needle = ID;
                        if (typeof _needle != "undefined" || typeof _needle != "") {
                            if (obj.qInfo.qId == _needle) {
                                dimension = {};
                                dimension.name = obj.qMeta.title || '';
                                dfd.resolve(dimension);
                            }
                        }
                    });
                });
                return dfd.promise();
            }


            $rootScope.getNombreDimensionEmpty = function (STR) {
                var item;
                var _needle = STR;
                var dfd = jQuery.Deferred();
                $scope.app.getList('DimensionList', function (reply) {
                    var _dimension = new Object;
                    listaDimensiones = reply.qDimensionList.qItems;
                    item = listaDimensiones.filter(function (obj) {

                        if (obj.qData.title == _needle) {
                            return obj.qData.title == _needle;
                        } else {
                            $scope.app.getList('FieldList', function (reply) {
                                listaDimensiones = reply.qFieldList.qItems;
                                item = listaDimensiones.filter(function (obj) {
                                    if (obj.qName == _needle) {
                                        return obj.qName == _needle;
                                    }
                                });
                            })
                        }

                        _dimension = {};
                        _dimension.id = '';

                        _dimension.active = false;
                        _dimension.hasIcon = false;
                        _dimension.name = STR || '';
                        _dimension.orden = '';
                        dfd.resolve(_dimension);

                    });
                });
                return dfd.promise();
            }


            $rootScope.getNombreMedidaById = function (ID, index) {
                var dfd = jQuery.Deferred();
                $scope.app.getList('MeasureList', function (reply) {
                    var medida = new Object;
                    listaMedidas = reply.qMeasureList.qItems;
                    listaMedidas = listaMedidas.filter(function (obj) {
                        var _needle = ID;
                        if (typeof _needle != "undefined" || typeof _needle != "") {
                            if (obj.qInfo.qId == _needle) {
                                medida = {};
                                medida.name = obj.qMeta.title || '';
                                dfd.resolve(medida);
                            }
                        }
                    });
                });
                return dfd.promise();
            }

            $rootScope.getNombreMedidaEmpty = function (STR, index) {
                var item;
                var _needle = STR;
                var dfd = jQuery.Deferred();
                $scope.app.getList('MeasureList', function (reply) {
                    var _measure = new Object;
                    listaMeasures = reply.qMeasureList.qItems;
                    item = listaMeasures.filter(function (obj) {
                        if (obj.qData.title == _needle) {
                            return obj.qData.title == _needle;
                        } else {
                            $scope.app.getList('FieldList', function (reply) {
                                listaMeasures = reply.qFieldList.qItems;
                                item = listaMeasures.filter(function (obj) {
                                    if (obj.qName == _needle) {
                                        return obj.qName == _needle;
                                    }
                                });
                            })
                        }

                        _measure = {};
                        _measure.id = '';

                        _measure.active = false;
                        _measure.hasIcon = false;
                        _measure.name = STR || '';
                        _measure.inArray = index || '';
                        _measure.orden = '';
                        dfd.resolve(_measure);

                    });
                });
                return dfd.promise();
            }


            //Función para Mapas
            $rootScope.getNameByID = function (ID) {
                var _needle = ID;
                var dfd = jQuery.Deferred();
                $scope.app.getList('DimensionList', function (reply) {
                    listaDimensiones = reply.qDimensionList.qItems;
                    listaDimensiones.filter(function (obj) {

                        if (obj.qInfo.qId == _needle) {
                            dfd.resolve(obj.qData.title);
                        }
                        else {
                            $scope.app.getList('FieldList', function (reply) {
                                listaDimensiones = reply.qFieldList.qItems;
                                //console.log(listaDimensiones, 'Field')
                                item = listaDimensiones.filter(function (obj) {
                                    if (obj.qName == _needle) {
                                        return obj.qName == _needle;
                                    }
                                });
                            })
                        }

                    });
                });
                return dfd.promise();
            }

            //Nuevo método get Nombre dimensión alternativa

            $rootScope.getNombreDimensionAlternativa = function (item) {
                var dfd = jQuery.Deferred();
                if (us.isUndefined(item.qLibraryId) || item.qLibraryId == '') {
                    if (item.qDef.qLabelExpression === undefined || item.qDef.qLabelExpression == '') {
                        if (item.qDef.qFieldDefs === undefined) {
                            if (item.qDef.qLabel != undefined && item.qDef.qLabel != '') {
                                var name = item.qDef.qLabel
                            } else {
                                var name = item.qDef.qDef;
                            }
                        } else {
                            if (item.qDef.qFieldDefs[0] != '') {
                                var name = item.qDef.qFieldDefs[0];
                            } else {
                                var name = item.qDef.qFieldLabels[0];
                            }
                        }
                    } else {
                        var name = item.qDef.qLabelExpression.replace($scope.labelRegExp, '');
                    }
                    dfd.resolve(name);
                } else {
                    $scope.app.getList('DimensionList', function (reply) {
                        var dimension = new Object;
                        listaDimensiones = reply.qDimensionList.qItems;
                        listaDimensiones = listaDimensiones.filter(function (obj) {
                            var _needle = item.qLibraryId;
                            if (typeof _needle != "undefined" || typeof _needle != "") {
                                if (obj.qInfo.qId == _needle) {
                                    var name = obj.qData.hasOwnProperty('labelExpression') ? obj.qData.labelExpression : obj.qData.title;//obj.qData.hasOwnProperty('labelExpression') ? obj.qData.labelExpression : obj.qData.title
                                    dfd.resolve(name.trim());
                                }
                            }
                        });
                    });
                }
                return dfd.promise();
            }

            $rootScope.getNombreMeasureAlternativa = function (item) {
                var dfd = jQuery.Deferred();
                if (us.isUndefined(item.qLibraryId) || item.qLibraryId == '') {
                    if (item.qDef.qLabelExpression === undefined || item.qDef.qLabelExpression == '') {
                        if (item.qDef.qFieldDefs === undefined) {
                            if (item.qDef.qLabel != undefined && item.qDef.qLabel != '') {
                                var name = item.qDef.qLabel
                            } else {
                                var name = item.qDef.qDef;
                            }
                        } else {
                            if (item.qDef.qFieldDefs[0] != '') {
                                var name = item.qDef.qFieldDefs[0];
                            } else {
                                var name = item.qDef.qFieldLabels[0];
                            }
                        }
                    } else {
                        var name = item.qDef.qLabelExpression.replace($scope.labelRegExp, '');
                    }
                    dfd.resolve(name);
                } else {
                    $scope.app.getList('MeasureList', function (reply) {
                        listaMedidas = reply.qMeasureList.qItems;
                        listaMedidas = listaMedidas.filter(function (obj) {
                            var _needle = item.qLibraryId;
                            if (typeof _needle != "undefined" || typeof _needle != "") {
                                if (obj.qInfo.qId == _needle) {
                                    var name = obj.qData.hasOwnProperty('labelExpression') ? obj.qData.labelExpression : obj.qData.title;//obj.qData.hasOwnProperty('labelExpression') ? obj.qData.labelExpression : obj.qData.title
                                    dfd.resolve(name.trim());
                                }
                            }
                        });
                    });
                }
                return dfd.promise();
            }

            $rootScope.getNombreDimensionAlternativaCampo = function (item) {
                var dfd = jQuery.Deferred();
                if (us.isUndefined(item.qLibraryId) || item.qLibraryId == '') {
                    if (item.qDef.qLabelExpression === undefined || item.qDef.qLabelExpression == '') {
                        if (item.qDef.qFieldDefs === undefined) {
                            if (item.qDef.qLabel != undefined && item.qDef.qLabel != '') {
                                var name = item.qDef.qLabel
                            } else {
                                var name = item.qDef.qDef;
                            }
                        } else {
                            if (item.qDef.qFieldDefs[0] != '') {
                                var name = item.qDef.qFieldDefs[0];
                            } else {
                                var name = item.qDef.qFieldLabels[0];
                            }                            
                        }
                    } else {
                        var name = item.qDef.qLabelExpression.replace($scope.labelRegExp, '');
                    }
                    dfd.resolve(name);
                } else {
                    $scope.app.getList('DimensionList', function (reply) {
                        var dimension = new Object;
                        listaDimensiones = reply.qDimensionList.qItems;
                        listaDimensiones = listaDimensiones.filter(function (obj) {
                            var _needle = item.qLibraryId;
                            if (typeof _needle != "undefined" || typeof _needle != "") {
                                if (obj.qInfo.qId == _needle) {
                                    var name = obj.qData.hasOwnProperty('labelExpression') ? obj.qData.labelExpression : obj.qData.title;//obj.qData.hasOwnProperty('labelExpression') ? obj.qData.labelExpression : obj.qData.title
                                    dfd.resolve(name.trim());
                                }
                            }
                        });
                    });
                }
                return dfd.promise();
            }

        }


        var htmlcontent = $('#box_equalizador');

        $scope.getIdObject = function (ID) {
            //var scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
            $rootScope.toScroll = $rootScope.scrollTop;
            $('body').addClass('open-equalizador');
            $('#box_equalizador').addClass('active');
            $('#box_equalizador').attr('data-idObjetoEqualizador', ID);
            //Iniciar paneles
            $('#box_contenido_equalizador .collapse').removeClass('show', function () {
                $('#box_contenido_equalizador .collapse').first().addClass('show');
            });

            //Obtenemos el tipo de Objeto
            $scope.getTipoObjeto(ID);
        }

        $scope.getTipoObjeto = function (IDOBJECT) {
            //$rootScope.OBJECTID = IDOBJECT;
            $scope.app.getObject(IDOBJECT).then(function (model) {
                $rootScope.OBJECTID = IDOBJECT;
                $rootScope.typeObject = model.layout.qInfo.qType;
                var newScope = $scope.$new(true, $scope);
                console.log($rootScope.typeObject);
                switch ($rootScope.typeObject) {
                    case 'linechart':
                        $rootScope.typePresentacion = model.layout.lineType;
                        $scope.urlHtml = './js/Controllers/Equalizador/partials/linechart.html';
                        break;
                    case 'barchart':
                        $rootScope.typeOrientacion = model.layout.orientation;
                        $scope.urlHtml = './js/Controllers/Equalizador/partials/barchart.html';
                        break;
                    case 'scatterplot':
                        $scope.urlHtml = './js/Controllers/Equalizador/partials/scatterplot.html';
                        break;
                    case 'piechart':
                        $scope.urlHtml = './js/Controllers/Equalizador/partials/piechart.html';
                        break;
                    case 'boxplot':
                        $scope.urlHtml = './js/Controllers/Equalizador/partials/boxplot.html';
                        break;
                    case 'distributionplot':
                        $scope.urlHtml = './js/Controllers/Equalizador/partials/distributionplot.html';
                        break;
                    case 'combochart':
                        $scope.urlHtml = './js/Controllers/Equalizador/partials/combochart.html';
                        break;
                    case 'map':
                        $scope.urlHtml = './js/Controllers/Equalizador/partials/map.html';
                        break;
                    case 'treemap':
                        $scope.urlHtml = './js/Controllers/Equalizador/partials/treemap.html';
                        break;
                    case 'histogram':
                        $scope.urlHtml = './js/Controllers/Equalizador/partials/histogram.html';
                        break;
                    case 'table':
                        $scope.urlHtml = './js/Controllers/Equalizador/partials/table.html';
                        break;
                    case 'pivot-table':
                        $scope.urlHtml = './js/Controllers/Equalizador/partials/pivotTable.html';
                        break;

                    default:
                        $scope.urlHtml = './js/Controllers/Equalizador/partials/noItem.html';
                }
                $http.get($scope.urlHtml).then(function (response) {
                    $timeout(function () {
                        qlik.resize();
                    }, 600);
                    $(htmlcontent).append($compile(response.data)(newScope));
                    newScope.$digest();

                });

                return false;
            });
        }




        //Generar id
        $rootScope.randomString = function (len, charSet) {
            charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var randomString = '';
            for (var i = 0; i < len; i++) {
                var randomPoz = Math.floor(Math.random() * charSet.length);
                randomString += charSet.substring(randomPoz, randomPoz + 1);
            }

            var timestamp = +new Date;

            return randomString + timestamp.toString();
        }


        $rootScope.getAltoAcordeon = function () {
            setTimeout(function () {
                var altoHeaders = 0;
                $('#box_equalizador .em-section-header').each(function () {
                    altoHeaders = altoHeaders + $(this).outerHeight();
                })
                var altoSection = $('.box_section_equializador').outerHeight();
                var altoItems = altoSection - altoHeaders;
                $('#box_equalizador .collapse .innerCollapse').height(altoItems - 60);
            }, 200);
        }

    })
        .filter('orderObjectBy', function () {
            return function (items, field, reverse) {
                var filtered = [];
                angular.forEach(items, function (item) {
                    filtered.push(item);
                });
                filtered.sort(function (a, b) {
                    return (a[field] > b[field] ? 1 : -1);
                });
                if (reverse) filtered.reverse();
                return filtered;
            };
        });
});






