define([
    'app',
    './routerQuandox',
    './routerInformeTitularidad',
    './routerINE'

], function (app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider', '$translateProvider', 'InitConfigProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $translateProvider, InitConfigProvider) {
        $translateProvider.translations('es', translationsES);
        $translateProvider.translations('en', translationsEN);
        $translateProvider.translations('fr', translationsFR);
        $translateProvider.preferredLanguage(InitConfigProvider.language);
        $translateProvider.useSanitizeValueStrategy('escape');
        $locationProvider.hashPrefix('');
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);

        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('Home', {
                template: "<ui-view></ui-view>",
                controller: 'HomeCtrl'
            })
            /* HOME - Navegación inicial Home */
            .state('Home.inicio', {
                url: '/home',
                templateUrl: "views/Home/wellcome.html",
                controller: 'WellcomeCtrl'
            })
            .state('App', {
                templateUrl: "views/Home/inicio.html",
                controller: 'HomeCtrl'
            })

            /*Secciones Generales*/
            .state('App.InformeTitularidad', {
                template: "<ui-view></ui-view>",
                controller: 'StateParentCtrl',
                //params: {
                //    IDFILTRO: ["aKdBfMd", "ebSLam"]
                //},

                params: {
                    IDFILTRO: {
                        array: true,
                        value: [
                            {
                                title: 'Tiempo',
                                icon: 'icofont icofont-checked',
                                idFiltro: 'aKdBfMd'
                            },
                            {
                                title: 'Otros',
                                icon: 'icofont icofont-quote-left',
                                idFiltro: 'ebSLam'
                            }
                        ]
                    },
                    isThisArray: true
                },

                resolve: {
                    dataApp: function (getAppService, InitConfig) {
                        return getAppService.getDataApp(InitConfig.appInformeTitularidad);
                    }
                },
            })

            .state('App.Quandox', {
                template: "<ui-view></ui-view>",
                controller: 'StateParentCtrl',
                //params: {
                //    IDFILTRO: ["aKdBfMd", "ebSLam"]
                //},

                params: {
                    IDFILTRO: {
                        array: true,
                        value: [
                            {
                                title: 'Tiempo',
                                icon: 'icofont icofont-checked',
                                idFiltro: 'aKdBfMd'
                            },
                            {
                                title: 'Otros',
                                icon: 'icofont icofont-quote-left',
                                idFiltro: 'ebSLam'
                            }
                        ]
                    },
                    isThisArray: true
                },

                resolve: {
                    dataApp: function (getAppService, InitConfig) {
                        return getAppService.getDataApp(InitConfig.appVentas); //.$promise;
                    }
                },
            })

            .state('App.INE', {
                template: "<ui-view></ui-view>",
                controller: 'StateParentCtrl',
                //params: {
                //    IDFILTRO: ["aKdBfMd", "ebSLam"]
                //},

                params: {
                    IDFILTRO: {
                        array: true,
                        value: [
                            {
                                title: 'Tiempo',
                                icon: 'icofont icofont-checked',
                                idFiltro: 'aKdBfMd'
                            },
                            {
                                title: 'Otros',
                                icon: 'icofont icofont-quote-left',
                                idFiltro: 'ebSLam'
                            }
                        ]
                    },
                    isThisArray: true
                },

                resolve: {
                    dataApp: function (getAppService, InitConfig) {
                        return getAppService.getDataApp(InitConfig.appINE);
                    }
                },
            })

    }]);

});