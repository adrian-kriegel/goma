
import React from 'react';

import { render } from 'react-dom';

import Doc from './document.gm';

import 'typeface-libre-baskerville';

import './style.scss';

import './paged.scss';

render(<Doc/>, document.getElementById('root'));
