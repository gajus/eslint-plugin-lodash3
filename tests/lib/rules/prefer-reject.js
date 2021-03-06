'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-reject');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var ruleError = {message: 'Prefer _.reject over negative condition'};
ruleTester.run('prefer-reject', rule, {
    valid: [
        '_.filter(users, function(user) {return !user.active && isSomething;});',
        '_.filter(users, function(user) {return !f(user);});'
    ],
    invalid: [{
        code: '_(users).map(t).filter(function(user) {return !user.name.givenName})',
        errors: [ruleError]
    }, {
        code: '_.filter(users, function(user) {return user.name.givenName !== "Bob";});',
        errors: [ruleError]
    }, {
        code: '_.filter(users, function(user) {return !user.isSomething;});',
        errors: [ruleError]
    }, {
        code: '_.filter(arr, user => !user.active)',
        ecmaFeatures: {arrowFunctions: true},
        errors: [ruleError]
    }]
});
