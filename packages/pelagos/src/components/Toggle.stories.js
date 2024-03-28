import {useCallback, useState} from 'react';

import Toggle from './Toggle';
import Button from './Button';

export default {
	title: 'Components/Toggle',
	component: Toggle,
};

export const Default = {
	args: {'aria-label': 'Default'},
};

export const Checked = {
	args: {'aria-label': 'Checked', checked: true},
};

export const Disabled = {
	args: {'aria-label': 'Disabled', disabled: true},
};

const WiredComponent = () => {
	const [checked, setChecked] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const handleChange = useCallback(() => setChecked((o) => !o), []);
	const handleClick = useCallback(() => setDisabled((o) => !o), []);

	return (
		<>
			<Toggle checked={checked} onChange={handleChange} disabled={disabled} />
			<Button style={{marginTop: '16px'}} text="Disable toggle" type="primary" onClick={handleClick} />
		</>
	);
};

export const TryItOut = {
	name: 'Try it out!',
	render: () => <WiredComponent />,
};
