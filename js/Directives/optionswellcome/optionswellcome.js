/****************************************************************************************************************************************
Obtener el host de la extensión, por ejemplo, en localhost:4848/extensions/NombreExtension/Pagina.html
se obtiene /extensions/NombreExtension/
/***************************************************************************************************************************************/
var href = window.location.pathname;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

define([
    'js/qlik',
    'app',
    './text!./css/optionswellcome.css'
], function (qlik, app, cssContent  ) {
        $('<style>').html(cssContent).appendTo('head')
        app.directive('optionswellcome', [function () {
            return {
                restrict: 'E',
                scope: false,
                templateUrl: 'js/Directives/optionswellcome/optionswellcome.html',
                link: function (scope, element, attrs) {


                },
                controller: ['$compile', '$q', '$scope', '$rootScope', 'luiDialog', '$translate', 'InitConfig', function ($compile, $q, $scope, $rootScope, luiDialog, $translate, InitConfig) {
                    $scope.imagenes = [
                        
                        { nombre: "0", url: "assets/img/imgBackground/lights.jpg" },
                        { nombre: "1", url: "assets/img/imgBackground/lights1.jpg" },
                        { nombre: "2", url: "assets/img/imgBackground/lights2.jpg" },
                        { nombre: "3", url: "assets/img/imgBackground/lights3.jpg" },
                        { nombre: "4", url: "assets/img/imgBackground/lights4.jpg" },
                        { nombre: "5", url: "assets/img/imgBackground/lights5.jpg" },
                        { nombre: "6", url: "assets/img/imgBackground/lights6.jpg" },
                        { nombre: "7", url: "assets/img/imgBackground/lights7.jpg" },
                        { nombre: "8", url: "assets/img/imgBackground/lights8.jpg" },
                        { nombre: "9", url: "assets/img/imgBackground/lights9.jpg" },
                        { nombre: "10", url: "assets/img/imgBackground/lights10.jpg" },
                        { nombre: "11", url: "assets/img/imgBackground/lights11.jpg" },
                        { nombre: "12", url: "assets/img/imgBackground/lights12.jpg" },
                        { nombre: "13", url: "assets/img/imgBackground/lights13.jpg" },
                        { nombre: "14", url: "assets/img/imgBackground/lights14.jpg" },
                        { nombre: "15", url: "assets/img/imgBackground/lights15.jpg" },
                        { nombre: "16", url: "assets/img/imgBackground/lights16.jpg" },
                        { nombre: "17", url: "assets/img/imgBackground/lights17.jpg" },
                        { nombre: "18", url: "assets/img/imgBackground/lights18.jpg" },
                        { nombre: "19", url: "assets/img/imgBackground/lights19.jpg" },
                        { nombre: "20", url: "assets/img/imgBackground/lights20.jpg" },
                        { nombre: "21", url: "assets/img/imgBackground/lights21.jpg" },
                        { nombre: "22", url: "assets/img/imgBackground/lights22.jpg" },
                        { nombre: "23", url: "assets/img/imgBackground/lights23.jpg" },
                        { nombre: "24", url: "assets/img/imgBackground/lights24.jpg" },
                        { nombre: "25", url: "assets/img/imgBackground/lights25.jpg" },
                        { nombre: "26", url: "assets/img/imgBackground/lights26.jpg" },
                        { nombre: "27", url: "assets/img/imgBackground/lights27.jpg" },
                        { nombre: "27", url: "assets/img/imgBackground/lights28.jpg" },
                        { nombre: "27", url: "assets/img/imgBackground/lights29.jpg" },
                        { nombre: "27", url: "assets/img/imgBackground/lights30.jpg" },
                        { nombre: "27", url: "assets/img/imgBackground/lights31.jpg" },
                        { nombre: "27", url: "assets/img/imgBackground/lights32.jpg" },
                        { nombre: "27", url: "assets/img/imgBackground/lights33.jpg" }];


                    $scope.toogleOptionsportada = function () {
                        $('#demo-nifty-settings').toggleClass('in');
                    }

                    $scope.activeItem = function ($event) {
                        $event.preventDefault();
                        var $This = $event.currentTarget;
                        $("li.link-temas").removeClass("active").promise().done(function () {
                            $($This).addClass("active");
                            var b = $($This).data("sa-value");
                            $("body").attr("data-mz-portada", b)
                        })
                    }

                    $scope.blur = 0;
                    $scope.saturate = 100;
                    $scope.contrast = 100;
                    $scope.invert = 0;
                    $scope.brightness = 100;
                    $scope.hueRotate = 0;
                    $scope.sepia = 0;

                    var handleBlur = $("#custom-handle-blur");
                    $("#slider-blur").slider({
                        range: false,
                        min: 0,
                        max: 20,
                        value: $scope.blur,
                        create: function () {
                            handleBlur.text($(this).slider("value"));
                        },
                        slide: function (event, ui) {
                            handleBlur.text(ui.value);
                            var _val = ui.value;
                            $scope.blur = _val;
                            addFilters();

                        }
                    });

                    var handleSaturate = $("#custom-handle-saturate");
                    $("#slider-saturate").slider({
                        range: false,
                        min: 0,
                        max: 100,
                        value: 100,
                        create: function () {
                            handleSaturate.text($(this).slider("value"));
                        },
                        slide: function (event, ui) {
                            handleSaturate.text(ui.value);
                            var _val = ui.value;
                            $scope.saturate = _val;
                            addFilters();

                        }
                    });

                    var handlecontrast = $("#custom-handle-contrast");
                    $("#slider-contrast").slider({
                        range: false,
                        min: 0,
                        max: 100,
                        value: $scope.contrast,
                        create: function () {
                            handlecontrast.text($(this).slider("value"));
                        },
                        slide: function (event, ui) {
                            handlecontrast.text(ui.value);
                            var _val = ui.value;
                            $scope.contrast = _val;
                            addFilters();

                        }
                    });

                    var handleinvert = $("#custom-handle-invert");
                    $("#slider-invert").slider({
                        range: false,
                        min: 0,
                        max: 100,
                        value: $scope.invert,
                        create: function () {
                            handleinvert.text($(this).slider("value"));
                        },
                        slide: function (event, ui) {
                            handleinvert.text(ui.value);
                            var _val = ui.value;
                            $scope.invert = _val;
                            addFilters();

                        }
                    });   

                    
                    var handlebrightness = $("#custom-handle-brightness");
                    $("#slider-brightness").slider({
                        range: false,
                        min: 0,
                        max: 100,
                        value: $scope.brightness,
                        create: function () {
                            handlebrightness.text($(this).slider("value"));
                        },
                        slide: function (event, ui) {
                            handlebrightness.text(ui.value);
                            var _val = ui.value;
                            $scope.brightness = _val;
                            addFilters();

                        }
                    }); 

                    var handlehueRotate = $("#custom-handle-hueRotate");
                    $("#slider-hueRotate").slider({
                        range: false,
                        min: 0,
                        max: 360,
                        value: $scope.hueRotate,
                        create: function () {
                            handlehueRotate.text($(this).slider("value"));
                        },
                        slide: function (event, ui) {
                            handlehueRotate.text(ui.value);
                            var _val = ui.value;
                            $scope.hueRotate = _val;
                            addFilters();

                        }
                    }); 

                    var handlesepia = $("#custom-handle-sepia");
                    $("#slider-sepia").slider({
                        range: false,
                        min: 0,
                        max: 100,
                        value: $scope.sepia,
                        create: function () {
                            handlesepia.text($(this).slider("value"));
                        },
                        slide: function (event, ui) {
                            handlesepia.text(ui.value);
                            var _val = ui.value;
                            $scope.sepia = _val;
                            addFilters();

                        }
                    });

                    function addFilters() {
                        $('#backdrop').css('backdrop-filter', 'blur(' + $scope.blur + 'px) saturate(' + $scope.saturate + '%) contrast(' + $scope.contrast + '%) invert(' + $scope.invert + '%) brightness(' + $scope.brightness + '%) hue-rotate(' + $scope.hueRotate + 'deg) sepia(' + $scope.sepia + '%)')
                    }
                    
                }]
            };
        }]);

});