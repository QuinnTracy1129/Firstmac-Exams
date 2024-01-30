const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./src/follows/data.json"));
const inputs = JSON.parse(fs.readFileSync("./src/follows/input.json"));

const shortestLink = (data = [], { from = 0, to = 0 }) => {
  const visited = new Set(),
    queue = [[from]];

  while (data.length > 0) {
    const path = queue.shift(),
      user = path[path.length - 1];

    if (user === to) return path;

    if (!visited.has(user)) {
      visited.add(user);

      for (const follower of data[user].follows) {
        queue.push([...path, follower]);
      }
    }
  }

  return [];
};

const printResult = (input = {}, shortestLink = []) => {
  const { from = 0, to = 0 } = input,
    str = `Case ${from} to ${to}: `;

  if (!shortestLink.length) return console.log(str, "Link not found.");

  console.log(str, shortestLink.join(" --> "));
};

for (const input of inputs) printResult(input, shortestLink(data, input));

// <-- Start of Expected Output -->
// Case 1 to 7:  1 --> 7
// Case 2 to 3:  2 --> 7 --> 3
// Case 3 to 9:  3 --> 8 --> 1 --> 9
// Case 4 to 0:  4 --> 0
// Case 5 to 6:  5 --> 6
// Case 0 to 5:  0 --> 9 --> 7 --> 3 --> 8 --> 5
// Case 1 to 4:  1 --> 4
// <-- End of Expected Output -->
