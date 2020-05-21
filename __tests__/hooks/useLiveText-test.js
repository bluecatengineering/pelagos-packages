import useLiveText from '../../src/hooks/useLiveText';

jest.unmock('../../src/hooks/useLiveText');

describe('useLiveText', () => {
	it('sets text on a live element', () => {
		const setLiveText1 = useLiveText();
		const setLiveText2 = useLiveText();

		setLiveText1('Test1');
		expect(document.body.lastChild).toMatchSnapshot();
		setLiveText2('Test2');
		expect(document.body.lastChild).toMatchSnapshot();
	});
});
