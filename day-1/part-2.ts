import part1 from "./part-1";

const digits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

export default (input: string[]) =>
  part1(
    input.map((input) =>
      digits.reduce(
        (normalised, digit, index) =>
          normalised.replace(
            new RegExp(`(${digit[0]})(${digit.substring(1)})`, "g"),
            `$1${index + 1}$2`
          ),
        input
      )
    )
  );
