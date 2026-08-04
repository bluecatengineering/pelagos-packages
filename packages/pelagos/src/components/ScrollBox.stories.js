import {fn} from 'storybook/test';

import text from '../../stories/LoremIpsum';

import ScrollBox from './ScrollBox';

export default {
	title: 'Deprecated/ScrollBox',
	component: ScrollBox,
	args: {
		onResize: fn(),
	},
};

export const Default = {args: {children: <div>{text}</div>}};
