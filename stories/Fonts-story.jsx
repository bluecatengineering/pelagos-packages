import React from 'react';
import {storiesOf} from '@storybook/react';

import './Fonts-story.less';

const fontColors = ['color1', 'color2', 'color3', 'red', 'burnt', 'bondi', 'sky'];

const fontTable = [
	{name: '10-400', colors: {color1: 'footer', color3: 'indicator', burnt: 'notice'}},
	{name: '10-600-uc', colors: {color1: 'error', color2: 'label'}},
	{name: '12-400', colors: {color1: 'body-small', color2: 'crumbs', sky: 'field-hint'}},
	{name: '12-600-uc', colors: {color1: 'button-small', color2: 'table-title', color3: 'cmd-header'}},
	{name: '14-400', colors: {color1: 'body-medium', color2: 'body-dim', color3: 'body-disabled', red: 'block-action'}},
	{name: '14-600', colors: {color1: 'important'}},
	{name: '14-600-uc', colors: {color1: 'button-medium'}},
	{name: '16-400', colors: {color1: 'body-large', color3: 'empty-msg'}},
	{name: '16-400-sp2', colors: {bondi: 'product'}},
	{name: '16-600', colors: {color1: 'title-small'}},
	{name: '16-600-uc', colors: {color1: 'button-large'}},
	{name: '18-400', colors: {color1: 'title-medium'}},
	{name: '24-400', colors: {color1: 'title-large'}},
	{name: '68-300', colors: {color1: 'display-large'}},
];

storiesOf('Fonts', module).add('all fonts', () => (
	<table className="FontsStory">
		<thead>
			<tr>
				<th>Properties</th>
				{fontColors.map(color => (
					<th key={color}>{color}</th>
				))}
			</tr>
		</thead>
		<tbody>
			{fontTable.map(({name, colors}) => (
				<tr key={name}>
					<td>{name}</td>
					{fontColors.map(color => (
						<td key={color} className={'font-' + colors[color]}>
							{colors[color]}
						</td>
					))}
				</tr>
			))}
		</tbody>
	</table>
));
