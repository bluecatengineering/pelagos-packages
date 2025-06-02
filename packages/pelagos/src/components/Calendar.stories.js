import {useState} from 'react';

import Calendar from './Calendar';

export default {
	title: 'Components/Calendar',
	component: Calendar,
	render: (args) => {
		const [value, setValue] = useState(args.value);
		return <Calendar {...args} value={value} onChange={setValue} />;
	},
};

export const Default = {args: {value: 1680667200000}};

export const Range = {args: {value: [0, 1680667200000]}};
