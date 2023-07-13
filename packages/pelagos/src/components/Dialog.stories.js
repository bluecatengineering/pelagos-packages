import {useCallback, useState} from 'react';
import {Title, Subtitle, Description, Canvas, Controls} from '@storybook/blocks';

import body from '../../stories/LoremIpsum';

import Dialog from './Dialog';
import Button from './Button';

export default {
	title: 'Components/Dialog',
	component: Dialog,
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
		children: [
			<div key="body">
				<p>{body}</p>
			</div>,
			<div key="buttons">
				<Button text="Button" type="primary" />
			</div>,
		],
	},
};

const WiredComponent = () => {
	const [visible, setVisible] = useState(false);
	const show = useCallback(() => setVisible(true), []);
	const hide = useCallback(() => setVisible(false), []);
	return (
		<>
			<Button text="Show dialog" type="primary" onClick={show} />
			{visible && (
				<Dialog title="Title">
					<div>
						<p>{body}</p>
					</div>
					<div>
						<Button text="Close" type="primary" onClick={hide} />
					</div>
				</Dialog>
			)}
		</>
	);
};

export const TryItOut = {
	name: 'Try it out!',
	render: () => <WiredComponent />,
};
