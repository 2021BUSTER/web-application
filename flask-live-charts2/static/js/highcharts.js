var chart;
var chart2;

/**
 * Request data from the server, add it to the graph and set a timeout
 * to request again
 */
function requestData() {
    $.ajax({
        url: '/live-data',
        success: function(point) {
            var series = chart.series[0],
                shift = series.data.length > 50; // shift if the series is
                                                 // longer than 20
            var series2 = chart2.series[0],
                shift2 = series2.data.length > 50; 
            
            var data1=[]
            var data2=[]
            data1.push(point[0]);
            data1.push(point[1]);
            data2.push(point[2]);
            data2.push(point[3]);
            // add the point
            chart.series[0].addPoint(data1, true, shift);
            chart2.series[0].addPoint(data2, true, shift2);

            // call it again after one second
            setTimeout(requestData, 60000);
        },
        cache: false
    });
}

Highcharts.setOptions({
    global: {
        useUTC: false
    }
});
var change = {
    1: 'Very Low',
    2: 'Low',
    3: 'Medium',
    4: 'High',
    5: 'Very High',
    6:'s',
    7:'d'
};
$(document).ready(function() {
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'data-container',
            defaultSeriesType: 'spline',
            events: {
                load: requestData
            }
        },
        title: {
            text: 'FOCUS PERCENT [%]'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000,
            labels: {
                formatter: function() {
                  return Highcharts.dateFormat('%H:%M:%S', this.value);
                }
              }
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Value',
                margin: 80
            }
        },
        series: [{
            name: 'value',
            data: []
        }]
    });

    chart2   = new Highcharts.Chart({
        chart: {
            renderTo: 'data-container1',
            defaultSeriesType: 'spline',
            events: {
                load: requestData
            }
        },
        title: {
            text: 'POSE CHART'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Value',
                margin: 80
            },
            labels: {
                formatter: function() {
                    var value = change[this.value];
                    return value !== 'undefined' ? value : this.value;
                }
            }
        },
        series: [{
            name: 'value',
            data: []
        }]
        
    });
});
