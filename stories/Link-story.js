// eslint-disable-next-line react/prop-types
export const Normal = ({text}) => <a href="#">{text}</a>;
Normal.args = {text: 'Link'};

export default {
	title: 'Components/Link',
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
