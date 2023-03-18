import identity from 'lodash-es/identity';

import {RadioGroup} from '../src';

const options = ['Alpha', 'Beta', 'Gamma'];
const renderLabel = identity;

export default {
	title: 'Components/RadioGroup',
	component: RadioGroup,
};

export const Default = {args: {id: 'default', value: 'Alpha', options, renderLabel}};
