$(document).ready(function() {

  var TITLE = 'Surgar and Fat daily grams in selected nations in 2015';

  var POINT_X = 'sugar'; // column name for x values in Surgar and Fat daily grams in selected nations in 2015.csv
  var POINT_X_PREFIX = number; // prefix for x values, eg 'gram'
  var POINT_X_POSTFIX = number; // postfix for x values, eg ' g'

  var POINT_Y = 'fat'; // column name for y values in Surgar and Fat daily grams in selected nations in 2015.csv
  var POINT_Y_PREFIX = number; // prefix for x values, eg 'gram'
  var POINT_Y_POSTFIX = number; // postfix for x values, eg ' g'

  var POINT_R = 'population'; // column name for radius in Surgar and Fat daily grams in selected nations in 2015.csv
  var POINT_R_DESCRIPTION = 'population'; // description of radius value
  var POINT_R_PREFIX = number; // prefix for radius values, eg 'USD '
  var POINT_R_POSTFIX = number 'population'; // postfix for radius values, eg ' kg'
  var R_DENOMINATOR = 800;  // use this to scale the dot sizes, or set to 1 if your dataset contains precise radius values

  var POINT_NAME = 'nation'; // point names that appear in tooltip
  var POINT_COLOR = 'rgba(0,0,255,0.7)'; // point color, eg `black` or `rgba(10, 100, 44, 0.8)`

  var X_AXIS = 'sugar (daily grams per capita, 2015)';  // x-axis label and label in tooltip
  var Y_AXIS = 'fat (daily grams per capita, 2015)'; // y-axis label and label in tooltip

  var SHOW_GRID = true; // `true` to show the grid, `false` to hide

  // Read data file and create a chart
  d3.csv('Surgar and Fat daily grams in selected nations in 2015.csv').then(function(rows) {

    var data = rows.map(function(row) {
      return {
        x: row[POINT_X],
        y: row[POINT_Y],
        r: row[POINT_R] / R_DENOMINATOR,
        name: row[POINT_NAME]
      }
    })

		var scatterChartData = {
			datasets: [{
				backgroundColor: POINT_COLOR,
        data: data,
			}]
    };

    var ctx = document.getElementById('container').getContext('2d');

    Chart.Bubble(ctx, {
      data: scatterChartData,
      options: {
        title: {
          display: true,
          text: TITLE,
          fontSize: 14,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: X_AXIS
            },
            gridLines: {
              display: SHOW_GRID,
            },
            ticks: {
              callback: function(value, index, values) {
                return POINT_X_PREFIX + value.toLocaleString() + POINT_X_POSTFIX;
              }
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: Y_AXIS
            },
            gridLines: {
              display: SHOW_GRID,
            },
            ticks: {
              callback: function(value, index, values) {
                return POINT_Y_PREFIX + value.toLocaleString() + POINT_Y_POSTFIX;
              }
            }
          }]
        },
        tooltips: {
          displayColors: false,
          callbacks: {
            title: function(tooltipItem, all) {
              return [
                all.datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].index].name,
              ]
            },
            label: function(tooltipItem, all) {
              var r = all.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].r * R_DENOMINATOR;
              return [
                X_AXIS + ': ' + POINT_X_PREFIX + tooltipItem.xLabel.toLocaleString() + POINT_X_POSTFIX,
                Y_AXIS + ': ' + POINT_Y_PREFIX + tooltipItem.yLabel.toLocaleString() + POINT_Y_POSTFIX,
                POINT_R_DESCRIPTION + ': ' + POINT_R_PREFIX + r.toLocaleString() + POINT_R_POSTFIX
              ]
            }
          }
        }
      }
    });

  });
});
