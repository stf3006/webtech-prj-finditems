var foundctrl = angular.module("foundController", ["ui.router"]);

foundctrl.controller("foundController", function($scope, $http, $state){
    $http.get("/rest/categories").then(function(dates) {
    $scope.categories = dates.data;
  }).catch(function(error) {
    console.log(error);
  });
  $scope.showForm = function() {
    $state.go("foundForm");
  };
  $scope.foundItem = {

  };

  $scope.addFoundItem = function() {
    $http.post("/rest/foundobjects", $scope.foundItem).then(function(response) {
      //        $state.go("main",{},{reload: true});
      $scope.$parent.$broadcast("newItem", $scope.founditem);
      $state.reload();

    })

  };
    
});