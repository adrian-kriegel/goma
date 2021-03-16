

// @ts-ignore
import mathjax from 'mathjax-node';

mathjax.start();

interface TypesetResult
{
  errors: string[] | undefined, 
  svg: string | undefined,
  mml: any
}

/**
 * 
 * @param tex latex math
 * @param format svg, mml
 * @returns svg string 
 */
export default function tex2svg(
  tex : string,
  format: 'svg' | 'mml',
) : Promise<string>
{
  return new Promise((resolve, reject) => 
  {
    mathjax.typeset(
      {
        math: tex,
        format: 'TeX',
        [format]: true,
      },
      (data : TypesetResult) => 
      {
        if (data.errors)
        {
          for (const message of data.errors)
          {
            console.error(message);
          }
        }

        resolve(data[format]);
      }
    );
  });
}
