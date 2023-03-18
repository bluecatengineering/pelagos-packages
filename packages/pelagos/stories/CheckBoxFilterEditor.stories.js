import identity from 'lodash-es/identity';

import {CheckBoxFilterEditor} from '../src';

const options = ['foo', 'bar', 'baz'];
const list = ['foo', 'baz'];
const getLabel = identity;

export default {
	title: 'Components/CheckBoxFilterEditor',
	component: CheckBoxFilterEditor,
};

export const Default = {args: {label: 'Default', options, list, getLabel}};
