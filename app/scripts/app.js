'use strict';

/**
 * @ngdoc overview
 * @name recallApp
 * @description
 * # recallApp
 *
 * Main module of the application.
 */
angular
  .module('recallApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'lumx'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/', {
        templateUrl: 'views/checkin.html'
      })
      .when('/news', {
        templateUrl: 'views/news.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
