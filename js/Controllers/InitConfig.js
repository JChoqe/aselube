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
    'angular'
], function (qlik, app, angular) {
    app.provider('InitConfig', function () {
        var $this = this;
        this.demo = true;
        this.language = 'es';
        this.multilanguage = true;
        this.varLanguage = 'lang';
        this.fieldLanguage = '_Idioma';
        this.darkView = true; // Background Imagen / Blanco
        this.modeView = true; //Modo Noche y Día
        this.ThemesInit = "_Theme-ASELUBE";
        this.ThemesImage = "_Theme-ASELUBE";

        this.appVentas = 'ASELUBE';  // Local
        // this.appVentas = 'cadef709-0665-4e98-80cc-2ae4fdb3a363';  // Servidor

        this.$get = function () {
            return $this;
        }
    })
});