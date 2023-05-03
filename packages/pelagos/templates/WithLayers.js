import PropTypes from 'prop-types';
import {faLayerGroup} from '@fortawesome/free-solid-svg-icons';

import {Layer, SvgIcon} from '../src';

import './WithLayers.less';

const WithLayers = ({align, children}) => (
	<div className="WithLayers">
		<div className="WithLayers__label">
			<SvgIcon icon={faLayerGroup} />
			Layer 1
		</div>
		<div className={`WithLayers__content WithLayers--${align}`}>
			{children(0)}

			<Layer className="WithLayers">
				<div className="WithLayers__label">
					<SvgIcon icon={faLayerGroup} />
					Layer 2
				</div>
				<div className={`WithLayers__content WithLayers--${align}`}>
					{children(1)}

					<Layer className="WithLayers">
						<div className="WithLayers__label">
							<SvgIcon icon={faLayerGroup} />
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

WithLayers.defaultProps = {
	align: 'stretch',
};

export default WithLayers;
