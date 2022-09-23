import rule from '../src/selector-bem';
import testRule from '../jest-helpers/test-rule';

jest.unmock('yaml');

testRule(rule, {
	ruleName: rule.ruleName,
	config: true,
	accept: [
		{
			code: '.Block {}',
			description: 'accepts a class with only block name',
		},
		{
			code: '.Block__element {}',
			description: 'accepts a class with block and element names',
		},
		{
			code: '.Block--modifier {}',
			description: 'accepts a class with block and modifier names',
		},
		{
			code: '.Block__element--modifier {}',
			description: 'accepts a class with block, element, and modifier names',
		},
		{
			code: '.Block:hover {}',
			description: 'accepts a class with block name followed by a pseudo-class',
		},
		{
			code: '.Block[attr] {}',
			description: 'accepts a class with block name followed by an attribute spec',
		},
		{
			code: '.Block .Other {}',
			description: 'accepts a class with block name followed by a descendant',
		},
		{
			code: '.Block > .Other {}',
			description: 'accepts a class with block name followed by a child',
		},
		{
			code: '.Block > :first-child {}',
			description: 'accepts a class with block name followed by a non-class child',
		},
		{
			code: '.BlockA,\n.BlockB {}',
			description: 'accepts comma separated class names',
		},
		{
			code: 'div {}',
			description: 'accepts a tag selector',
		},
		{
			code: '#id {}',
			description: 'accepts an id selector',
		},
		{
			code: '.other() {}',
			description: 'accepts non standard selector',
		},
	],
	reject: [
		{
			code: '.block {}',
			description: 'rejects a block name starting with lowercase',
			message: rule.messages.expected('.block'),
		},
		{
			code: '.Block__Element {}',
			description: 'rejects an element name starting with uppercase',
			message: rule.messages.expected('.Block__Element'),
		},
		{
			code: '.Block--Modifier {}',
			description: 'rejects a modifier name starting with uppercase',
			message: rule.messages.expected('.Block--Modifier'),
		},
		{
			code: '.Block_element {}',
			description: 'rejects an element name separated by a single underscore',
			message: rule.messages.expected('.Block_element'),
		},
		{
			code: '.Block-modifier {}',
			description: 'rejects a modifier name separated by a single dash',
			message: rule.messages.expected('.Block-modifier'),
		},
		{
			code: '.Block .other {}',
			description: 'rejects a class with block name followed by an incorrect descendant',
		},
		{
			code: '.Block > .other {}',
			description: 'rejects a class with block name followed by an incorrect child',
		},
	],
});
