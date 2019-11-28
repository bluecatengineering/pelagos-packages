import React from 'react';
import {storiesOf} from '@storybook/react';

import {OutputField} from '../src';

storiesOf('OutputField', module).add('all states', () => (
	<div className="Story__group">
		<OutputField label="Normal" value="Alpha" />
		<OutputField label="Right Aligned" value="Alpha" alignRight />
		<OutputField label="Active" value="Alpha" active />
	</div>
));
