/****************************************************************************************************************************************
Obtener el host de la extensión, por ejemplo, en localhost:4848/extensions/NombreExtension/Pagina.html
se obtiene /extensions/NombreExtension/
/***************************************************************************************************************************************/
var href = window.location.pathname;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

define([
    'js/qlik',
    'app'
], function (qlik, app) {
        app.directive('modeview', [function () {
            return {
                restrict: 'E',
                scope: false,
                replace:true,
                templateUrl: 'js/Directives/modeview/modeview.html',
                link: function (scope, element, attrs) {                    
                },
                controller: ['$q', '$scope', '$rootScope', 'luiDialog', '$translate', 'InitConfig', function ($q, $scope, $rootScope, luiDialog, $translate, InitConfig) {
                    $scope.ModeView = InitConfig.modeView;

                    //Modo Dark/Light
                    $scope.modoWhite = !InitConfig.darkView;
                    $scope.toggleModeColor = function() {
                        $scope.modoWhite = $scope.modoWhite === false ? true : false;

                        switch ($scope.modoWhite) {
                            case true:
                                $('body').removeClass('mz-dark').addClass('mz-white');
                                $rootScope.ThemesInit = InitConfig.ThemesImage;
                                $rootScope.ThemesImage = InitConfig.ThemesImage;
                                setQlikTheme(qlik, $rootScope.ThemesInit);
                                $rootScope.darkView = false;                                
                                break;
                            case false:
                                $('body').removeClass('mz-white').addClass('mz-dark');
                                $rootScope.ThemesInit = InitConfig.ThemesInit;
                                $rootScope.ThemesImage = InitConfig.ThemesImage;
                                setQlikTheme(qlik, $rootScope.ThemesInit);
                                $rootScope.darkView = true;
                                break;
                            default:
                                $('body').removeClass('mz-white');
                                break
                        }                        
                    }

                                        
                }]
            };
        }]);

});