
define([
    'app'

], function (app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider', '$translateProvider', 'InitConfigProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $translateProvider, InitConfigProvider) {
        //$translateProvider.translations('es', translationsES);
        //$translateProvider.translations('en', translationsEN);
        //$translateProvider.preferredLanguage(InitConfigProvider.language);
        //$translateProvider.useSanitizeValueStrategy('escape');
        //$locationProvider.hashPrefix('');
        //$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
        $stateProvider

            // PROCESO - Dashboard
            .state('App.Proceso.Dashboard', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.Proceso.Dashboard.Dashboard', {
                url: '/Proceso-Dashboard',
                templateUrl: "views/_Ventas/Proceso/Dashboard/Dashboard.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Proceso', 'Dashboard'],
                }
            })

            // PROCESO - Analisis
            .state('App.Proceso.Analisis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // PROCESO - Analisis > Distribución
            .state('App.Proceso.Analisis.Distribucion', {
                url: '/Proceso-Analisis-Distribucion',
                templateUrl: "views/_Ventas/Proceso/Analisis/Distribucion.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Proceso', 'Análisis', 'Distribución'],
                }
            })
            // PROCESO - Analisis > Evolución de Indicadores
            .state('App.Proceso.Analisis.EvolucionIndicadores', {
                url: '/Proceso-Analisis-EvolucionIndicadores',
                templateUrl: "views/_Ventas/Proceso/Analisis/EvolucionIndicadores.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Proceso', 'Análisis', 'Evolución de Indicadores'],
                }
            })
            // PROCESO - Analisis > Ranking
            .state('App.Proceso.Analisis.Ranking', {
                url: '/Proceso-Analisis-Ranking',
                templateUrl: "views/_Ventas/Proceso/Analisis/Ranking.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Proceso', 'Análisis', 'Ranking'],
                }
            })
            // PROCESO - Analisis > Resumen
            .state('App.Proceso.Analisis.Resumen', {
                url: '/Proceso-Analisis-Resumen',
                templateUrl: "views/_Ventas/Proceso/Analisis/Resumen.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Proceso', 'Análisis', 'Resumen'],
                }
            })
            // PROCESO - Analisis > Tendencia
            .state('App.Proceso.Analisis.Tendencia', {
                url: '/Proceso-Analisis-Tendencia',
                templateUrl: "views/_Ventas/Proceso/Analisis/Tendencia.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Proceso', 'Análisis', 'Tendencia'],
                }
            })
            // PROCESO - Analisis > Estacionalidad
            .state('App.Proceso.Analisis.Estacionalidad', {
                url: '/Proceso-Analisis-Estacionalidad',
                templateUrl: "views/_Ventas/Proceso/Analisis/Estacionalidad.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Proceso', 'Análisis', 'Estacionalidad'],
                }
            })
            // PROCESO - Analisis > Dispersión Comparativa
            .state('App.Proceso.Analisis.DispersionComparativa', {
                url: '/Proceso-Analisis-DispersionComparativa',
                templateUrl: "views/_Ventas/Proceso/Analisis/DispersionComparativa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Proceso', 'Análisis', 'Dispersión Comparativa'],
                }
            })
            // PROCESO - Analisis > Clientes Ganados/Perdidos
            .state('App.Proceso.Analisis.Detalle', {
                url: '/Proceso-Analisis-Detalle',
                templateUrl: "views/_Ventas/Proceso/Analisis/Detalle.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Proceso', 'Análisis', 'Detalle'],
                }
            })


            // PROCESO - Reporting
            .state('App.Proceso.Reporting', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // PROCESO - Reporting > Reporting
            .state('App.Proceso.Reporting.Reporting', {
                url: '/Proceso-Reporting',
                templateUrl: "views/_Ventas/Proceso/Reporting/Reporting.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Proceso', 'Reporting'],
                }
            })


            // PROCESO - Kpis
            .state('App.Proceso.Kpis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // PROCESO - Kpis > Kpis
            .state('App.Proceso.Kpis.Kpis', {
                url: '/Proceso-Kpis',
                templateUrl: "views/_Ventas/Proceso/Kpis/Kpis.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Proceso', 'KPIS'],
                }
            })


            // PROCESO - Mapa
            .state('App.Proceso.Mapa', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // PROCESO - Mapa > Mapa
            .state('App.Proceso.Mapa.Mapa', {
                url: '/Proceso-Mapa',
                templateUrl: "views/_Ventas/Proceso/Mapa/Mapa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Proceso', 'Mapa'],
                }
            })













            .state('App.Ventas.Dashboard', {
                url: '/Ventas-Dashboard',
                templateUrl: "views/_Ventas/Dashboard.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Ventas', 'Dashboard'],
                }
            })
            //.state('App.Ventas.Analisis', {
            //    template: "<ui-view></ui-view>",
            //})
            .state('App.Ventas.Analisis', {
                url: '/Ventas/Analisis',
                templateUrl: "views/_Ventas/Analisis.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Ventas', 'Análisis'],
                }
            })
            .state('App.Ventas.Informe', {
                url: '/Ventas/Informe',
                templateUrl: "views/_Ventas/Informe.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Ventas', 'Informe'],
                }
            })
            .state('App.Ventas.KPIS', {
                url: '/Ventas-KPI',
                templateUrl: "views/_Ventas/KPIS.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Ventas', 'KPI'],
                }
            })
            .state('App.Ventas.Reporting', {
                url: '/Ventas-Reporting',
                templateUrl: "views/_Ventas/Reporting.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Ventas', 'Reporting'],
                }
            })

        //.state('App.Ventas.Mapa', {
        //    url: '/Ventas-Mapa',
        //    templateUrl: "views/_Ventas/Mapa.html",
        //    toSheet: true,
        //    controller: 'StateChildrenCtrl'
        //})
    }]);
});



