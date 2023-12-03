import { readFileSync } from "fs";
import { join } from "path";

export const solve = (input: string[]) =>
  input.reduce((sum, line, y) => {
    const numbers = [...line.matchAll(/\*/g)].reduce((nums, star) => {
      const adjacentPoints = [-1, 0, 1].flatMap((dy) => {
        const focusPoints: [number, number][] = [-1, 0, 1].map((dx) => [y + dy, star.index! + dx]);
        const focusLine = input[y + dy];

        const numbers = [...focusLine.matchAll(/\d+/g)]
          .filter((number) => {
            const numberPoints: [number, number][] = Array.from(
              {
                length: number[0].length,
              },
              (_, index) => [y + dy, number.index! + index]
            );

            const isValid = numberPoints.some((np) => focusPoints.find((fp) => fp[0] === np[0] && fp[1] === np[1]));

            return isValid;
          })
          .map((word) => word[0]);
        return numbers;
      });

      return adjacentPoints.length > 1
        ? nums + adjacentPoints.reduce((multipleSum, point) => multipleSum * Number(point), 1)
        : nums;
    }, 0);

    return sum + numbers;
  }, 0);
