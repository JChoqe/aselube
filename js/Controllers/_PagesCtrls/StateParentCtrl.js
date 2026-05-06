
define([
    'js/qlik',
    'app'
], function (qlik, app) {
        app.controller('StateParentCtrl', function ($scope, $rootScope, dataApp, InitConfig) { 
            //console.log(dataApp);
            //console.log(dataApp.id)
            $rootScope.addElement();
            $('body').attr('data-app', dataApp.id);
            $rootScope.appID = dataApp.id;
            $rootScope._thisCurrentApp = dataApp;


            //Inicio Idioma
            $rootScope._thisCurrentApp.variable.getContent(InitConfig.varLanguage).then(function (model) {
                $rootScope._thisCurrentApp.variable.setStringValue(InitConfig.varLanguage, $rootScope.language.toUpperCase());
            }).catch(function (res) {
                var fieldLanguage = $rootScope._thisCurrentApp.field(InitConfig.fieldLanguage).getData();
                fieldLanguage.OnData.bind(function () {
                    switch (fieldLanguage.rows.length) {
                        case 0:
                            return false;
                            break;
                        default:
                            $rootScope._thisCurrentApp.field(InitConfig.fieldLanguage).selectValues([$rootScope.language.toUpperCase()], true, true);
                            break;
                    }
                });
            });
                                   
    });

});