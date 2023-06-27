import text from '../../stories/LoremIpsum';

import ScrollBox from './ScrollBox';

export default {
	title: 'Components/ScrollBox',
	component: ScrollBox,
};

export const Default = {args: {children: <div>{text}</div>}};
