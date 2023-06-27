import infoText from '../../stories/LoremIpsumShort';

import DetailEntry from './DetailEntry';

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
