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

    app.directive('speeldial', ['$timeout', '$compile', '$rootScope', function ($timeout, $compile, $rootScope) {
        return {
            restrict: 'E',
            scope: {
                objectId: "@",
                objectEqualizer: "@"
            },
            templateUrl: 'js/Directives/speeldial/speeldial.html',
            link: function (scope, element, attrs) {
                scope.ObjectId = attrs.objectId;
                scope.Equalizershow = attrs.objectEqualizer;
                scope.idobjetoEquializador = '';
                var VISIBLE_CLASS = 'is-showing-options',
                    fab_btn = element.find('.fab_btn'),
                    fab_ctn = element.find('.fab_ctn'),
                    showOpts = function (e) {
                        var processClick = function (evt) {
                            if (e !== evt) {
                                fab_ctn.removeClass(VISIBLE_CLASS);
                                fab_ctn.IS_SHOWING = false;
                                document.removeEventListener('click', processClick);
                            }
                        };
                        if (!fab_ctn.IS_SHOWING) {
                            fab_ctn.IS_SHOWING = true;
                            fab_ctn.addClass(VISIBLE_CLASS);
                            document.addEventListener('click', processClick);
                        }
                    };
                //fab_btn.addEventListener('click', showOpts);
                $(fab_btn).on('click , mouseenter', function (event) {
                    showOpts();
                });
                $(fab_ctn).on('mouseleave', function (event) {
                    fab_ctn.removeClass(VISIBLE_CLASS);
                    fab_ctn.IS_SHOWING = false;
                });

                //Objeto full size
                scope.getFullSize = function (event) {
                    $('body').addClass("body-full-size");
                    $TARGET = event.currentTarget;
                    $($TARGET).addClass("hidden").parents(".box_object").addClass("object-full-size");
                    $($TARGET).next(".ico-contract").removeClass("hidden");
                    $timeout(function () {
                        qlik.resize();
                    }, 300);
                }

                //Objeto Normal size
                scope.lostFullSize = function (event) {
                    $('body').removeClass("body-full-size");
                    $TARGET = event.currentTarget;
                    $($TARGET).addClass("hidden").parents(".box_object").removeClass("object-full-size");
                    $($TARGET).prev(".ico-expand").removeClass("hidden");
                    $timeout(function () {
                        qlik.resize();
                    }, 300);
                }

                //Clone Full Size                
                scope.cloneObject = function (event) {
                    $TARGET = event.currentTarget;
                    scope.idObject = $($TARGET).attr('data-rel');
                    var el = $compile('<div class="object-full-size box_object"><div class="qlik-embed" ng-right-click="ShowContextMenu($event,' + scope.idObject + ')"><speeldial object-id="' + scope.idObject + '"></speeldial><cloneobject object-id="' + scope.idObject + '"></cloneobject></div></div>')(scope);
                    $('body').append(el);
                }
                scope.removeCloneObject = function (event) {
                    $('.object-full-size').remove();
                }
            }

        }
    }]);

});





//angular.module('qlik-mashup').directive('myDirective', function () {
//    return {
//        restrict: 'E', //E = element, A = attribute, C = class, M = comment         
//        scope: {
//            //@ reads the attribute value, = provides two-way binding, & works with functions
//            title: '@'
//        },
//        template: '<div>{{ myVal }}</div>',
//        //controller: controllerFunction, //Embed a custom controller in the directive
//        link: function ($scope, element, attrs) {
//            alert('Directiva')
//        } //DOM manipulation
//    }
//});