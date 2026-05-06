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

    app.controller('kpiIncludeCtrl', function ($rootScope) {
        $(".qlik-embed").each(function () {
            var qvid = $(this).data("qlik-objid");
            $rootScope._thisCurrentApp.getObject(this, qvid).then(function (model) {
                if (model) {
                    $rootScope.lstModel.push(model);
                }
            });
        });
    });        
});




