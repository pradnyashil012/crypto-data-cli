//returns epoch date
export default function dateParser(rawDate) {
  if (!rawDate) return;
  if (!(rawDate.length === 10 && rawDate[2] === "/" && rawDate[5] === "/"))
    return;

  const [dd, mm, yyyy] = rawDate.split("/").map((e) => Number(e));

  let date = new Date(yyyy, mm - 1, dd);

  // console.log(date.getTime() / 1000);

  return date.getTime() / 1000;
}
