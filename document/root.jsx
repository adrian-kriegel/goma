
import React from 'react';

import { render } from 'react-dom';

import bibliography from './bib/bibliography.bib';

import { useBibliography } from '../src/components/citation'

import Doc from './document.gm';

import 'typeface-libre-baskerville';

import './style.scss';

import './paged.scss';

useBibliography(bibliography);

render(<Doc/>, document.getElementById('root'));
