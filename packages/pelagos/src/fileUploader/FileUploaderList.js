import PropTypes from 'prop-types';

import './FileUploader.less';

/** A list of files in a file uploader. */
const FileUploaderList = ({className, children, ...props}) => (
	<ul {...props} className={`FileUploader__files${className ? ` ${className}` : ''}`}>
		{children}
	</ul>
);

FileUploaderList.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The child elements. */
	children: PropTypes.node,
};

export default FileUploaderList;
