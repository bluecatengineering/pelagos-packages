import {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import DocumentBlank from '@carbon/icons-react/es/DocumentBlank';
import Folder from '@carbon/icons-react/es/Folder';

import LabelLine from '../components/LabelLine';
import Layer from '../components/Layer';
import loremIpsumShort from '../../stories/LoremIpsumShort';

import TreeView from './TreeView';
import TreeNode from './TreeNode';

import './TreeView.stories.less';

export default {
	title: 'Experimental/TreeView',
	component: TreeView,
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};

const nodes = [
	{id: '0', fill: 23},
	{
		id: '1',
		fill: 95,
		expanded: true,
		children: [
			{id: '1-0', fill: 48},
			{
				id: '1-1',
				fill: 14,
				expanded: true,
				children: [
					{id: '1-1-0', label: `Node 1-1-0 - ${loremIpsumShort}`, fill: 61},
					{id: '1-1-1', fill: 52},
					{id: '1-1-2', fill: 86},
				],
			},
		],
	},
	{id: '2', label: `Node 2 - ${loremIpsumShort}`, fill: 55},
	{id: '3', fill: 8, expanded: false},
];

const getLabel = (id, label) => label || `Node ${id}`;

const renderNodes = (nodes) =>
	nodes.map(({id, label, expanded, children}) => (
		<TreeNode key={id} id={id} label={getLabel(id, label)} expanded={expanded}>
			{children && renderNodes(children)}
		</TreeNode>
	));

const renderNodesWithIcons = (nodes) =>
	nodes.map(({id, label, expanded, children}) => (
		<TreeNode
			key={id}
			id={id}
			label={getLabel(id, label)}
			icon={expanded === undefined ? DocumentBlank : Folder}
			expanded={expanded}>
			{children && renderNodesWithIcons(children)}
		</TreeNode>
	));

const renderComplexNodes = (nodes) =>
	nodes.map(({id, label, fill, expanded, children}) => {
		const labelText = getLabel(id, label);
		return (
			<TreeNode
				key={id}
				id={id}
				labelClassName="TreeViewStories__label"
				label={
					<>
						<span className="TreeViewStories__text" title={labelText}>
							{labelText}
						</span>
						<span className="TreeViewStories__bar">
							<span className="TreeViewStories__barFill" style={{width: `${fill}px`}} />
						</span>
					</>
				}
				expanded={expanded}>
				{children && renderComplexNodes(children)}
			</TreeNode>
		);
	});

export const Default = {
	args: {
		size: 'sm',
		selected: ['1', '1-1', '1-1-1'],
		children: renderNodes(nodes),
	},
};

export const WithIcons = {
	args: {
		size: 'sm',
		selected: ['1', '1-1', '1-1-1'],
		children: renderNodesWithIcons(nodes),
	},
};

export const WithComplexLabels = {
	args: {
		size: 'sm',
		selected: ['1', '1-1', '1-1-1'],
		children: renderComplexNodes(nodes),
	},
};

export const Loading = {
	args: {
		size: 'sm',
		selected: null,
		children: [<TreeNode key="0" id="0" label="Node 0" />, <TreeNode key="1" id="1" label="Node 1" loading expanded />],
	},
};

const generateNodes = (parent) => {
	const prefix = parent ? `${parent}-` : '';
	const reversed = /3$/.test(parent);
	const nodes = [];
	for (let i = 0; i < 5; ++i) {
		const id = `${prefix}${i}`;
		const label = getLabel(id);
		if (reversed) {
			nodes.push(
				!(i % 2) ? (
					<ParentNode key={id} id={id} label={label} />
				) : (
					<TreeNode key={id} id={id} label={label} icon={DocumentBlank} />
				)
			);
		} else {
			nodes.push(
				i % 2 ? (
					<ParentNode key={id} id={id} label={label} />
				) : (
					<TreeNode key={id} id={id} label={label} icon={DocumentBlank} />
				)
			);
		}
	}
	return nodes;
};

const ParentNode = ({id, label}) => {
	const [expanded, setExpanded] = useState(false);
	const [loading, setLoading] = useState(false);
	const [children, setChildren] = useState(null);
	const handleToggle = useCallback(
		() =>
			setExpanded((expanded) => {
				if (!expanded && !children) {
					setLoading(true);
					setTimeout(() => {
						setChildren(generateNodes(id));
						setLoading(false);
					}, 500);
				}
				return !expanded;
			}),
		[children, id]
	);
	return (
		<TreeNode id={id} label={label} icon={Folder} expanded={expanded} loading={loading} onToggle={handleToggle}>
			{children}
		</TreeNode>
	);
};

ParentNode.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
};

const wiredNodes = generateNodes('');

const WiredComponent = () => {
	const [selected, setSelected] = useState(null);
	return (
		<>
			<LabelLine id="label" text="Tree view" />
			<Layer className="TreeViewStories__layer">
				<TreeView selected={selected} aria-labelledby="label" onSelect={setSelected}>
					{wiredNodes}
				</TreeView>
			</Layer>
		</>
	);
};

export const TryItOut = {
	name: 'Try it out!',
	render: () => <WiredComponent />,
};
