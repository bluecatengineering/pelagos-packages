import React from 'react';
import {storiesOf} from '@storybook/react';
import {faCat} from '@fortawesome/free-solid-svg-icons';

import {ToolbarButton} from '../src';

storiesOf('ToolbarButton', module).add('all states', () => (
	<div className="Story__group">
		<ToolbarButton componentId="test" icon={faCat} tooltipText="Tooltip" ariaLabel="Label" />
		<ToolbarButton componentId="test" icon={faCat} tooltipText="Tooltip" ariaLabel="Label" active />
		<ToolbarButton componentId="test" icon={faCat} tooltipText="Tooltip" ariaLabel="Label" disabled />
	</div>
));
