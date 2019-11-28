import React from 'react';
import {configure, addDecorator} from '@storybook/react';
import {withA11y} from '@storybook/addon-a11y';

import BackgroundPicker from './BackgroundPicker';

import './stories.less';

const req = require.context('../stories', true, /-story\.js$/);

addDecorator(story => (
	<div className="Story__wrapper">
		<BackgroundPicker />
		{story()}
	</div>
));
addDecorator(withA11y);

configure(() => req.keys().forEach(filename => req(filename)), module);
