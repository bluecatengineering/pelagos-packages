import {useCallback, useState} from 'react';

import text from '../../stories/LoremIpsum';

import Collapsible from './Collapsible';

const content = <div key="content">{text}</div>;

export default {
	title: 'Components/Collapsible',
	component: Collapsible,
	render: (args) => {
		const [open, setOpen] = useState(args.open);
		const handleClick = useCallback(() => setOpen((o) => !o), []);
		return (
			<Collapsible {...args} open={open} onHeaderClick={handleClick}>
				{args.children}
			</Collapsible>
		);
	},
};

export const Default = {
	args: {className: 'Story__alignStretch', open: true, children: [<h2 key="header">Test</h2>, content]},
};
