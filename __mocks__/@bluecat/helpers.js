export const buildHighlighter = jest.fn();
export const smoothScroll = jest.fn();

export const getLogger = jest.fn(() => ({
	logError: jest.fn(),
	logInfo: jest.fn(),
	logDebug: jest.fn(),
}));
