// eslint-disable-next-line react/prop-types -- false positive, this is not a component
export const Normal = ({text}) => <a href="#">{text}</a>;
Normal.args = {text: 'Link'};

export default {
	title: 'Components/Link',
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
