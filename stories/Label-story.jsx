import React from 'react';
import {storiesOf} from '@storybook/react';

import {Label} from '../src';

storiesOf('Label', module).add('all states', () => <Label text="Label" />);
