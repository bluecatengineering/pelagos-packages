import {faCat} from '@fortawesome/free-solid-svg-icons';

import {Button} from '../src';

export default {
	title: 'Components/Button',
	component: Button,
};

export const Primary = {args: {text: 'Primary', type: 'primary'}};

export const Secondary = {args: {text: 'Secondary', type: 'secondary'}};

export const Tertiary = {args: {text: 'Tertiary', type: 'tertiary'}};

export const Ghost = {args: {text: 'Ghost', type: 'ghost'}};

export const Disabled = {args: {text: 'Disabled', disabled: true}};

export const WithIcon = {args: {text: 'Primary', icon: faCat, type: 'primary'}};

export const AllStates = () => (
	<div className="Story__row">
		<div className="Story__group">
			<Button text="Primary" size="small" type="primary" />
			<Button text="Primary" type="primary" />
			<Button text="Primary" size="large" type="primary" />
			<Button text="Primary" type="primary" tooltipText="Disabled" disabled />
		</div>
		<div className="Story__group">
			<Button text="Secondary" size="small" type="secondary" />
			<Button text="Secondary" type="secondary" />
			<Button text="Secondary" size="large" type="secondary" />
			<Button text="Secondary" type="secondary" tooltipText="Disabled" disabled />
		</div>
		<div className="Story__group">
			<Button text="Tertiary" size="small" type="tertiary" />
			<Button text="Tertiary" type="tertiary" />
			<Button text="Tertiary" size="large" type="tertiary" />
			<Button text="Tertiary" type="tertiary" tooltipText="Disabled" disabled />
		</div>
		<div className="Story__group">
			<Button text="Ghost" size="small" type="ghost" />
			<Button text="Ghost" type="ghost" />
			<Button text="Ghost" size="large" type="ghost" />
			<Button text="Ghost" type="ghost" tooltipText="Disabled" disabled />
		</div>
	</div>
);
AllStates.storyName = 'All states';
