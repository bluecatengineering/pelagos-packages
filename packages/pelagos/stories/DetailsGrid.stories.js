import {DetailsGrid} from '../src';

export default {
	title: 'Components/DetailsGrid',
	component: DetailsGrid,
};

export const Default = {
	args: {
		children: [<div key="1">One</div>, <div key="2">Two</div>, <div key="3">Three</div>, <div key="4">Four</div>],
	},
};
