import Button from '../components/Button';

import TimeFilterEditor from './TimeFilterEditor';

const optionsMap = {foo: 'Foo', bar: 'Bar', custom: 'Custom'};
const options = Object.keys(optionsMap);
const getOptionLabel = (key) => optionsMap[key];
const format = (number) => new Date(number).toISOString();
const parse = (string) => new Date(string).getTime();
const validate = (string) => (isNaN(new Date(string).getTime()) ? 'Invalid time.' : null);
const validateFrom = validate;
const validateTo = validate;

export default {
	title: 'Components/TimeFilterEditor',
	component: TimeFilterEditor,
};

export const Default = {
	args: {
		label: 'Default',
		value: {to: 1680667200000},
		fromPlaceholder: 'From placeholder',
		toPlaceholder: 'To placeholder',
		options,
		getOptionLabel,
		format,
		parse,
		validateFrom,
		validateTo,
		chipId: 'chip',
	},
	decorators: [
		(Story) => (
			<>
				<Button id="chip" text="Button" size="small" />
				<Story />
			</>
		),
	],
};
