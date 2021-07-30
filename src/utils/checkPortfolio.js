import fs from "fs";

//checking if setup is initiated
export default function checkPortfolio() {
  try {
    fs.openSync("portfolio.json");

    return 1;
  } catch (error) {
    console.error("\nPlease setup!\ncommand: crypto-data -p <filepath>\n");

    return 0;
  }
}
