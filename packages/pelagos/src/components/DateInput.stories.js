import WithLayers from '../../templates/WithLayers';

import DateInput from './DateInput';

import './DateInput.stories.less';

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
	title: 'Components/DateInput',
	component: DateInput,
};

export const Default = {
	args: {className: 'DateInputStory', value: '', format, parse, 'aria-label': 'Date'},
};

export const Disabled = {
	args: {className: 'DateInputStory', value: '', disabled: true, format, parse, 'aria-label': 'Date'},
};

export const Error = {
	args: {className: 'DateInputStory', value: '', error: true, format, parse, 'aria-label': 'Date'},
};

export const _WithLayers = {
	render: () => (
		<WithLayers>
			{() => <DateInput className="DateInputStory" value="" format={format} parse={parse} aria-label="Date" />}
		</WithLayers>
	),
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
