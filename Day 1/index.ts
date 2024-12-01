import { getData } from "./utils";

export function calculateDifference(list1: Array<number>, list2: Array<number>): number {


    if (list1.length != list2.length) { throw Error("Lists of different length sad times"); }

    let difference = 0;

    console.log(`Calculating difference with arrays of length ${list1.length} and ${list2.length}`);

    for (var index in list1) {
        const number = Math.abs(list1[index] - list2[index]);
        difference += number;
    }

    return difference;
}

export function getSimilarity(list1: Array<number>, list2: Array<number>): number {

    let similarity = 0;

    const transformedList1 = tranformToRecord(list1);
    const transformedList2 = tranformToRecord(list2);

    for (const number of Object.keys(transformedList1)) {

        const list1Count = transformedList1[number];
        const list2Count = transformedList2[number] || 0;

        similarity += list1Count * (parseInt(number, 10) * list2Count);
    }
    return similarity;
}

function tranformToRecord(list: Array<number>): Record<string, number> {

    let record: Record<string, number> = {};
    for (const number of list) {
        if (record[number]) {
            record = {
                ...record,
                [number]: record[number] + 1
            }
        } else {
            record = {
                ...record,
                [number]: 1
            }
        }
    }
    return record;
}

const [input1, input2] = getData();
console.time(`similarity`);
console.log(getSimilarity(
    input1,
    input2
));
console.timeEnd(`similarity`);

console.time(`difference`);
console.log(calculateDifference(input1, input2));
console.timeEnd(`difference`);