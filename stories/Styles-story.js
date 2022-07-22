import {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import colors from '../defs/colors.yaml';
import themes from '../defs/themes.yaml';
import themesMeta from '../defs/themes-meta.yaml';
import elevations from '../defs/elevations.yaml';
import fonts from '../defs/fonts.yaml';
import spacing from '../defs/spacing.yaml';
import './Styles-story.less';

const fontUsage = {
	'font-10-400': 'BlockHeader__indicator',
	'font-10-600': 'h6',
	'font-12-400': 'input::placeholder, Label',
	'font-12-600': 'h5',
	'font-14-400': 'body',
	'font-14-600': 'h4, Button',
	'font-16-400': 'Toast',
	'font-16-600': 'h3',
	'font-18-400': 'h2',
	'font-24-400': 'h1',
};

export const Fonts = () => (
	<div className="Fonts">
		<h2>Fonts</h2>
		<table>
			<tbody>
				{Object.entries(fonts)
					.filter(([k]) => k !== 'root-font')
					.map(([key, {styles}]) => (
						<tr key={key}>
							<td
								style={Object.fromEntries(
									Object.entries(styles).map(([k, v]) => [k, k === 'line-height' ? `${v}em` : v])
								)}
							>
								{key}
							</td>
							<td>{fontUsage[key]}</td>
						</tr>
					))}
			</tbody>
		</table>
	</div>
);
Fonts.storyName = 'Fonts';

const renderPalette = (title, field) => (
	<div className="Palette">
		<h2>{title}</h2>
		<div className="Palette__grid">
			{Object.entries(colors)
				.filter(([, v]) => field in v)
				.map(([key, value]) => (
					<div key={key} className="Palette__color">
						<div className="Palette__name">{value.css || key}</div>
						{value[field].map((hex, index) => (
							<div
								key={hex}
								className="Palette__patch"
								style={{color: index < 5 ? 'black' : 'white', backgroundColor: hex}}
							>
								<div className="Palette__number">{10 + index * 10}</div>
								<div className="Palette__hex">{hex}</div>
							</div>
						))}
					</div>
				))}
		</div>
	</div>
);

export const MainPalette = () => renderPalette('Main Palette', 'normal');
MainPalette.storyName = 'Main Palette';

export const HoverPalette = () => renderPalette('Hover Palette', 'hover');
HoverPalette.storyName = 'Hover Palette';

const fade = (color, alpha) => {
	const n = parseInt(color.slice(1), 16);
	return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${+alpha / 100})`;
};

const parseColor = (name) => {
	const {1: key, 2: index, 3: hover, 4: alpha} = /^([a-z-]+)(?:-(\d+)(-hover)?)?(?:\/(\d+)%)?$/.exec(name);
	const base = colors[key.replace(/-\w/, (x) => x.slice(1).toUpperCase())];
	const hex = index ? base[hover ? 'hover' : 'normal'][+index / 10 - 1] : base.value;
	return alpha ? fade(hex, alpha) : hex;
};

const ThemesFilter = ({label, options, value, onChange}) => (
	<div className="Themes__filter">
		<label>{label}</label>
		<select value={value} onChange={useCallback((event) => onChange(event.target.value), [onChange])}>
			{options.map((item) => (
				<option key={item}>{item}</option>
			))}
		</select>
	</div>
);
ThemesFilter.propTypes = {
	label: PropTypes.string,
	options: PropTypes.array,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

const carbonThemes = ['white', 'g100'];
const themeNames = {
	white: 'White',
	cg00: 'Cool Gray 00',
	yg100: 'Cyan Gray 100',
	g100: 'Gray 100',
};

export const Themes = () => {
	const themeList = Object.entries(themes);
	const metaList = Object.entries(themesMeta);
	const groupSet = new Set();
	const setSet = new Set();
	const propertySet = new Set();
	for (const [, {group, set, properties}] of metaList) {
		groupSet.add(group);
		setSet.add(set);
		for (const p of properties) {
			propertySet.add(p);
		}
	}
	const groups = Array.from(groupSet);
	const sets = Array.from(setSet);
	const properties = Array.from(propertySet);
	groups.unshift('All');
	sets.unshift('All');
	properties.unshift('All');
	const [currentGroup, setCurrentGroup] = useState('All');
	const [currentSet, setCurrentSet] = useState('All');
	const [currentProperty, setCurrentProperty] = useState('All');
	const [showCarbonTokens, setShowCarbonTokens] = useState(false);
	const filtered = useMemo(
		() =>
			currentGroup === 'All' && currentSet === 'All' && currentProperty === 'All'
				? metaList
				: metaList.filter(
						([, {group, set, properties}]) =>
							(currentGroup === 'All' || group === currentGroup) &&
							(currentSet === 'All' || set === currentSet) &&
							(currentProperty === 'All' || properties.includes(currentProperty))
				  ),
		[currentGroup, currentSet, currentProperty, metaList]
	);
	const filteredThemes = useMemo(
		() => (showCarbonTokens ? themeList : themeList.filter(([key]) => !carbonThemes.includes(key))),
		[themeList, showCarbonTokens]
	);
	const handleCarbonTokensClick = useCallback((event) => setShowCarbonTokens(event.target.checked), []);
	return (
		<>
			<div className="Themes__header">
				<h2>{`Themes (${filtered.length}/${metaList.length} tokens)`}</h2>
				<div className="Themes__filters">
					<label className="Themes__check">
						<input type="checkbox" checked={showCarbonTokens} onClick={handleCarbonTokensClick} /> Show Carbon themes
					</label>
					<ThemesFilter label="Group" options={groups} value={currentGroup} onChange={setCurrentGroup} />
					<ThemesFilter label="Set" options={sets} value={currentSet} onChange={setCurrentSet} />
					<ThemesFilter label="Property" options={properties} value={currentProperty} onChange={setCurrentProperty} />
				</div>
			</div>
			<table className="Themes__table">
				<thead>
					<tr>
						<th>Token</th>
						{filteredThemes.map(([key]) => (
							<th key={key}>{`${themeNames[key]} (${key})`}</th>
						))}
						<th>Properties</th>
					</tr>
				</thead>
				<tbody>
					{filtered.map(([token, {properties}]) => (
						<tr key={token}>
							<td>{token}</td>
							{filteredThemes.map(([key, theme]) => {
								const name = theme[token];
								const color = parseColor(name);
								return (
									<td key={key}>
										<div className="Themes__preview">
											<div className="Themes__swatch" style={{backgroundColor: color}} />
											<div className="Themes__detail">
												<div>{name}</div>
												<div className="Themes__hex">{color}</div>
											</div>
										</div>
									</td>
								);
							})}
							<td>
								{properties.map((prop) => (
									<div key={prop}>{prop}</div>
								))}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
Themes.storyName = 'Themes';

export const Elevations = () => (
	<div className="Elevations">
		<h2>Elevations</h2>
		<div className="Elevations__grid">
			{Object.entries(elevations).map(([k, {bg, shadow}]) => (
				<div
					key={k}
					className="Elevations__card"
					style={{backgroundColor: `var(--${bg})`, boxShadow: `var(--${shadow})`}}
				>
					{k}
				</div>
			))}
		</div>
	</div>
);
Elevations.storyName = 'Elevations';

export const Spacing = () => (
	<div className="Spacing">
		<h2>Spacing</h2>
		<table>
			<thead>
				<tr>
					<th>Token</th>
					<th>Factor</th>
					<th>Sample</th>
				</tr>
			</thead>
			<tbody>
				{Object.entries(spacing).map(([key, {size, factor}]) => (
					<tr key={key}>
						<td>{key}</td>
						<td>{factor}</td>
						<td>
							<div className="Spacing__sample" style={{width: size}} />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);
Spacing.storyName = 'Spacing';

export const Breakpoints = () => (
	<div>
		<h2>Breakpoints</h2>
		<table>
			<thead>
				<tr>
					<th>Breakpoint</th>
					<th>min-width (px)</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>md</td>
					<td>672</td>
				</tr>
				<tr>
					<td>lg</td>
					<td>1056</td>
				</tr>
				<tr>
					<td>xlg</td>
					<td>1312</td>
				</tr>
				<tr>
					<td>max</td>
					<td>1584</td>
				</tr>
			</tbody>
		</table>
	</div>
);

export default {
	title: 'Styles',
};
