import WithLayers from '../../templates/WithLayers';

import ProgressBar from './ProgressBar';

export default {
	title: 'Components/ProgressBar',
	component: ProgressBar,
	decorators: [
		(Story) => (
			<div style={{minWidth: '18rem', alignSelf: 'stretch'}}>
				<Story />
			</div>
		),
	],
};

export const Default = {
	args: {label: 'Default', helperText: 'Some helper text', type: 'default', size: 'big', status: 'active', value: 20},
};

export const Inline = {
	args: {...Default.args, label: 'Inline', type: 'inline'},
};

export const Indented = {
	args: {...Default.args, label: 'Indented', type: 'indented'},
};

export const Small = {
	args: {...Default.args, label: 'Small', size: 'small'},
};

export const Indeterminate = {
	args: {...Default.args, label: 'Indeterminate', value: null},
	parameters: {chromatic: {disableSnapshot: true}}, // avoid false positives due to the animation
};

export const Finished = {
	args: {...Default.args, label: 'Finished', status: 'finished'},
};

export const Error = {
	args: {...Default.args, label: 'Error', status: 'error'},
};

export const _WithLayers = {
	render: () => <WithLayers>{() => <ProgressBar {...Default.args} label="Label" />}</WithLayers>,
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
