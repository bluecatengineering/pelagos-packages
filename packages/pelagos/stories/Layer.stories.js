import {Layer} from '../src';

export const Normal = () => (
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

export default {
	title: 'Components/Layer',
	component: Layer,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
