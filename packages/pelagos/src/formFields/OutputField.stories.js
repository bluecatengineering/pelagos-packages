import OutputField from './OutputField';

export default {
	title: 'Components/OutputField',
	component: OutputField,
};

export const Default = {
	args: {label: 'Default', value: 'Alpha'},
};

export const RightAligned = {
	args: {label: 'Right Aligned', value: 'Alpha', alignRight: true},
};

export const Active = {
	args: {label: 'Active', value: 'Alpha', active: true},
};
