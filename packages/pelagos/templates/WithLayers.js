import PropTypes from 'prop-types';
import Layers from '@carbon/icons-react/es/Layers';

import {Layer} from '../src';

import './WithLayers.less';

const WithLayers = ({align = 'stretch', children}) => (
	<div className="WithLayers">
		<div className="WithLayers__label">
			<Layers />
			Layer 1
		</div>
		<div className={`WithLayers__content WithLayers--${align}`}>
			{children(0)}

			<Layer className="WithLayers">
				<div className="WithLayers__label">
					<Layers />
					Layer 2
				</div>
				<div className={`WithLayers__content WithLayers--${align}`}>
					{children(1)}

					<Layer className="WithLayers">
						<div className="WithLayers__label">
							<Layers />
							Layer 3
						</div>
						<div className={`WithLayers__content WithLayers--${align}`}>{children(2)}</div>
					</Layer>
				</div>
			</Layer>
		</div>
	</div>
);

WithLayers.propTypes = {
	align: PropTypes.oneOf(['stretch', 'start']),
	children: PropTypes.func,
};

export default WithLayers;
