import RadioButton from './RadioButton';

export default {
	title: 'Components/RadioButton',
	component: RadioButton,
};

export const Default = {args: {label: 'Default'}};

export const Checked = {args: {label: 'Checked', checked: true}};

export const Error = {args: {label: 'Error', error: true}};

export const AllStates = () => (
	<div className="Story__group">
		<RadioButton label="Option 1" />
		<RadioButton label="Option 2" checked />
		<RadioButton label="Option 3" error />
		<RadioButton label="Option 4" checked error />
	</div>
);
AllStates.storyName = 'All states';
