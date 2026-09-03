/**
 * Benchmark time complexity, time running average, memory complexity, profile code
 */


/**
 * Benchmark time processing a function with n times loops
 * @param fn
 * @param name
 * @param timeLoops
 * @param params
 */

function benchmarkTimeProcessing(fn: Function, name: string = "default", timeLoops: number = 100, ...params: any) {
    console.group(name)
    let start = new Date()
    let timeExecuteList: Array<number> = []

    for (let i = 1; i < timeLoops + 1; i++) {
        let processTitle = `Process data time: ${i}`

        console.time(processTitle)

        let startCycleTime = performance.now();

        fn(...params)

        let endCycleTime = performance.now()
        let cycleTime = endCycleTime - startCycleTime;
        timeExecuteList.push(cycleTime);

        console.timeEnd(processTitle)
    }

    console.groupEnd()

    let end = new Date()
    let time = end.getTime() - start.getTime();
    let avgTime = time / 100;
    let maxTime = Math.max(...timeExecuteList);
    let minTime = Math.min(...timeExecuteList);

    let finishTimeReport = `Finished in \x1b[32m${time}\x1b[0m ms`
    let avgTimeReport = `Avg time \x1b[32m${avgTime}\x1b[0m ms`
    let maxTimeReport = `Max time: \x1b[32m${maxTime.toFixed(4)}\x1b[0m ms in process \x1b[32m${timeExecuteList.indexOf(maxTime) + 1}\x1b[0m`
    let minTimeReport = `Min time: \x1b[32m${minTime.toFixed(4)}\x1b[0m ms in process \x1b[32m${timeExecuteList.indexOf(minTime) + 1}\x1b[0m`

    console.log("\n", `${"=".repeat(50)}`, "\n")
    console.log(`\t\x1b[34mReport for timer: footballPlayerProfiles\x1b[0m\n\n\t${finishTimeReport}\n\t${avgTimeReport}\n\t${maxTimeReport}\n\t${minTimeReport}`);

}

// export default benchmarkTimeProcessing;


function test(num1: number, num2: number) {
    return num1 + num2;
}

// benchmarkTimeProcessing(test, "test", 1)


import { bench, run } from 'mitata';

function addLoop(n: number) {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += i;
    return sum;
}

function addReduce(n: number) {
    return Array.from({ length: n }, (_, i) => i).reduce((a, b) => a + b, 0);
}

bench('For Loop', () => {
    addLoop(1000);
});

bench('Array Reduce', () => {
    addReduce(1000);
});

await run();

