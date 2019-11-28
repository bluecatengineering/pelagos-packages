import React from 'react';
import {storiesOf} from '@storybook/react';
import identity from 'lodash-es/identity';

import {Select} from '../src';

const options = ['Alpha', 'Beta', 'Gamma'];

storiesOf('Select', module).add('all states', () => (
	<div className="Story__group">
		<Select id="s0" value="Alpha" options={options} renderOption={identity} onChange={identity} />
		<Select id="s1" placeholder="Placeholder" options={options} renderOption={identity} onChange={identity} />
		<Select id="s2" value="Alpha" options={options} renderOption={identity} onChange={identity} disabled />
		<Select id="s3" value="Alpha" options={options} renderOption={identity} onChange={identity} error />
	</div>
));
