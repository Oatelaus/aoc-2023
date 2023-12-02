import { count } from "console";
import { readFileSync } from "fs";
import { join } from "path";
import { rawListeners } from "process";

const entities = {
  green: 13,
  blue: 14,
  red: 12,
};

export default function solve(input: string[]) {
  const tokenUses = (target: string, color: string): number[] =>
    target
      .match(new RegExp(`(\\d+) ${color}`, "g"))
      ?.map((raw) => Number(raw.replace(/[^\d]/g, "")), 0) || [0];

  return input.reduce(
    (sum, game, index) =>
      Object.entries(entities).every(([color, max]) => {
        return Math.max(...tokenUses(game, color)) <= max;
      })
        ? sum + (index + 1)
        : sum,
    0
  );
}

const input = readFileSync(join(__dirname, "input"), "utf-8");

const value = solve(input.split(/\n/g).filter(Boolean));

console.log(value);
