import {shallow} from 'enzyme';

import DetailsList from '../../src/components/DetailsList';

jest.unmock('../../src/components/DetailsList');

describe('DetailsList', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<DetailsList
					id="test"
					className="TestClass"
					label="Test Label"
					list={['site1', 'site2']}
					renderItem={(item, className) => (
						<div key={item} className={className}>
							{item}
						</div>
					)}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
