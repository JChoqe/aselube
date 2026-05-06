/****************************************************************************************************************************************
Obtener el host de la extensión, por ejemplo, en localhost:4848/extensions/NombreExtension/Pagina.html
se obtiene /extensions/NombreExtension/
/***************************************************************************************************************************************/
var href = window.location.pathname;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

define([
    'js/qlik',
    'app',
    dir + 'js/site.js'
], function (qlik, app, site) {

    app.controller('WellcomeCtrl', function (InitConfig, $scope, $rootScope, $q, $timeout, $state) {
        //$scope.$on('$viewContentLoaded', function () {
        //    particlesJS.load('particles-js', 'include/particles/particles.json');
        //});


        $rootScope.pagHome = false;

        function getQlikApp(ID) {
            var defer = $q.defer();
            var promise = defer.promise;
            $scope.app = qlik.openApp(ID, config);
            defer.resolve([$scope.app]);
            return promise;
        }


        getQlikApp(InitConfig.appVentas).then(function (res) {
            $scope.app.variable.setStringValue('lang', $rootScope.language.toUpperCase());
            $(".qlik-embed").each(function () {
                $scope.noInteraction = $(this).attr('data-noInteraction');
                var qvid = $(this).data("qlik-objid");
                var $this = $(this);

                $scope.app.visualization.get(qvid, { noInteraction: $scope.noInteraction }).then(function (vis) {
                    vis.show($this, {
                        onRendered: function () {
                            $rootScope.lstModel.push(vis);
                        }
                    })
                });

            });
        });

        $scope.toogleAlertas = function () {
            $('#panel_alertas_wellcome').toggleClass('in');
        }

        $scope.toogleHelp = function () {
            $('#panel_help_wellcome').toggleClass('in');
        }

        $scope.getVideo = function (urlVideo) {
            var video = $('#videoContainer video')[0];
            video.src = urlVideo;
            video.load();
            video.play();
        }

        $scope.getVideoHelp = function (urlVideo, tituloVideo) {
            var video = $('#containerVideoHelp video')[0];
            video.src = urlVideo;
            $('#videoHelpTitulo').text(tituloVideo);
            $('#modalVideoHelp').modal('show');

        }
        $('#modalVideoHelp').on('shown.bs.modal', function () {
            var video = $('#containerVideoHelp video')[0];
            video.play();
        })

        $scope.closeVideoHelp = function () {
            var video = $('#containerVideoHelp video')[0];
            video.pause();
            video.src = '';
        }

    });

});