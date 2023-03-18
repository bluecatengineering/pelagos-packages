export default {
	title: 'Components/Link',
};

// eslint-disable-next-line react/prop-types -- false positive, this is not a component
export const Default = ({text}) => <a href="#">{text}</a>;
Default.args = {text: 'Link'};
