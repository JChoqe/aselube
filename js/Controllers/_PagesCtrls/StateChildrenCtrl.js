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
], function (qlik, app, us) {

    app.controller('StateChildrenCtrl', function ($scope, $rootScope, $stateParams, $state, $translate, InitConfig, $q, $timeout, $compile) {
        //console.log(angular.version);  
        $rootScope.OpenFiltros = false;


        $rootScope.IdFiltros = $stateParams.IDFILTRO;

        //Check para array filtros
        switch (typeof ($stateParams.IDFILTRO)) {
            case 'string':
                $rootScope.isArray = false
                break;
            default:
                $rootScope.isArray = true
        }

        function translateArr(arr) {
            var defer = $q.defer();
            var newArr = [];
            angular.forEach(arr, function (value, key) {
                newArr.push($translate.instant(value))
            });

            defer.resolve(newArr);
            return defer.promise;
        }


        //Rastro de migas
        if ($stateParams.PATH) {
            if (InitConfig.multilanguage == true) {
                translateArr($stateParams.PATH).then(function (res) {
                    $rootScope.tituloSeccion = res.reduce(function (total, element) {
                        var iNext = ' <i class="icofont icofont-rounded-right"></i> ';
                        return total + iNext + element;
                    });
                })
                $rootScope.$on('$translateChangeSuccess', function (event, current, previous) {
                    translateArr($stateParams.PATH).then(function (res) {
                        $rootScope.tituloSeccion = res.reduce(function (total, element) {
                            var iNext = ' <i class="icofont icofont-rounded-right"></i> ';
                            return total + iNext + element;
                        });
                    })
                });
            } else {
                $rootScope.tituloSeccion = $stateParams.PATH.reduce(function (total, element) {
                    var iNext = ' <i class="icofont icofont-rounded-right"></i> ';
                    return total + iNext + element;
                });
            }

        }



        //Carga de Objetos
        var _itemHome = $('.row-page .qlik-embed').length;
        var round = 0;
        $rootScope.ITEMS = [];
        $(".qlik-embed").each(function () {
            $scope.noInteraction = $(this).attr('data-noInteraction') || false;
            var qvid = $(this).data("qlik-objid").trim();
            var $this = $(this);

            if ($($this).hasClass('hasDataView')) {
                var item = {};
                item.id = qvid;
            }


            $rootScope._thisCurrentApp.visualization.get(qvid, { noInteraction: $scope.noInteraction })
                .then(function (vis) {
                    vis.show($this, {
                        onRendered: function () {
                            round = round + 1;
                            $rootScope.lstModel.push(vis);
                            if (round >= _itemHome) {
                                $rootScope.deleteElement();
                            }
                            if ($($this).hasClass('hasDataView')) {
                                item.vis = vis;
                                $rootScope.ITEMS.push(item);
                            }
                        }
                    })
                }).catch(function () {
                    round = round + 1;
                    if (round >= _itemHome) {
                        $rootScope.deleteElement();
                    }
                });

        });

        var $CurrentSelections = $(".CurrentSelections");
        $rootScope._thisCurrentApp.getObject($CurrentSelections, 'CurrentSelections');
        $('.qv-global-selections').parent('div').remove();


        //Alternar Objetos en KPIS
        $scope.toggleObjectChange = function ($event) {
            var _this = $event.currentTarget;
            var _other = $(_this).parents('.box_object_inner_kpi').next('.box_object_inner_grafico');

            var _id_top = $(_this).attr('data-top');
            var _id_bottom = $(_other).attr('data-bottom');

            $(_this).parents('.box_mix_object').find('speeldial').attr('object-id', _id_top);

            $(_this).attr({
                'id': _id_bottom,
                'data-qlik-objid': _id_bottom,
                'data-top': _id_bottom
            }).promise().done(function () {
                var _oInteraction = false;
                var _interactionObject = $(this).children(".qlik-embed").attr("data-interaction");
                if (_interactionObject === 'none') {
                    var _oInteraction = true;
                }

                $rootScope._thisCurrentApp.getObject(this, _id_bottom, { "noInteraction": _oInteraction }).then(function (model) {
                    if (model) {
                        $rootScope.lstModel.push(model);
                    }
                });
            });


            $(_other).attr({
                'id': _id_top,
                'data-qlik-objid': _id_top,
                'data-bottom': _id_top
            }).promise().done(function () {
                var _oInteraction = false;
                var _interactionObject = $(this).children(".qlik-embed").attr("data-interaction");
                if (_interactionObject === 'none') {
                    var _oInteraction = true;
                }

                $rootScope._thisCurrentApp.getObject(this, _id_top, { "noInteraction": _oInteraction }).then(function (model) {
                    if (model) {
                        $rootScope.lstModel.push(model);
                    }
                });
            });
        }


        //Navegación de KPIS
        $rootScope.goToPage = function ($event) {
            var _url = $($event.currentTarget).attr('data-url-page');
            var hasUrl = us.isEmpty(_url);
            switch (hasUrl) {
                case false:
                    $state.go(_url)
                    break;
                case true:
                    return false;
                    break;
                default:
                    return false;
                    break;
            }
        }

    });

});



