
import tex2image from './tex2image';

/**
 * @param tex tex
 * @returns react jsx string
 */
export default async function svg2react(tex : string) : Promise<string>
{
  const svg = await tex2image(tex, 'svg');

  const base64 = Buffer.from(svg).toString('base64');

  const jsx = `<img src="data:image/svg+xml;base64,${base64}" />`;

  return jsx;
}
