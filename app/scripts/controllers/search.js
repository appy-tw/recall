'use strict';

/**
 * @ngdoc function
 * @name recallApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recallApp
 */
angular.module('recallApp')
  .controller('SearchCtrl', function ($scope, $http) {
    $scope.selected = {
      section: '無'
    };
    $scope.districts = ['內湖區', '南港區'];
    $scope.sections = ['無', '一', '二', '三', '四', '五', '六', '七', '八', '九',
      '十'];
    $http.get('scripts/stations.json')
      .success(function(stations) {
        $scope.stations = stations;
        $scope.stationNames = [];
        angular.forEach(stations, function(val, key) {
          $scope.stationNames.push(key);
        });
    });

    function convertNum(num) {
      if (!num) {
        return '';
      }
      var result = [];
      for (var i = 0; i < num.length; i++) {
        if (num.charCodeAt(i) <= 57 && num.charCodeAt(i) >= 48) {
          result.push(String.fromCharCode(num.charCodeAt(i) + 65248));
        } else {
          result.push('');
        }
      }
      return result.join('');
    }

    $scope.search = function() {
      var params = {
        'tkTimes': '1',
        'searchType': 'doorplate',
        'cityCode': '63000000'
      };
      if ($scope.selected.district === '南港區') {
        params.areaCode = '63000090';
      } else {
        params.areaCode = '63000100';
      }
      params.section = $scope.selected.section === '無' ?
        '' : $scope.selected.section;

      params.street = $scope.selected.street;
      params.lane = convertNum($scope.selected.lane);
      params.alley = convertNum($scope.selected.alley);
      params.number = convertNum($scope.selected.number);

      $http({
        method: 'POST',
        url: '/proxy/doorplateX/doorplateQuery',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          return angular.element.param(obj);
        },
        data: {page: 1, rows: 20}
      }).success(function(data) {
        params.tkt = data.tkt;

        $http({
          method: 'POST',
          url: '/proxy/doorplateX/doorplateQuery',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
            return angular.element.param(obj);
          },
          data: params
        }).success(function(data) {
          console.log(data);
          if (data.rows.length > 0) {
            var matched = data.rows[0].address.match(/(..里)(\d+)鄰/);
            if (matched) {
              $scope.selected.village = matched[1];
              $scope.selected.neighborhood = parseInt(matched[2], 10);
            }
          }
        });
      });
    };


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
