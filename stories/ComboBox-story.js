import React from 'react';
import identity from 'lodash-es/identity';

import {ComboBox} from '../src';

const getSuggestions = () => ['Alpha', 'Beta', 'Gamma'];
const renderSuggestion = (text) => <div>{text}</div>;

const Template = (args) => <ComboBox {...args} />;

export const Normal = Template.bind({});
Normal.args = {id: 'normal', text: 'Alpha', 'aria-label': 'Normal', getSuggestions, renderSuggestion};

export const Empty = Template.bind({});
Empty.args = {id: 'empty', placeholder: 'Empty', 'aria-label': 'Empty', getSuggestions, renderSuggestion};

export const Disabled = Template.bind({});
Disabled.args = {
	id: 'disabled',
	text: 'Disabled',
	'aria-label': 'Disabled',
	disabled: true,
	getSuggestions,
	renderSuggestion,
};

export const Error = Template.bind({});
Error.args = {id: 'error', text: 'Error', 'aria-label': 'Error', error: true, getSuggestions, renderSuggestion};

export const AllStates = () => (
	<div className="Story__group">
		<ComboBox
			id="c0"
			text="Alpha"
			aria-label="Test"
			getSuggestions={getSuggestions}
			renderSuggestion={renderSuggestion}
			onChange={identity}
			onTextChange={identity}
		/>
		<ComboBox
			id="c1"
			placeholder="Placeholder"
			aria-label="Test"
			getSuggestions={getSuggestions}
			renderSuggestion={renderSuggestion}
			onChange={identity}
			onTextChange={identity}
		/>
		<ComboBox
			id="c2"
			aria-label="Test"
			disabled
			getSuggestions={getSuggestions}
			renderSuggestion={renderSuggestion}
			onChange={identity}
			onTextChange={identity}
		/>
		<ComboBox
			id="c3"
			aria-label="Test"
			error
			getSuggestions={getSuggestions}
			renderSuggestion={renderSuggestion}
			onChange={identity}
			onTextChange={identity}
		/>
	</div>
);
AllStates.storyName = 'All states';

export default {
	title: 'ComboBox',
	component: ComboBox,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
