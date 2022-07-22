import {InfoTooltip} from '../src';

import text from './LoremIpsumShort';

const Template = (args) => <InfoTooltip {...args} />;

export const Default = Template.bind({});
Default.args = {text, placement: 'bottom'};

export default {
	title: 'Components/InfoTooltip',
	component: InfoTooltip,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
