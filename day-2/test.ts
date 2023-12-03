import { readFileSync } from "fs";
import part1 from "./part-1";
import part2 from "./part-2";
import { join } from "path";

const input = readFileSync(join(__dirname, "input"), "utf-8").split(/\n/g);

const dice = {
  green: 13,
  blue: 14,
  red: 12,
};

describe("Day 2", () => {
  it("Part 1", () => {
    const solution = part1(dice, input);
    expect(solution).toEqual(2285);
  });
  it("Part 2", () => {
    const solution = part2(dice, input);
    expect(solution).toEqual(77021);
  });
});
