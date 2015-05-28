var data = [{
  year: 2011,
  requests: 77,
  size: 709
}, {
  year: 2012,
  requests: 86,
  size: 973
}, {
  year: 2013,
  requests: 88,
  size: 1284
}, {
  year: 2014,
  requests: 94,
  size: 1687
}, {
  year: 2015,
  requests: 98,
  size: 2062
}];

var chart = AmCharts.makeChart( "chart", {
  "type": "xy",
  "path": "http://www.amcharts.com/lib/3/",
  "theme": "dark",
  "dataProvider": data,
  "valueAxes": [{
    "id": "x",
    "position": "bottom",
    labelFunction: function (value, valueString, axis) {
      if (value == parseInt(value)) {
        return value;
      }
      return '';
    }
  }, {
    "id": "y1",
    "position": "left"
  }, {
    "id": "y2",
    "position": "right"
  }],
  "startDuration": 1,
  "graphs": [ {
    "yAxis": "y1",
    "balloonText": "<b>[[value]]</b>",
    "bullet": "circle",
    "bulletBorderAlpha": 0.2,
    "bulletAlpha": 0.8,
    "lineAlpha": 0,
    "fillAlphas": 0,
    "valueField": "size",
    "xField": "year",
    "yField": "size",
    "maxBulletSize": 100
  }, {
    "yAxis": "y2",
    "balloonText": "<b>[[value]]</b>",
    "bullet": "circle",
    "bulletBorderAlpha": 0.2,
    "bulletAlpha": 0.8,
    "lineAlpha": 0,
    "fillAlphas": 0,
    "valueField": "requests",
    "xField": "year",
    "yField": "requests",
    "maxBulletSize": 100,
    "minBulletSize": 60,
  } ],
  "marginLeft": 46,
  "marginBottom": 35,
  "export": {
    "enabled": true
  }
} );