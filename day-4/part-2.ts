import { readFileSync } from "fs";
import { join } from "path";

export const solve = (input: string[]) =>
  input.reduce((previous, line) => {
    const [card, ...numbers] = line.match(/\d+/g) || [];
    const matches = numbers.splice(0, 10);
    const newScratchers = Array(previous.filter((previous) => Number(previous) === Number(card)).length + 1)
      .fill(numbers.filter((number) => matches.includes(number)).map((_, index) => Number(card) + index + 1))
      .flat();
    return [...previous, card, ...newScratchers];
  }, [] as string[]);

const input = readFileSync(join(__dirname, "input"), "utf-8").split(/\n/g);

console.log(solve(input).length);
