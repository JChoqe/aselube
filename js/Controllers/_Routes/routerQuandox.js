
define([
    'app'

], function (app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider', '$translateProvider', 'InitConfigProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $translateProvider, InitConfigProvider) {
        $stateProvider

            // QUANDOX - Dashboard
            .state('App.Quandox.Dashboard', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.Quandox.Dashboard.Dashboard', {
                url: '/Quandox-Dashboard',
                templateUrl: "views/_Ventas/Quandox/Dashboard/Dashboard.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Quandox', 'Dashboard'],
                }
            })

            // QUANDOX - Analisis
            .state('App.Quandox.Analisis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // QUANDOX - Analisis > Distribución
            .state('App.Quandox.Analisis.Distribucion', {
                url: '/Quandox-Analisis-Distribucion',
                templateUrl: "views/_Ventas/Quandox/Analisis/Distribucion.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Quandox', 'Análisis', 'Distribución'],
                }
            })
            // QUANDOX - Analisis > Evolución de Indicadores
            .state('App.Quandox.Analisis.EvolucionIndicadores', {
                url: '/Quandox-Analisis-EvolucionIndicadores',
                templateUrl: "views/_Ventas/Quandox/Analisis/EvolucionIndicadores.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Quandox', 'Análisis', 'Evolución de Indicadores'],
                }
            })
            // QUANDOX - Analisis > Ranking
            .state('App.Quandox.Analisis.Ranking', {
                url: '/Quandox-Analisis-Ranking',
                templateUrl: "views/_Ventas/Quandox/Analisis/Ranking.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Quandox', 'Análisis', 'Ranking'],
                }
            })
            // QUANDOX - Analisis > Resumen
            .state('App.Quandox.Analisis.Resumen', {
                url: '/Quandox-Analisis-Resumen',
                templateUrl: "views/_Ventas/Quandox/Analisis/Resumen.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Quandox', 'Análisis', 'Resumen'],
                }
            })
            // QUANDOX - Analisis > Tendencia
            .state('App.Quandox.Analisis.Tendencia', {
                url: '/Quandox-Analisis-Tendencia',
                templateUrl: "views/_Ventas/Quandox/Analisis/Tendencia.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Quandox', 'Análisis', 'Tendencia'],
                }
            })
            // QUANDOX - Analisis > Estacionalidad
            .state('App.Quandox.Analisis.Estacionalidad', {
                url: '/Quandox-Analisis-Estacionalidad',
                templateUrl: "views/_Ventas/Quandox/Analisis/Estacionalidad.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Quandox', 'Análisis', 'Estacionalidad'],
                }
            })
            // QUANDOX - Analisis > Dispersión Comparativa
            .state('App.Quandox.Analisis.DispersionComparativa', {
                url: '/Quandox-Analisis-DispersionComparativa',
                templateUrl: "views/_Ventas/Quandox/Analisis/DispersionComparativa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Quandox', 'Análisis', 'Dispersión Comparativa'],
                }
            })
            // QUANDOX - Analisis > Detalle
            .state('App.Quandox.Analisis.Detalle', {
                url: '/Quandox-Analisis-Detalle',
                templateUrl: "views/_Ventas/Quandox/Analisis/Detalle.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Quandox', 'Análisis', 'Detalle'],
                }
            })

            // QUANDOX - Reporting
            .state('App.Quandox.Reporting', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.Quandox.Reporting.Reporting', {
                url: '/Quandox-Reporting',
                templateUrl: "views/_Ventas/Quandox/Reporting/Reporting.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Quandox', 'Reporting'],
                }
            })

            // QUANDOX - Kpis
            .state('App.Quandox.Kpis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.Quandox.Kpis.Kpis', {
                url: '/Quandox-Kpis',
                templateUrl: "views/_Ventas/Quandox/Kpis/KPIS.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Quandox', 'KPIS'],
                }
            })

            // QUANDOX - Mapa
            .state('App.Quandox.Mapa', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.Quandox.Mapa.Mapa', {
                url: '/Quandox-Mapa',
                templateUrl: "views/_Ventas/Quandox/Mapa/Mapa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Quandox', 'Mapa'],
                }
            })
    }]);
});
