import {faCat} from '@fortawesome/free-solid-svg-icons';

import {SvgIcon} from '../src';

const Template = (args) => <SvgIcon {...args} />;

export const Normal = Template.bind({});
Normal.args = {icon: faCat};

export default {
	title: 'Components/SvgIcon',
	component: SvgIcon,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
