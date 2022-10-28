import {Pagination} from '../src';

const Template = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {page: 1, pageSize: 10, pageSizes: [10, 25, 50], totalItems: 123};

export const UnknownTotal = Template.bind({});
UnknownTotal.args = {page: 1, pageSize: 10, pageSizes: [10, 25, 50]};

export const FixedPageSize = Template.bind({});
FixedPageSize.args = {page: 1, pageSize: 10, totalItems: 123};

export default {
	title: 'Components/Pagination',
	component: Pagination,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
