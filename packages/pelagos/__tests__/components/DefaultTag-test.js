import DefaultTag from '../../src/components/DefaultTag';
import useTooltip from '../../src/hooks/useTooltip';

jest.unmock('../../src/components/DefaultTag');

describe('DefaultTag', () => {
	describe('rendering', () => {
		it('renders the tag with the class name and its own tooltip', () => {
			const renderTag = jest.fn().mockReturnValue(<div />);
			useTooltip.mockReturnValueOnce('tooltip');
			expect(
				DefaultTag({className: 'TestClass', tag: 'foo', disabled: true, tooltipText: 'Test tooltip', renderTag})
			).toEqual(<div className="TestClass" />);
			expect(renderTag.mock.calls).toEqual([['foo', true, true, null, 'tooltip']]);
			expect(useTooltip.mock.calls).toEqual([['Test tooltip', 'top']]);
		});
	});
});
