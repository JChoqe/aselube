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
], function (qlik, app, angular ) {
        
        app.directive('glosario', [function () {
            return {
                restrict: 'E',
                scope: false,
                templateUrl: 'js/Directives/glosario/glosario.html',
                link: function (scope, element, attrs) {                                        
                    attrs.$observe('idapp', function () {
                        scope._thisapp = qlik.openApp($('body').attr('data-app'), config);
                        scope.ChangeGlosario(scope._thisapp);
                    });
                    
                   
                },
                controller: ['$q', '$scope', '$rootScope', function ($q, $scope, $rootScope) { 
                    $scope.glossaryArr = [];
                    $scope.loadGlosario = function (APP) {
                        var defer = $q.defer();
                        var arrGlossary = [];
                        APP.getList("MeasureList", function (reply) {
                            $.each(reply.qMeasureList.qItems, function (key, value) {
                                _item = {};
                                _item.name = value.qData.title;
                                _item.descripcion = value.qMeta.description;
                                _item.type = 'Medida';
                                arrGlossary.push(_item);

                            });
                        });

                        APP.getList("DimensionList", function (reply) {
                            $.each(reply.qDimensionList.qItems, function (key, value) {
                                _item = {};
                                _item.name = value.qData.title;
                                _item.descripcion = value.qMeta.description;
                                _item.type = 'Dimensión';
                                arrGlossary.push(_item);
                            });
                        });
                        defer.resolve(arrGlossary);
                        return defer.promise;
                    }


                    $scope.ChangeGlosario = function (APP) {
                        $scope.loadGlosario(APP).then(function (v) {
                            $scope.glossaryArr = [];
                            $scope.glossaryArr = v;
                        });
                    }
                   

                    $rootScope.OpenGlosary = false;
                    $rootScope.openGlosary = function () {
                        $rootScope.OpenGlosary = $rootScope.OpenGlosary === false ? true : false;

                        if ($rootScope.OpenGlosary == true) {
                            $scope.ChangeGlosario($scope._thisapp);
                        }

                    }                                        
                }]
            };
        }]);

});