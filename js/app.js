/****************************************************************************************************************************************
Obtener el host de la extensi�n, por ejemplo, en localhost:4848/extensions/NombreExtension/Pagina.html
se obtiene /extensions/NombreExtension/
/***************************************************************************************************************************************/
var href = window.location.pathname;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

function getURLParameter(a) {
    return (RegExp(a + "=(.+?)(&|$)").exec(location.search) || [null, null])[1]
}

define([
    'js/qlik',
    'angular',
    'uiRouter',
    dir + "js/site.js",
    dir + "include/angular-ui/angular-cookies.min.js",
    dir + "include/angular-ui/angular-resource.min.js",
    dir + "include/angular-ui/angular-sanitize.min.js",
    dir + "include/angular-ui/angular-touch.min.js",
    dir + "include/angular-translate/traducciones_es.js",
    dir + "include/angular-translate/traducciones_en.js",
    dir + "include/angular-translate/traducciones_fr.js",
    dir + "include/angular-translate/angular-translate.min.js",

], function (qlik, angular) {
    qlik.on("error", function (error) {
        console.log(error.message);
    },
        function (warning) {
            windows.console.log(warning);
        });

    var app = angular.module('qlik-mashup', [
        'ui.router',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'pascalprecht.translate'
    ]);

    app.directive('currentSelections', function ($filter) {
        return {
            restrict: "A",
            scope: {
                currentSelections: '='
            },
            link: function (scope, element, attrs) {
                scope.$watch('currentSelections', function (newValue, oldValue) {
                    if (typeof scope.currentSelections != 'undefined') {
                        scope.currentSelections.getObject(element, 'CurrentSelections');
                    }
                });
            }
        }
    });
    app.directive('cloneobject', ['$timeout', '$compile', '$rootScope', function ($timeout, $compile, $rootScope) {
        return {
            restrict: 'E',
            scope: true,
            template: '<div class="object-clone" object-id="{{ObjectId}}"></div>',
            link: function (scope, element, attrs) {
                scope.appID = $rootScope.apiKey;
                scope.app = qlik.openApp(scope.appID, config);
                scope.ObjectId = attrs.objectId;
                element.addClass('containerCloneObject');
                scope.div = element;
                scope.app.getObject(scope.div, scope.ObjectId);
            } //DOM manipulation
        }
    }]);
    app.directive('ngRightClick', function ($parse) {
        return function (scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function (event) {
                scope.$apply(function () {
                    event.preventDefault();
                    fn(scope, { $event: event });
                });
            });
        };
    });
    app.filter('orderObjectBy', function () {
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
    app.filter("unique", function () {
        return function (collection, keyname) {
            var output = [],
                keys = [];
            angular.forEach(collection, function (item) {
                var key = item[keyname];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });
            return output;
        };
    });
    app.factory('mzAPI', function () {
        return {
            changeLanguage: function (APPQLIK) {
                var $CurrentSelections = $(".CurrentSelections");
                $CurrentSelections.empty();
                setTimeout(function () {
                    APPQLIK.getObject($CurrentSelections, 'CurrentSelections');
                    $('.qv-global-selections').parent('div').remove();
                }, 600);
            }
        }
    });
    app.run(function ($rootScope, InitConfig) {
        qlik.setLanguage(InitConfig.language);
        //Destruimos los objetos en cada cambio de p�gina  
        $rootScope.$on("$stateChangeStart", function () {
            if ($rootScope.lstModel && $rootScope.lstModel.length >= 1) {
                angular.forEach($rootScope.lstModel, function (value, key) {
                    try {
                        value.close();
                    }
                    catch (error) {
                        console.log("error eliminando el objeto " + key + "\n" + error)
                    }
                });
                $rootScope.lstModel = [];
            }
        });
    });
    app.factory('$exceptionHandler', ['$log', '$injector', function ($log, $injector) {
        return function myExceptionHandler(exception, cause) {
            var $http = $injector.get('$http');
            $log.warn(exception, cause);
            // muestro s�lo esto y ya tira error
            console.log($http);
        }
    }]);
    return app;
});

//case 'reload':
//if (me.isPersonalMode) {
//    app.doReload().then(function () {
//        app.doSave();
//    });
//} else {
//    qlik.callRepository('/qrs/app/' + app.id + '/reload', 'POST').success(function (reply) {
//        //TODO:handle errors, remove alert
//        alert("App reloaded");
//    });
//}