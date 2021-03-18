

export interface Bibliography
{
  [id: string]:
  {
    author?: string;
    title?: string;
    date?: string;
    [field: string]: string | number | undefined;
  }
}
