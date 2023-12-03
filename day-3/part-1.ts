const checkNeighbors = (matrix: string[][], row: number, col: number) =>
  [-1, 0, 1]
    .flatMap((dx) => [-1, 0, 1].map((dy) => [row + dx, col + dy]))
    .filter(
      ([i, j]) =>
        i >= 0 &&
        i < matrix.length &&
        j >= 0 &&
        j < matrix[0].length &&
        (i !== row || j !== col)
    )
    .map(([i, j]) => matrix[i][j]);

const solve = (input: string[]) =>
  input.reduce(
    (sum, line, y) =>
      sum +
      ([...line.matchAll(/\d+/g)].reduce(
        (lineSum, match) =>
          Array.from({ length: match.length })
            .flatMap((_char, index) =>
              checkNeighbors(
                input.map((str) => str.split("")),
                y,
                index + match.index!
              )
            )
            .some((char) => char.match(/[^\d\.]/))
            ? lineSum + Number(match[0])
            : lineSum,
        0
      ) || 0),
    0
  );
