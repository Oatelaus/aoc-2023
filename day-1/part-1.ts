import { readFileSync } from "fs"
import { join } from "path"

export default function (input: string) {
    input.split(/\n/g).reduce((sum, line) => {
        const numbers = line.replace(/[^\d]/g, '')
        return sum + Number(`${numbers[0]}${numbers[numbers.length - 1]}`)
    }, 0)
}

const input = readFileSync(join(__dirname, 'input'), 'utf-8')

const value = input.split(/\n/g).reduce((sum, line) => {
        const numbers = line.replace(/[^\d]/g, '')
        return sum + Number(`${numbers[0]}${numbers[numbers.length - 1]}`)
}, 0) 

console.log(value)