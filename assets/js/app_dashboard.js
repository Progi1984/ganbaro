require ('../../assets/js/app_shared.js');

// CSS : c3.js
require('../../node_modules/c3/c3.min.css');

// CSS : Runtime
require('../css/app_dashboard.scss');

// JS : c3.js
var d3 = require('../../node_modules/d3/dist/d3.min.js');
var c3 = require('../../node_modules/c3/c3.min.js');

$(document).ready(function() {
    var redAlpha = d3.rgb(window.chartColors.red);
    redAlpha.opacity = 0.8;
    var blueAlpha8 = d3.rgb(window.chartColors.blue);
    blueAlpha8.opacity = 0.8;
    var blueAlpha5 = d3.rgb(window.chartColors.blue);
    blueAlpha5.opacity = 0.5;
    var greenAlpha5 = d3.rgb(window.chartColors.green);
    greenAlpha5.opacity = 0.5;
    var chart = c3.generate({
        bindto: '#graphActivities',
        data: {
            columns: [
                ['data1', 3, 5, 2, 3, 8, 5, 2, 3],
                ['data2', 98, 99.5, 100.5, 99, 97, 98.5, 97.5, 97],
            ],
            type: 'bar',
            types: {
                data2: 'spline',
            },
            axes: {
                data1: 'y',
                data2: 'y2'
            },
            names: {
                data1: 'Activities',
                data2: 'Weight'
            },
        },
        color: {
            pattern: [redAlpha, blueAlpha8]
        },
        axis: {
            x: {
                type: 'category',
                categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8']
            },
            y: {
                max: 10,
                min: 0,
                padding: {top:0, bottom:0}
            },
            y2: {
                max: 110,
                min: 90,
                padding: {top:0, bottom:0}
            },
        },
        tooltip: {
            format: {
                title: function (d) {
                    return 'Week ' + (d+1);
                },
                value: function (value, ratio, id) {
                    if (id === 'data2') {
                        return value + ' kg';
                    }
                    return value;
                }
            }
        }
    });
    var chart = c3.generate({
        bindto: '#graphSleep',
        data: {
            columns: [
                ['data1', 413, 244, 328, 331, 528, 453, 284],
                ['data2', 29, 137, 22, 101, 25, 14, 131],
            ],
            type: 'bar',
            groups: [
                ['data1', 'data2']
            ],
            names: {
                data1: 'Sommeil léger',
                data2: 'Sommeil profond',
            },
            order: null,
        },
        color: {
            pattern: [blueAlpha5, window.chartColors.blue]
        },
        axis: {
            x: {
                type: 'category',
                categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
            },
            y: {
                padding: {top:0, bottom:0},
                tick: {
                    values: [120, 240, 360, 480, 600, 720, 840, 960],
                    format: function (d) {
                        var numHours = Math.floor( d / 60)
                        return numHours + 'h';
                    }
                }
            },
        },
        legend: {
            show: false
        },
        grid: {
            y: {
                lines: [
                    {value: 420, text: '7h'},
                ]
            }
        },
        tooltip: {
            format: {
                value: function (value, ratio, id) {
                    var numMinSleep = value;
                    var numHours = Math.floor( numMinSleep / 60);
                    var numMinutes = numMinSleep % 60;
                    return numHours + 'h ' + (numMinutes > 0 ? (numMinutes < 10 ? '0' : '') + numMinutes + 'm' : '');
                }
            },
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
                var
                    $$ = this,
                    config = $$.config,
                    CLASS = $$.CLASS,
                    titleFormat = config.tooltip_format_title || defaultTitleFormat,
                    nameFormat = config.tooltip_format_name || function (name) { return name; },
                    valueFormat = config.tooltip_format_value || defaultValueFormat,
                    text,
                    i,
                    title,
                    value,
                    name,
                    bgcolor,
                    sumSleep = 0;

                for (i = 0; i < d.length; i++) {
                    if (!(d[i] && (d[i].value || d[i].value === 0))) { continue; }

                    if (!text) {
                        title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                        text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                    }
                    sumSleep += d[i].value;
                    name = nameFormat(d[i].name);
                    value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                    bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

                    text += "<tr class='" + CLASS.tooltipName + "-" + d[i].id + "'>";
                    text += "<td class='name'><span style='background-color:" + bgcolor + "; border-radius: 5px;'></span>" + name + "</td>";
                    text += "<td class='value'>" + value + "</td>";
                    text += "</tr>";
                }

                text += "<tr class='" + CLASS.tooltipName + "-Surcharge" + "' style='text-align:center'>";
                text += "<td class='name'><strong>Sommeil</strong></td>";
                text += "<td class='value'>" + valueFormat(sumSleep) + "</td>";
                text += "</tr></table>";
                return text;
            }
        }
    });
    var chart = c3.generate({
        bindto: '#graphSteps',
        data: {
            columns: [
                ['data1', 5000, 2680, 3480, 4345, 2586, 5000, 2750],
                ['data2',  253, 0, 0, 0, 0, 750, 0],
            ],
            type: 'bar',
            groups: [
                ['data1', 'data2']
            ],
            names: {
                data1: 'Steps',
                data2: 'Steps',
            },
            order: null,
        },
        color: {
            pattern: [greenAlpha5, window.chartColors.green]
        },
        axis: {
            x: {
                type: 'category',
                categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
            },
            y: {
                padding: {bottom:0},
                tick: {
                    values: [2000, 4000, 6000, 8000, 10000],
                }
            },
        },
        legend: {
            show: false
        },
        grid: {
            y: {
                lines: [
                    {value: 5000, text: '5000'},
                ]
            }
        },
        tooltip: {
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
                var
                    $$ = this,
                    config = $$.config,
                    CLASS = $$.CLASS,
                    titleFormat = config.tooltip_format_title || defaultTitleFormat,
                    nameFormat = config.tooltip_format_name || function (name) { return name; },
                    valueFormat = config.tooltip_format_value || defaultValueFormat,
                    text,
                    i,
                    title,
                    value,
                    name,
                    bgcolor,
                    sumSleep = 0;

                for (i = 0; i < d.length; i++) {
                    if (!(d[i] && (d[i].value || d[i].value === 0))) { continue; }

                    if (!text) {
                        title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                        text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                    }
                    sumSleep += d[i].value;
                }

                text += "<tr class='" + CLASS.tooltipName + "-Surcharge" + "' style='text-align:center'>";
                text += "<td class='name'><strong>Steps</strong></td>";
                text += "<td class='value'>" + (sumSleep > 5000 ? '⭐' : '') + valueFormat(sumSleep) + (sumSleep > 5000 ? '⭐' : '') + "</td>";
                text += "</tr></table>";
                return text;
            }
        }
    });
    var chart = c3.generate({
        bindto: '#graphObjectives',
        data: {
            columns: [
                ['data1', 2],
            ],
            type: 'gauge',
            names: {
                data1: 'Objectives',
            },
        },
        gauge: {
            label: {
                format: function(value, ratio) {
                    return value ;
                },
            },
            min: 0,
            max: 10,
        },
        color: {
            pattern: [window.chartColors.purple]
        },
        legend: {
            show: false
        },
    });
});