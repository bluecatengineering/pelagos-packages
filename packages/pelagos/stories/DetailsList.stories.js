import {DetailsList, DetailsListItem} from '../src';

const Template = (args) => (
	<DetailsList {...args}>
		<DetailsListItem>one</DetailsListItem>
		<DetailsListItem>two</DetailsListItem>
		<DetailsListItem>three</DetailsListItem>
	</DetailsList>
);

export const Normal = Template.bind({});
Normal.args = {label: 'Test'};

export default {
	title: 'Components/DetailsList',
	component: DetailsList,
	subcomponents: {DetailsListItem},
};
