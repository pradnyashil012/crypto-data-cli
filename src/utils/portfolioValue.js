import fs from "fs";
import fetch from "node-fetch";

import { api_key, api_url } from "./api-details.js";
import checkPortfolio from "./checkPortfolio.js";

//returns portfolio value
export default async function portfolioValue() {
  if (!checkPortfolio()) return;

  console.log("Current value of your portfolio per token is:");

  let values = new Object();

  //reading the file
  const portfolio = JSON.parse(fs.readFileSync("portfolio.json"));

  //getting token values like BTC, ETH, XRP from object
  const tokens = Object.keys(portfolio);

  //fetching the data from api provided by cryptocompare
  const response = await fetch(
    `${api_url}/data/pricemulti?fsyms=${tokens.join(
      ","
    )}&tsyms=USD&api_key=${api_key}`
  );

  //getting prices of the tokens
  const prices = await response.json();

  //calculating the values by multiplying total quantity of tokens
  //and prices received in USD
  tokens.forEach((e) => {
    values[e] = portfolio[e].tq * prices[e].USD;

    //e => token(s)
    console.log(`\t${e}: \x1b[33mUSD ${values[e].toFixed(6)}\x1b[37m`);
  });
}
