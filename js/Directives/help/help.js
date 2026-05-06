/****************************************************************************************************************************************
Obtener el host de la extensión, por ejemplo, en localhost:4848/extensions/NombreExtension/Pagina.html
se obtiene /extensions/NombreExtension/
/***************************************************************************************************************************************/
var href = window.location.pathname;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

define([
    'js/qlik',
    'app',
    './text!./dialog-template.ng.html',
    './text!./css/help.css'
], function (qlik, app, dialogTemplate, cssContent  ) {
        $('<style>').html(cssContent).appendTo('head')
        app.directive('help', [function () {
            return {
                restrict: 'E',
                scope: false,
                templateUrl: 'js/Directives/help/help.html',
                link: function (scope, element, attrs) {                    
                },
                controller: ['$q', '$scope', '$rootScope', 'luiDialog', '$translate', function ($q, $scope, $rootScope, luiDialog, $translate) {
                    
                    $scope.showHelp = function () {
                        var _template = dialogTemplate;
                        var dialog = luiDialog.show({
                            template: _template,
                            closeOnEscape: true,
                            controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                                $scope.closeDialog = function () {
                                    dialog.close();
                                }

                            }]
                        });
                    }

                                        
                }]
            };
        }]);

});