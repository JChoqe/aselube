define([
    'js/qlik',
    'app'
], function (qlik, app) {
        app.service('getAppService', function () {
            this.getDataApp = function (appID) {
                return qlik.openApp(appID, config);
            };        
    });
});