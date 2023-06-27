import BlockHeader from './BlockHeader';

export default {
	title: 'Components/BlockHeader',
	component: BlockHeader,
};

export const Default = {
	args: {header: 'Test'},
};

export const Configured = {
	args: {header: 'Test', configured: true},
};
