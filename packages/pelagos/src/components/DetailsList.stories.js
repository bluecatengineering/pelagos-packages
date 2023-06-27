import DetailsList from './DetailsList';
import DetailsListItem from './DetailsListItem';

export default {
	title: 'Components/DetailsList',
	component: DetailsList,
};

export const Default = {
	args: {
		label: 'Test',
		children: [
			<DetailsListItem key="0">one</DetailsListItem>,
			<DetailsListItem key="1">two</DetailsListItem>,
			<DetailsListItem key="2">three</DetailsListItem>,
		],
	},
};
