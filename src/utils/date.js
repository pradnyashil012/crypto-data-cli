//returns epoch date
export default function dateParser(rawDate) {
  if (
    !rawDate ||
    !(rawDate.length === 10 && rawDate[2] === "/" && rawDate[5] === "/")
  ) {
    console.error(
      "\nError: Please provide proper date in \x1b[33mDD/MM/YYYY\x1b[37m format\n"
    );
    process.exit();
  }

  const [dd, mm, yyyy] = rawDate.split("/").map((e) => Number(e));

  let date = new Date(yyyy, mm - 1, dd);

  // console.log(date.getTime() / 1000);

  return date.getTime() / 1000;
}
