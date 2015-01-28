'use strict';

/* global cat */

require('shelljs/global');

var RE_VILLAGE = /(.+?)\s*([\d\-、]+)/;

var csv = cat('raw/135_polling-stations_20150125.csv').split('\n');

var result = {};

csv.forEach(function(line, i) {
  if (i === 0) { return; }

  var parts = line.split(',');
  var station = {
    id: parts[0],
    name: parts[1],
    address: parts[2],
    range: []
  };
  var villages = parts[3];

  var matched = RE_VILLAGE.exec(villages);
  var village;
  if (matched) {
    village = matched[1];
    var neighbourhood = matched[2];

    if (!result[village]) {
      result[village] = {
        stations: []
      };
    }
    neighbourhood.split('、').forEach(function(item) {
      if (item.indexOf('-') !== -1) {
        var details = item.split('-').map(function(d) {
          return parseInt(d);
        });

        for (var i = details[0]; i <= details[1]; i++) {
          station.range.push(i);
        }
      } else {
        station.range.push(parseInt(item));
      }
    });
  } else {if (!result[villages]) {
      result[villages] = {
        stations: []
      };
    }
    village = villages;
  }
  result[village].stations.push(station);
});

JSON.stringify(result, null, 2).to('stations.json');
console.log(cat('stations.json'));
