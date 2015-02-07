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
      .when('/', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/news', {
        templateUrl: 'views/news.html',
        controller: 'NewsCtrl'
      })
      .when('/checkin', {
        templateUrl: 'views/checkin.html',
        controller: 'CheckinCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).filter('htmlToPlaintext', function () {
    return function (input) {
      input = input || '';
      return String(input).replace(/<[^>]+>/gm, '')
        .replace(/&[\d\w]+;/, '')
        .replace('more', '')
        .replace('!--', '');
    };
  });
