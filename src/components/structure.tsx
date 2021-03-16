
import React, { ReactNode } from 'react';

import './structure.scss';

interface StructureProps
{
  children: ReactNode;
  title?: string;
  type?: string;
}

/**
 * Wraps children in new structure.
 * @param param0 props
 * @returns jsx
 */
export function Structure({ children, title, type } : StructureProps)
{
  return (
    <div className={type}>
      <h2 className='title'>{title}</h2>
      {children}
    </div>
  );
}


/**
 * Wraps children in new chapter.
 * @param props props
 * @returns jsx
 */
export function Chapter(props : StructureProps)
{
  return (
    <Structure
      {...props}
      type='chapter'
    />
  );
}

/**
 * Wraps children in new section.
 * @param props props
 * @returns jsx
 */
export function Section(props : StructureProps)
{
  return (
    <Structure
      {...props}
      type='section'
    />
  );
}
