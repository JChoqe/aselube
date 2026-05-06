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
        
        app.directive('switchlang', [function () {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                templateUrl: 'js/Directives/switchlang/switchlang.html',
                link: function (scope, element, attrs) {                                        
                    attrs.$observe('idapp', function () {
                        scope._thisapp = qlik.openApp($('body').attr('data-app'), config);                       
                    });
                    
                   
                },
                controller: ['$q', '$scope', '$rootScope', 'InitConfig', 'luiDialog', '$translate', 'mzAPI', function ($q, $scope, $rootScope, InitConfig, luiDialog, $translate, mzAPI) { 
                    $scope.api = mzAPI; 
                    $scope.multilanguage = InitConfig.multilanguage;

                    $scope.langs = [
                        {
                            lang: $translate.instant('views.idioma.es'),
                            //flag: './assets/img/flags/Spain.png',
                            langKey: 'es',
                            active: InitConfig.language == 'es' ? true : false
                        },
                        {
                            lang: $translate.instant('views.idioma.en'),
                            //flag: './assets/img/flags/United-Kingdom.png',
                            langKey: 'en',
                            active: InitConfig.language == 'en' ? true : false
                        },
                        {
                            lang: $translate.instant('views.idioma.fr'),
                            //flag: './assets/img/flags/France.png',
                            langKey: 'fr',
                            active: InitConfig.language == 'fr' ? true : false
                        }
                    ];

                    $scope.result = $scope.langs.filter(obj => {
                        return obj.active === true;
                    })                    
                    $scope.activeLang = function (item) {
                        if (!item.active) { 
                            qlik.setLanguage(item.langKey);
                            $translate.use(item.langKey);
                            $scope.api.changeLanguage($scope._thisapp);

                            $scope._thisapp.variable.getContent(InitConfig.varLanguage).then(function (model) {
                                $scope._thisapp.variable.setStringValue(InitConfig.varLanguage, item.langKey.toUpperCase());
                            }).catch(function (res) {
                                var fieldLanguage = $scope._thisapp.field(InitConfig.fieldLanguage).getData();
                                fieldLanguage.OnData.bind(function () {
                                    switch (fieldLanguage.rows.length) {
                                        case 0:
                                            return false;
                                            break;                                            
                                        default:
                                            $scope._thisapp.field(InitConfig.fieldLanguage).selectValues([item.langKey.toUpperCase()], true, true);
                                            break;
                                    }
                                });                                
                            });
                                                                                     
                            angular.forEach($scope.langs, function (value, key) {
                                if ($scope.langs[key].active === false && $scope.langs[key].langKey === item.langKey) {
                                    $scope.langs[key].active = true;
                                    $scope.langs[key].lang = $translate.instant('views.idioma.' + $scope.langs[key].langKey +'')
                                } else {
                                    $scope.langs[key].active = false;
                                    $scope.langs[key].lang = $translate.instant('views.idioma.' + $scope.langs[key].langKey + '')
                                }
                            })
                            $scope.result = $scope.langs.filter(obj => {
                                return obj.active === true;
                            })                                                                                    
                        }      
                    }                                        
                }]
            };
        }]);

});