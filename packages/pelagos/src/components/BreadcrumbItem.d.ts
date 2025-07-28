import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface BreadcrumbItemProps extends HTMLProps<HTMLLinkElement> {
	/** The href attribute for the link. If not specified, the child must be a link. */
	href?: string;
	/** Either the text for the link if href is specified or a link element otherwise. */
	children?: ReactNode;
}

/** An item in a Breadcrumb. */
declare const BreadcrumbItem: FunctionComponent<BreadcrumbItemProps>;
export default BreadcrumbItem;
