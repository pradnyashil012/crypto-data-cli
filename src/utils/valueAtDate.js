import fs from "fs";
import fetch from "node-fetch";

import { api_key, api_url } from "./api-details.js";
import checkPortfolio from "./checkPortfolio.js";

//returns value per token at specific date
export default async function valueAtDate(date) {
  if (!checkPortfolio()) return;

  console.log("\nValue per token at given date:");

  let values = new Object();

  //reading file
  const portfolio = JSON.parse(fs.readFileSync("portfolio.json"));

  //storing key values like BTC, ETH, XRP to tokens
  const tokens = Object.keys(portfolio);

  //calculating the values per token at a given date
  tokens.forEach(async (e) => {
    //checking the transactions are available at date
    const txn = portfolio[e].txn.filter((e) => e.t <= date);

    //storing quantity calculated if found at date to qty
    const qty = txn.reduce((q, e) => {
      return q + e.q * (e.s === "D" ? 1 : -1);
    }, 0);

    //fetching values per token at a specific date
    const response = await fetch(
      `${api_url}/data/pricehistorical?fsym=${e}&tsyms=USD&ts=${date}&api_key=${api_key}`
    );

    const price = await response.json();

    //calculating values per token
    values[e] = qty * price[e].USD;

    console.log("\t", e, values[e]);
  });
}
