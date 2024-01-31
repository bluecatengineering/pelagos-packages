import ProgressIndicator from './ProgressIndicator';
import ProgressStep from './ProgressStep';

export default {
	title: 'Components/ProgressIndicator',
	component: ProgressIndicator,
};

export const Default = {
	args: {
		className: 'Story__alignStretch',
		current: 1,
		children: [
			<ProgressStep key="1" label="Step 1" />,
			<ProgressStep key="2" label="Step 2" />,
			<ProgressStep key="3" label="Step 3" />,
			<ProgressStep key="4" label="Step 4" invalid />,
		],
	},
};
