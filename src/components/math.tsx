
import React from 'react';

import './math.scss';

/**
 * Inline equation.
 * @param param0 props
 * @returns jsx
 */
export function E({ children } : { children: string }) : JSX.Element
{
  return <span className='eq-inline'>{children}</span>;
}

/**
 * Block equation.
 * @param param0 props
 * @returns jsx
 */
export function Equation({ children } : { children: string }) : JSX.Element
{
  return <div className='eq-block'>{children}</div>;
}
