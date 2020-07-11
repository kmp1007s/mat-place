export function parse(toParse: string) {
  return new Date(Date.parse(toParse));
}

export function format(date: Date | string) {
  if (typeof date === "string") date = parse(date);

  // month 0부터 시작
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}
