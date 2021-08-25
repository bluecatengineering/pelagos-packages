import {shallow} from 'enzyme';

import ConfirmDialog from '../../src/components/ConfirmDialog';

jest.unmock('../../src/components/ConfirmDialog');

describe('ConfirmDialog', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<ConfirmDialog className="TestClass" title="Title" body="Body" confirmText="Confirm" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onClose when the close button is clicked', () => {
			const onClose = jest.fn();
			const wrapper = shallow(<ConfirmDialog onClose={onClose} />);
			wrapper.find('#closeDialogBtn').prop('onClick')();
			expect(onClose).toHaveBeenCalledTimes(1);
		});

		it('calls onConfirm when the close button is clicked', () => {
			const onConfirm = jest.fn();
			const wrapper = shallow(<ConfirmDialog onConfirm={onConfirm} />);
			wrapper.find('#confirmBtn').prop('onClick')();
			expect(onConfirm).toHaveBeenCalledTimes(1);
		});
	});
});
