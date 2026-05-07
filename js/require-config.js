'use strict';

/****************************************************************************************************************************************
Obtener el host de la extensi�n, por ejemplo, en localhost:4848/extensions/NombreExtension/Pagina.html
se obtiene /extensions/NombreExtension/
/***************************************************************************************************************************************/
var href = window.location.pathname;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

var prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);
var root = dir;
var extRoot = root + 'js';
var extIncludeRoot = root + 'include'

var config = {
    host: window.location.hostname,
    prefix: prefix,
    port: window.location.port,
    isSecure: window.location.protocol === "https:"
};

require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
    paths: {
        'extJs': extRoot,
        'extView': root + 'views',
        'extControllers': root + 'js/Controllers',
        'extDirectives': root + 'js/Directives',
        'extServices': root + 'js/Services',
        'app': extRoot + '/app',
        'jquery': extIncludeRoot + '/jquery-3.3.1.min',
        'jqueryui': extIncludeRoot + '/jquery-ui-1.12.1/jquery-ui.min',
        "TouchPunch": extIncludeRoot + '/jquery.ui.touch-punch.min',
        'popper': extIncludeRoot + '/bootstrap-4/dist/js/popper',
        'bootstrap': extIncludeRoot + '/bootstrap-4/dist/js/bootstrap.bundle.min',
        'uiRouter': extIncludeRoot + '/angular-ui-router.min',
        'Modernizr': extIncludeRoot + '/modernizr.min',
        'select2': extIncludeRoot + '/select2/js/select2.min',
    },

    shim: {
        'uiRouter': {
            'deps': ['angular']
        },
        'Modernizr': {
            'exports': 'Modernizr'
        },
        'jquery': {
            exports: 'jQuery'
        },
        'jqueryui': {
            deps: ['jquery']
        },
        "TouchPunch": {
            deps: ["jquery", "jqueryui"]
        },
        'bootstrap': {
            'deps': ['jquery', 'popper']
        }
    }
});
require([
    'js/qlik',
    'extJs/main',
    'jquery',
    'jqueryui',
    'TouchPunch',
    'bootstrap',
    'select2'
], function (qlik, jquery, jqueryui, bootstrap, select2) {
    // Lazy bootstraping of angular modules in order to have enough time to load them
    // all first. This requires the qva-bootstrap="false" attribute on the html tag
    // of the index.html file. Load the mashup module at the same time.

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['qlik-angular', 'qlik-mashup']);
    });
}
);

require(['popper'], function (popper) {
    window.Popper = popper;
    require(["bootstrap"]);
});


define("client.services/grid-service", {});