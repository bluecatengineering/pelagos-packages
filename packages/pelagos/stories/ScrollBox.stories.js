import {ScrollBox} from '../src';

import text from './LoremIpsum';

export default {
	title: 'Components/ScrollBox',
	component: ScrollBox,
};

export const Default = {args: {children: <div>{text}</div>}};
