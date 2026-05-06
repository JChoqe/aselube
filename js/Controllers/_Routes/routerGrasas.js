
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

            // GRASAS - Dashboard
            .state('App.Grasas.Dashboard', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.Grasas.Dashboard.Dashboard', {
                url: '/Grasas-Dashboard',
                templateUrl: "views/_Ventas/Grasas/Dashboard/Dashboard.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Grasas', 'Dashboard'],
                }
            })

            // GRASAS - Analisis
            .state('App.Grasas.Analisis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // GRASAS - Analisis > Distribución
            .state('App.Grasas.Analisis.Distribucion', {
                url: '/Grasas-Analisis-Distribucion',
                templateUrl: "views/_Ventas/Grasas/Analisis/Distribucion.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Grasas', 'Análisis', 'Distribución'],
                }
            })
            // GRASAS - Analisis > Evolución de Indicadores
            .state('App.Grasas.Analisis.EvolucionIndicadores', {
                url: '/Grasas-Analisis-EvolucionIndicadores',
                templateUrl: "views/_Ventas/Grasas/Analisis/EvolucionIndicadores.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Grasas', 'Análisis', 'Evolución de Indicadores'],
                }
            })
            // GRASAS - Analisis > Ranking
            .state('App.Grasas.Analisis.Ranking', {
                url: '/Grasas-Analisis-Ranking',
                templateUrl: "views/_Ventas/Grasas/Analisis/Ranking.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Grasas', 'Análisis', 'Ranking'],
                }
            })
            // GRASAS - Analisis > Resumen
            .state('App.Grasas.Analisis.Resumen', {
                url: '/Grasas-Analisis-Resumen',
                templateUrl: "views/_Ventas/Grasas/Analisis/Resumen.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Grasas', 'Análisis', 'Resumen'],
                }
            })
            // GRASAS - Analisis > Tendencia
            .state('App.Grasas.Analisis.Tendencia', {
                url: '/Grasas-Analisis-Tendencia',
                templateUrl: "views/_Ventas/Grasas/Analisis/Tendencia.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Grasas', 'Análisis', 'Tendencia'],
                }
            })
            // GRASAS - Analisis > Estacionalidad
            .state('App.Grasas.Analisis.Estacionalidad', {
                url: '/Grasas-Analisis-Estacionalidad',
                templateUrl: "views/_Ventas/Grasas/Analisis/Estacionalidad.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Grasas', 'Análisis', 'Estacionalidad'],
                }
            })
            // GRASAS - Analisis > Dispersión Comparativa
            .state('App.Grasas.Analisis.DispersionComparativa', {
                url: '/Grasas-Analisis-DispersionComparativa',
                templateUrl: "views/_Ventas/Grasas/Analisis/DispersionComparativa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Grasas', 'Análisis', 'Dispersión Comparativa'],
                }
            })
            // GRASAS - Analisis > Clientes Ganados/Perdidos
            .state('App.Grasas.Analisis.Detalle', {
                url: '/Grasas-Analisis-Detalle',
                templateUrl: "views/_Ventas/Grasas/Analisis/Detalle.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Grasas', 'Análisis', 'Detalle'],
                }
            })


            // GRASAS - Reporting
            .state('App.Grasas.Reporting', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // GRASAS - Reporting > Reporting
            .state('App.Grasas.Reporting.Reporting', {
                url: '/Grasas-Reporting',
                templateUrl: "views/_Ventas/Grasas/Reporting/Reporting.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Grasas', 'Reporting'],
                }
            })


            // GRASAS - Kpis
            .state('App.Grasas.Kpis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // GRASAS - Kpis > Kpis
            .state('App.Grasas.Kpis.Kpis', {
                url: '/Grasas-Kpis',
                templateUrl: "views/_Ventas/Grasas/Kpis/Kpis.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Grasas', 'KPIS'],
                }
            })


            // GRASAS - Mapa
            .state('App.Grasas.Mapa', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // GRASAS - Mapa > Mapa
            .state('App.Grasas.Mapa.Mapa', {
                url: '/Grasas-Mapa',
                templateUrl: "views/_Ventas/Grasas/Mapa/Mapa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Grasas', 'Mapa'],
                }
            })
    }]);
});



