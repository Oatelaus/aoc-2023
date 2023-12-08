import { readFileSync } from "fs";
import { join } from "path";

type NodeList = Record<string, [string, string]>;

function getStepsToTarget(instructions: string, nodes: NodeList) {
  function getNextNode(currentNode: keyof NodeList, direction: string) {
    const [left, right] = nodes[currentNode];
    return direction === "L" ? left : right;
  }

  let currentNode = "";
  let steps = 0;

  for (let i = 0; i < instructions.length; i++) {
    const direction = instructions[i];
    currentNode = getNextNode(currentNode, direction);
    steps++;

    if (currentNode === "ZZZ") {
      return steps;
    }
  }

  while (true) {
    for (let i = 0; i < instructions.length; i++) {
      const direction = instructions[i];
      currentNode = getNextNode(currentNode, direction);
      steps++;

      if (currentNode === "ZZZ") {
        return steps;
      }
    }
  }
}

const input = readFileSync(join(__dirname, "input"), "utf-8")
  .split(/\n/g)
  .filter(Boolean);

const instructions = input.shift()!;
const nodes = input.reduce((acc, line) => {
  const numbers = line.match(/\w+/g)! || [];
  return {
    ...acc,
    [numbers[0]]: [numbers[1], numbers[2]],
  };
}, {});

console.log(getStepsToTarget(instructions, nodes)); // Output: 2
