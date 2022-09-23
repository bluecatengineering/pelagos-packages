import renderSimpleSuggestion from '../../src/suggestions/renderSimpleSuggestion';

jest.unmock('../../src/suggestions/renderSimpleSuggestion');

describe('renderSimpleSuggestion', () => {
	it('renders expected elements', () => {
		expect(renderSimpleSuggestion({id: '0', name: 'Test'})).toMatchSnapshot();
	});
});
