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
], function (qlik, app, angular ) {
        app.directive('filtersequalizador', [function () {
            return {
                restrict: 'E',
                scope: false,
                templateUrl: 'js/Controllers/Equalizador/Directives/filtersEqualizador/filtersEqualizador.html',
                link: function (scope, element, attrs) { 
                                                          
                },
                controller: ['$q', '$scope', '$rootScope', 'luiDialog', '$translate', function ($q, $scope, $rootScope, luiDialog, $translate) { 
                    $scope._thisapp = qlik.openApp($('body').attr('data-app'), config); 
                    $scope._thisapp.getList("SelectionObject", function (reply) {
                        $scope.notificationfilters = false;

                        $selections = $("#contentFilters");  //DOM node to append selections to
                        $selections.html("");  //Clear node of any previous selections
                        var fields = [];  //Empty Array
                        var fieldssel = 0; //initialize variable

                        //Loop through array of fields that have selections
                        $.each(reply.qSelectionObject.qSelections, function (key, value) {
                            var isOnlyOne = value.qOneAndOnlyOne;

                            if (isOnlyOne !== true) {
                                $scope.notificationfilters = true;
                                var field = value.qField;  //The field name
                                var numSelected = value.qSelectedCount;  //Number of selections in field
                                var total = value.qTotal;  //Total number of values in field
                                var threshold = value.qSelectionThreshold;  //Threshold in which to display a number count instead of each value
                                var selectedStr = value.qSelected;  //When numSelected is less than or equal to threshold, a string of the names of each value selected

                                fields.push(field);
                                var fieldssel = fields.length;
                                $(".notificationfilters").html(fieldssel);
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
                            }

                        });

                        $('.clear-field').on('click', function (e) {
                            e.preventDefault();
                            var field = $(this).parents('li').attr("id");
                            $scope.app.field(field).clear();
                        });

                    })
                }]
            };
        }]);

});