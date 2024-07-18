import {useState} from 'react';

import Legend from './Legend';

export default {
	title: 'Experimental Charts/Legend',
	component: Legend,
};

export const Default = {
	args: {groups: ['Alpha', 'Beta', 'Gamma']},
};

export const Clickable = {
	args: {groups: ['Alpha', 'Beta', 'Gamma'], clickable: true, selected: ['Alpha']},
	render: (args) => {
		const [selected, setSelected] = useState(args.selected);
		return <Legend {...args} selected={selected} onChange={setSelected} />;
	},
};
