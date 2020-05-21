import React from 'react';
import {storiesOf} from '@storybook/react';
import identity from 'lodash-es/identity';

import {ListInput} from '../src';

storiesOf('ListInput', module)
	.add('grid', () => (
		<ListInput
			id="id"
			label="Grid"
			placeHolder="1.1.1.1, 1.1.1.2"
			type="text"
			autoFocus
			list={['1.1.1.1', '1.1.1.2']}
			error={null}
			text="1.1"
			aria-label="test"
			getSuggestions={() => ({})}
			getSuggestionText={identity}
			getHighlightKey={identity}
			renderSuggestion={identity}
			getItemKey={identity}
			getItemName={identity}
			onListChange={identity}
			onTextChange={identity}
			onErrorChange={identity}
		/>
	))
	.add('column', () => (
		<ListInput
			id="id"
			label="Column"
			placeHolder="1.1.1.1, 1.1.1.2"
			type="text"
			autoFocus
			list={['1.1.1.1', '1.1.1.2']}
			error={null}
			text="1.1"
			column
			aria-label="test"
			getSuggestions={() => ({})}
			getSuggestionText={identity}
			getHighlightKey={identity}
			renderSuggestion={identity}
			getItemKey={identity}
			getItemName={identity}
			onListChange={identity}
			onTextChange={identity}
			onErrorChange={identity}
		/>
	))
	.add('empty', () => (
		<ListInput
			id="id"
			label="Empty"
			optionalText="(optional)"
			notice="A notice"
			placeHolder="1.1.1.1, 1.1.1.2"
			emptyText="The list is empty"
			type="text"
			autoFocus
			list={[]}
			error={null}
			text="1.1"
			column
			aria-label="test"
			getSuggestions={() => ({})}
			getSuggestionText={identity}
			getHighlightKey={identity}
			renderSuggestion={identity}
			getItemKey={identity}
			getItemName={identity}
			onListChange={identity}
			onTextChange={identity}
			onErrorChange={identity}
		/>
	));
