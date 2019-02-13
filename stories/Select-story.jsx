import React from 'react';
import {storiesOf} from '@storybook/react';
import identity from 'lodash-es/identity';

import {Select} from '../src';

const options = ['Alpha', 'Beta', 'Gamma'];

storiesOf('Select', module).add('all states', () => (
	<div className="Story__group">
		<Select value="Alpha" options={options} renderOption={identity} onChange={identity} />
		<Select placeholder="Placeholder" options={options} renderOption={identity} onChange={identity} />
		<Select value="Alpha" options={options} renderOption={identity} onChange={identity} disabled />
		<Select value="Alpha" options={options} renderOption={identity} onChange={identity} error />
	</div>
));
