
import {getOptions} from 'loader-utils';

import tex2react from './tex2react';


type AutoInclude = string |
{
  import: string | string[];
  from: string;
}

type AutoIncludeArray = AutoInclude[];

/**
 * 
 * @param imports what to include
 * @returns imports string
 */
function generateImports(
  imports : AutoIncludeArray
) : string
{
  let res = '';

  for (const statement of imports)
  {
    if (typeof(statement) === 'string')
    {
      res += `import '${statement}';`;
    }
    else 
    {
      let fields;

      if (typeof(statement.import) === 'string')
      {
        fields = statement.import;
      }
      else 
      {
        fields = `{${statement.import.join(', ')}}`;
      }

      res += `import ${fields} from '${statement.from}';\n`;
    }
  }

  return res;
}

/**
 * @returns source code with inline latex svgs
 * @param file file string
 * @param tag tag name
 * @param startIndex where to start
 */
async function replaceEquations(
  file : string,
  tag : string,
  startIndex = 0
) : Promise<string>
{
  const start = file.indexOf('<' + tag, startIndex);
  const end = file.indexOf('</' + tag + '>', start);

  const contentStart = file.indexOf('>', start) + 1;

  if (start == -1 || contentStart == -1)
  {
    return file;
  }

  if (end == -1)
  {
    throw new Error('unmatched equation tag');
  }

  const content = file.substr(
    contentStart,
    end - contentStart
  );

  const math = await tex2react(content);
 
  return file.substr(0, contentStart) +
    math +
    await replaceEquations(
      file.substr(end, file.length),
      tag,
      end,
    )
  ;
}

/**
 * @param file file text
 * @param callback callback
 * @returns void
 */
function replaceAllEquations(
  file : string,
  callback : (result: string) => void,
) : void
{
  replaceEquations(file, 'Equation')
    .then( (text) => replaceEquations(text, 'E')
      .then(callback)
    )
  ;
}

/**
 * Splits file into imports and document
 * 
 * @param file file source
 * @returns {string[]} [imports, document]
 */
function splitFile(file : string) : string[]
{
  const beginSequence = '<goma begin />';

  const index = file.indexOf(beginSequence);

  if (index === -1)
  {
    throw new Error(`File is missing ${beginSequence}.`);
  }

  return [
    file.substr(0, index),
    file.substr(index + beginSequence.length, file.length),
  ];
}

/**
 * @param file .gm file contents
 * @returns loaded goma file as js
 */
export default function load(file : string) : void
{
  // @ts-ignore
  const { autoinclude } = getOptions(this);

  // @ts-ignore
  const callback = this.async();

  const [imports, doc] = splitFile(file);

  replaceAllEquations(doc, 
    (replaced) => 
    {
      callback(
        null,
        imports + '\n' +
          generateImports(autoinclude as unknown as AutoIncludeArray) +
          '\n' + 
          'export default function render(props)\n{\n' + 
          'return (<>' + replaced + '</>);' +
          '\n}'
      );
    }
  );
}
