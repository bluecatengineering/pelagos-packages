import {faCat} from '@fortawesome/free-solid-svg-icons';

import IconButton from './IconButton';

import './IconButton.stories.less';

export default {
	title: 'Components/IconButton',
	component: IconButton,
};

export const Primary = {
	args: {icon: faCat, type: 'primary', tooltipText: 'Primary', 'aria-label': 'Primary'},
};

export const Secondary = {
	args: {icon: faCat, type: 'secondary', tooltipText: 'Secondary', 'aria-label': 'Secondary'},
};

export const Tertiary = {
	args: {icon: faCat, type: 'tertiary', tooltipText: 'Tertiary', 'aria-label': 'Tertiary'},
};

export const Ghost = {
	args: {icon: faCat, type: 'ghost', tooltipText: 'Ghost', 'aria-label': 'Ghost'},
};

export const Disabled = {
	args: {icon: faCat, tooltipText: 'Disabled', 'aria-label': 'Disabled', disabled: true},
};

export const Overlay = {
	args: {
		icon: faCat,
		type: 'primary',
		tooltipText: 'Overlay',
		overlay: <div className="IconButtonStory__overlay">42</div>,
		'aria-label': 'Overlay',
	},
};

export const AllStates = () => (
	<div className="Story__row">
		<div className="Story__group">
			<IconButton id="test0p" icon={faCat} type="primary" tooltipText="Primary" aria-label="Label" />
			<IconButton id="test1p" icon={faCat} type="primary" tooltipText="Primary" aria-label="Label" size="large" />
			<IconButton id="test2p" icon={faCat} type="primary" tooltipText="Primary" aria-label="Label" disabled />
		</div>
		<div className="Story__group">
			<IconButton id="test0s" icon={faCat} type="secondary" tooltipText="Secondary" aria-label="Label" />
			<IconButton id="test1s" icon={faCat} type="secondary" tooltipText="Secondary" aria-label="Label" size="large" />
			<IconButton id="test2s" icon={faCat} type="secondary" tooltipText="Secondary" aria-label="Label" disabled />
		</div>
		<div className="Story__group">
			<IconButton id="test0t" icon={faCat} type="tertiary" tooltipText="Tertiary" aria-label="Label" />
			<IconButton id="test1t" icon={faCat} type="tertiary" tooltipText="Tertiary" aria-label="Label" size="large" />
			<IconButton id="test2t" icon={faCat} type="tertiary" tooltipText="Tertiary" aria-label="Label" disabled />
		</div>
		<div className="Story__group">
			<IconButton id="test0g" icon={faCat} type="ghost" tooltipText="Ghost" aria-label="Label" />
			<IconButton id="test1g" icon={faCat} type="ghost" tooltipText="Ghost" aria-label="Label" size="large" />
			<IconButton id="test2g" icon={faCat} type="ghost" tooltipText="Ghost" aria-label="Label" disabled />
		</div>
	</div>
);
AllStates.storyName = 'All states';
