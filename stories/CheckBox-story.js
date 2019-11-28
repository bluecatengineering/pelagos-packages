import React from 'react';
import {storiesOf} from '@storybook/react';

import {CheckBox} from '../src';

storiesOf('CheckBox', module).add('all states', () => (
	<div className="Story__group">
		<CheckBox label="Option 1" />
		<CheckBox label="Option 2" checked />
		<CheckBox label="Option 3" disabled />
		<CheckBox label="Option 4" checked disabled />
		<CheckBox label="Option 5" error />
		<CheckBox label="Option 6" checked error />
	</div>
));
