import React from 'react';
import {storiesOf} from '@storybook/react';

import {RadioButton} from '../src';

storiesOf('RadioButton', module).add('all states', () => (
	<div className="Story__group">
		<RadioButton label="Option 1" />
		<RadioButton label="Option 2" checked />
		<RadioButton label="Option 3" error />
		<RadioButton label="Option 4" checked error />
	</div>
));
