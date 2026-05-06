/****************************************************************************************************************************************
Obtener el host de la extensión, por ejemplo, en localhost:4848/extensions/NombreExtension/Pagina.html
se obtiene /extensions/NombreExtension/
/***************************************************************************************************************************************/
var href = window.location.pathname;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

define([
    'js/qlik',
    'app',
    'angular',
    './text!./css/filters.css'
], function (qlik, app, angular, cssContent) {
        $('<style>').html(cssContent).appendTo('head')
        app.directive('filters', ['InitConfig', '$translate','$rootScope', function (InitConfig, $translate, $rootScope) {
            return {
                restrict: 'E',
                scope: false,
                templateUrl: 'js/Directives/filters/filters.html',
                link: function (scope, element, attrs) { 
                    scope.lstModel = [];
                    function checkIsarray() {
                        scope.listPaneles = [];
                        var deferred = $.Deferred();
                        switch (attrs.isarray) {
                            case 'true':
                                scope.paneles = true;
                                var arr = JSON.parse(attrs.idfiltro);
                                angular.forEach(arr, function (value, key) {
                                    var _options = {};
                                    if (InitConfig.multilanguage == true) {
                                        _options.title = $translate.instant(value.title)
                                    } else {
                                        _options.title = value.title;
                                    }                                    
                                    _options.icon = value.icon;
                                    _options.id = value.idFiltro;
                                    scope.listPaneles.push(_options)
                                });

                                $rootScope.$on('$translateChangeSuccess', function () {
                                    //scope.listPaneles = [];
                                    angular.forEach(arr, function (value, key) {
                                        //var _options = {};
                                        scope.listPaneles[key].title = $translate.instant(value.title)
                                        //_options.icon = value.icon;
                                        //_options.id = value.idFiltro;
                                        //scope.listPaneles.push(_options)
                                    });
                                })

                                break;
                            default:
                                scope.paneles = false;
                        }
                        deferred.resolve();
                        return deferred.promise(); 
                    }

                    attrs.$observe('idfiltro', function () { 
                        //attrs.$observe('isarray', function () {
                            //Check para array filtros
                            checkIsarray().then(function (res) {                                                 
                                $('.box_object_filter_item').height(0);
                                if (attrs.idfiltro != '') {
                                    scope._thisapp = qlik.openApp($('body').attr('data-app'), config);
                                    scope.ChangeOn(scope._thisapp);
                                    var _object = element.find('.qlik-embed.filtrosHome');
                                    angular.forEach(scope.lstModel, function (value, key) {
                                        try {
                                            value.close();
                                        }
                                        catch (error) {
                                            console.log("error eliminando el objeto " + key + "\n" + error)
                                        }

                                    });
                                    scope.lstModel = [];
                                    $(_object).each(function () {
                                        var _this = $(this);
                                        var qvid = $(_this).attr('data-qlik-objid');
                                        scope._thisapp.visualization.get(qvid).then(function (vis) {
                                            vis.show(_this, {
                                                onRendered: function () {
                                                    scope.lstModel.push(vis);
                                                    var _items;
                                                    var _altoFiltro = 0;
                                                    var _itemsLength = 0;
                                                    setTimeout(function () {
                                                        _items = vis.model.pureLayout;
                                                        if (_items != undefined) {
                                                            _itemsLength = vis.model.pureLayout.qChildList.qItems.length;

                                                        } else {
                                                            _itemsLength = vis.model.layout.qChildList.qItems.length;
                                                        }
                                                        _altoFiltro = (_itemsLength * 45) + 40;
                                                        $(_this).parents('.box_object_filter_item').height(_altoFiltro);
                                                    }, 500);
                                                }
                                            });
                                        });
                                    });
                                }
                            })
                        //})
                    });                                       
                },
                controller: ['$q', '$scope', '$rootScope', 'luiDialog', '$translate', function ($q, $scope, $rootScope, luiDialog, $translate) { 

                    $scope.ChangeOn = function (APP) {
                        APP.getList("SelectionObject", function (reply) {

                            $("#selectionsnotification, .selectionsnotification").hide();
                            $selections = $("#selections");  //DOM node to append selections to
                            $selections.html("");  //Clear node of any previous selections
                            var fields = [];  //Empty Array
                            var fieldssel = 0; //initialize variable

                            if (reply.qSelectionObject.qSelections.length === 0) {
                                $("#selections").css({ "visibility": "hidden", "display": "none" });
                                $("#linkAbreFiltros").css("opacity", "0.5").addClass("disabled");
                            } else {
                                $("#selections,#linkAbreFiltros").css("visibility", "visible");
                                $("#linkAbreFiltros").css("opacity", "1").removeClass("disabled");
                            }

                            //Loop through array of fields that have selections
                            $.each(reply.qSelectionObject.qSelections, function (key, value) {

                                var field = value.qField;  //The field name
                                var numSelected = value.qSelectedCount;  //Number of selections in field
                                var total = value.qTotal;  //Total number of values in field
                                var threshold = value.qSelectionThreshold;  //Threshold in which to display a number count instead of each value
                                var selectedStr = value.qSelected;  //When numSelected is less than or equal to threshold, a string of the names of each value selected

                                fields.push(field);
                                var fieldssel = fields.length;
                                $("#selectionsnotification, .selectionsnotification").html(fieldssel);
                                $("#selectionsnotification, .selectionsnotification").show();




                                //If numSelected is below or equal to threshold, show string of names of each value selected
                                if (numSelected <= threshold) {
                                    var html = "";
                                    html += "<li class='selected-field-container clearfix' id='" + field + "'>";
                                    html += "<span> <div class='row m-0 wrapper'><div class='col-sm-11 col-xs-11 p-0'>";
                                    html += "<span class='label label-info selected-field'>" + field + "</span><p class='selectedelements m-0'>";
                                    html += selectedStr;
                                    html += "</p></div><div class='col-sm-1 col-xs-1 item-remove p-0'><span class='lui-icon lui-icon--bin clear-field'></span></div></div></span></li>";
                                    $selections.append(html);
                                }

                                // If numSelected is greater than threshold, show the numSelected of total values
                                else {
                                    var html = "";
                                    html += "<li class='selected-field-container clearfix' id='" + field + "'>";
                                    html += "<span> <div class='row m-0 wrapper'><div class='col-sm-11 col-xs-11 p-0'>";
                                    html += "<span class='label label-info selected-field'>" + field + "</span><p class='selectedelements m-0'>";
                                    html += numSelected + " of " + total;
                                    html += "</p></div><div class='col-sm-1 col-xs-1 item-remove p-0'><span class='lui-icon lui-icon--bin clear-field'></span></div></div></span></li>";
                                    $selections.append(html);
                                }
                            });


                            $selections.append("<li class='clear-all'><div class='span-clear'><i class='icofont icofont-refresh'></i>" + $translate.instant('views.acciones.limpiarselecciones') +"</div></li>");
                            $(".clear-all").click(function () {
                                APP.clearAll();
                            });

                            //Event listener on .clear-field to clear that field's selections when clicked
                            $('.clear-field').on('click', function (e) {
                                e.preventDefault();
                                var field = $(this).parents('li').attr("id");
                                APP.field(field).clear();
                            });

                            $('.clear_selections').on('click', function (e) {
                                e.preventDefault();
                                APP.clearAll();
                            });
                            $('#selections').on('click', function (e) {
                                e.stopPropagation();
                            });


                        });
                    }                   
                    $rootScope.OpenFiltros = false;
                    $scope.toggleFilters = function ($event) {
                        $event.stopPropagation();
                        $rootScope.OpenFiltros = $rootScope.OpenFiltros === false ? true : false;
                      $('#selections').removeClass('show');                        
                    }                                        
                }]
            };
        }]);

});