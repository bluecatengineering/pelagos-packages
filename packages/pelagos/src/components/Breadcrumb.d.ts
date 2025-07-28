import type {FunctionComponent, ReactNode} from 'react';

interface BreadcrumbProps {
	/** The title of the current page. */
	title?: string;
	/** The breadcrumb items. */
	children: ReactNode;
}

/** A page hierarchy trail. */
declare const Breadcrumb: FunctionComponent<BreadcrumbProps>;
export default Breadcrumb;
