import React from 'react';
import {storiesOf} from '@storybook/react';
import identity from 'lodash-es/identity';

import {FormTextInput} from '../src';

storiesOf('FormTextInput', module).add('all states', () => (
	<div className="Story__group">
		<FormTextInput label="Normal" value="Alpha" onChange={identity} />
		<FormTextInput label="Empty" placeholder="Placeholder" onChange={identity} />
		<FormTextInput label="Optional" optionalText="(optional)" onChange={identity} />
		<FormTextInput label="Disabled" value="Alpha" disabled onChange={identity} />
		<FormTextInput label="Error" value="Alpha" error="Error message" onChange={identity} />
	</div>
));
