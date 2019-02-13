import React from 'react';
import {storiesOf} from '@storybook/react';
import identity from 'lodash-es/identity';

import {FormTextArea} from '../src';

storiesOf('FormTextArea', module).add('all states', () => (
	<div className="Story__group">
		<FormTextArea label="Normal" value="Alpha" onChange={identity} />
		<FormTextArea label="Empty" placeholder="Placeholder" onChange={identity} />
		<FormTextArea label="Error" value="Alpha" error="Error message" onChange={identity} />
	</div>
));
