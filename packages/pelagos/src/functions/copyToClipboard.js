/**
 * Copies the specified text to the clipboard.
 * @param {string} text the text to copy.
 * @returns {Promise<void>} a `Promise` which is resolved once the clipboard's contents have been updated.
 *
 * @example
 * import {useCallback} from 'react';
 * import {copyToClipboard} from '@bluecateng/pelagos';
 *
 * const Example = ({text}) => {
 *   const handleClick = useCallback(() => copyToClipboard(text).catch(), [text]);
 *   return <button onClick={handleClick}>...</button>;
 * }
 */
const copyToClipboard = (text) => navigator.clipboard.writeText(text);

export default copyToClipboard;
