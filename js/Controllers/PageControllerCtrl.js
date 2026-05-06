/****************************************************************************************************************************************
Obtener el host de la extensión, por ejemplo, en localhost:4848/extensions/NombreExtension/Pagina.html
se obtiene /extensions/NombreExtension/
/***************************************************************************************************************************************/
var href = window.location.pathname;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

define([
    'js/qlik',
    'app',
], function (qlik, app) {
        app.controller('PageControllerCtrl', function (InitConfig, $scope, $rootScope, $compile, $timeout, $state) {            
            $rootScope.demo = InitConfig.demo;
            $rootScope.darkView = InitConfig.darkView;
            $rootScope.language = InitConfig.language;

            if (InitConfig.darkView == true) {
                $rootScope.ThemesInit = InitConfig.ThemesInit;
                $rootScope.ThemesImage = InitConfig.ThemesImage;
            } else {
                $rootScope.ThemesInit = InitConfig.ThemesImage;
                $rootScope.ThemesImage = InitConfig.ThemesImage;
            }

            setQlikTheme(qlik, $rootScope.ThemesInit)
            $rootScope.lstModel = [];

            $scope.ShowContextMenu = function (e, id) {
                var mousePosition = {};
                var menuPostion = {};
                var menuDimension = {};

                menuDimension.x = 250;
                menuDimension.y = 200;
                mousePosition.x = event.pageX;
                mousePosition.y = event.pageY;

                if (mousePosition.x + menuDimension.x > $(window).width() + $(window).scrollLeft()) {
                    menuPostion.x = mousePosition.x - menuDimension.x;
                } else {
                    menuPostion.x = mousePosition.x;
                }

                if (mousePosition.y + menuDimension.y > $(window).height() + $(window).scrollTop()) {
                    menuPostion.y = mousePosition.y - menuDimension.y;
                } else {
                    menuPostion.y = mousePosition.y;
                }


                $('contextmenu').remove().promise().done(function () {
                    var _html = '<contextmenu object-id="' + id + '" top="' + menuPostion.y + '" left="' + menuPostion.x + '"></contextmenu>';
                    var el = $compile(_html)($scope);
                    $('body').append(el);
                })
            }
            $scope.close = function () {
                $('contextmenu').remove();
            }

            

            

           
            $rootScope.IsPersonalMode = '';
            var global = qlik.getGlobal(config);
            global.isPersonalMode(function (reply) {
                $rootScope.IsPersonalMode=  reply.qReturn;
            });

            $rootScope.getPersonalMode = function() {
                var defer = jQuery.Deferred();
                var global = qlik.getGlobal(config);
                global.isPersonalMode(function (reply) {
                    defer.resolve([reply.qReturn]);
                });
                return defer.promise();
            }



            /* Bloqueo cambio de páginas */
            $rootScope.addElement = function () {
                var newEle = angular.element('<div class="mz-block"><div class="flex-loader-cover"><div class="loaderEquializador">Loading...</div></div></div > ');
                var target = document.getElementById('main');
                angular.element(target).append(newEle);
            }
            $rootScope.deleteElement = function () {
                setTimeout(function () {
                    var target = document.getElementsByClassName('mz-block');
                    $(target).fadeOut(600, function () {
                        $(target).remove();
                    });
                }, 800);
            }

            //Toogle Sidebar Menú
            $scope.OpenSidebarMenu = false;
            $scope.toogleSidebar = function () {
                $scope.OpenSidebarMenu = $scope.OpenSidebarMenu === false ? true : false;
                $timeout(function () {
                    qlik.resize();
                }, 300);
            }

            //Toogle menu Ipad/responsive
            $scope.ShowMenu = false;
            $scope.toogleMenu = function () {
                $scope.ShowMenu = $scope.ShowMenu === false ? true : false;
            }
    });
 });







