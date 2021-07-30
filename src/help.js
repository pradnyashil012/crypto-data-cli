const args = [
  {
    command: "-v, --version",
    name: "Version",
    description: "Prints version of the package",
  },
  {
    command: "-p, --portfolio <filename>",
    name: "Setup",
    description: "Sync your portfolio",
  },
  {
    command: "",
    name: "Portfolio Value",
    description: "Print the latest portfolio value per token in USD",
  },
  {
    command: "-t, --token <token>",
    name: "Token",
    description: "Print the latest portfolio value for that token in USD",
  },
  {
    command: "-d, --date <date>",
    name: "Date",
    description: "Print the portfolio value per token in USD on that date",
  },
  {
    command: "-t -d, --token <token> --date <date>",
    name: "Token and Date",
    description: "Print the portfolio value of that token in USD on that date",
  },
];

const help = (error) => {
  if (error) console.error(`\nError: ${error}`);

  console.log(`\nUsage: crypto-data [command]\n`);

  console.table(args);
  //   args.forEach((e) =>
  //     console.log(
  //       `${e.command ? e.command : "-"}\t\t${e.name}\t\t${e.description}`
  //     )
  //   );
};

export default help;
