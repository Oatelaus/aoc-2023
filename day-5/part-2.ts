import { readFileSync } from "fs";
import { join } from "path";

type Range = {
  source: number;
  range: number;
};

type Mapping = {
  destination: number;
  offset: number;
} & Range;

export const chunk = (arr: number[], size: number) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

export const solve = (input: string[]) => {
  const seedRanges = chunk(input.shift()!.match(/\d+/g)!.map(Number), 2);

  const steps = input
    .reduce((ranges, line) => {
      const map = line.match(/\d+/g)!.map(Number);
      const chunks = chunk(map, 3);

      return [
        ...ranges,
        chunk(map, 3).reduce(
          (previous, [destination, source, range]) => [...previous, [destination, source, range]],
          [] as number[][]
        ),
      ];
    }, [] as number[][][])
    .slice()
    .reverse();

  const locationToSeed = (location: number) => {
    return steps.reduce((current, step) => {
      const [destination, source, _] = step.find((stepMap) => {
        const [destination, _, range] = stepMap;
        return destination <= current && destination + range > current;
      }) || [0, 0, 0];
      return source + current - destination;
    }, location);
  };

  let select = -1;
  let seed = 0;
  while (!seed) {
    select++;
    const tempSeed = locationToSeed(select);
    const hasSeed = seedRanges.some(([start, end]) => tempSeed >= start && tempSeed <= start + end);
    if (hasSeed) {
      seed = tempSeed;
    }
  }

  return select;
};

console.log(solve(readFileSync(join(__dirname, "input"), "utf-8").split(/\n\n/g)));
