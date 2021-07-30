import fs from "fs";

//initiate the application by setup
export default function setup(txnFile) {
  try {
    let data = fs
      .readFileSync(txnFile) //reading the file
      .toString() //converting the entry to a string
      .split("\n") //split the string at \n
      .slice(1) //remove the first line (headings)
      .filter((e) => e.length > 0) //remove empty lines
      .map((e) => e.trim().split(",")); //separates the transactions by , and return an array

    // portfolio = {
    //     "BTC": {
    //         tq: 1.0000,
    //         txn: [
    //             {
    //                 t: 1571965147,
    //                 q: 0.236674,
    //                 s: "W",
    //             }
    //         ]
    //     }
    // };

    let portfolio = new Object();

    data.forEach((e) => {
      const [timestamp, side, token, quantity] = e; //columns taken from transactions.csv

      //initiating
      if (!(token in portfolio))
        portfolio[token] = new Object({
          tq: 0,
          txn: new Array(),
        });

      //returns total quantity of left (balance) token
      portfolio[token].tq += Number(quantity) * (side === "DEPOSIT" ? 1 : -1);

      //creating array of transactions
      portfolio[token].txn.push({
        t: Number(timestamp),
        q: Number(quantity),
        s: side[0],
      });
    });

    //writing the file in JSON
    fs.writeFileSync("portfolio.json", JSON.stringify(portfolio));
  } catch (error) {
    //returns error
    console.error(error.message);
  }
}
