import setLiveText from '../../src/functions/setLiveText';

jest.unmock('../../src/functions/setLiveText');

describe('setLiveText', () => {
	it('sets text on a live element', () => {
		setLiveText('Test1');
		expect(document.body.lastChild).toMatchSnapshot();

		setLiveText('Test2');
		expect(document.body.lastChild).toMatchSnapshot();
	});
});
