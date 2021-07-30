# Introdction

A beautiful and simple Command Line Application to get Cryptocurrency Portfolio of a user whose transactions file is provided. Basically, we will pass various commands to get various values of the Portfolio.
You can find the commands below in Usage section.

# Installation

First `npm i` to install all dependencies

Then `npm link` to link to your PC's global npm packages

# Usage (Commands)

#### Display help

`crypto-data --help`
`crypto-data -h`

#### Display version

`crypto-data --version`
`crypto-data -v`

#### Generate a portfolio.json file to Sync Your Portfolio

`crypto-data --portfolio <filepath>`
`crypto-data -p <filepath>`

In our case, filepath is ./transactions.csv.
It is up to you. You can change filepath.

#### Generate the latest Portfolio value per token in USD with no parameters

`crypto-data`

#### Generate the latest Portfolio value for a given token in USD

`crypto-data --token <tokenshortform>`
`crypto-data -t <tokenshortform>`

#### Generate the Portfolio value per token in USD on given date

`crypto-data --date <dd/mm/yyyy>`
`crypto-data -d <dd/mm/yyyy>`

#### Generate the Portfolio value of the given token in USD on given date

`crypto-data --token <tokenshortform> --date <dd/mm/yyyy>`
`crypto-data -t <tokenshortform> -d <dd/mm/yyyy>`

## Design Decisions

In this application, I tried to separate every function, so that, we can use them differently.

You can find bin, src folders.
I used bin folder to store start up file, crypto-data.js.

In src, utils folder is there to store utils(packages for various purposes)

In src, you can find cli.js where I coded command line logic.
This logic finds which command is passed and uses switch to pass the argument(s) to packages to get answer accordingly.

If command does not match, I have tried to handle respective errors.
Like, passing the help command, giving error to setup the application, etc.

Also, in src, you can find help.js, where I have defined all the commands for new user.
Just need to enter - "crypto-data -h" in command prompt.

I have created api-details package to store api details like common url, key.
It is imported in 4 other packages.

I have used 2 different apis.
I used short forms of tokens as it is required for fetching api values.

1 is to pass multiple tokens, specifically, "pricemulti" where tokens are separated by ",".
This api is used in 2 packages portfolioValue and tokenValue.

2 is to pass date and/or token, specifically, "pricehistorical".
This api is used in 2 packages valueAtDate and tokenValueAtDate.

## Important Design Decisions

I have tried this code only on 5000 entries. Actually, my system did not support to load this much data.

I wrote a script to write the transactions in portfolio.json which is created on execution of setup package.
You just need to enter - "crypto-data -p <filepath>" in command prompt.

I have set tokens as keys for their respective transactions.

I calculated the balance of each token and stored it in tq (total quantity).

Then pushing the other parameters like t(timestamp in seconds), q(quantity) and s(DEPOSIT/WITHDRAWL, but first letter of each) in txn(transaction) array for each transaction happened.

I used short forms to decrease load.
