import React from 'react';
import {storiesOf} from '@storybook/react';

import {Hamburger} from '../src';

storiesOf('Hamburger', module).add('all states', () => (
	<div className="Story__group">
		<Hamburger />
		<Hamburger active />
	</div>
));
