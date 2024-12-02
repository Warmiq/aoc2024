import fs from "fs";

type Direction = 'asc' | 'desc' | 'unknown';

export interface Report {
    levels: number[];
    direction: Direction;
}

function buildReport(report: string): Report {

    const levels = report
        .split(' ')
        .map(l => parseInt(l, 10));

    const ascLevels = [...levels].sort((a, b) => a - b);
    const descLevels = [...levels].sort((a, b) => b - a);

    if (
        JSON.stringify(levels) === JSON.stringify(ascLevels)
    ) {
        return {
            levels: levels,
            direction: 'asc'
        }
    } else if (JSON.stringify(levels) === JSON.stringify(descLevels)) {
        return {
            levels: levels,
            direction: 'desc'
        };
    }
    else {
        return {
            levels: levels,
            direction: 'unknown'
        };
    }
}

function parseInput(data: string): Report[] {

    const reports = data.split('\n');

    return reports.map(r => buildReport(r));
}

export function getReports(): Report[] {

    const data = fs.readFileSync("./input/input.txt", { encoding: 'utf8' });

    return parseInput(data);
}
