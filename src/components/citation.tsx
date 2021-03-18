
import React from 'react';

import * as bibtex from '../util/bibtex';

interface CitationProps
{
  sources: string[];
}

const citations : string[] = [];

let bibliography : bibtex.Bibliography;

/**
 * Set a bibliography.
 * @param bib bibliography
 * @returns void
 */
export function useBibliography(bib : bibtex.Bibliography) : void
{
  bibliography = bib;
}

/**
 * citation
 */
export class Citation
  extends React.Component<CitationProps>
{
  nums : number[] = [];

  /**
   * 
   * @param props props
   */
  constructor(props : CitationProps)
  {
    super(props);

    const sources = props.sources.map((s) => s.toLowerCase());

    for (const source of sources)
    {
      let num = citations.indexOf(source) + 1;

      if (!num)
      {
        citations.push(source);
        num = citations.length;
      }

      this.nums.push(num);
    }

    this.nums = this.nums.sort();
  }

  /**
   * 
   * @returns citation
   */
  render()
  {
    return `[${this.nums.join(',')}]`;
  }
}

/**
 * @param sources one or more sources
 * @returns citation
 */
export function cite(...sources: string[])
{
  return <Citation sources={sources} />;
}

/**
 * @returns bibliography component generated from citations
 */
export function Bibliography()
{
  return (
    <div className='bibliography'>
      <h2>
        Bibliography
      </h2>
      <table>
        {
          citations.map(
            (id, i) => 
            {
              const source = bibliography[id];
      
              let text;
      
              if (source)
              {
                text = (
                  <>
                    <span className='author'>
                      {source.author + ', '}
                    </span>
                    <span className='author'>
                      {source.title + ', '}
                    </span>
                    <span className='author'>
                      {source.date}
                    </span>
                  </>
                );
              }
              else
              {
                text = `COULD NOT FIND ${id} IN BIBLIOGRAPHY`;
              }
      
              return (
                <tr
                  className='bib-entry'
                  key={id}
                >
                  <td className='bib-number'>
                    [{i+1}]
                  </td>
                  <td className='bib-text'>
                    {text}
                  </td>
                </tr>
              );
            }
          )
        }
      </table>
    </div>
  );
}
