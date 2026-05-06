
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

            // AUTOMOCIÓN - Dashboard
            .state('App.Automocion.Dashboard', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.Automocion.Dashboard.Dashboard', {
                url: '/Automocion-Dashboard',
                templateUrl: "views/_Ventas/Automocion/Dashboard/Dashboard.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Automocion', 'Dashboard'],
                }
            })

            // AUTOMOCIÓN - Analisis
            .state('App.Automocion.Analisis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // AUTOMOCIÓN - Analisis > Distribución
            .state('App.Automocion.Analisis.Distribucion', {
                url: '/Automocion-Analisis-Distribucion',
                templateUrl: "views/_Ventas/Automocion/Analisis/Distribucion.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Automocion', 'Análisis', 'Distribución'],
                }
            })
            // AUTOMOCIÓN - Analisis > Evolución de Indicadores
            .state('App.Automocion.Analisis.EvolucionIndicadores', {
                url: '/Automocion-Analisis-EvolucionIndicadores',
                templateUrl: "views/_Ventas/Automocion/Analisis/EvolucionIndicadores.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Automocion', 'Análisis', 'Evolución de Indicadores'],
                }
            })
            // AUTOMOCIÓN - Analisis > Ranking
            .state('App.Automocion.Analisis.Ranking', {
                url: '/Automocion-Analisis-Ranking',
                templateUrl: "views/_Ventas/Automocion/Analisis/Ranking.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Automocion', 'Análisis', 'Ranking'],
                }
            })
            // AUTOMOCIÓN - Analisis > Resumen
            .state('App.Automocion.Analisis.Resumen', {
                url: '/Automocion-Analisis-Resumen',
                templateUrl: "views/_Ventas/Automocion/Analisis/Resumen.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Automocion', 'Análisis', 'Resumen'],
                }
            })
            // AUTOMOCIÓN - Analisis > Tendencia
            .state('App.Automocion.Analisis.Tendencia', {
                url: '/Automocion-Analisis-Tendencia',
                templateUrl: "views/_Ventas/Automocion/Analisis/Tendencia.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Automocion', 'Análisis', 'Tendencia'],
                }
            })
            // AUTOMOCIÓN - Analisis > Estacionalidad
            .state('App.Automocion.Analisis.Estacionalidad', {
                url: '/Automocion-Analisis-Estacionalidad',
                templateUrl: "views/_Ventas/Automocion/Analisis/Estacionalidad.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Automocion', 'Análisis', 'Estacionalidad'],
                }
            })
            // AUTOMOCIÓN - Analisis > Dispersión Comparativa
            .state('App.Automocion.Analisis.DispersionComparativa', {
                url: '/Automocion-Analisis-DispersionComparativa',
                templateUrl: "views/_Ventas/Automocion/Analisis/DispersionComparativa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Automocion', 'Análisis', 'Dispersión Comparativa'],
                }
            })
            // AUTOMOCIÓN - Analisis > Clientes Ganados/Perdidos
            .state('App.Automocion.Analisis.Detalle', {
                url: '/Automocion-Analisis-Detalle',
                templateUrl: "views/_Ventas/Automocion/Analisis/Detalle.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Automocion', 'Análisis', 'Detalle'],
                }
            })


            // AUTOMOCIÓN - Reporting
            .state('App.Automocion.Reporting', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // AUTOMOCIÓN - Reporting > Reporting
            .state('App.Automocion.Reporting.Reporting', {
                url: '/Automocion-Reporting',
                templateUrl: "views/_Ventas/Automocion/Reporting/Reporting.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Automocion', 'Reporting'],
                }
            })


            // AUTOMOCIÓN - Kpis
            .state('App.Automocion.Kpis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // AUTOMOCIÓN - Kpis > Kpis
            .state('App.Automocion.Kpis.Kpis', {
                url: '/Automocion-Kpis',
                templateUrl: "views/_Ventas/Automocion/Kpis/Kpis.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Automocion', 'KPIS'],
                }
            })


            // AUTOMOCIÓN - Mapa
            .state('App.Automocion.Mapa', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // AUTOMOCIÓN - Mapa > Mapa
            .state('App.Automocion.Mapa.Mapa', {
                url: '/Automocion-Mapa',
                templateUrl: "views/_Ventas/Automocion/Mapa/Mapa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Automocion', 'Mapa'],
                }
            })
    }]);
});



