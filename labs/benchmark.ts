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

// await run();


// Source - https://stackoverflow.com/a/4644364
// Posted by fncomp, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-19, License - CC BY-SA 3.0

/**
 * Figure out how long it takes for a method to execute.
 * 
 * @param {Function} method to test 
 * @param {number} iterations number of executions.
 * @param {Array} args to pass in. 
 * @param {T} context the context to call the method in.
 * @return {number} the time it took, in milliseconds to execute.
 */
 function bench(method, iterations, args, context) {

    var time = 0;
    var timer = function (action) {
        var d = Date.now();
        if (time < 1 || action === 'start') {
            time = d;
            return 0;
        } else if (action === 'stop') {
            var t = d - time;
            time = 0;    
            return t;
        } else {
            return d - time;    
        }
    };

    var result = [];
    var i = 0;
    timer('start');
    while (i < iterations) {
        result.push(method.apply(context, args));
        i++;
    }

    var execTime = timer('stop');

    if ( typeof console === "object") {
        console.log("Mean execution time was: ", execTime / iterations);
        console.log("Sum execution time was: ", execTime);
        console.log("Result of the method call was:", result[0]);
    }

    return execTime;  
};

bench(addLoop(1000), 1000, [], null)