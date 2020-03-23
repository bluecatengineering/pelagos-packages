import React from 'react';
import {storiesOf} from '@storybook/react';
import identity from 'lodash-es/identity';

import {ComboBox} from '../src';

const getSuggestions = () => ['Alpha', 'Beta', 'Gamma'];
const renderSuggestion = (text) => <div>{text}</div>;

storiesOf('ComboBox', module).add('all states', () => (
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
));
