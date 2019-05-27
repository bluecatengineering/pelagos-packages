import React from 'react';
import {storiesOf} from '@storybook/react';

import {Spinner} from '../src';

storiesOf('Spinner', module).add('all states', () => (
	<div className="Story__row">
		<div className="Story__group" style={{flex: '1'}}>
			<Spinner />
		</div>
		<div className="Story__group" style={{flex: '1'}}>
			<Spinner size="large" />
		</div>
	</div>
));
