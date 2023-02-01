import {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';

import useRandomId from '../hooks/useRandomId';

import SelectNative from './SelectNative';
import IconButton from './IconButton';

import './Pagination.less';

const {ceil, max, min} = Math;

const renderUnknownRange = (min, max) => t`${min}-${max} items`;
const renderKnownRange = (min, max, total) => t`${min}-${max} of ${total} items`;

/** Component to perform pagination. */
const Pagination = ({id, className, page, pageSize, pageSizes, totalItems, onPageChange, onPageSizeChange}) => {
	id = useRandomId(id);

	const pageSizeId = `${id}-pageSize`;
	const pageId = `${id}-page`;
	const maxIndex = page * pageSize;
	const minIndex = maxIndex - pageSize + 1;
	const unknownSize = totalItems === null || totalItems === undefined;
	const totalPages = unknownSize ? Infinity : max(ceil(totalItems / pageSize), 1);
	const pages = useMemo(() => {
		const list = [];
		if (isFinite(totalPages))
			for (let i = 1; i <= totalPages; ++i) {
				list.push(i);
			}
		return list;
	}, [totalPages]);
	const handlePageSizeChange = useCallback(({target}) => onPageSizeChange(+target.value), [onPageSizeChange]);
	const handlePageChange = useCallback(({target}) => onPageChange(+target.value), [onPageChange]);
	const handlePreviousClick = useCallback(() => onPageChange(page - 1), [onPageChange, page]);
	const handleNextClick = useCallback(() => onPageChange(page + 1), [onPageChange, page]);
	return (
		<div id={id} className={`Pagination${className ? ` ${className}` : ''}`}>
			<div className="Pagination__start">
				{pageSizes && (
					<div className="Pagination__pageSize">
						<label htmlFor={pageSizeId}>{t`Items per page`}</label>
						<SelectNative id={pageSizeId} onChange={handlePageSizeChange}>
							{pageSizes.map((n) => (
								<option key={n} value={n} selected={n === pageSize}>
									{n}
								</option>
							))}
						</SelectNative>
					</div>
				)}
				<div className="Pagination__count">
					{unknownSize
						? renderUnknownRange(minIndex, maxIndex)
						: renderKnownRange(minIndex, min(maxIndex, totalItems), totalItems)}
				</div>
			</div>
			<div className="Pagination__end">
				{unknownSize ? (
					<div>{t`page ${page}`}</div>
				) : (
					<>
						<label htmlFor={pageId}>{t`page`}</label>
						<SelectNative id={pageId} onChange={handlePageChange}>
							{pages.map((n) => (
								<option key={n} value={n} selected={n === page}>
									{n}
								</option>
							))}
						</SelectNative>
						<div>{t`of ${totalPages}`}</div>
					</>
				)}
				<div className="Pagination__buttons">
					<IconButton id={`${id}-prev`} icon={faChevronLeft} disabled={page === 1} onClick={handlePreviousClick} />
					<IconButton
						id={`${id}-next`}
						icon={faChevronRight}
						disabled={page === totalPages}
						onClick={handleNextClick}
					/>
				</div>
			</div>
		</div>
	);
};

Pagination.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The current page number, starts from 1. */
	page: PropTypes.number.isRequired,
	/** The current page size. */
	pageSize: PropTypes.number.isRequired,
	/** The page size options. */
	pageSizes: PropTypes.arrayOf(PropTypes.number),
	/** The total number of items. */
	totalItems: PropTypes.number,
	/** Function invoked when the page changes. */
	onPageChange: PropTypes.func,
	/** Function invoked when the page size changes. */
	onPageSizeChange: PropTypes.func,
};

export default Pagination;
