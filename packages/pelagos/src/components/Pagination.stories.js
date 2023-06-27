import Pagination from './Pagination';

export default {
	title: 'Components/Pagination',
	component: Pagination,
};

export const Default = {
	args: {page: 1, pageSize: 10, pageSizes: [10, 25, 50], totalItems: 123},
};

export const UnknownTotal = {
	args: {page: 1, pageSize: 10, pageSizes: [10, 25, 50]},
};

export const FixedPageSize = {
	args: {page: 1, pageSize: 10, totalItems: 123},
};
