'use strict';

/**
 * @ngdoc function
 * @name recallApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recallApp
 */
angular.module('recallApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.selected = {};
    $http.get('scripts/stations.json')
      .success(function(stations) {
        $scope.stations = stations;
        $scope.stationNames = [];
        angular.forEach(stations, function(val, key) {
          $scope.stationNames.push(key);
        });
    });

    $scope.$watch('selected.village + selected.neighborhood', function() {
      delete $scope.selected.station;
      if (!$scope.stations) { return; }
      var villages = $scope.stations[$scope.selected.village];

      if (!villages) {
        return;
      }

      angular.forEach(villages.stations, function(station) {
        if (station.range.length === 0) {
          $scope.selected.station = station;
          return;
        }
        angular.forEach(station.range, function(val) {
          if (val === parseInt($scope.selected.neighborhood)) {
            $scope.selected.station = station;
            return;
          }
        });
      });
    });
  })
  .filter('encodeURIComponent', function($window) {
    return $window.encodeURIComponent;
});
