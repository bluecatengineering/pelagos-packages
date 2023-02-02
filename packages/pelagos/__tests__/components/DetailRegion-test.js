import {shallow} from 'enzyme';

import DetailRegion from '../../src/components/DetailRegion';

jest.unmock('../../src/components/DetailRegion');

describe('DetailRegion', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<DetailRegion label="Test Label">
					<div />
				</DetailRegion>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<DetailRegion
					id="test"
					className="TestClass"
					level="h4"
					label="Test Label"
					infoText="Test info"
					infoTextPlacement="bottom">
					<div />
				</DetailRegion>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
