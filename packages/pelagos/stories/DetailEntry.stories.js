import {DetailEntry} from '../src';

import infoText from './LoremIpsumShort';

export default {
	title: 'Components/DetailEntry',
	component: DetailEntry,
};

export const Default = {
	args: {label: 'Label', value: 'value'},
};

export const WithInfoText = {
	args: {label: 'Label', infoText, infoTextPlacement: 'right', value: 'value'},
};
