
define([
    'app'

], function (app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider', '$translateProvider', 'InitConfigProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $translateProvider, InitConfigProvider) {
        $stateProvider

            // INE - Dashboard
            .state('App.INE.Dashboard', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.INE.Dashboard.Dashboard', {
                url: '/INE-Dashboard',
                templateUrl: "views/_Ventas/INE/Dashboard/Dashboard.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['INE', 'Dashboard'],
                }
            })

            // INE - Analisis
            .state('App.INE.Analisis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.INE.Analisis.Distribucion', {
                url: '/INE-Analisis-Distribucion',
                templateUrl: "views/_Ventas/INE/Analisis/Distribucion.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['INE', 'Análisis', 'Distribución'],
                }
            })
            .state('App.INE.Analisis.EvolucionIndicadores', {
                url: '/INE-Analisis-EvolucionIndicadores',
                templateUrl: "views/_Ventas/INE/Analisis/EvolucionIndicadores.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['INE', 'Análisis', 'Evolución de Indicadores'],
                }
            })
            .state('App.INE.Analisis.Ranking', {
                url: '/INE-Analisis-Ranking',
                templateUrl: "views/_Ventas/INE/Analisis/Ranking.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['INE', 'Análisis', 'Ranking'],
                }
            })
            .state('App.INE.Analisis.Resumen', {
                url: '/INE-Analisis-Resumen',
                templateUrl: "views/_Ventas/INE/Analisis/Resumen.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['INE', 'Análisis', 'Resumen'],
                }
            })
            .state('App.INE.Analisis.Tendencia', {
                url: '/INE-Analisis-Tendencia',
                templateUrl: "views/_Ventas/INE/Analisis/Tendencia.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['INE', 'Análisis', 'Tendencia'],
                }
            })
            .state('App.INE.Analisis.Estacionalidad', {
                url: '/INE-Analisis-Estacionalidad',
                templateUrl: "views/_Ventas/INE/Analisis/Estacionalidad.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['INE', 'Análisis', 'Estacionalidad'],
                }
            })
            .state('App.INE.Analisis.DispersionComparativa', {
                url: '/INE-Analisis-DispersionComparativa',
                templateUrl: "views/_Ventas/INE/Analisis/DispersionComparativa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['INE', 'Análisis', 'Dispersión Comparativa'],
                }
            })
            .state('App.INE.Analisis.Detalle', {
                url: '/INE-Analisis-Detalle',
                templateUrl: "views/_Ventas/INE/Analisis/Detalle.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['INE', 'Análisis', 'Detalle'],
                }
            })
            // INE - Reporting
            .state('App.INE.Reporting', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.INE.Reporting.Reporting', {
                url: '/INE-Reporting',
                templateUrl: "views/_Ventas/INE/Reporting/Reporting.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['INE', 'Reporting'],
                }
            })
            // INE - Kpis
            .state('App.INE.Kpis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.INE.Kpis.Kpis', {
                url: '/INE-Kpis',
                templateUrl: "views/_Ventas/INE/Kpis/KPIS.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['INE', 'KPIS'],
                }
            })
            // INE - Mapa
            .state('App.INE.Mapa', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.INE.Mapa.Mapa', {
                url: '/INE-Mapa',
                templateUrl: "views/_Ventas/INE/Mapa/Mapa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['INE', 'Mapa'],
                }
            })
    }]);
});