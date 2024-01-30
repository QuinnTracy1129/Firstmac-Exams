const visited = new Set();

const from = 2,
  to = 3;

const queue = [[from]];
const path = queue.shift();
const user = path[path.length - 1];

visited.add(user);

const follows = [7, 4];

console.log("queue:", queue);
console.log("path:", path);
console.log("user:", user);
console.log("visited:", visited);

for (const follow of follows) {
  queue.push([...path, follow]);
}

console.log(queue);
