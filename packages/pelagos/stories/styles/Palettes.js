import {useState} from 'react';

import ContentSwitcher from '../../src/components/ContentSwitcher';
import ContentSwitcherButton from '../../src/components/ContentSwitcherButton';
import colors from '../../defs/colors.yaml';

import './Palettes.less';

const fields = ['normal', 'hover'];

const Palettes = () => {
	const [selected, setSelected] = useState(0);
	const field = fields[selected];
	return (
		<div className="sb-unstyled" data-theme="cg00" data-layer="1">
			<ContentSwitcher className="Palettes__switch" selected={selected} onChange={setSelected}>
				<ContentSwitcherButton text="Main" />
				<ContentSwitcherButton text="Hover" />
			</ContentSwitcher>
			<div className="Palettes__grid">
				{Object.entries(colors)
					.filter(([, v]) => field in v)
					.map(([key, value]) => (
						<div key={key} className="Palettes__color">
							<div className="Palettes__name">{value.css || key}</div>
							{value[field].map((hex, index) => (
								<div
									key={hex}
									className="Palettes__patch"
									style={{color: index < 5 ? 'black' : 'white', backgroundColor: hex}}>
									<div className="Palettes__number">{10 + index * 10}</div>
									<div className="Palettes__hex">{hex}</div>
								</div>
							))}
						</div>
					))}
			</div>
		</div>
	);
};

export default Palettes;
