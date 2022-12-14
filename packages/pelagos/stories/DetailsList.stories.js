import {DetailsList} from '../src';

const renderItem = (item, className) => (
	<div key={item} className={className}>
		{item}
	</div>
);

const Template = (args) => <DetailsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {label: 'Test', list: ['one', 'two', 'three'], renderItem};

export default {
	title: 'Components/DetailsList',
	component: DetailsList,
};
