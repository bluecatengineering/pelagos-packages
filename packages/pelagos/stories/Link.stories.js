import Launch from '@carbon/icons-react/es/Launch';

export default {
	title: 'Components/Link',
};

export const Default = {args: {text: 'Link'}, render: ({text}) => <a href="#">{text}</a>};

export const WithIcon = {
	args: {text: 'Link with icon'},
	render: ({text}) => (
		<a href="#">
			{text} <Launch className="LinkIcon" />
		</a>
	),
};
