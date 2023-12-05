import { readFileSync } from "fs";
import { join } from "path";

type Mapping = {
  source: number;
  destination: number;
  range: number;
  offset: number;
};

export const chunk = (arr: number[], size: number) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

export const solve = (input: string[]) => {
  const seeds = input.shift()!.match(/\d+/g)!.map(Number);

  const steps = input.reduce((ranges, line, currentStep) => {
    const map = line.match(/\d+/g)!.map(Number);
    const chunks = chunk(map, 3);

    const pointers = chunks.reduce((previous, set) => {
      const [destination, source, range] = set;
      return [
        ...previous,
        {
          source: source,
          destination: destination,
          range: range,
          offset: destination - source,
        },
      ];
    }, [] as Mapping[]);

    return [...ranges, pointers];
  }, [] as Mapping[][]);

  const result = steps.reduce((results, step, index) => {
    const run = results.map((result) => {
      const offset =
        steps[index]?.find(
          (range) =>
            range.source <= result && range.source + range.range >= result
        )?.offset || 0;
      return result + offset;
    });

    return run;
  }, seeds);

  return result;
};

console.log(
  Math.min(
    ...solve(readFileSync(join(__dirname, "input"), "utf-8").split(/\n\n/g))
  )
);
