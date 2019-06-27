import React from 'react';
import {storiesOf} from '@storybook/react';
import {faCat} from '@fortawesome/free-solid-svg-icons';

import {IconButton} from '../src';

storiesOf('IconButton', module).add('all states', () => (
	<div className="Story__group">
		<IconButton id="test0" icon={faCat} tooltipText="Tooltip" aria-label="Label" />
		<IconButton id="test1" icon={faCat} tooltipText="Tooltip" aria-label="Label" large />
		<IconButton id="test2" icon={faCat} tooltipText="Tooltip" aria-label="Label" disabled />
	</div>
));
