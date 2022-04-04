import {ScrollBox} from '../src';

import text from './LoremIpsum';

const children = <div>{text}</div>;

const Template = (args) => <ScrollBox {...args} />;

export const Normal = Template.bind({});
Normal.args = {children};

export default {
	title: 'Components/ScrollBox',
	component: ScrollBox,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
