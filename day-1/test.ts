import { readFileSync } from "fs";
import part1 from "./part-1";
import part2 from "./part-2";
import { join } from "path";

const input = readFileSync(join(__dirname, "input"), "utf-8").split(/\n/g);

describe("Day 1", () => {
  it("Part 1", () => {
    const solution = part1(input);
    expect(solution).toEqual(54159);
  });
  it("Part 2", () => {
    const solution = part2(input);
    expect(solution).toEqual(53866);
  });
});
