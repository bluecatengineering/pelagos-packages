import * as icons from '../src/icons';
import SvgIcon from '../src/components/SvgIcon';

import './Icons-stories.less';

export const Icons = () => (
	<div>
		<h2>Icons</h2>
		<div className="Icons">
			{Object.entries(icons).map(([key, icon]) => (
				<div key={key} className="Icons__card">
					<SvgIcon className="Icons__icon" icon={icon} />
					<div>{key}</div>
				</div>
			))}
		</div>
	</div>
);

export default {
	title: 'Icons',
};
