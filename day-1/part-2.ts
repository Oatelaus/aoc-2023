import { readFileSync } from "fs";
import { join } from "path";
import solveP1 from './part-1'

const digitsAsWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

function solve(input: string) {
    const transformDigitWords = (input: string) => digitsAsWords.reduce(
        (normalised, digit, index) => normalised.replace(new RegExp(`(${digit[0]})(${digit.substring(1)})`, 'g'), `$1${index + 1}$2`),
        input
    )

    return solveP1(input.split(/\n/g).map(transformDigitWords))
}

console.log(solve(readFileSync(join(__dirname, 'input'), 'utf-8')))