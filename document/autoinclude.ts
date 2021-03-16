
import path from 'path';

export default 
[
  // this will result in: import React from 'react'
  { import: 'React', from: 'react' },
  // this is required for equations
  {
    import: ['E', 'Equation'],
    from: path.resolve(__dirname, '../src/components/math'),
  },
];
