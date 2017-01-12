var lostctrl = angular.module("lostController", ["ui.router"]);

lostctrl.controller("lostController", function($scope, $http, $state) {
  $http.get("/rest/categories").then(function(dates) {
    $scope.categories = dates.data;
  }).catch(function(error) {
    console.log(error);
  });
  $scope.showForm = function() {
    $state.go("lostForm");
  };
  $scope.lostItem = {

  };

  $scope.addLostItem = function() {
    $http.post("/rest/lostobjects", $scope.lostItem).then(function(response) {
      //        $state.go("main",{},{reload: true});
      $scope.$parent.$broadcast("newItem", $scope.lostitem);
      $state.reload();

    })

  };
  
  



});
