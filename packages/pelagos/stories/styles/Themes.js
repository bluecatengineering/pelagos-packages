import {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import themes from '../../defs/themes.yaml';
import themesMeta from '../../defs/themes-meta.yaml';
import colors from '../../defs/colors.yaml';

import './Themes.less';

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

const families = ['All', 'Carbon', 'Pelagos', 'Light', 'Dark'];
const familyThemes = {
	Carbon: ['white', 'g100'],
	Pelagos: ['cg00', 'yg100'],
	Light: ['white', 'cg00'],
	Dark: ['yg100', 'g100'],
};
const themeNames = {
	white: 'White',
	cg00: 'Cool Gray 00',
	yg100: 'Cyan Gray 100',
	g100: 'Gray 100',
};

const Themes = () => {
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
	const [family, setFamily] = useState('All');
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
		() => (family === 'All' ? themeList : themeList.filter(([key]) => familyThemes[family].includes(key))),
		[themeList, family]
	);
	return (
		<div className="Themes sb-unstyled" data-theme="cg00">
			<div className="Themes__header">
				<h1>{`Themes (${filtered.length}/${metaList.length} tokens)`}</h1>
				<div className="Themes__filters">
					<ThemesFilter label="Family" options={families} value={family} onChange={setFamily} />
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
		</div>
	);
};

export default Themes;
