export function parse(toParse: string) {
  return new Date(Date.parse(toParse));
}

export function format(date: Date | string) {
  if (typeof date === "string") date = parse(date);
  return `${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`;
}
