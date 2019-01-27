// CSS
require('../../node_modules/semantic-ui/dist/semantic.css');
require('../css/login.scss');

// JS
require ('../../node_modules/semantic-ui/dist/semantic.js')
var $ = require('jquery');

// JS : Runtime
$(document).ready(function() {
    $('.ui.checkbox').checkbox();
    $('.ui.form')
        .form({
            fields: {
                email: {
                    identifier: 'email',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Please enter your e-mail'
                        },
                        {
                            type: 'email',
                            prompt: 'Please enter a valid e-mail'
                        }
                    ]
                },
                password: {
                    identifier: 'password',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Please enter your password'
                        },
                        {
                            type: 'length[6]',
                            prompt: 'Your password must be at least 6 characters'
                        }
                    ]
                }
            }
        })
    ;
});