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

    app.directive('errorsmanagement', [function (luiDialog) {
        return {
            restrict: 'E',
            scope: false,
            link: function (scope, element, attrs) {

            },
            controller: ['$q', '$scope', '$rootScope', 'luiDialog', '$translate', 'InitConfig', function ($q, $scope, $rootScope, luiDialog, $translate, InitConfig, $window) {
                $scope.loop = 0;


                function dialog(msg) {
                    var dialog = luiDialog.show({
                        template: '<lui-dialog class="qv-alert-dialog lui-dialog"><lui-dialog-header><lui-dialog-title><i class="lui-icon lui-icon--info"></i> Info</lui-dialog-title></lui-dialog-header><lui-dialog-body>{{textEror}}</lui-dialog-body><lui-dialog-footer><button class="lui-button  lui-dialog__footer-button" ng-click="closeDialog();"><i class="lui-icon lui-icon--sync"></i> Reload Page</button></lui-dialog-footer></lui-dialog>',
                        closeOnEscape: false,
                        controller: ['$scope', '$rootScope', function ($scope) {
                            $scope.textEror = msg;
                            $scope.closeDialog = function () {
                                dialog.close();
                                window.location.reload();
                                $rootScope.deleteElement();
                            }
                        }]
                    });
                }
                qlik.on("error", function (error) {
                    if ($scope.loop == 0) {
                        switch (error.code) {
                            case 2:
                                $rootScope.deleteElement();
                                break;
                            case 16:
                                $scope.loop = 1;
                                dialog(error.message);
                                break;
                            default:
                                if (["OnSessionTimedOut", "OnSessionClosed"].indexOf(error.method) > -1) {
                                    $scope.loop = 1;
                                    dialog("Your session timed out");
                                } else {
                                    console.log(error.message);
                                }
                        }
                    } else {
                        return false;
                    }

                });
            }]
        };
    }]);

});