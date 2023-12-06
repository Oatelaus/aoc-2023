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
  const sqrt = Math.sqrt(Math.pow(time, 2) - 4 * distance);
  return Math.ceil((time + sqrt) / 2) - Math.floor((time - sqrt) / 2) - 1;
}

export function part1(input: string) {
  const [time, distance] = chunk(input.match(/\d+/g)?.map(Number) || [], 4);
  return time.reduce(
    (acc, timeSegment, i) => acc * rangeBetween(timeSegment, distance[i]),
    1
  );
}

console.log(part1(readFileSync(join(__dirname, "input"), "utf8")));
