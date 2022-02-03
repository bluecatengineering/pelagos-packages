import {Provider} from 'react-redux';
import {registerPathActions} from '@bluecat/redux-navigation';

import {Breadcrumb} from '../src';

const store = {getState() {}, subscribe() {}, dispatch() {}};
const homePage = () => null;
const showHome = () => null;

registerPathActions('/', 'Home', showHome, homePage);

const Template = (args) => <Breadcrumb {...args} />;

export const Normal = Template.bind({});
Normal.args = {breadcrumb: [homePage], title: 'Test'};

export default {
	title: 'Components/Breadcrumb',
	component: Breadcrumb,
	decorators: [
		(story) => (
			<Provider store={store}>
				<div style={{marginLeft: '24px'}}>{story()}</div>
			</Provider>
		),
	],
};
