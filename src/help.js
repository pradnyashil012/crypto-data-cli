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
    command: null,
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

//returns n tabs recursively
const tab = (n) => (n <= 0 ? "" : "\t" + tab(n - 1));

// print string within fixed tab length
const appendTabs = (str = "", max = 4) => {
  if (!str || !str.length) return tab(max);
  return `${str}${tab(Math.floor(max - str.length / 8) + 1)}`;
};

const help = (error) => {
  if (error) console.error(`\nError: ${error}`);

  console.clear(); //first it will clear console

  console.log(`\nUsage: crypto-data [command]\n`);

  console.log(`Command${tab(6)}Name${tab(3)}Description\n`);

  args.forEach((e) =>
    console.log(
      `${appendTabs(e.command, 6)}${appendTabs(e.name, 3)}${e.description}`
    )
  );
};

export default help;
