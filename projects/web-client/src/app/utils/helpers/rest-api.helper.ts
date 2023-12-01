export function buildGetQuery(queryData: { [key: string]: any }): string {
  return Object.entries(queryData).reduce((acc, data) => {
    const [ key, value ] = data;
    return `${acc.length > 0 ? acc + '&' : acc }${key}=${value}`
  }, "");
}