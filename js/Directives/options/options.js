/****************************************************************************************************************************************
Obtener el host de la extensión, por ejemplo, en localhost:4848/extensions/NombreExtension/Pagina.html
se obtiene /extensions/NombreExtension/
/***************************************************************************************************************************************/
var href = window.location.pathname;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

define([
    'js/qlik',
    'app',
    './text!./css/options.css'
], function (qlik, app, cssContent  ) {
        $('<style>').html(cssContent).appendTo('head')
        app.directive('options', [function () {
            return {
                restrict: 'E',
                scope: false,
                templateUrl: 'js/Directives/options/options.html',
                link: function (scope, element, attrs) {
                    attrs.$observe('iddarkview', function () {
                        scope.loadComboThemes()
                    });
                },
                controller: ['$compile', '$q', '$scope', '$rootScope', 'luiDialog', '$translate', 'InitConfig', function ($compile, $q, $scope, $rootScope, luiDialog, $translate, InitConfig) {

                    $scope.OpenOptions = false;
                    $scope.toogleOptions = function () {
                        //var _mode = $rootScope.darkView;
                        //switch (_mode) {
                        //    case true:
                        //        $('.mz-settings .lui-tab').removeClass('lui-active').promise().done(function () { $('.mz-settings .lui-tab').first().addClass('lui-active') });
                        //        $('.mz-settings .tabs-content').addClass('ng-hide').promise().done(function () { $('.mz-settings .tabs-content').first().removeClass('ng-hide')})
                        //        break;
                        //    case false:
                        //        $('.mz-settings .lui-tab').removeClass('lui-active').promise().done(function () { $('.mz-settings .lui-tab:nth-child(2)').addClass('lui-active') });
                        //        $('.mz-settings .tabs-content').addClass('ng-hide').promise().done(function () { $('.mz-settings .tabs-content:nth-child(2)').removeClass('ng-hide') })
                        //        break;
                        //    default:                                
                        //        break;
                        //}
                        $scope.OpenOptions = $scope.OpenOptions === false ? true : false;
                    }


                    $scope.imagenesBG = [
                        { nombre: "Image1", url: "assets/img/bg/1.jpg" },
                        { nombre: "Image2", url: "assets/img/bg/2.jpg" },
                        { nombre: "Image3", url: "assets/img/bg/3.jpg" },
                        { nombre: "Image4", url: "assets/img/bg/4.jpg" },
                        { nombre: "Image5", url: "assets/img/bg/5.jpg" },
                        { nombre: "Image6", url: "assets/img/bg/6.jpg" },
                        { nombre: "Image7", url: "assets/img/bg/7.jpg" },
                        { nombre: "Image8", url: "assets/img/bg/8.jpg" },
                        { nombre: "Image9", url: "assets/img/bg/9.jpg" },
                        { nombre: "Image10", url: "assets/img/bg/10.jpg" },
                        { nombre: "Image11", url: "assets/img/bg/11.jpg" },
                        { nombre: "Image12", url: "assets/img/bg/12.jpg" },
                        { nombre: "Image13", url: "assets/img/bg/13.jpg" },
                        { nombre: "Image14", url: "assets/img/bg/14.jpg" },
                        { nombre: "Image15", url: "assets/img/bg/15.jpg" },
                        { nombre: "Image16", url: "assets/img/bg/16.jpg" },
                        { nombre: "Image17", url: "assets/img/bg/17.jpg" },
                        { nombre: "Image18", url: "assets/img/bg/18.jpg" },
                        { nombre: "Image19", url: "assets/img/bg/19.jpg" },
                        { nombre: "Image20", url: "assets/img/bg/20.jpg" },
                        { nombre: "Image21", url: "assets/img/bg/21.jpg" },
                        { nombre: "Image22", url: "assets/img/bg/22.jpg" }];

                    $scope.activeItem = function($event) {
                        $event.preventDefault();
                        var $This = $event.currentTarget;
                        $(".themes__item").removeClass("active").promise().done(function() {
                            $($This).addClass("active");
                            var b = $($This).data("sa-value");
                            $("body").attr("data-mz-theme", b)
                        })
                    }

                    $scope.listTheme = [];
                    $scope.selecteTheme;

                    function getListThemes() {
                        var defer = $q.defer();
                        $scope.selecteTheme;
                        var listTheme = [];

                        var isDarkView;
                        switch ($rootScope.darkView) {
                            case true:
                                isDarkView = true;
                                break;
                            case false:
                                isDarkView = false;
                                break;
                            default:
                                isDarkView = true
                                break;
                        }
                        qlik.getThemeList().then(function (list) {
                            list.forEach(function (value) {
                                var _options = {};
                                if (value.id.includes("MZDemo_Theme") && value.id.includes("-Transparent") == isDarkView) {
                                    _options.id = value.id;
                                    _options.name = value.name;
                                    listTheme.push(_options);

                                } else if (value.id == $rootScope.ThemesInit && value.id.includes("-Transparent") == isDarkView) {
                                    _options.id = value.id;
                                    _options.name = value.name;
                                    listTheme.push(_options);                                    
                                }
                                $scope.selecteTheme = listTheme[listTheme.map(function (e) { return e.id; }).indexOf($rootScope.ThemesInit)];
                            });                           
                            defer.resolve(listTheme);
                        });
                        return defer.promise;
                    }


                    $scope.loadComboThemes = function () {                        
                        getListThemes().then(function (res) {
                            $scope.listTheme = res;
                        })
                    }
                    

                    $scope.applyTheme = function (val) {
                        if (val) {
                            var _idTheme = val.id;
                            qlik.theme.apply(_idTheme).then(function (Apply) {
                                switch (Apply) {
                                    case false:
                                        showAlert('Atención', 'El tema está dañado. No se puede aplicar', 'error');
                                        break;
                                    case true:                                       
                                        $("body").attr("data-mz-custom-theme", _idTheme)
                                        break;
                                    default:
                                        break;

                                }
                            })
                        }

                    }


                    $scope.sidebarImages = [
                        { nombre: "Image1", url: "assets/img/sidebarImages/full-screen-image-1.jpg" },
                        { nombre: "Image2", url: "assets/img/sidebarImages/full-screen-image-2.jpg" },
                        { nombre: "Image3", url: "assets/img/sidebarImages/full-screen-image-3.jpg" },
                        { nombre: "Image4", url: "assets/img/sidebarImages/full-screen-image-4.jpg" },
                        { nombre: "Image5", url: "assets/img/sidebarImages/full-screen-image-5.jpg" },
                        { nombre: "Image6", url: "assets/img/sidebarImages/full-screen-image-6.jpg" },
                        { nombre: "Image7", url: "assets/img/sidebarImages/full-screen-image-7.jpg" },
                        { nombre: "Image8", url: "assets/img/sidebarImages/full-screen-image-8.jpg" },
                        { nombre: "Image9", url: "assets/img/sidebarImages/Fondo-Menu-001.png" },
                        { nombre: "Image10", url: "assets/img/sidebarImages/Fondo-Menu-002.png" },
                        { nombre: "Image11", url: "assets/img/sidebarImages/Fondo-Menu-004.png" },
                        { nombre: "Image11", url: "assets/img/sidebarImages/sidebar-1.jpg" },
                        { nombre: "Image11", url: "assets/img/sidebarImages/Sidebar-000c.jpg" },
                        { nombre: "Image11", url: "assets/img/sidebarImages/Sidebar-001a.jpg" },
                        { nombre: "Image11", url: "assets/img/sidebarImages/Sidebar-001b.jpg" }
                    ];

                    $scope.getBgSidebarImage = function ($event) {
                        $event.preventDefault();
                        var $This = $event.currentTarget;
                        $(".sidebar-item").removeClass("active").promise().done(function () {
                            $($This).addClass("active");
                            var b = $($This).data("sa-value");
                            $("body").attr("data-mz-sidebar", b)
                        })
                    }


                    $scope.colors = [
                        { nombre: "PrussianBlue", color: "#0073AD" },
                        { nombre: "black", color: "#000000" },
                        { nombre: "orange", color: "#FF7900" },
                        { nombre: "orange2", color: "#F16E00" },
                        { nombre: "blue", color: "#4BB4E6" },
                        { nombre: "emerald", color: "#009899" },
                        { nombre: "cottonCandy", color: "#FFB4E6" },
                        { nombre: "purple", color: "#A885D8" },
                        { nombre: "gold", color: "#FFD200" },
                        { nombre: "lime", color: "#32C832" },
                        { nombre: "harleyDavidsonOrange", color: "#CD3C14" },
                        { nombre: "royalBlue", color: "#527EDB" },
                        { nombre: "tangerineYellow", color: "#FFCC00" },
                        { nombre: "nightRider", color: "#333333" }

                    ];

                    $scope.getSidebarColor = function ($event) {
                        $event.preventDefault();
                        var $This = $event.currentTarget;
                        $(".sidebar-item-color").removeClass("active").promise().done(function () {
                            $($This).addClass("active");
                            var b = $($This).data("sa-value");
                            $("body").attr("data-mz-sidebar-color", b)
                        })
                    }

                    $scope.getMenuColor = function ($event) {
                        $event.preventDefault();
                        var $This = $event.currentTarget;
                        $(".sidebar-item-menu-color").removeClass("active").promise().done(function () {
                            $($This).addClass("active");
                            var b = $($This).data("sa-value");
                            $("body").attr("data-mz-sidebar-menu-color", b)
                        })
                    }

                    $scope.getBgHeader = function ($event) {
                        $event.preventDefault();
                        var $This = $event.currentTarget;
                        $(".header-item-color").removeClass("active").promise().done(function () {
                            $($This).addClass("active");
                            var b = $($This).data("sa-value");
                            $("body").attr("data-mz-header-color", b)
                        })
                    }




                    $scope.resetBackgroundimage = function () {
                        $('body#main').removeAttr('data-mz-theme').promise().done(function () {
                            $('.themes__item').removeClass('active');
                        });
                    }
                    $scope.resetThemes = function () {
                        $('body#main').removeAttr('data-mz-custom-theme').promise().done(function () {
                            qlik.theme.apply(InitConfig.ThemesInit);
                        });
                    }

                    $scope.resetSidebarimages = function () {
                        $('body#main').removeAttr('data-mz-sidebar').promise().done(function () {
                            $('.sidebar-item').removeClass('active');
                        });
                    }

                    $scope.resetSidebarcolor = function () {
                        $('body#main').removeAttr('data-mz-sidebar-color').promise().done(function () {
                            $('.sidebar-item-color').removeClass('active');
                        });
                    }

                    $scope.resetSidebarMenucolor = function () {
                        $('body#main').removeAttr('data-mz-sidebar-menu-color').promise().done(function () {
                            $('.sidebar-item-menu-color').removeClass('active');
                        });
                    }
                    

                    $scope.resetHeadercolor = function () {
                        $('body#main').removeAttr('data-mz-header-color').promise().done(function () {
                            $('.header-item-color').removeClass('active');
                        });
                    }



                    $scope.filename = "custom.json";
                    $scope.saveConfig = function () {


                        if ($('#cliente_name').val() == "" || $('#proyecto_name').val() == "") {
                            showAlert('Atención', 'Cliente y Proyecto son campos obligatorios', 'error');
                            return false;
                        } else {
                            objectToExport = {};
                            if ($('#cliente_name').val() != "") {
                                objectToExport.Cliente = {};
                                objectToExport.Cliente.Literal = 'Cliente',
                                objectToExport.Cliente.Valor = $('#cliente_name').val()
                            }

                            if ($('#proyecto_name').val() != "") {
                                objectToExport.Proyecto = {};
                                objectToExport.Proyecto.Literal = 'Proyecto',
                                    objectToExport.Proyecto.Valor = $('#proyecto_name').val()
                            }


                            if ($('body')[0].hasAttribute("data-mz-theme")) {
                                objectToExport.ImagenFondo = {};
                                objectToExport.ImagenFondo.Literal = 'Imagen de Fondo',
                                objectToExport.ImagenFondo.Valor = $('body').attr('data-mz-theme')
                            }
                            if ($('body')[0].hasAttribute("data-mz-custom-theme")) {
                                objectToExport.Theme = {};
                                objectToExport.Theme.Literal = 'Theme',
                                objectToExport.Theme.Valor = $('body').attr('data-mz-custom-theme')
                            }

                            if ($('body')[0].hasAttribute("data-mz-sidebar")) {
                                objectToExport.ImagenLateral = {};
                                objectToExport.ImagenLateral.Literal = 'Imagen de Fondo Menú Lateral',
                                objectToExport.ImagenLateral.Valor = $('body').attr('data-mz-sidebar')
                            }

                            if ($('body')[0].hasAttribute("data-mz-sidebar-color")) {
                                objectToExport.SidebarBackground = {};
                                objectToExport.SidebarBackground.Literal = 'Background color Menú Lateral',
                                objectToExport.SidebarBackground.Valor = $('body').attr('data-mz-sidebar-color')
                            }

                            if ($('body')[0].hasAttribute("data-mz-sidebar-menu-color")) {
                                objectToExport.SidebarItemMenu = {};
                                objectToExport.SidebarItemMenu.Literal = 'Background color Menú Item Lateral',
                                objectToExport.SidebarItemMenu.Valor = $('body').attr('data-mz-sidebar-menu-color')
                            }

                            if ($('body')[0].hasAttribute("data-mz-header-color")) {
                                objectToExport.BackgroundHeader = {};
                                objectToExport.BackgroundHeader.Literal = 'Background color cabecera',
                                objectToExport.BackgroundHeader.Valor = $('body').attr('data-mz-header-color')
                            }

                        



                            var filename = $scope.filename;
                            var blob = new Blob([angular.toJson(objectToExport, true)], { type: 'text/text' });
                            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                                window.navigator.msSaveOrOpenBlob(blob, filename);
                            } else {
                                var e = document.createEvent('MouseEvents'),
                                    a = document.createElement('a');
                                a.download = filename;
                                a.href = window.URL.createObjectURL(blob);
                                a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                                e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                                a.dispatchEvent(e);
                                // window.URL.revokeObjectURL(url); // clean the url.createObjectURL resource
                            }
                        }
                        
                    };


                    $scope.isConfigDisabled = function () {
                        if ($('body')[0].hasAttribute("data-mz-theme") || $('body')[0].hasAttribute("data-mz-custom-theme") || $('body')[0].hasAttribute("data-mz-sidebar") || $('body')[0].hasAttribute("data-mz-sidebar-color") || $('body')[0].hasAttribute("data-mz-sidebar-menu-color") || $('body')[0].hasAttribute("data-mz-header-color")) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                    
                    
                }]
            };
        }]);

});