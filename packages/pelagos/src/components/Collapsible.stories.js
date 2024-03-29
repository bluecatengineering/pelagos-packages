import text from '../../stories/LoremIpsum';

import Collapsible from './Collapsible';

const content = <div key="content">{text}</div>;

export default {
	title: 'Components/Collapsible',
	component: Collapsible,
};

export const Default = {args: {open: true, children: [<h2 key="header">Test</h2>, content]}};
