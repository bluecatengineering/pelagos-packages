// based on https://gist.github.com/slavikshen/7b29b06215b9e7a08455
const getInnerText = (node) => {
	let buf = '';
	if (node) {
		const type = typeof node;
		if (type === 'string' || type === 'number') {
			buf += node;
		} else if (type === 'object') {
			if (Array.isArray(node)) {
				node.forEach((item) => (buf += getInnerText(item)));
			} else if (node.props) {
				buf += getInnerText(node.props.children);
			}
		}
	}
	return buf;
};

export default getInnerText;
