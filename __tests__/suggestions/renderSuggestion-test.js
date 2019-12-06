import renderSuggestion from '../../src/suggestions/renderSuggestion';

jest.unmock('../../src/suggestions/renderSuggestion');

describe('renderSuggestion', () => {
	it('renders expected elements', () => {
		expect(renderSuggestion({id: '0', name: 'Test', description: 'test'})).toMatchSnapshot();
	});
});
