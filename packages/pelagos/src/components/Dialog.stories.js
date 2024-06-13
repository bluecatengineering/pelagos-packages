import {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {Title, Subtitle, Description, Canvas, Controls} from '@storybook/blocks';

import body from '../../stories/LoremIpsum';
import loremIpsumShort from '../../stories/LoremIpsumShort';
import VerticalTabList from '../tabs/VerticalTabList';
import VerticalTab from '../tabs/VerticalTab';

import Dialog from './Dialog';
import Button from './Button';

export default {
	title: 'Components/Dialog',
	component: Dialog,
	parameters: {
		controls: {hideNoControlsWarning: true},
		docs: {
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description />
					<Canvas of={TryItOut} />
					<Controls />
				</>
			),
		},
	},
};

export const Default = {
	args: {
		title: 'Title',
		children: [
			<div key="body">
				<p>{body}</p>
			</div>,
			<div key="buttons">
				<Button text="Button" type="primary" />
			</div>,
		],
		onSubmit: null,
	},
};

export const WithForm = {
	args: {
		title: 'Title',
		children: [
			<div key="body">
				<p>{body}</p>
			</div>,
			<div key="buttons">
				<Button text="Button" type="primary" />
			</div>,
		],
	},
};

const tabTitles = ['Tab one', 'Tab two', 'Tab three', 'Tab four'];

const TabsBody = ({className}) => {
	const [index, setIndex] = useState(0);
	return (
		<div className={className} style={{flexDirection: 'row', gap: '24px'}}>
			<VerticalTabList style={{width: '16em'}} selectedIndex={index} onChange={setIndex}>
				<VerticalTab>Tab label one</VerticalTab>
				<VerticalTab>Tab label two</VerticalTab>
				<VerticalTab secondaryLabel="Optional" error>
					Tab label three
				</VerticalTab>
				<VerticalTab secondaryLabel="Optional">Tab label four</VerticalTab>
			</VerticalTabList>
			<div style={{flex: 1}}>
				<h3>{tabTitles[index]}</h3>
				<p>{loremIpsumShort}</p>
			</div>
		</div>
	);
};

TabsBody.propTypes = {className: PropTypes.string};

export const WithVerticalTabs = {
	args: {
		title: 'Title',
		children: [
			<TabsBody key="body" />,
			<div key="buttons">
				<Button text="Button" type="primary" />
			</div>,
		],
		onSubmit: null,
	},
};

const WiredComponent = () => {
	const [visible, setVisible] = useState(false);
	const show = useCallback(() => setVisible(true), []);
	const hide = useCallback(() => setVisible(false), []);
	return (
		<>
			<Button text="Show dialog" type="primary" onClick={show} />
			{visible && (
				<Dialog title="Title">
					<div>
						<p>{body}</p>
					</div>
					<div>
						<Button text="Close" type="primary" onClick={hide} />
					</div>
				</Dialog>
			)}
		</>
	);
};

export const TryItOut = {
	name: 'Try it out!',
	render: () => <WiredComponent />,
};
