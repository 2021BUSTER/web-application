numArray = [1, 5, 3, 5, 6, 3, 3, 7, 4, 6, 7, 3, 5, 3, 6, 7, 5, 2, 5, 7, 4, 6, 4, 5, 3, 6, 7, 8, 5, 4, 3, 6, 7, 8, 5, 7, 8, 8, 5, 3, 2, 4, 6, 7, 4, 6, 7];


var json_array = numArray;

var i = 0;

function next() {
  return json_array[i++];
}

Highcharts.chart('container', {
  chart: {
    type: 'line',
    animation: Highcharts.svg, // don't animate in old IE
    marginRight: 10,
    events: {
      load: function() {

        // set up the updating of the chart each second
        var series = this.series[0],
          chart = this;

        setInterval(function() {
          var x = (new Date()).getTime(), // current time
            y = next();
          console.log(y);
          series.addPoint([x, y], false, true);
        }, 1000);

        setInterval(function() {
          chart.redraw(false);
        }, 1000);
      }
    }
  },

  time: {
    useUTC: false
  },

  title: {
    text: 'Live random data'
  },
  xAxis: {
    type: 'datetime',
    tickPixelInterval: 150,
    tickPositioner: function () {
      var axis = this,
      	chart = axis.chart,
      	ticks = [],
        divider;

      if (axis.series[0].points && axis.series[0].points.length) {
      	ticks = axis.series[0].points.filter(point => point.y !== null).map(point => point.x);
      }
      
      divider = Math.ceil(ticks.length / 20);
      chart.customLabelDivider = divider;
      
      if (divider > 1) {
      	ticks = ticks.filter((tick, i) => i % divider === 0);
      }

      return ticks;
    },
    labels: {
    	formatter: function () {
      	var chart = this.chart;

      	if (this.isFirst) {
        	chart.customLabelCount = 1;
        } else {
        	chart.customLabelCount += chart.customLabelDivider;
        }
        
        return chart.customLabelCount;
      }
    }
  },
  yAxis: {
    title: {
      text: 'Value'
    },
    plotLines: [{
      value: 0,
      width: 1,
      color: '#808080'
    }]
  },
  tooltip: {
    headerFormat: '<b>{series.name}</b><br/>',
    pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
  },
  legend: {
    enabled: false
  },
  exporting: {
    enabled: false
  },
  series: [{
    animation: false,
    name: 'Random data',
    data: (function() {
      // generate an array of random data
      var data = [],
        time = (new Date()).getTime(),
        i;

      for (i = -1000; i <= 0; i += 1) {
        data.push([
          time + i * 10,
          null
        ]);
      }
      return data;
    }())
  }]
});
