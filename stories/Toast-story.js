import React from 'react';
import {storiesOf} from '@storybook/react';

import {ToastTypes, Toast} from '../src';

const messages = [
	{type: ToastTypes.INFO, text: 'Info'},
	{type: ToastTypes.WARNING, text: 'Warning'},
	{type: ToastTypes.ERROR, text: 'Error'},
];

storiesOf('Toast', module).add('all states', () => (
	<div className="Story__group">
		<Toast messages={messages} />
	</div>
));
