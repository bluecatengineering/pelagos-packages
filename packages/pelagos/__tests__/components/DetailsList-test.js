import {shallow} from 'enzyme';

import DetailsList from '../../src/components/DetailsList';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/components/DetailsList');

useRandomId.mockReturnValue('random-id');

describe('DetailsList', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<DetailsList label="Test Label">
					<div />
				</DetailsList>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<DetailsList
					id="test"
					className="TestClass"
					level="h4"
					label="Test Label"
					infoText="Test info"
					infoTextPlacement="bottom"
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});
	});
});
