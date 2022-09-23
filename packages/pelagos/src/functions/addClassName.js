export default (element, className) =>
	element.props.className ? `${element.props.className} ${className}` : className;
