import CheckBox from './CheckBox';

export default {
	title: 'Components/CheckBox',
	component: CheckBox,
};

export const Default = {args: {label: 'Default'}};

export const Checked = {args: {label: 'Checked', checked: true}};

export const Disabled = {args: {label: 'Disabled', disabled: true}};

export const Error = {args: {label: 'Error', error: true}};

export const Indeterminate = {args: {label: 'Indeterminate', indeterminate: true}};

export const AllStates = () => (
	<div className="Story__group">
		<CheckBox label="Option 1" />
		<CheckBox label="Option 2" checked />
		<CheckBox label="Option 3" disabled />
		<CheckBox label="Option 4" checked disabled />
		<CheckBox label="Option 5" error />
		<CheckBox label="Option 6" checked error />
		<CheckBox label="Option 7" indeterminate />
	</div>
);
AllStates.storyName = 'All states';
