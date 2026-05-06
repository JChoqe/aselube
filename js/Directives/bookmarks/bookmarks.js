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
        
        app.directive('bookmarks', [function () {
            return {
                restrict: 'E',
                scope: false,
                templateUrl: 'js/Directives/bookmarks/bookmarks.html',
                link: function (scope, element, attrs) {
                    attrs.$observe('idapp', function () {                      
                        scope._thisapp = qlik.openApp($('body').attr('data-app'), config);
                        scope.ChangeBookmark(scope._thisapp);
                        
                    });
                   
                },
                controller: ['$q', '$scope', '$rootScope', 'luiDialog', '$translate', function ($q, $scope, $rootScope, luiDialog, $translate) {
                   
                    var aBookmarksTitle = [];
                    //Limpiar array de Marcadores y cargarlos otra vez para no repetirlos
                    function GetListBookMarks(app) {                        
                        aBookmarksTitle = [];
                        app.getList("BookmarkList", function (reply) {
                            reply.qBookmarkList.qItems.forEach(function (value) {
                                if (value.qData.title) {
                                    //Añadimos el title a un array para comprovbar que no se repitan
                                    aBookmarksTitle.push(value.qData.title);
                                }
                            });
                        });
                    }
                    
                    $scope.ChangeBookmark = function (APP) {
                        APP.getList("BookmarkList", function (reply) {
                            $scope.arrBookmark = [];
                            reply.qBookmarkList.qItems.forEach(function (value) {
                                var itemBookmark = {};
                                itemBookmark.title = value.qData.title;
                                itemBookmark.description = value.qData.description
                                itemBookmark.id = value.qInfo.qId;
                                itemBookmark.active = false;
                                $scope.arrBookmark.push(itemBookmark);
                                aBookmarksTitle.push(itemBookmark.title);
                            });

                            $scope.deleteBookmark = function (ID) {
                                var _template = '<div class="lui-dialog" style="width: 600px;"><div class="lui-dialog__header"><div class="lui-dialog__title">' + $translate.instant('views.modal.atencion') + '</div></div><div class="lui-dialog__body"><strong>' + $translate.instant('views.acciones.seeliminaraBookmar') + '</strong>. <br />' + $translate.instant('views.modal.accionnoback') + '</div><div class="lui-dialog__footer"><button class="lui-button  lui-dialog__button" ng-click="closeDialog();">' + $translate.instant('views.modal.cerrar') + '</button><button class="lui-button  lui-dialog__button  close-button" ng-click="deleteBookmarkConfirm();">' + $translate.instant('views.modal.continuar') +'</button></div></div>';
                                var dialog = luiDialog.show({
                                    template: _template,
                                    closeOnEscape: true,
                                    controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                                        $scope.closeDialog = function () {
                                            dialog.close();
                                        }
                                        $scope.deleteBookmarkConfirm = function () {
                                            dialog.close();
                                            if ($rootScope.IsPersonalMode) {
                                                APP.bookmark.remove(ID).then(function () {
                                                    APP.doSave();                                                                                                       
                                                    GetListBookMarks(APP);
                                                    showAlert($translate.instant('views.modal.atencion'), $translate.instant('views.acciones.EliminarBookmark'), 'success');
                                                });
                                            } else {
                                                APP.bookmark.remove(ID);
                                                //APP.doSave();
                                                GetListBookMarks(APP);
                                                showAlert($translate.instant('views.modal.atencion'), $translate.instant('views.acciones.EliminarBookmark'), 'success');
                                            }
                                        }
                                    }]
                                });
                            }

                            //Revision
                            $scope.editBookmark = function (ID) {
                                function getDatos() {
                                    var defer = $q.defer();
                                    item = $scope.arrBookmark.filter(function (obj) {
                                        if (obj.id == ID) {
                                            return obj;
                                        }
                                    });
                                    defer.resolve(item);
                                    return defer.promise;
                                }
                                getDatos().then(function (res) {
                                    $scope.disableUpdate = true;
                                    



                                    var _template = '<div class="lui-dialog" style="width: 600px;"><div class="lui-dialog__header"><div class="lui-dialog__title">' + $translate.instant('views.modal.editarmarcador') + '</div></div><div class="lui-dialog__body"><label class="control-label" for="bmtitle">' + $translate.instant('views.modal.crearmarcadortitulo') + ':</label><input class="lui-input" id="bmtitle"  type="text" ng-model="titleBookmark"><label class="control-label" for="bmdesc">' + $translate.instant('views.modal.crearmarcadordescripcion') + ':</label><input class="lui-input" id="bmdesc"  ng-model="desBookmark"  type="text"></div><div class="lui-dialog__footer"><button class="lui-button  lui-dialog__button" ng-click="closeDialog();">' + $translate.instant('views.modal.cerrar') + '</button><button class="lui-button  lui-dialog__button  close-button" ng-click="updateBookmark();">' + $translate.instant('views.modal.aceptar') +'</button></div></div>';
                                    var dialog = luiDialog.show({
                                        template: _template,
                                        closeOnEscape: true,
                                        controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                                            $scope.titleBookmark = res[0].title;
                                            $scope.desBookmark = res[0].description;
                                            $scope.closeDialog = function () {
                                                dialog.close();
                                            }
                                            $scope.updateBookmark = function () {
                                                var
                                                    titleBM = $scope.titleBookmark,
                                                    descBM = $scope.desBookmark;
                                                if (titleBM !== "") {
                                                    if ($.inArray(titleBM, aBookmarksTitle) >= 0) {
                                                        showAlert($translate.instant('views.modal.atencion'), $translate.instant('views.acciones.Bookmarkexiste'), 'error');
                                                    } else {
                                                        //alert(ID)
                                                        //alert(titleBM)
                                                        //console.log(APP)                                                        
                                                        //var msg = {
                                                        //    "handle":APP.model.handle, 
                                                        //    "method": "CloneBookmark",
                                                        //    "params": {
                                                        //        "qId": ID
                                                        //    }                                                                                                                                                                                                                                             
                                                        //}
                                                                                                                //{
                                                        //    "handle": 4,
                                                        //    "method": "SetProperties",
                                                        //    "params": {
                                                        //        "qProp": {
                                                        //            "qInfo": {
                                                        //                "qId": ID,
                                                        //                "qType": "Bookmark"
                                                        //            },
                                                        //            "qExtendsId": "",
                                                        //            "qMetaDef": {
                                                        //                "title": titleBM
                                                        //            },
                                                        //            "qStateName": ""
                                                        //        }
                                                        //    }
                                                        //}
                                                        //{
                                                        //    "jsonrpc": "2.0",
                                                        //        "id": 12,
                                                        //            "method": "SetProperties",
                                                        //                "handle": 4,
                                                        //                    "params": [
                                                        //                        {
                                                        //                            "qInfo": {
                                                        //                                "qId": _qGenericId,
                                                        //                                "qType": "Bookmark"
                                                        //                            },
                                                        //                            "qBookmarkListDef": {
                                                        //                                "qType": "Bookmark"
                                                        //                            },
                                                        //                            "title": "Title of the bookmark BM01"
                                                        //                        }
                                                        //                    ]
                                                        //}

                                                        var msgGet ={
                                                            "handle": 1,
                                                            "method": "GetBookmark",
                                                            "params": {
                                                                "qId": ID
                                                            }
                                                        }

                                                        
                                                         
                                                        APP.model.session.rpc(msgGet).then(function (response) {
                                                            var _qType = response.result.qReturn.qType;
                                                            var _qGenericType = response.result.qReturn.qGenericType;
                                                            var _qGenericId = response.result.qReturn.qGenericId;
                                                            var _id = response.id;

                                                            var msgSet =
                                                      

                                                            {
                                                                "jsonrpc": "2.0",
                                                                "method": "SetProperties",
                                                                "handle": 2,
                                                                "params": [
                                                                    {
                                                                        "qInfo": {                                                                            
                                                                            "qType": _qGenericType
                                                                        },
                                                                        "qBookmarkListDef": {
                                                                            "qType": _qType
                                                                        },
                                                                        "qMetaDef": {
                                                                            "qId": _qGenericId
                                                                        },
                                                                        "title": titleBM,
                                                                        "description": descBM
                                                                    }
                                                                ]
                                                            }


                                                            APP.model.session.rpc(msgSet).then(function (response) {
                                                                if ($rootScope.IsPersonalMode) {
                                                                    APP.doSave();
                                                                }
                                                                dialog.close();
                                                                GetListBookMarks(APP);
                                                                console.log(response, 'SET')
                                                            });
                                                            console.log(response, 'GET')
                                                        });
                                                       
                                                    }                   
                                                    return false;
                                                } else {
                                                    showAlert($translate.instant('views.modal.atencion'), $translate.instant('views.acciones.KObookmark'), 'warning');
                                                }
                                            }
                                        }]
                                    });
                                });
                            }
                            //Revision
                            $scope.newBookmark = function () {
                                var _template = '<div class="lui-dialog" style="width: 600px;"><div class="lui-dialog__header"><div class="lui-dialog__title">' + $translate.instant('views.acciones.crearmarcadores') + '</div></div><div class="lui-dialog__body"><label class="control-label" for="bmtitle">' + $translate.instant('views.modal.crearmarcadortitulo') + ':</label><input class="lui-input" id="bmtitle" ng-model="titleBookmark" type="text" autofocus><label class="control-label" for="bmdesc">' + $translate.instant('views.modal.crearmarcadordescripcion') + ':</label><input class="lui-input" id="bmdesc" ng-model="desBookmark" type="text"></div><div class="lui-dialog__footer"><button class="lui-button  lui-dialog__button" ng-click="closeDialog();">' + $translate.instant('views.modal.cerrar') + '</button><button class="lui-button  lui-dialog__button  close-button" ng-click="addBookmarkConfirm();">' + $translate.instant('views.modal.crear') +'</button></div></div>';
                                var dialog = luiDialog.show({
                                    template: _template,
                                    closeOnEscape: true,
                                    controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                                        $scope.closeDialog = function () {
                                            dialog.close();
                                        }
                                        $scope.addBookmarkConfirm = function () {
                                            var
                                                titleBM = $scope.titleBookmark,
                                                descBM = $scope.desBookmark;
                                            if (typeof titleBM === 'undefined' || titleBM === "") {
                                                showAlert($translate.instant('views.modal.atencion'), $translate.instant('views.acciones.KObookmark'), 'warning');
                                            } else {
                                                if ($.inArray(titleBM, aBookmarksTitle) >= 0) {
                                                    showAlert($translate.instant('views.modal.atencion'), $translate.instant('views.acciones.Bookmarkexiste'), 'error');
                                                } else {
                                                    APP.bookmark.create(titleBM, descBM).then(function () {
                                                        if ($rootScope.IsPersonalMode) {
                                                            APP.doSave();
                                                        }
                                                        dialog.close();
                                                        showAlert($translate.instant('views.modal.atencion'), $translate.instant('views.acciones.OKbookmark') + ' <br /><strong>" ' + titleBM + ' "</strong>', 'success');
                                                    });
                                                }
                                                return false;
                                            }
                                        }
                                    }]
                                });
                            }

                            $scope.selState;
                            $scope.applyBookmark = function (ID, bookmar) {
                                //var _model = EngineAPI.IGenericObject;
                                //console.log(_model);
                                if (!bookmar.active) {                                    
                                    APP.bookmark.apply(ID);
                                    angular.forEach($scope.arrBookmark, function (value, key) {
                                        $scope.arrBookmark[key].active = false;
                                    })
                                    bookmar.active = true;
                                    $scope.selState = APP.selectionState();
                                } else { 
                                    //APP.clearAll();
                                    $scope.selState.clearAll();
                                    bookmar.active = false;
                                }
                                                               
                            }
                        });
                    }                                        
                }]
            };
        }]);

});