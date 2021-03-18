
import { parseBibFile } from 'bibtex';
import { Bibliography } from '../util/bibtex';

/**
 * @param file .bib file contents
 * @returns loaded bib
 */
export default function load(file : string)
{
  const bib = parseBibFile(file);

  const entries : Bibliography = {};

  for (const entry of bib.content as { _id: string }[])
  {
    if (entry._id)
    {
      const bibEntry = bib.getEntry(entry._id);

      if (bibEntry)
      {
        entries[entry._id] = {};

        for (const field of Object.keys(bibEntry.fields))
        {
          entries[entry._id][field] = bibEntry.getFieldAsString(field);
        }
      }
    }
  }

  return JSON.stringify(entries);
}
