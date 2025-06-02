import {useState} from 'react';
import {action} from '@storybook/addon-actions';

import TabList from './TabList';
import Tab from './Tab';

const handleRemove = action('onRemove');

export default {
	title: 'Components/TabList',
	component: TabList,
	render: (args) => {
		const [selectedIndex, setSelectedIndex] = useState(args.selectedIndex);
		return <TabList {...args} selectedIndex={selectedIndex} onChange={setSelectedIndex} />;
	},
};

export const Default = {
	args: {
		className: 'Story__alignStretch',
		selectedIndex: 0,
		children: [
			<Tab key="a" onRemove={handleRemove}>
				Tab label one
			</Tab>,
			<Tab key="b" onRemove={handleRemove}>
				Tab label two
			</Tab>,
			<Tab key="c">Tab label three</Tab>,
			<Tab key="d">Tab label four</Tab>,
			<Tab key="e">Tab label five</Tab>,
		],
	},
};

export const Contained = {
	args: {
		className: 'Story__alignStretch',
		selectedIndex: 0,
		contained: true,
		children: [
			<Tab key="a" onRemove={handleRemove}>
				Tab label one
			</Tab>,
			<Tab key="b" onRemove={handleRemove}>
				Tab label two
			</Tab>,
			<Tab key="c">Tab label three</Tab>,
			<Tab key="d">Tab label four</Tab>,
			<Tab key="e">Tab label five</Tab>,
		],
	},
};

export const ContainedWithSecondaryLabels = {
	args: {
		className: 'Story__alignStretch',
		selectedIndex: 0,
		contained: true,
		children: [
			<Tab key="a" secondaryLabel="alpha" onRemove={handleRemove}>
				Tab label one
			</Tab>,
			<Tab key="b" secondaryLabel="beta" onRemove={handleRemove}>
				Tab label two
			</Tab>,
			<Tab key="c" secondaryLabel="gamma">
				Tab label three
			</Tab>,
			<Tab key="d" secondaryLabel="delta">
				Tab label four
			</Tab>,
			<Tab key="e" secondaryLabel="epsilon">
				Tab label five
			</Tab>,
		],
	},
};
