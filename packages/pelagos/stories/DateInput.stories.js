import {DateInput} from '../src';
import WithLayers from '../templates/WithLayers';

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
	args: {className: 'DateInputStory', value: '', format, parse},
};

export const Disabled = {
	args: {className: 'DateInputStory', value: '', disabled: true, format, parse},
};

export const Error = {
	args: {className: 'DateInputStory', value: '', error: true, format, parse},
};

export const _WithLayers = {
	render: () => (
		<WithLayers>{() => <DateInput className="DateInputStory" value="" format={format} parse={parse} />}</WithLayers>
	),
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
