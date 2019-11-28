import React from 'react';
import {storiesOf} from '@storybook/react';

import {Dialog, Button} from '../src';

storiesOf('Dialog', module).add('dialog', () => (
	<Dialog title="Title">
		<div>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
			magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
			Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</div>
		<div>
			<Button text="Button" active />
		</div>
	</Dialog>
));
