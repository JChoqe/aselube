
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

            // MARINOS y AVIACIÓN - Dashboard
            .state('App.MarinosAviacion.Dashboard', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.MarinosAviacion.Dashboard.Dashboard', {
                url: '/MarinosAviacion-Dashboard',
                templateUrl: "views/_Ventas/MarinosAviacion/Dashboard/Dashboard.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Marinos y Aviación', 'Dashboard'],
                }
            })

            // MARINOS y AVIACIÓN - Analisis
            .state('App.MarinosAviacion.Analisis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // MARINOS y AVIACIÓN - Analisis > Distribución
            .state('App.MarinosAviacion.Analisis.Distribucion', {
                url: '/MarinosAviacion-Analisis-Distribucion',
                templateUrl: "views/_Ventas/MarinosAviacion/Analisis/Distribucion.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Marinos y Aviación', 'Análisis', 'Distribución'],
                }
            })
            // MARINOS y AVIACIÓN - Analisis > Evolución de Indicadores
            .state('App.MarinosAviacion.Analisis.EvolucionIndicadores', {
                url: '/MarinosAviacion-Analisis-EvolucionIndicadores',
                templateUrl: "views/_Ventas/MarinosAviacion/Analisis/EvolucionIndicadores.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Marinos y Aviación', 'Análisis', 'Evolución de Indicadores'],
                }
            })
            // MARINOS y AVIACIÓN - Analisis > Ranking
            .state('App.MarinosAviacion.Analisis.Ranking', {
                url: '/MarinosAviacion-Analisis-Ranking',
                templateUrl: "views/_Ventas/MarinosAviacion/Analisis/Ranking.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Marinos y Aviación', 'Análisis', 'Ranking'],
                }
            })
            // MARINOS y AVIACIÓN - Analisis > Resumen
            .state('App.MarinosAviacion.Analisis.Resumen', {
                url: '/MarinosAviacion-Analisis-Resumen',
                templateUrl: "views/_Ventas/MarinosAviacion/Analisis/Resumen.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Marinos y Aviación', 'Análisis', 'Resumen'],
                }
            })
            // MARINOS y AVIACIÓN - Analisis > Tendencia
            .state('App.MarinosAviacion.Analisis.Tendencia', {
                url: '/MarinosAviacion-Analisis-Tendencia',
                templateUrl: "views/_Ventas/MarinosAviacion/Analisis/Tendencia.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Marinos y Aviación', 'Análisis', 'Tendencia'],
                }
            })
            // MARINOS y AVIACIÓN - Analisis > Estacionalidad
            .state('App.MarinosAviacion.Analisis.Estacionalidad', {
                url: '/MarinosAviacion-Analisis-Estacionalidad',
                templateUrl: "views/_Ventas/MarinosAviacion/Analisis/Estacionalidad.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Marinos y Aviación', 'Análisis', 'Estacionalidad'],
                }
            })
            // MARINOS y AVIACIÓN - Analisis > Dispersión Comparativa
            .state('App.MarinosAviacion.Analisis.DispersionComparativa', {
                url: '/MarinosAviacion-Analisis-DispersionComparativa',
                templateUrl: "views/_Ventas/MarinosAviacion/Analisis/DispersionComparativa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Marinos y Aviación', 'Análisis', 'Dispersión Comparativa'],
                }
            })
            // MARINOS y AVIACIÓN - Analisis > Clientes Ganados/Perdidos
            .state('App.MarinosAviacion.Analisis.Detalle', {
                url: '/MarinosAviacion-Analisis-Detalle',
                templateUrl: "views/_Ventas/MarinosAviacion/Analisis/Detalle.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Marinos y Aviación', 'Análisis', 'Detalle'],
                }
            })


            // MARINOS y AVIACIÓN - Reporting
            .state('App.MarinosAviacion.Reporting', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // MARINOS y AVIACIÓN - Reporting > Reporting
            .state('App.MarinosAviacion.Reporting.Reporting', {
                url: '/MarinosAviacion-Reporting',
                templateUrl: "views/_Ventas/MarinosAviacion/Reporting/Reporting.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Marinos y Aviación', 'Reporting'],
                }
            })


            // MARINOS y AVIACIÓN - Kpis
            .state('App.MarinosAviacion.Kpis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // MARINOS y AVIACIÓN - Kpis > Kpis
            .state('App.MarinosAviacion.Kpis.Kpis', {
                url: '/MarinosAviacion-Kpis',
                templateUrl: "views/_Ventas/MarinosAviacion/Kpis/Kpis.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Marinos y Aviación', 'KPIS'],
                }
            })


            // MARINOS y AVIACIÓN - Mapa
            .state('App.MarinosAviacion.Mapa', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            // MARINOS y AVIACIÓN - Mapa > Mapa
            .state('App.MarinosAviacion.Mapa.Mapa', {
                url: '/MarinosAviacion-Mapa',
                templateUrl: "views/_Ventas/MarinosAviacion/Mapa/Mapa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Marinos y Aviación', 'Mapa'],
                }
            })
    }]);
});



