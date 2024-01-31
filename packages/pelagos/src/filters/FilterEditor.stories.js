import {Button} from '../components';

import FilterEditor from './FilterEditor';

export default {
	title: 'Components/FilterEditor',
	component: FilterEditor,
};

export const Default = {
	args: {chipId: 'chip', children: <div id="label">Editor</div>, 'aria-labelledby': 'label'},
	decorators: [
		(Story) => (
			<>
				<Button id="chip" text="Button" size="small" />
				<Story />
			</>
		),
	],
};
