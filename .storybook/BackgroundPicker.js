import React from 'react';

import {MIDNIGHT, OXFORD, PRUSSIAN, WHITE} from '../src/Colors';

import './BackgroundPicker.less';

const options = [
	{name: 'Oxford (form)', fg: WHITE, bg: OXFORD, default: true},
	{name: 'Prussian (details)', fg: WHITE, bg: PRUSSIAN},
	{name: 'Midnight (page)', fg: WHITE, bg: MIDNIGHT},
];

const setColors = (fg, bg) => ((document.body.style.color = fg), (document.body.style.backgroundColor = bg));

const BackgroundPicker = () => (
	<div className="BackgroundPicker">
		{options.map(({name, fg, bg}) => (
			<div
				key={bg}
				className="BackgroundPicker__swatch"
				style={{backgroundColor: bg}}
				title={name}
				onClick={() => setColors(fg, bg)}
			/>
		))}
	</div>
);

export default BackgroundPicker;