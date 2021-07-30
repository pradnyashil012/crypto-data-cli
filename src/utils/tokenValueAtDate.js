import fs from "fs";
import fetch from "node-fetch";

import { api_key, api_url } from "./api-details.js";
import checkPortfolio from "./checkPortfolio.js";

//returns token value at specific date
export default async function tokenValueAtDate(token, date) {
  if (!checkPortfolio()) return;

  //converting lowerCase token to upperCase
  token = token.toUpperCase();

  //reading file
  const portfolio = JSON.parse(fs.readFileSync("portfolio.json"));

  if (!(token in portfolio))
    return console.error("\nToken not found in portfolio\n");

  //fetching prices of tokens
  const response = await fetch(
    `${api_url}/data/pricehistorical?fsym=${token}&tsyms=USD&ts=${date}&api_key=${api_key}`
  );

  const price = await response.json();

  //checking if token is available at date
  const txn = portfolio[token].txn.filter((e) => e.t <= date);

  //calculating quantity of token at date
  const qty = txn.reduce((q, e) => {
    return q + e.q * (e.s === "D" ? 1 : -1);
  }, 0);

  //calculating value of the token at date
  const value = qty * price[token].USD;

  console.log(
    `\nValue of \x1b[33m${token}\x1b[37m at given date is \x1b[33mUSD ${value.toFixed(
      6
    )}\x1b[37m`
  );
}
