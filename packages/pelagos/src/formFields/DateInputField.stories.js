import {useState} from 'react';
import {action} from 'storybook/actions';

import WithLayers from '../../templates/WithLayers';

import DateInputField from './DateInputField';

import '../components/DateInput.stories.less';

const handleChange = action('onChange');

const pad = (number) => String(number).padStart(2, '0');

const format = (time) => {
	const date = new Date(time);
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const parse = (string) => {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(string);
	return match ? new Date(parseInt(match[1], 10), parseInt(match[2], 10) - 1, parseInt(match[3], 10)).getTime() : null;
};

export default {
	title: 'Components/DateInputField',
	component: DateInputField,
	render: (args) => {
		const [value, setValue] = useState(args.value);
		return <DateInputField {...args} className="DateInputStory" value={value} onChange={setValue} />;
	},
};

export const Default = {
	args: {label: 'Default', value: '2025-09-29', helperText: 'Helper text', format, parse},
};

export const Disabled = {
	args: {label: 'Disabled', value: '2025-09-29', disabled: true, format, parse},
};

export const Error = {
	args: {label: 'Error', value: '2025-09-29', error: true, format, parse},
};

export const _WithLayers = {
	render: () => (
		<WithLayers>
			{() => (
				<DateInputField
					className="DateInputStory"
					label="Default"
					value="2025-09-29"
					format={format}
					parse={parse}
					onChange={handleChange}
				/>
			)}
		</WithLayers>
	),
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
