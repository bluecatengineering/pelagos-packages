import React from 'react';
import {storiesOf} from '@storybook/react';
import {faCat} from '@fortawesome/free-solid-svg-icons';

import {IconButton} from '../src';

storiesOf('IconButton', module).add('all states', () => (
	<div className="Story__group">
		<IconButton componentId="test" icon={faCat} tooltipText="Tooltip" aria-label="Label" />
		<IconButton componentId="test" icon={faCat} tooltipText="Tooltip" aria-label="Label" large />
		<IconButton componentId="test" icon={faCat} tooltipText="Tooltip" aria-label="Label" disabled />
	</div>
));
