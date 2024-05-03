import {useCallback} from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash-es/identity';

import {colorPropType} from './ChartPropTypes';
import {getDefaultClass} from './Getters';
import getColorClass from './getColorClass';
import getColorVariant from './getColorVariant';
import useRandomId from './useRandomId';
import './Chart.less';

const Legend = ({
	id,
	className,
	groups,
	formatter = identity,
	direction,
	clickable,
	selected,
	color,
	getBgClass = getDefaultClass,
	onClick,
	onChange,
}) => {
	id = useRandomId(id);
	const {groupCount: colorGroupCount, option: colorOption} = {groupCount: null, option: 1, ...color?.pairing};
	const colorVariant = getColorVariant(colorGroupCount, groups.length);
	const someSelected = selected && selected.length !== 0 && selected.length !== groups.length;

	const handleKeyDown = useCallback((event) => {
		if (event.key === ' ') {
			event.preventDefault();
			event.target.click();
		}
	}, []);
	const handleClick = useCallback(
		(event) => {
			const li = event.target.closest('li');
			if (li) {
				li.firstChild.focus();
				const group = li.dataset.group;
				if (onClick) {
					onClick(group, +li.dataset.index);
				}
				if (onChange) {
					onChange(
						selected.includes(group)
							? selected.filter((g) => g !== group)
							: selected.length === groups.length - 1
								? []
								: [...selected, group]
					);
				}
			}
		},
		[groups.length, onChange, onClick, selected]
	);

	return (
		<ul
			id={id}
			className={`Chart Chart__legend ${direction}${clickable ? ' clickable' : ''}${someSelected ? ' some-selected' : ''}${className ? ` ${className}` : ''}`}
			aria-label={/* TODO translate */ `Data groups`}
			onKeyDown={clickable ? handleKeyDown : null}
			onClick={clickable ? handleClick : null}>
			{groups.map((group, index) => {
				const labelId = `${id}-${index}`;
				return (
					<li key={group} data-group={group} data-index={index}>
						<div
							className={`Chart__legendCheck ${getBgClass(
								group,
								null,
								null,
								getColorClass('bg', colorVariant, colorOption, index)
							)}`}
							tabIndex={clickable ? 0 : -1}
							role="checkbox"
							aria-checked={!selected || selected.length === 0 || selected.includes(group)}
							aria-labelledby={labelId}
						/>
						<p id={labelId} aria-hidden>
							{formatter(group)}
						</p>
					</li>
				);
			})}
		</ul>
	);
};

Legend.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	groups: PropTypes.array,
	formatter: PropTypes.func,
	direction: PropTypes.oneOf(['horizontal', 'vertical']),
	clickable: PropTypes.bool,
	selected: PropTypes.array,
	color: colorPropType,
	getBgClass: PropTypes.func,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
};

Legend.defaultProps = {
	direction: 'horizontal',
};

export default Legend;
