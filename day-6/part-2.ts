import { readFileSync } from "fs";
import { join } from "path";

export const chunk = (arr: number[], size: number) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

function rangeBetween(time: number, distance: number) {
  const discrim = Math.sqrt(Math.pow(time, 2) - 4 * distance);
  return Math.ceil((time + discrim) / 2) - Math.floor((time - discrim) / 2) - 1;
}

export function part2(input: string) {
  const [time, distance] = input
    .split("\n")
    .map((str) => Number(str.match(/\d/g)?.join("")));
  return rangeBetween(time, distance);
}
console.log(part2(readFileSync(join(__dirname, "input"), "utf8")));
