import {useState} from 'react';

import Pagination from './Pagination';

export default {
	title: 'Components/Pagination',
	component: Pagination,
	render: (args) => {
		const [page, setPage] = useState(args.page);
		const [pageSize, setPageSize] = useState(args.pageSize);
		return (
			<div style={{marginTop: '24px'}}>
				<Pagination {...args} page={page} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={setPageSize} />
			</div>
		);
	},
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
