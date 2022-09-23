import passSideNavActive from '../../src/sideNav/passSideNavActive';
import SideNavItems from '../../src/sideNav/SideNavItems';

jest.unmock('../../src/sideNav/passSideNavActive');

describe('passSideNavActive', () => {
	it('returns a new array when sideNavActive is true', () => {
		expect(passSideNavActive(true, [<SideNavItems key={1} />, <div key={2} />, 'test'])).toEqual([
			<SideNavItems key={1} sideNavActive />,
			<div key={2} />,
			'test',
		]);
	});

	it('returns the same children when sideNavActive is false', () => {
		const children = {};
		expect(passSideNavActive(false, children)).toBe(children);
	});
});
