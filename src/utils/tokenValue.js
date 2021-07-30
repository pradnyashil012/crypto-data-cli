import fs from "fs";
import fetch from "node-fetch";

import { api_key, api_url } from "./api-details.js";
import checkPortfolio from "./checkPortfolio.js";

//returns token price
export default async function tokenValue(token) {
  if (!checkPortfolio()) return;

  //converting lowerCase token enterted to upperCase
  //for api parameters
  token = token.toUpperCase();

  //reading the file
  const portfolio = JSON.parse(fs.readFileSync("portfolio.json"));

  if (!(token in portfolio))
    return console.error("\nToken not found in portfolio\n");

  //fetching token value
  const response = await fetch(
    `${api_url}/data/pricemulti?fsyms=${token}&tsyms=USD&api_key=${api_key}`
  );

  const price = await response.json();

  //calculating total value by multiplying total token quantity
  //and price fetched from an api
  const value = portfolio[token].tq * price[token].USD;

  console.log(
    `\nCurrent value of \x1b[33m${token}\x1b[37m is \x1b[33mUSD ${value.toFixed(
      6
    )}\x1b[37m`
  );
}
