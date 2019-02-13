import React from 'react';
import {storiesOf} from '@storybook/react';

import {Button} from '../src';

storiesOf('Button', module).add('all states', () => (
	<div className="Story__row">
		<div className="Story__group">
			<Button text="Normal" size="small" />
			<Button text="Active" size="small" active />
			<Button text="Disabled" size="small" tooltipText="Tooltip" disabled />
		</div>
		<div className="Story__group">
			<Button text="Normal" />
			<Button text="Active" active />
			<Button text="Disabled" tooltipText="Tooltip" disabled />
		</div>
		<div className="Story__group">
			<Button text="Normal" size="large" />
			<Button text="Active" size="large" active />
			<Button text="Disabled" size="large" tooltipText="Tooltip" disabled />
		</div>
	</div>
));
