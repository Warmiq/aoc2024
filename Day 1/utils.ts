import fs from "fs";

type Day1Input = [Array<number>, Array<number>];

export function getData(): Day1Input {

    const data = fs.readFileSync("./input/input.txt", { encoding: 'utf8' });

    return parseInput(data);
}

function parseInput(inputStr: string): Day1Input {

    const firstList = new Array<number>();
    const secondList = new Array<number>();

    inputStr.split("\n")
        .forEach(line => {
            const parsed = line.split("   ");
            firstList.push(parseInt(parsed[0], 10));
            secondList.push(parseInt(parsed[1], 10));
        });

    return [firstList.sort(), secondList.sort()];
}