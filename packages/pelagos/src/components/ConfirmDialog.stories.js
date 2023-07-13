import {useCallback, useState} from 'react';
import {Title, Subtitle, Description, Canvas, Controls} from '@storybook/blocks';

import body from '../../stories/LoremIpsum';

import ConfirmDialog from './ConfirmDialog';
import Button from './Button';

export default {
	title: 'Components/ConfirmDialog',
	component: ConfirmDialog,
	parameters: {
		controls: {hideNoControlsWarning: true},
		docs: {
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description />
					<Canvas of={TryItOut} />
					<Controls />
				</>
			),
		},
	},
};

export const Default = {
	args: {
		title: 'Title',
		body,
		confirmText: 'Confirm',
	},
};

const WiredComponent = () => {
	const [visible, setVisible] = useState(false);
	const show = useCallback(() => setVisible(true), []);
	const hide = useCallback(() => setVisible(false), []);
	return (
		<>
			<Button text="Show dialog" type="primary" onClick={show} />
			{visible && <ConfirmDialog title="Title" body={body} confirmText="Confirm" onClose={hide} onConfirm={hide} />}
		</>
	);
};

export const TryItOut = {
	name: 'Try it out!',
	render: () => <WiredComponent />,
};
