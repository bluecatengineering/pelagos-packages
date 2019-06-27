import React from 'react';
import {storiesOf} from '@storybook/react';
import {faCat} from '@fortawesome/free-solid-svg-icons';

import {ToolbarButton} from '../src';

storiesOf('ToolbarButton', module).add('all states', () => (
	<div className="Story__group">
		<ToolbarButton id="test0" icon={faCat} tooltipText="Tooltip" aria-label="Label" />
		<ToolbarButton id="test1" icon={faCat} tooltipText="Tooltip" aria-label="Label" active />
		<ToolbarButton id="test2" icon={faCat} tooltipText="Tooltip" aria-label="Label" disabled />
	</div>
));
