import React from 'react';
import {storiesOf} from '@storybook/react';

import {Toggle} from '../src';

storiesOf('Toggle', module).add('all states', () => (
	<div className="Story__group">
		<Toggle aria-label="Test" />
		<Toggle aria-label="Test" checked />
		<Toggle aria-label="Test" disabled />
	</div>
));
