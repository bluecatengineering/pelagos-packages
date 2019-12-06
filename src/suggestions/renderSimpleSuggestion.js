import React from 'react';

import __ from '../strings';

import {Suggestion} from './Suggestion';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({name}) => <Suggestion name={name} description={__('MEMBER')} />;
