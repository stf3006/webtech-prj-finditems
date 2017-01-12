var app = angular.module("items", ["ui.router", "lostController", "foundController"]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index')
    $stateProvider
        .state('main', {
            url: '/index',
            views: {
                "leftview": {
                    templateUrl: 'views/lostentry.html',
                    controller: "lostController"

                },
                "rightview": {
                    templateUrl: 'views/foundentry.html',
                    controller: "foundController"
                }

            }

        })
        .state('lostForm', {
            url: '/lostForm',
            views: {
                "leftview": {
                    templateUrl: 'views/lostform.html',
                    controller: "lostController"

                },
                "rightview": {
                    templateUrl: 'views/foundentry.html',
                    controller: "foundController"
                }
            }

        })
        .state('foundForm', {
            url: '/foundForm',
            views: {
                "leftview": {
                    templateUrl: 'views/lostentry.html',
                    controller: "lostController"

                },
                "rightview": {
                    templateUrl: 'views/foundform.html',
                    controller: "foundController"
                }
            }

        })



}])

app.controller("mainController", function($scope, $http, $state) {

    $scope.$on("newItem", function(event, data) {
        load();
    })

    var load = function() {
        $http.get("/rest/lostobjects").then(function(dates) { // apelam serviciul rest pentru a extrage toate ob pierdute
            $scope.lostobjects = dates.data;
        }).catch(function(error) {
            console.log(error);
        });

        $http.get("/rest/foundobjects").then(function(dates) { // // apelam serviciul rest pentru a extrage toate ob gasite
            $scope.foundobjects = dates.data;
        }).catch(function(error) {
            console.log(error);
        });
    }

    load();

    $scope.deleteLostItem = function(obj) {

        $http.delete("/rest/lostobjects/" + obj.id).then(function() {
            load();
        }).catch(function(error) {
            console.log(error);
        });

    };

    $scope.deleteFoundItem = function(obj) {

        $http.delete("/rest/foundobjects/" + obj.id).then(function() {
            load();
        }).catch(function(error) {
            console.log(error);
        });

    };

    $scope.lostItemSelected = {};



    $scope.getLostTemplate = function(obj) {
        if (obj.id == $scope.lostItemSelected.id)
            return "editLost";
        else
            return 'displayLost';
    }

    $scope.editLostItem = function(obj) {
        $scope.lostItemSelected = obj;
    }

    $scope.saveLostItem = function(obj) {
        $http.put("/rest/lostobjects/" + obj.id, obj)
            .then(function() {
                $scope.lostItemSelected = {};
            });
    }
    
    
    $scope.foundItemSelected = {};
    
    $scope.getFoundTemplate = function(obj) {
        if (obj.id == $scope.foundItemSelected.id)
            return "editFound";
        else
            return 'displayFound';
    }

    $scope.editFoundItem = function(obj) {
        $scope.foundItemSelected = obj;
    }

    $scope.saveFoundItem = function(obj) {
        $http.put("/rest/foundobjects/" + obj.id, obj)
            .then(function() {
                $scope.foundItemSelected = {};
            });
    }
    
});
