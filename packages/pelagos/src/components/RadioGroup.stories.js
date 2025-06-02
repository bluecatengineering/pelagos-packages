import {useState} from 'react';
import identity from 'lodash-es/identity';

import RadioGroup from './RadioGroup';

const options = ['Alpha', 'Beta', 'Gamma'];
const renderLabel = identity;

export default {
	title: 'Components/RadioGroup',
	component: RadioGroup,
	render: (args) => {
		const [value, setValue] = useState(args.value);
		return <RadioGroup {...args} value={value} onChange={setValue} />;
	},
};

export const Default = {args: {id: 'default', value: 'Alpha', options, renderLabel}};
