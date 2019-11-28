import React from 'react';
import {storiesOf} from '@storybook/react';
import identity from 'lodash-es/identity';

import {TextAreaField} from '../src';

storiesOf('TextAreaField', module).add('all states', () => (
	<div className="Story__group">
		<TextAreaField label="Normal" value="Alpha" onChange={identity} />
		<TextAreaField label="Empty" placeholder="Placeholder" onChange={identity} />
		<TextAreaField label="Optional" optionalText="(optional)" onChange={identity} />
		<TextAreaField label="Error" value="Alpha" error="Error message" onChange={identity} />
	</div>
));
