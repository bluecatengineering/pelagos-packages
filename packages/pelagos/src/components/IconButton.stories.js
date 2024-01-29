import Model from '@carbon/icons-react/es/Model';

import IconButton from './IconButton';

import './IconButton.stories.less';

export default {
	title: 'Components/IconButton',
	component: IconButton,
};

export const Primary = {
	args: {icon: Model, type: 'primary', tooltipText: 'Primary', 'aria-label': 'Primary'},
};

export const Secondary = {
	args: {icon: Model, type: 'secondary', tooltipText: 'Secondary', 'aria-label': 'Secondary'},
};

export const Tertiary = {
	args: {icon: Model, type: 'tertiary', tooltipText: 'Tertiary', 'aria-label': 'Tertiary'},
};

export const Ghost = {
	args: {icon: Model, type: 'ghost', tooltipText: 'Ghost', 'aria-label': 'Ghost'},
};

export const Disabled = {
	args: {icon: Model, tooltipText: 'Disabled', 'aria-label': 'Disabled', disabled: true},
};

export const Overlay = {
	args: {
		icon: Model,
		type: 'primary',
		tooltipText: 'Overlay',
		overlay: <div className="IconButtonStory__overlay">42</div>,
		'aria-label': 'Overlay',
	},
};

export const AllStates = () => (
	<div className="Story__row">
		<div className="Story__group">
			<IconButton icon={Model} type="primary" tooltipText="Primary" aria-label="Label" />
			<IconButton icon={Model} type="primary" tooltipText="Primary" aria-label="Label" size="large" />
			<IconButton icon={Model} type="primary" tooltipText="Primary" aria-label="Label" disabled />
		</div>
		<div className="Story__group">
			<IconButton icon={Model} type="secondary" tooltipText="Secondary" aria-label="Label" />
			<IconButton icon={Model} type="secondary" tooltipText="Secondary" aria-label="Label" size="large" />
			<IconButton icon={Model} type="secondary" tooltipText="Secondary" aria-label="Label" disabled />
		</div>
		<div className="Story__group">
			<IconButton icon={Model} type="tertiary" tooltipText="Tertiary" aria-label="Label" />
			<IconButton icon={Model} type="tertiary" tooltipText="Tertiary" aria-label="Label" size="large" />
			<IconButton icon={Model} type="tertiary" tooltipText="Tertiary" aria-label="Label" disabled />
		</div>
		<div className="Story__group">
			<IconButton icon={Model} type="ghost" tooltipText="Ghost" aria-label="Label" />
			<IconButton icon={Model} type="ghost" tooltipText="Ghost" aria-label="Label" size="large" />
			<IconButton icon={Model} type="ghost" tooltipText="Ghost" aria-label="Label" disabled />
		</div>
		<div className="Story__group">
			<IconButton icon={Model} type="dangerPrimary" tooltipText="Danger primary" aria-label="Label" />
			<IconButton icon={Model} type="dangerPrimary" tooltipText="Danger primary" aria-label="Label" size="large" />
			<IconButton icon={Model} type="dangerPrimary" tooltipText="Danger primary" aria-label="Label" disabled />
		</div>
		<div className="Story__group">
			<IconButton icon={Model} type="dangerTertiary" tooltipText="Danger tertiary" aria-label="Label" />
			<IconButton icon={Model} type="dangerTertiary" tooltipText="Danger tertiary" aria-label="Label" size="large" />
			<IconButton icon={Model} type="dangerTertiary" tooltipText="Danger tertiary" aria-label="Label" disabled />
		</div>
		<div className="Story__group">
			<IconButton icon={Model} type="dangerGhost" tooltipText="Danger ghost" aria-label="Label" />
			<IconButton icon={Model} type="dangerGhost" tooltipText="Danger ghost" aria-label="Label" size="large" />
			<IconButton icon={Model} type="dangerGhost" tooltipText="Danger ghost" aria-label="Label" disabled />
		</div>
	</div>
);
AllStates.storyName = 'All states';
