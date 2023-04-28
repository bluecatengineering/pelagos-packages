import identity from 'lodash-es/identity';

import {CheckBoxFilterEditor, Button} from '../src';

const options = ['foo', 'bar', 'baz'];
const list = ['foo', 'baz'];
const getLabel = identity;

export default {
	title: 'Components/CheckBoxFilterEditor',
	component: CheckBoxFilterEditor,
};

export const Default = {args: {label: 'Default', options, list, getLabel}};

export const ForArea = {
	args: {label: 'For area', options, list, getLabel, chipId: 'chip', forArea: true},
	decorators: [
		(Story) => (
			<>
				<Button id="chip" text="Button" size="small" />
				<Story />
			</>
		),
	],
};
