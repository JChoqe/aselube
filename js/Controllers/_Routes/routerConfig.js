
define([
    'app',
    './routerGeneral',
    './routerProceso',
    './routerAutomocion',
    './routerIndustriales',
    './routerMarinosAviacion',
    './routerGrasas'
    //'./routerBodega'

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
            .state('App.Proceso', {
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

            .state('App.General', {
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

            .state('App.Automocion', {
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


            .state('App.Industriales', {
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


            .state('App.MarinosAviacion', {
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


            .state('App.Grasas', {
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

















            //**************************************


            .state('App.Ventas', {
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

    }]);

});



