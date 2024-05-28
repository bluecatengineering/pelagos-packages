import {useState} from 'react';

import Search from './Search';

export default {
	title: 'Components/Search',
	component: Search,
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- story
		const [value, setValue] = useState(args.value);
		return (
			<div className="Story__alignStretch">
				<Search {...args} value={value} onChange={setValue} />
			</div>
		);
	},
};

export const Default = {args: {value: '', placeholder: 'Default'}};

export const Disabled = {args: {value: '', placeholder: 'Disabled', disabled: true}};
