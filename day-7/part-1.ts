import { readFileSync } from "fs";
import { join } from "path";

const order = "23456789TJQKA".split("");

function handStrength(hand: [string, number][]) {
  hand.sort((a, b) => b[1] - a[1]);

  const counts = hand.map((card) => card[1]);

  const handTypes: Record<string, number> = {
    "5": 7,
    "4,1": 6,
    "3,2": 5,
    "3,1,1": 4,
    "2,2,1": 3,
    "2,1,1,1": 2,
    "1,1,1,1,1": 1,
  };

  const key = counts.join(",");
  return handTypes[key] || -1;
}

function customSort(a: [string, number, number], b: [string, number, number]) {
  if (a[1] !== b[1]) {
    return a[1] - b[1];
  }

  const getFirstNonMatchingCard = (stringA: string, stringB: string) => {
    for (let i = 0; i < Math.min(stringA.length, stringB.length); i++) {
      const valueA = order.indexOf(stringA[i]);
      const valueB = order.indexOf(stringB[i]);

      if (valueA !== valueB) {
        return valueA - valueB;
      }
    }
    return 0;
  };

  const result = getFirstNonMatchingCard(a[0], b[0]);

  return result;
}

export const solve = (input: string[]) => {
  return input
    .reduce((scores, current) => {
      const [cards, bid] = current.split(/\s/);
      const values = Object.entries(
        cards.split("").reduce(
          (pairs, value) => ({
            ...pairs,
            [value]: (pairs[value] || 0) + 1,
          }),
          {} as Record<string, number>
        )
      );

      const v: [string, number, number] = [
        cards,
        handStrength(values),
        Number(bid),
      ];

      return [...scores, v];
    }, [] as [string, number, number][])
    .sort(customSort)
    .reduce((sum, hand, index) => sum + hand[2] * (index + 1), 0);
};

console.log(
  solve(
    readFileSync(join(__dirname, "input"), "utf8").split(/\n/).filter(Boolean)
  )
);
