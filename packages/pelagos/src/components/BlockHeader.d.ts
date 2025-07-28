import type {FunctionComponent} from 'react';

interface BlockHeaderProps {
	/** The component class name(s). */
	className?: string;
	/** The header text. */
	header: string;
	/** Whether the value has been configured. */
	configured?: boolean;
}

/** Header for a form section, usually as a Collapsible title. */
declare const BlockHeader: FunctionComponent<BlockHeaderProps>;
export default BlockHeader;
