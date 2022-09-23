import PropTypes from 'prop-types';

import './DetailsTable.less';

/** A table for the details panel. */
const DetailsTable = ({className, rowClassName, title, list, columns}) => (
	<div className={`DetailsTable ${className}`}>
		<h5>{title}</h5>
		<div className={`DetailsTable__headRow ${rowClassName}`}>
			{columns.map(({key, headerClassName, header}) => (
				<div key={key} className={headerClassName}>
					{header}
				</div>
			))}
		</div>
		{list.map((item, index) => (
			<div key={index} className={`DetailsTable__row ${rowClassName}`}>
				{columns.map(({key, valueClassName, valueLong, renderValue}) => {
					const value = renderValue(item, index);
					return (
						<div key={key} className={valueClassName} title={valueLong && value}>
							{value}
						</div>
					);
				})}
			</div>
		))}
	</div>
);

DetailsTable.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The row class name(s). */
	rowClassName: PropTypes.string,
	/** The title text. */
	title: PropTypes.string,
	/** The list to display. */
	list: PropTypes.array,
	/** The column definitions. */
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			/** The column key. */
			key: PropTypes.string,
			/** The column header. */
			header: PropTypes.string,
			/** The header class name(s). */
			headerClassName: PropTypes.string,
			/** The value class name(s). */
			valueClassName: PropTypes.string,
			/** Whether the value could be too long to fit. */
			valueLong: PropTypes.bool,
			/** Function to render the value. */
			renderValue: PropTypes.func,
		})
	),
};

export default DetailsTable;
