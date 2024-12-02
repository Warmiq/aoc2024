import { getReports, Report } from "./utils";

interface ValidatedReport extends Report {
    isValid: boolean;
}

function countSafeReports(reports: Report[]): ValidatedReport[] {
    const validReports = reports
        .map(r => {
            const reportToReturn = {
                ...r,
                isValid: validateReport(r)
            };

            console.log(`___________________________________________________________________`);
            console.log(`Report [${r.direction}]${r.levels} => ${reportToReturn.isValid ? '✅' : '❌'}`);
            console.log(`___________________________________________________________________`);
            return reportToReturn;
        });
    return validReports;
}

function validateReport(report: Report): boolean {

    return report.direction !== 'unknown' && report.levels
        .every((l, i, arr) => {
            if (i !== 0) {
                const prevValue = arr[i - 1];
                const step = Math.abs(l - prevValue);
                const condition = step >= 1 && step <= 3
                return condition;
            } else {
                if (report.direction === 'asc') {
                    return l < arr[i + 1];
                } else {
                    return l > arr[i + 1];
                }
            }
        });
}

const reports = getReports();
const validReports = countSafeReports(reports);
console.log(`Number of safe reports => ${validReports.filter(v => v.isValid).length}`);