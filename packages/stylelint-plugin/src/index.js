'use strict';

const {createPlugin} = require('stylelint');

module.exports = [
	createPlugin(`@bluecateng/property-strict-value`, require(`./property-strict-value`)),
	createPlugin(`@bluecateng/selector-bem`, require(`./selector-bem`)),
];
