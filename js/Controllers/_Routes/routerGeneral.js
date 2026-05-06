
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

            // GENERAL - Dashboard
            .state('App.General.Dashboard', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.General.Dashboard.Dashboard', {
                url: '/General-Dashboard',
                templateUrl: "views/_Ventas/General/Dashboard/Dashboard.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['General', 'Dashboard'],
                }
            })

            // GENERAL - Analisis
            .state('App.General.Analisis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // GENERAL - Analisis > Distribución
            .state('App.General.Analisis.Distribucion', {
                url: '/General-Analisis-Distribucion',
                templateUrl: "views/_Ventas/General/Analisis/Distribucion.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['General', 'Análisis', 'Distribución'],
                }
            })
            // GENERAL - Analisis > Evolución de Indicadores
            .state('App.General.Analisis.EvolucionIndicadores', {
                url: '/General-Analisis-EvolucionIndicadores',
                templateUrl: "views/_Ventas/General/Analisis/EvolucionIndicadores.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['General', 'Análisis', 'Evolución de Indicadores'],
                }
            })
            // GENERAL - Analisis > Ranking
            .state('App.General.Analisis.Ranking', {
                url: '/General-Analisis-Ranking',
                templateUrl: "views/_Ventas/General/Analisis/Ranking.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['General', 'Análisis', 'Ranking'],
                }
            })
            // GENERAL - Analisis > Resumen
            .state('App.General.Analisis.Resumen', {
                url: '/General-Analisis-Resumen',
                templateUrl: "views/_Ventas/General/Analisis/Resumen.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['General', 'Análisis', 'Resumen'],
                }
            })
            // GENERAL - Analisis > Tendencia
            .state('App.General.Analisis.Tendencia', {
                url: '/General-Analisis-Tendencia',
                templateUrl: "views/_Ventas/General/Analisis/Tendencia.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['General', 'Análisis', 'Tendencia'],
                }
            })
            // GENERAL - Analisis > Estacionalidad
            .state('App.General.Analisis.Estacionalidad', {
                url: '/General-Analisis-Estacionalidad',
                templateUrl: "views/_Ventas/General/Analisis/Estacionalidad.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['General', 'Análisis', 'Estacionalidad'],
                }
            })
            // GENERAL - Analisis > Dispersión Comparativa
            .state('App.General.Analisis.DispersionComparativa', {
                url: '/General-Analisis-DispersionComparativa',
                templateUrl: "views/_Ventas/General/Analisis/DispersionComparativa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['General', 'Análisis', 'Dispersión Comparativa'],
                }
            })
            // GENERAL - Analisis > Clientes Ganados/Perdidos
            .state('App.General.Analisis.Detalle', {
                url: '/General-Analisis-Detalle',
                templateUrl: "views/_Ventas/General/Analisis/Detalle.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['General', 'Análisis', 'Detalle'],
                }
            })


            // GENERAL - Reporting
            .state('App.General.Reporting', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // GENERAL - Reporting > Reporting
            .state('App.General.Reporting.Reporting', {
                url: '/General-Reporting',
                templateUrl: "views/_Ventas/General/Reporting/Reporting.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['General', 'Reporting'],
                }
            })


            // GENERAL - Kpis
            .state('App.General.Kpis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // GENERAL - Kpis > Kpis
            .state('App.General.Kpis.Kpis', {
                url: '/General-Kpis',
                templateUrl: "views/_Ventas/General/Kpis/Kpis.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['General', 'KPIS'],
                }
            })


            // GENERAL - Mapa
            .state('App.General.Mapa', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // GENERAL - Mapa > Mapa
            .state('App.General.Mapa.Mapa', {
                url: '/General-Mapa',
                templateUrl: "views/_Ventas/General/Mapa/Mapa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['General', 'Mapa'],
                }
            })
    }]);
});



