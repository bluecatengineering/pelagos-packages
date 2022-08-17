import {DetailEntry} from '../src';

import infoText from './LoremIpsumShort';

const Template = (args) => <DetailEntry {...args} />;

export const Default = Template.bind({});
Default.args = {label: 'Label', value: 'value'};

export const WithInfoText = Template.bind({});
WithInfoText.args = {label: 'Label', infoText, infoTextPlacement: 'right', value: 'value'};

export default {
	title: 'Components/DetailEntry',
	component: DetailEntry,
};
