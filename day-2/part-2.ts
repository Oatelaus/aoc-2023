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
    (sum, game) =>
      sum +
      Object.entries(entities).reduce((sum, [color]) => {
        return (sum || 1) * Math.max(...tokenUses(game, color));
      }, 0),
    0
  );
}

const input = readFileSync(join(__dirname, "input"), "utf-8");

const value = solve(input.split(/\n/g).filter(Boolean));

console.log(value);
