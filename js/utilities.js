/****************************************************************************************************************************************
Obtener el host de la extensión, por ejemplo, en localhost:4848/extensions/NombreExtension/Pagina.html
se obtiene /extensions/NombreExtension/
/***************************************************************************************************************************************/
"use strict";
var href = window.location.pathname;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

define([
    'js/qlik',
    'app',
    'jquery',
    'angular'
], function (qlik, app, $, angular) {
    app.controller('PageControllerCtrl', function ($scope, $rootScope, $timeout, $state) {
        $rootScope.apiKey = 'Quandox.qvf';
        //Themes Inicial
        $rootScope.ThemesInit = "_theme-mashup";//"MZP_Theme-Imagen-ICEA";
        //Themes Imagen
        $rootScope.ThemesImage = "_theme-mashup";//"MZP_Theme-Imagen-ICEA";
    });
});