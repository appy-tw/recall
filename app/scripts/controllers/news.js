'use strict';

/**
 * @ngdoc function
 * @name recallApp.controller:NewsCtrl
 * @description
 * # NewsCtrl
 * Controller of the recallApp
 */
angular.module('recallApp')
  .controller('NewsCtrl', function ($scope, $http ) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    function parseFeed(url){
      return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url+ '?' + (new Date()).getTime()));
    }

    var mapping = {
      street: '掃街活動',
      speech: '宣講活動',
      music: '音樂活動',
      multiple: '綜合活動',
      hide: '隱藏活動',
      boss: '魔王消息'
    };

    parseFeed('http://appytw.tumblr.com/rss').then(function(res) {
      var feeds = []; 
      angular.forEach(res.data.responseData.feed.entries, function(f) {
        if (feeds.length >= 10) {
          return;
        }   
        feeds.push(f);
        angular.forEach(f.categories, function(c) {
          if (c.indexOf('type:') === 0) {
            var type = c.substr('type:'.length);
            f.type = type;
            f.tag = mapping[type];
          }   
        }); 
        if (!f.tag) {
          f.tag = '最新消息';
          f.type = 'multiple';
        }   
        var d = new Date(f.publishedDate);
        f.date = (d.getYear()+1900) + '/'+ (d.getMonth()+1) + '/' + (d.getDay()+1)
      }); 
      $scope.feeds = feeds;
    }); 


  });
