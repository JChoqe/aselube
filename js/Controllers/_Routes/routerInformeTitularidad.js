
define([
    'app'

], function (app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider', '$translateProvider', 'InitConfigProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $translateProvider, InitConfigProvider) {
        $stateProvider

            // INFORME TITULARIDAD - Dashboard
            .state('App.InformeTitularidad.Dashboard', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.InformeTitularidad.Dashboard.Dashboard', {
                url: '/InformeTitularidad-Dashboard',
                templateUrl: "views/_Ventas/InformeTitularidad/Dashboard/Dashboard.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Informe Titularidad', 'Dashboard'],
                }
            })

            // INFORME TITULARIDAD - Analisis
            .state('App.InformeTitularidad.Analisis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.InformeTitularidad.Analisis.Distribucion', {
                url: '/InformeTitularidad-Analisis-Distribucion',
                templateUrl: "views/_Ventas/InformeTitularidad/Analisis/Distribucion.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Informe Titularidad', 'Análisis', 'Distribución'],
                }
            })
            .state('App.InformeTitularidad.Analisis.EvolucionIndicadores', {
                url: '/InformeTitularidad-Analisis-EvolucionIndicadores',
                templateUrl: "views/_Ventas/InformeTitularidad/Analisis/EvolucionIndicadores.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Informe Titularidad', 'Análisis', 'Evolución de Indicadores'],
                }
            })
            .state('App.InformeTitularidad.Analisis.Ranking', {
                url: '/InformeTitularidad-Analisis-Ranking',
                templateUrl: "views/_Ventas/InformeTitularidad/Analisis/Ranking.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Informe Titularidad', 'Análisis', 'Ranking'],
                }
            })
            .state('App.InformeTitularidad.Analisis.Resumen', {
                url: '/InformeTitularidad-Analisis-Resumen',
                templateUrl: "views/_Ventas/InformeTitularidad/Analisis/Resumen.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Informe Titularidad', 'Análisis', 'Resumen'],
                }
            })
            .state('App.InformeTitularidad.Analisis.Tendencia', {
                url: '/InformeTitularidad-Analisis-Tendencia',
                templateUrl: "views/_Ventas/InformeTitularidad/Analisis/Tendencia.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Informe Titularidad', 'Análisis', 'Tendencia'],
                }
            })
            .state('App.InformeTitularidad.Analisis.Estacionalidad', {
                url: '/InformeTitularidad-Analisis-Estacionalidad',
                templateUrl: "views/_Ventas/InformeTitularidad/Analisis/Estacionalidad.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Informe Titularidad', 'Análisis', 'Estacionalidad'],
                }
            })
            .state('App.InformeTitularidad.Analisis.DispersionComparativa', {
                url: '/InformeTitularidad-Analisis-DispersionComparativa',
                templateUrl: "views/_Ventas/InformeTitularidad/Analisis/DispersionComparativa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Informe Titularidad', 'Análisis', 'Dispersión Comparativa'],
                }
            })
            .state('App.InformeTitularidad.Analisis.Detalle', {
                url: '/InformeTitularidad-Analisis-Detalle',
                templateUrl: "views/_Ventas/InformeTitularidad/Analisis/Detalle.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Informe Titularidad', 'Análisis', 'Detalle'],
                }
            })

            // INFORME TITULARIDAD - Reporting
            .state('App.InformeTitularidad.Reporting', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.InformeTitularidad.Reporting.Reporting', {
                url: '/InformeTitularidad-Reporting',
                templateUrl: "views/_Ventas/InformeTitularidad/Reporting/Reporting.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Informe Titularidad', 'Reporting'],
                }
            })

            // INFORME TITULARIDAD - Kpis
            .state('App.InformeTitularidad.Kpis', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.InformeTitularidad.Kpis.Kpis', {
                url: '/InformeTitularidad-Kpis',
                templateUrl: "views/_Ventas/InformeTitularidad/Kpis/KPIS.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Informe Titularidad', 'KPIS'],
                }
            })

            // INFORME TITULARIDAD - Mapa
            .state('App.InformeTitularidad.Mapa', {
                template: "<ui-view></ui-view>",
                abstract: true
            })
            .state('App.InformeTitularidad.Mapa.Mapa', {
                url: '/InformeTitularidad-Mapa',
                templateUrl: "views/_Ventas/InformeTitularidad/Mapa/Mapa.html",
                toSheet: true,
                controller: 'StateChildrenCtrl',
                params: {
                    PATH: ['Informe Titularidad', 'Mapa'],
                }
            })
    }]);
});
