import {useCallback, useState} from 'react';
import {fn} from 'storybook/test';

import text from '../../stories/LoremIpsum';

import InlineNotification from './InlineNotification';
import Button from './Button';
import Dialog from './Dialog';

export default {
	title: 'Components/InlineNotification',
	component: InlineNotification,
	// the handlers render buttons, so they must not get the implicit actions from argTypesRegex
	args: {onAction: undefined, onClose: undefined},
};

export const Success = {
	args: {type: 'success', title: 'Success', text},
};

export const Info = {
	args: {type: 'info', title: 'Info', text},
};

export const Warning = {
	args: {type: 'warning', title: 'Warning', text},
};

export const Error = {
	args: {type: 'error', title: 'Error', text},
};

export const WithLink = {
	args: {
		type: 'warning',
		title: 'Limited resources',
		text: (
			<>
				Creating a report will reduce your resource <a href="#">availability</a>.
			</>
		),
	},
};

export const Dismissible = {
	args: {type: 'info', title: 'Info', text, onClose: fn()},
};

export const Actionable = {
	args: {type: 'error', title: 'Error', text, actionText: 'Retry', onAction: fn(), onClose: fn()},
};

export const ActionableNarrow = {
	args: {
		type: 'error',
		title: 'Sync failed',
		text: 'The configuration did not sync to dns-east-01.',
		actionText: 'Retry',
		onAction: fn(),
		onClose: fn(),
	},
	// below 480px of notification width the action moves under the text
	decorators: [(Story) => <div style={{width: 400}}>{Story()}</div>],
};

export const ActionableFromButton = {
	render: () => {
		const [visible, setVisible] = useState(false);
		const show = useCallback(() => setVisible(true), []);
		const hide = useCallback(() => setVisible(false), []);
		return (
			<>
				<Button text="Show notification" type="primary" onClick={show} />
				{visible && (
					<InlineNotification
						type="warning"
						title="Server instance unavailable"
						text="The server did not respond, check the connection and try again."
						actionText="Retry"
						onAction={hide}
						onClose={hide}
					/>
				)}
				<Button text="Next element" />
			</>
		);
	},
};

export const ActionOpensDialog = {
	render: () => {
		const [dialogVisible, setDialogVisible] = useState(false);
		const showDialog = useCallback(() => setDialogVisible(true), []);
		const hideDialog = useCallback(() => setDialogVisible(false), []);
		return (
			<>
				<InlineNotification
					type="error"
					title="3 servers have errors"
					text="Some servers in this deployment report configuration errors."
					actionText="View all"
					onAction={showDialog}
				/>
				{dialogVisible && (
					<Dialog title="Servers with errors">
						<div>
							<p>The notification stays, and focus returns to the action when this dialog closes.</p>
						</div>
						<div>
							<Button text="Close" type="primary" onClick={hideDialog} />
						</div>
					</Dialog>
				)}
			</>
		);
	},
};
