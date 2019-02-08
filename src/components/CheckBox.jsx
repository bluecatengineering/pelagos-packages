import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import './CheckBox.less';

export default class CheckBox extends PureComponent {
	static propTypes = {
		componentId: PropTypes.string,
		className: PropTypes.string,
		label: PropTypes.string,
		checked: PropTypes.bool,
		disabled: PropTypes.bool,
		error: PropTypes.bool,
		onChange: PropTypes.func,
	};

	handleClick = event => (this.props.disabled ? null : this.props.onChange(event));

	handleKeyDown = event =>
		this.props.disabled || event.keyCode !== 32 ? null : (event.preventDefault(), this.props.onChange(event));

	render() {
		const {componentId, className, label, checked, disabled, error} = this.props;
		return (
			<span
				data-bcn-id={componentId}
				className={'CheckBox ' + className + (!disabled && error ? ' CheckBox--error' : '')}
				role="checkbox"
				aria-disabled={disabled}
				aria-checked={!!checked}
				tabIndex={disabled ? -1 : 0}
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}>
				{label}
			</span>
		);
	}
}
