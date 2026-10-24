import {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import Close from '@carbon/icons-react/es/Close';

import useRandomId from '../hooks/useRandomId';

import './Tag.less';

export const types = [
	'red',
	'magenta',
	'purple',
	'blue',
	'cyan',
	'teal',
	'green',
	'gray',
	'cool-gray',
	'warm-gray',
	'cyan-gray',
	'high-contrast',
	'outline',
];

/** A tag. */
const Tag = forwardRef(
	(
		{
			id,
			className,
			size = 'md',
			type = 'gray',
			icon: Icon,
			text,
			tagTitle,
			removeTitle,
			children,
			onClick,
			onRemove,
			...props
		},
		ref
	) => {
		id = useRandomId(id);
		const fullClassName = `Tag Tag--${size} Tag--${type}${onRemove ? ' Tag--removable' : ''}${
			className ? ` ${className}` : ''
		}`;
		const icon = Icon ? <Icon className="Tag__icon" /> : null;
		const content = <span title={tagTitle || text}>{text || children}</span>;
		// The remove button needs its own name, otherwise it is announced like the tag itself.
		// The variable is called name so the message is the existing "Remove {name}", which is already translated.
		const name = text;
		const removeLabel = removeTitle || (name ? t`Remove ${name}` : null);
		return onClick ? (
			<button {...props} id={id} className={fullClassName} type="button" onClick={onClick} ref={ref}>
				{icon}
				{content}
			</button>
		) : (
			<div {...props} id={id} className={fullClassName} ref={ref}>
				{icon}
				{content}
				{onRemove && (
					<button
						className="Tag__remove"
						type="button"
						title={removeLabel}
						aria-label={removeLabel}
						aria-labelledby={removeLabel ? null : id}
						onClick={onRemove}>
						<Close />
					</button>
				)}
			</div>
		);
	}
);

Tag.displayName = 'Tag';

Tag.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The tag size. */
	size: PropTypes.oneOf(['sm', 'md']),
	/** The tag type. */
	type: PropTypes.oneOf(types),
	/** The tag icon. */
	icon: PropTypes.elementType,
	/** The tag text. */
	text: PropTypes.string,
	/** The tag title if different from the text. */
	tagTitle: PropTypes.string,
	/** The title and accessible name for the remove button, the default is "Remove" followed by the text. */
	removeTitle: PropTypes.string,
	/** @deprecated use text instead. */
	children: PropTypes.node,
	/** Function invoked when the tag is clicked. */
	onClick: PropTypes.func,
	/** Function invoked when the remove button is clicked. Can't be used at the same time as onClick. The remove button is displayed only when this property is not null. */
	onRemove: PropTypes.func,
};

export default Tag;
