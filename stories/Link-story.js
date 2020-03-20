import React from 'react';
import {storiesOf} from '@storybook/react';

storiesOf('Link', module).add('all states', () => (
	<div style={{display: 'block'}}>
		<a href="#">Link</a>
	</div>
));
