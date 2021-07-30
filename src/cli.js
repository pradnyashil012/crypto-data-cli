import arg from "arg";
import { readFileSync } from "fs";

import portfolioValue from "./utils/portfolioValue.js";
import tokenValue from "./utils/tokenValue.js";
import valueAtDate from "./utils/valueAtDate.js";
import tokenValueAtDate from "./utils/tokenValueAtDate.js";
import dateParser from "./utils/date.js";
import setup from "./utils/setup.js";
import help from "./help.js";

const pkg = JSON.parse(readFileSync("package.json").toString());

//passing arguments
const parseArguments = (rawArg) => {
  try {
    let option = -1;

    //various arguments we can pass
    const args = arg(
      {
        "--version": Boolean,
        "--portfolio": String,
        "--date": String,
        "--token": String,
        "--help": Boolean,
        "-t": "--token",
        "-p": "--portfolio",
        "-v": "--version",
        "-d": "--date",
        "-h": "--help",
      },
      {
        //returning main argument(s) from above
        argv: rawArg.slice(2),
      }
    );

    if (args._.length !== 0)
      return {
        option: -1,
        error: "Unknown command",
      };

    if (args["--portfolio"]) option = 5;
    else if (args["--date"] && args["--token"]) option = 4;
    else if (args["--date"]) option = 3;
    else if (args["--token"]) option = 2;
    else if (args["--version"]) option = 0;
    else if (args["--help"]) option = -1;
    else if (!(args["--date"] && args["--token"])) option = 1;

    return {
      option,
      values: {
        date: dateParser(args["--date"]),
        token: args["--token"],
        filePath: args["--portfolio"],
      },
    };
  } catch (error) {
    return {
      option: -1,
      error: error.message,
    };
  }
};

export default function cli(rawArg) {
  //returning option, values or error from argument passed
  const { option, values, error } = parseArguments(rawArg);

  switch (option) {
    case -1:
      help(error);
      break;

    case 0:
      console.log(pkg.version);
      break;

    case 1:
      portfolioValue();
      break;

    case 2:
      tokenValue(values.token);
      break;

    case 3:
      valueAtDate(values.date);
      break;

    case 4:
      tokenValueAtDate(values.token, values.date);
      break;

    case 5:
      setup(values.filePath);
      break;
  }
}
