import {LabelLine} from '../src';

export default {
	title: 'Components/LabelLine',
	component: LabelLine,
};

export const Default = {
	args: {text: 'Default'},
};

export const Required = {
	args: {text: 'Required', required: true},
};

export const RequiredError = {
	args: {text: 'Required with error', required: true, error: true},
};
