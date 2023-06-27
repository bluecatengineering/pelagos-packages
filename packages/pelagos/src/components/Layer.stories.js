import Layer from './Layer';

export default {
	title: 'Components/Layer',
	component: Layer,
};

const TestComponent = () => <div style={{padding: '16px', backgroundColor: 'var(--layer)'}}>Layer</div>;

export const Default = {
	render: () => (
		<Layer style={{alignSelf: 'stretch'}}>
			<TestComponent />
			<Layer>
				<TestComponent />
				<Layer>
					<TestComponent />
				</Layer>
			</Layer>
		</Layer>
	),
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
