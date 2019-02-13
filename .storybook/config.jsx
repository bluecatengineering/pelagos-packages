import React from 'react';
import {configure, addDecorator} from '@storybook/react';
import {checkA11y} from '@storybook/addon-a11y';

import BackgroundPicker from './BackgroundPicker';

import './stories.less';

const req = require.context('../stories', true, /-story\.jsx$/);

addDecorator(story => (
	<div className="Story__wrapper">
		<BackgroundPicker />
		{story()}
	</div>
));
addDecorator(checkA11y);

configure(() => req.keys().forEach(filename => req(filename)), module);
