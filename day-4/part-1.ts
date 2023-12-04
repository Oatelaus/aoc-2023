import { readFileSync } from "fs";
import { join } from "path";

export const solve = (input: string[]) =>
  input.reduce((sum, line) => {
    const [_card, ...cards] = line.match(/\d+/g) || [];
    const matches = cards.splice(0, 10);
    const overlap = cards.filter((score) => matches.includes(score));
    return overlap.length > 0 ? sum + Math.pow(2, overlap.length - 1) : sum;
  }, 0);

const input = readFileSync(join(__dirname, "input"), "utf-8").split(/\n/g);

console.log(solve(input));
