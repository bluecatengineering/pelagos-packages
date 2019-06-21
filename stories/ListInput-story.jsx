import React from 'react';
import {storiesOf} from '@storybook/react';
import identity from 'lodash-es/identity';

import {ListInput} from '../src';

storiesOf('ListInput', module)
	.add('grid', () => (
		<ListInput
			id="id"
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
			renderItem={d => <div>{d}</div>}
			onListChange={identity}
			onTextChange={identity}
			onErrorChange={identity}
		/>
	))
	.add('column', () => (
		<ListInput
			id="id"
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
			renderItem={d => <div>{d}</div>}
			onListChange={identity}
			onTextChange={identity}
			onErrorChange={identity}
		/>
	));
