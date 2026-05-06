
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

            // INDUSTRIALES - Dashboard
            .state('App.Industriales.Dashboard', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.Industriales.Dashboard.Dashboard', {
                url: '/Industriales-Dashboard',
                templateUrl: "views/_Ventas/Industriales/Dashboard/Dashboard.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Industriales', 'Dashboard'],
                }
            })

            // INDUSTRIALES - Analisis
            .state('App.Industriales.Analisis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // INDUSTRIALES - Analisis > Distribución
            .state('App.Industriales.Analisis.Distribucion', {
                url: '/Industriales-Analisis-Distribucion',
                templateUrl: "views/_Ventas/Industriales/Analisis/Distribucion.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Industriales', 'Análisis', 'Distribución'],
                }
            })
            // INDUSTRIALES - Analisis > Evolución de Indicadores
            .state('App.Industriales.Analisis.EvolucionIndicadores', {
                url: '/Industriales-Analisis-EvolucionIndicadores',
                templateUrl: "views/_Ventas/Industriales/Analisis/EvolucionIndicadores.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Industriales', 'Análisis', 'Evolución de Indicadores'],
                }
            })
            // INDUSTRIALES - Analisis > Ranking
            .state('App.Industriales.Analisis.Ranking', {
                url: '/Industriales-Analisis-Ranking',
                templateUrl: "views/_Ventas/Industriales/Analisis/Ranking.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Industriales', 'Análisis', 'Ranking'],
                }
            })
            // INDUSTRIALES - Analisis > Resumen
            .state('App.Industriales.Analisis.Resumen', {
                url: '/Industriales-Analisis-Resumen',
                templateUrl: "views/_Ventas/Industriales/Analisis/Resumen.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Industriales', 'Análisis', 'Resumen'],
                }
            })
            // INDUSTRIALES - Analisis > Tendencia
            .state('App.Industriales.Analisis.Tendencia', {
                url: '/Industriales-Analisis-Tendencia',
                templateUrl: "views/_Ventas/Industriales/Analisis/Tendencia.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Industriales', 'Análisis', 'Tendencia'],
                }
            })
            // INDUSTRIALES - Analisis > Estacionalidad
            .state('App.Industriales.Analisis.Estacionalidad', {
                url: '/Industriales-Analisis-Estacionalidad',
                templateUrl: "views/_Ventas/Industriales/Analisis/Estacionalidad.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Industriales', 'Análisis', 'Estacionalidad'],
                }
            })
            // INDUSTRIALES - Analisis > Dispersión Comparativa
            .state('App.Industriales.Analisis.DispersionComparativa', {
                url: '/Industriales-Analisis-DispersionComparativa',
                templateUrl: "views/_Ventas/Industriales/Analisis/DispersionComparativa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Industriales', 'Análisis', 'Dispersión Comparativa'],
                }
            })
            // INDUSTRIALES - Analisis > Clientes Ganados/Perdidos
            .state('App.Industriales.Analisis.Detalle', {
                url: '/Industriales-Analisis-Detalle',
                templateUrl: "views/_Ventas/Industriales/Analisis/Detalle.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Industriales', 'Análisis', 'Detalle'],
                }
            })


            // INDUSTRIALES - Reporting
            .state('App.Industriales.Reporting', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // INDUSTRIALES - Reporting > Reporting
            .state('App.Industriales.Reporting.Reporting', {
                url: '/Industriales-Reporting',
                templateUrl: "views/_Ventas/Industriales/Reporting/Reporting.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Industriales', 'Reporting'],
                }
            })


            // INDUSTRIALES - Kpis
            .state('App.Industriales.Kpis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // INDUSTRIALES - Kpis > Kpis
            .state('App.Industriales.Kpis.Kpis', {
                url: '/Industriales-Kpis',
                templateUrl: "views/_Ventas/Industriales/Kpis/Kpis.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Industriales', 'KPIS'],
                }
            })


            // INDUSTRIALES - Mapa
            .state('App.Industriales.Mapa', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // INDUSTRIALES - Mapa > Mapa
            .state('App.Industriales.Mapa.Mapa', {
                url: '/Industriales-Mapa',
                templateUrl: "views/_Ventas/Industriales/Mapa/Mapa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Industriales', 'Mapa'],
                }
            })
    }]);
});



