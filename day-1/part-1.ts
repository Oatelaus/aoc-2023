export default (input: string[]) =>
  input.reduce((sum, line) => {
    const numbers = line.replace(/[^\d]/g, "");
    return sum + Number(`${numbers[0]}${numbers[numbers.length - 1]}`);
  }, 0);
