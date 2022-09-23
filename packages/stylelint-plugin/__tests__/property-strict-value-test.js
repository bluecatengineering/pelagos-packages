import rule from '../src/property-strict-value';
import testRule from '../jest-helpers/test-rule';

jest.unmock('yaml');

testRule(rule, {
	ruleName: rule.ruleName,
	config: true,
	accept: [
		{
			code: 'div {color: @color; background-color: @color-10; border-left-color: @color-20-hover; border-right-color: @mixed-case-10; border-top-color: @mixed-case-20-hover; border-bottom-color: @color; outline-color: @color10; scrollbar-track-color: @color20}',
			description: 'accepts single value color properties using variables',
		},
		{
			code: 'div {color: transparent; background-color: currentColor}',
			description: 'accepts single value color properties using valid special values',
		},
		{
			code: 'div {color: fade(@color, 50%)}',
			description: 'accepts single value color properties using fade',
		},
		{
			code: 'div {border-color: @color @color}',
			description: 'accepts border-color property using variables',
		},
		{
			code: 'div {scrollbar-color: @color @color}',
			description: 'accepts scrollbar-color property using variables',
		},
		{
			code: ':root {--color-x: @color; color: var(--color-x); border: solid var(--color-x)}',
			description: 'accepts variables',
		},
		{
			code: 'div {border: 1px solid @color; border-left: 1px solid @color; border-right: 1px solid @color; border-top: 1px solid @color; border-bottom: 1px solid @color}',
			description: 'accepts border properties using variables',
		},
		{
			code: 'div {border-width: 1px; border-style: solid; border-radius: 50%; border-collapse: collapse}',
			description: 'accepts other border- properties',
		},
		{
			code: 'div {outline: 1px solid @color}',
			description: 'accepts outline property using variables',
		},
		{
			code: 'div {outline-offset: 1px; outline-width: 1px; outline-style: solid}',
			description: 'accepts outline-offset property',
		},
		{
			code: 'div {background: @color; background: cross-fade(url(a.png), url(b.png)),\nelement(#test) center / no-repeat border-box,\n@color}',
			description: 'accepts background property using variables',
		},
		{
			code: 'div {background-attachment: fixed; background-clip: padding-box; background-image: none; background-origin: border-box; background-position: center; background-repeat: no-repeat; background-size: contain}',
			description: 'accepts single value background properties',
		},
		{
			code: 'div {margin-left: @spacing; margin-right: @spacing; margin-top: @spacing; margin-bottom: @spacing; padding-left: @spacing; padding-right: @spacing; padding-top: @spacing; padding-bottom: @spacing; grid-row-gap: @spacing; grid-column-gap: @spacing}',
			description: 'accepts single value spacing properties using variables',
		},
		{
			code: 'div {margin-left: auto; margin-right: 0; margin-top: -1px}',
			description: 'accepts single value spacing properties using valid special values',
		},
		{
			code: 'div {margin: @spacing @spacing; padding: @spacing @spacing; grid-gap: @spacing @spacing}',
			description: 'accepts margin, padding, and grid-gap properties using variables',
		},
		{
			code: 'div {font: inherit}',
			description: 'accepts inherit',
		},
		{
			code: 'div {font-size: 19px}',
			description: 'accepts font-size property (for icons)',
		},
		{
			code: 'div {other: something}',
			description: 'accepts unknown properties',
		},
	],
	reject: [
		{
			code: 'div {color: #fff}',
			description: 'rejects color property with an explicit value',
			message: rule.messages.expected('color'),
		},
		{
			code: 'div {color: @other}',
			description: 'rejects color property with an invalid variable',
			message: rule.messages.expected('color'),
		},
		{
			code: 'div {color: @mixedCase-10}',
			description: 'rejects color property using key instead of css name',
			message: rule.messages.expected('color'),
		},
		{
			code: 'div {background-color: #fff}',
			description: 'rejects background-color property with an explicit value',
			message: rule.messages.expected('background-color'),
		},
		{
			code: 'div {border-left-color: #fff}',
			description: 'rejects border-left-color property with an explicit value',
			message: rule.messages.expected('border-left-color'),
		},
		{
			code: 'div {border-right-color: #fff}',
			description: 'rejects border-right-color property with an explicit value',
			message: rule.messages.expected('border-right-color'),
		},
		{
			code: 'div {border-top-color: #fff}',
			description: 'rejects border-top-color property with an explicit value',
			message: rule.messages.expected('border-top-color'),
		},
		{
			code: 'div {border-bottom-color: #fff}',
			description: 'rejects border-bottom-color property with an explicit value',
			message: rule.messages.expected('border-bottom-color'),
		},
		{
			code: 'div {outline-color: #fff}',
			description: 'rejects outline-color property with an explicit value',
			message: rule.messages.expected('outline-color'),
		},
		{
			code: 'div {border-color: @color #fff}',
			description: 'rejects border-color property with an explicit value',
			message: rule.messages.expected('border-color'),
		},
		{
			code: 'div {border: 1em dashed #fff}',
			description: 'rejects border property with an explicit value',
			message: rule.messages.expected('border'),
		},
		{
			code: 'div {outline: 1px solid #fff}',
			description: 'rejects outline property with an explicit value',
			message: rule.messages.expected('outline'),
		},
		{
			code: 'div {background: #fff}',
			description: 'rejects background property using an explicit value',
			message: rule.messages.expected('background'),
		},
		{
			code: 'div {margin-left: 1px}',
			description: 'rejects margin-left property with an explicit value',
			message: rule.messages.expected('margin-left'),
		},
		{
			code: 'div {margin-left: @other}',
			description: 'rejects margin-left property with an invalid variable',
			message: rule.messages.expected('margin-left'),
		},
		{
			code: 'div {margin-right: 1px}',
			description: 'rejects margin-right property with an explicit value',
			message: rule.messages.expected('margin-right'),
		},
		{
			code: 'div {margin-top: 1px}',
			description: 'rejects margin-top property with an explicit value',
			message: rule.messages.expected('margin-top'),
		},
		{
			code: 'div {margin-bottom: 1px}',
			description: 'rejects margin-bottom property with an explicit value',
			message: rule.messages.expected('margin-bottom'),
		},
		{
			code: 'div {padding-left: 1px}',
			description: 'rejects padding-left property with an explicit value',
			message: rule.messages.expected('padding-left'),
		},
		{
			code: 'div {padding-right: 1px}',
			description: 'rejects padding-right property with an explicit value',
			message: rule.messages.expected('padding-right'),
		},
		{
			code: 'div {padding-top: 1px}',
			description: 'rejects padding-top property with an explicit value',
			message: rule.messages.expected('padding-top'),
		},
		{
			code: 'div {padding-bottom: 1px}',
			description: 'rejects padding-bottom property with an explicit value',
			message: rule.messages.expected('padding-bottom'),
		},
		{
			code: 'div {grid-row-gap: 1px}',
			description: 'rejects grid-row-gap property with an explicit value',
			message: rule.messages.expected('grid-row-gap'),
		},
		{
			code: 'div {grid-column-gap: 1px}',
			description: 'rejects grid-column-gap property with an explicit value',
			message: rule.messages.expected('grid-column-gap'),
		},
		{
			code: 'div {margin: @spacing 1px}',
			description: 'rejects margin property using an explicit value',
			message: rule.messages.expected('margin'),
		},
		{
			code: 'div {padding: @spacing 1px}',
			description: 'rejects padding property using an explicit value',
			message: rule.messages.expected('padding'),
		},
		{
			code: 'div {grid-gap: @spacing 1px}',
			description: 'rejects grid-gap property using an explicit value',
			message: rule.messages.expected('grid-gap'),
		},
		{
			code: 'div {font: test}',
			description: 'rejects font property with an explicit value',
			message: rule.messages.expected('font'),
		},
		{
			code: 'div {text-transform: test}',
			description: 'rejects text-transform property with an explicit value',
			message: rule.messages.expected('text-transform'),
		},
	],
});
