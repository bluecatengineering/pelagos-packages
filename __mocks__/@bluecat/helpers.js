export const animate = jest.fn();
export const buildHighlighter = jest.fn();
export const scrollIntoView = jest.fn();
export const scrollToItem = jest.fn();
export const smoothScroll = jest.fn();

export const getLogger = jest.fn(() => ({
	logError: jest.fn(),
	logInfo: jest.fn(),
	logDebug: jest.fn(),
}));
