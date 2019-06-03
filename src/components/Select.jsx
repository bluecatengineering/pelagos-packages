import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash-es/identity';
import {smoothScroll} from '@bluecat/helpers';
import {faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons';

import SvgIcon from './SvgIcon';
import './Select.less';

export default class Select extends PureComponent {
	static propTypes = {
		id: PropTypes.string,
		componentId: PropTypes.string,
		className: PropTypes.string,
		value: PropTypes.string,
		options: PropTypes.array.isRequired,
		placeholder: PropTypes.string,
		disabled: PropTypes.bool,
		error: PropTypes.bool,
		getOptionValue: PropTypes.func,
		renderOption: PropTypes.func.isRequired,
		onChange: PropTypes.func.isRequired,
	};

	static defaultProps = {
		getOptionValue: identity,
	};

	button = createRef();
	list = createRef();
	baseId = 'e' + ('' + Math.random()).substr(2) + '-';
	searchString = '';
	state = {
		open: false,
	};

	componentDidUpdate(prevProps, prevState) {
		const open = this.state.open;
		if (open !== prevState.open) {
			(open ? this.list.current : this.button.current).focus();
			if (open) {
				this.scrollToItem(this.findFocused());
			}
		}
	}

	handleKeyDown = event => {
		switch (event.keyCode) {
			case 13: // enter
			case 32: // space
			case 38: // up
			case 40: // down
				event.preventDefault();
				this.showList();
				break;
		}
	};

	handleMouseDown = event => {
		event.preventDefault();
		if (this.state.open) {
			this.hideList();
		} else {
			this.showList();
		}
	};

	handleListKeyDown = event => {
		const keyCode = event.keyCode;
		switch (keyCode) {
			case 27: // esc
				event.preventDefault();
				event.nativeEvent.stopImmediatePropagation();
				this.hideList();
				break;
			case 13: // enter
			case 32: // space
				event.preventDefault();
				event.nativeEvent.stopImmediatePropagation();
				this.select(this.state.focused);
				break;
			case 33: {
				// page up
				event.preventDefault();
				event.nativeEvent.stopImmediatePropagation();
				let i;
				const renderedOptions = this.renderedOptions;
				const list = this.list.current;
				const listHeight = list.clientHeight;
				const scrollTop = list.scrollTop;
				if (scrollTop > 0) {
					const optionHeight = list.children[0].offsetHeight;
					const count = Math.floor(listHeight / optionHeight);
					i = Math.max(0, this.findFocused() - count);
					const offset = Math.max(-optionHeight * count, -scrollTop);
					smoothScroll(list, scrollTop, offset, 150);
				} else {
					i = 0;
				}
				this.setState({focused: renderedOptions[i].value});
				break;
			}
			case 34: {
				// page down
				event.preventDefault();
				event.nativeEvent.stopImmediatePropagation();
				let i;
				const renderedOptions = this.renderedOptions;
				const list = this.list.current;
				const listHeight = list.clientHeight;
				const scrollTop = list.scrollTop;
				const scrollMax = list.scrollHeight - listHeight;
				if (scrollTop < scrollMax) {
					const optionHeight = list.children[0].offsetHeight;
					const count = Math.floor(listHeight / optionHeight);
					i = Math.min(renderedOptions.length - 1, this.findFocused() + count);
					const offset = Math.min(optionHeight * count, scrollMax - scrollTop);
					smoothScroll(list, scrollTop, offset, 150);
				} else {
					i = renderedOptions.length - 1;
				}
				this.setState({focused: renderedOptions[i].value});
				break;
			}
			case 35: // end
				event.preventDefault();
				event.nativeEvent.stopImmediatePropagation();
				this.setFocused(this.renderedOptions.length - 1);
				break;
			case 36: // home
				event.preventDefault();
				event.nativeEvent.stopImmediatePropagation();
				this.setFocused(0);
				break;
			case 38: {
				// up
				event.preventDefault();
				event.nativeEvent.stopImmediatePropagation();
				const i = this.findFocused();
				if (i > 0) {
					this.setFocused(i - 1);
				}
				break;
			}
			case 40: {
				// down
				event.preventDefault();
				event.nativeEvent.stopImmediatePropagation();
				const i = this.findFocused();
				if (i < this.renderedOptions.length - 1) {
					this.setFocused(i + 1);
				}
				break;
			}
			default:
				if (keyCode >= 48) {
					event.preventDefault();
					event.nativeEvent.stopImmediatePropagation();
					const i = this.findItemToFocus(keyCode);
					if (i !== -1) {
						this.setFocused(i);
					}
				}
				break;
		}
	};

	handleListMouseOver = event => {
		const value = event.target.dataset.value;
		if (value) {
			this.setState({focused: value});
		}
	};

	handleListClick = event => {
		event.preventDefault();
		this.select(event.target.dataset.value);
	};

	handleListBlur = () => {
		this.hideList();
	};

	select(value) {
		this.hideList();
		this.props.onChange(value);
	}

	showList() {
		const value = this.props.value;
		this.setState({open: true, focused: value ? value : this.renderedOptions[0].value});
	}

	hideList() {
		this.setState({open: false, focused: null});
	}

	findFocused() {
		const focused = this.state.focused;
		return this.renderedOptions.findIndex(o => o.value === focused);
	}

	setFocused(index) {
		this.setState({focused: this.renderedOptions[index].value});
		this.scrollToItem(index);
	}

	scrollToItem(index) {
		const list = this.list.current;
		const listHeight = list.clientHeight;
		if (list.scrollHeight > listHeight) {
			const scrollTop = list.scrollTop;
			const scrollBottom = listHeight + scrollTop;
			const element = list.children[index];
			const elementTop = element.offsetTop;
			const elementBottom = elementTop + element.offsetHeight;
			if (elementBottom > scrollBottom) {
				smoothScroll(list, scrollTop, elementBottom - listHeight - scrollTop, 150);
			} else if (elementTop < scrollTop) {
				smoothScroll(list, scrollTop, elementTop - scrollTop, 150);
			}
		}
	}

	findItemToFocus(keyCode) {
		if (!this.searchString) {
			this.searchIndex = this.findFocused();
		}
		this.searchString += String.fromCharCode(keyCode);
		this.resetClearSearchTimer();

		const children = this.list.current.children;
		let result = this.findInRange(children, this.searchIndex + 1, children.length);
		if (result === -1) {
			result = this.findInRange(children, 0, this.searchIndex);
		}
		return result;
	}

	resetClearSearchTimer() {
		if (this.keyTimer) {
			clearTimeout(this.keyTimer);
		}
		this.keyTimer = setTimeout(() => {
			this.searchString = '';
			this.keyTimer = null;
		}, 500);
	}

	findInRange(list, start, end) {
		for (let i = start; i < end; ++i) {
			if (list[i].textContent.toUpperCase().startsWith(this.searchString)) {
				return i;
			}
		}
		return -1;
	}

	render() {
		const {
			id,
			componentId,
			className,
			value,
			options,
			placeholder,
			disabled,
			error,
			getOptionValue,
			renderOption,
		} = this.props;
		const {open, focused} = this.state;
		const renderedOptions = (this.renderedOptions = options.map(o => ({
			value: getOptionValue(o),
			element: renderOption(o),
		})));
		const selected = value && renderedOptions.find(o => o.value === value);
		return (
			<div className={'Select' + (className ? ' ' + className : '')}>
				<div
					id={id}
					data-bcn-id={componentId}
					className={'Select__text' + (selected ? '' : ' Select__text--empty') + (error ? ' Select__text--error' : '')}
					tabIndex={disabled ? undefined : '0'}
					role="button"
					aria-haspopup="listbox"
					aria-expanded={open}
					aria-disabled={disabled}
					ref={this.button}
					onKeyDown={disabled ? undefined : this.handleKeyDown}
					onMouseDown={disabled ? undefined : this.handleMouseDown}>
					{selected ? selected.element : placeholder}
					<SvgIcon icon={open ? faCaretUp : faCaretDown} className="Select__icon" />
				</div>
				{open && (
					<div
						className="Select__list"
						tabIndex="-1"
						role="listbox"
						aria-activedescendant={this.baseId + focused}
						ref={this.list}
						onKeyDown={this.handleListKeyDown}
						onMouseOver={this.handleListMouseOver}
						onClick={this.handleListClick}
						onBlur={this.handleListBlur}>
						{renderedOptions.map(o => (
							<div
								key={o.value}
								id={this.baseId + o.value}
								className={'Select__option' + (o.value === focused ? ' Select__option--focused' : '')}
								role="option"
								aria-selected={o.value === value}
								data-value={o.value}>
								{o.element}
							</div>
						))}
					</div>
				)}
			</div>
		);
	}
}
