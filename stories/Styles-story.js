import elevations from '../defs/elevations.yaml';
import './Styles-story.less';

const fontColors = ['color1', 'color2', 'color3'];

const fontTable = [
	{name: '10-400', colors: {color1: 'footer', color3: 'indicator'}},
	{name: '10-600-uc', colors: {color1: 'error', color2: 'label'}},
	{name: '12-400', colors: {color1: 'body-small', color2: 'crumbs'}},
	{name: '12-600-uc', colors: {color1: 'button-small', color2: 'table-title', color3: 'cmd-header'}},
	{name: '14-400', colors: {color1: 'body-medium', color2: 'body-dim', color3: 'body-disabled'}},
	{name: '14-600', colors: {color1: 'important'}},
	{name: '14-600-uc', colors: {color1: 'button-medium'}},
	{name: '16-400', colors: {color1: 'body-large', color3: 'empty-msg'}},
	{name: '16-400-sp2', colors: {color1: 'product'}},
	{name: '16-600', colors: {color1: 'title-small'}},
	{name: '16-600-uc', colors: {color1: 'button-large'}},
	{name: '18-400', colors: {color1: 'title-medium'}},
	{name: '24-400', colors: {color1: 'title-large'}},
	{name: '68-300', colors: {color1: 'display-large'}},
];

export const Fonts = () => (
	<table className="Fonts">
		<thead>
			<tr>
				<th>Properties</th>
				{fontColors.map((color) => (
					<th key={color}>{color}</th>
				))}
			</tr>
		</thead>
		<tbody>
			{fontTable.map(({name, colors}) => (
				<tr key={name}>
					<td>{name}</td>
					{fontColors.map((color) => (
						<td key={color} className={'Fonts--' + colors[color]}>
							{colors[color]}
						</td>
					))}
				</tr>
			))}
		</tbody>
	</table>
);
Fonts.storyName = 'Fonts';

export const Elevations = () => (
	<div className="Elevations">
		{Object.entries(elevations).map(([k, {bg, shadow}]) => (
			<div
				key={k}
				className="Elevations__card"
				style={{backgroundColor: `var(--${bg})`, boxShadow: `var(--${shadow})`}}>
				{k}
			</div>
		))}
	</div>
);
Elevations.storyName = 'Elevations';

export default {
	title: 'Styles',
};
