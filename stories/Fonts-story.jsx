import React from 'react';
import {storiesOf} from '@storybook/react';

import './Fonts-story.less';

const fonts = [
	['font-indicator', 10, 400],
	['font-notice', 10, 400],
	['font-footer', 10, 400],
	['font-label', 10, 600],
	['font-error', 10, 600],
	['font-field-hint', 12, 400],
	['font-crumbs', 12, 400],
	['font-body-small', 12, 400],
	['font-cmd-header', 12, 600],
	['font-table-title', 12, 600],
	['font-button-small', 12, 600],
	['font-body-disabled', 14, 400],
	['font-body-dim', 14, 400],
	['font-body-medium', 14, 400],
	['font-block-action', 14, 600],
	['font-important', 14, 600],
	['font-button-medium', 14, 600],
	['font-field-hint-large', 16, 400],
	['font-empty-msg', 16, 400],
	['font-body-large', 16, 400],
	['font-product', 16, 400],
	['font-title-small', 16, 600],
	['font-button-large', 16, 600],
	['font-title-medium', 18, 400],
	['font-title-large', 24, 400],
	['font-display-large', 68, 300],
];

storiesOf('Fonts', module).add('all fonts', () => (
	<table className="FontsStory">
		<tbody>
			{fonts.map(([name, size, weight]) => (
				<tr key={name}>
					<td>{size}</td>
					<td>{weight}</td>
					<td className={name}>{name.substr(5)}</td>
				</tr>
			))}
		</tbody>
	</table>
));
