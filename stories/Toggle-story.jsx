import React from 'react';
import {storiesOf} from '@storybook/react';

import {Toggle} from '../src';

storiesOf('Toggle', module).add('all states', () => (
	<div className="Story__group">
		<Toggle ariaLabel="Test" />
		<Toggle ariaLabel="Test" checked />
		<Toggle ariaLabel="Test" disabled />
	</div>
));
