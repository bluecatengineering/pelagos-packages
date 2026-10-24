// based on https://gist.github.com/slavikshen/7b29b06215b9e7a08455
const getInnerText = (node) => {
	let buf = '';
	const type = typeof node;
	// check the type first, 0 must not be skipped
	if (type === 'string' || type === 'number') {
		buf += node;
	} else if (node && type === 'object') {
		if (Array.isArray(node)) {
			node.forEach((item) => (buf += getInnerText(item)));
		} else if (node.props) {
			buf += getInnerText(node.props.children);
		}
	}
	return buf;
};

export default getInnerText;
