import { readFileSync } from "fs"
import { join } from "path"

export default function solve(input: string[]) {
    return input.reduce((sum, line) => {
        const numbers = line.replace(/[^\d]/g, '')
        return sum + Number(`${numbers[0]}${numbers[numbers.length - 1]}`)
    }, 0)
}

const input = readFileSync(join(__dirname, 'input'), 'utf-8')

const value = solve(input.split(/\n/g))

console.log(value)