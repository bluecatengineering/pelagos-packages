import React from 'react';
import {storiesOf} from '@storybook/react';
import identity from 'lodash-es/identity';

import {TextInputField} from '../src';

storiesOf('TextInputField', module).add('all states', () => (
	<div className="Story__group">
		<TextInputField label="Normal" value="Alpha" onChange={identity} />
		<TextInputField label="Empty" placeholder="Placeholder" onChange={identity} />
		<TextInputField label="Optional" optionalText="(optional)" onChange={identity} />
		<TextInputField label="Disabled" value="Alpha" disabled onChange={identity} />
		<TextInputField label="Error" value="Alpha" error="Error message" onChange={identity} />
	</div>
));
