// CSS
require('../../node_modules/semantic-ui/dist/semantic.css');
// CSS : Runtime
require('../css/app_shared.scss');

// JS : Runtime
var $ = require('jquery');
// JS : Semantic
require ('../../node_modules/semantic-ui/dist/semantic.js');

$(document).ready(function() {
    window.chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };

    // Notification
    $('.notification.item').popup({
        popup: '.popup',
        position: 'bottom right',
        on: 'click'
    });
});