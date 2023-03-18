import {Layer} from '../src';

export default {
	title: 'Components/Layer',
	component: Layer,
};

export const Default = () => (
	<Layer style={{alignSelf: 'stretch', backgroundColor: 'var(--layer)'}}>
		<div style={{padding: '16px'}}>Layer</div>
		<Layer style={{backgroundColor: 'var(--layer)'}}>
			<div style={{padding: '16px'}}>Layer</div>
			<Layer style={{backgroundColor: 'var(--layer)'}}>
				<div style={{padding: '16px'}}>Layer</div>
			</Layer>
		</Layer>
	</Layer>
);
