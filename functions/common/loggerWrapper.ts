/**
 * Logger wrapper common using decorator
 * Common code from lab: ./labs/loggerWrapper.ts
 */

import logger from "../logging/log4js";


const DEBUG_MODE = true;
const TIME_CONSUMING_MODE = true

interface ParamEntry {
    // index: number,
    name: string;
    value: unknown;
    type: string;
}

interface LoggerOptions {
    debugMode?: boolean;
    timeConsumingMode?: boolean
}

function extractParamNames(fn: Function): string[] {
    const src = fn.toString();

    // Handles: function foo(a, b), (a, b) => {}, async (a, b) => {}
    const match = src.match(/^[^(]*\(([^)]*)\)/);
    if (!match || !match[1].trim()) return [];

    return match[1]
        .split(',')
        .map((p) =>
            p
                .trim()
                .replace(/[=:].*/g, '')
                .trim()
        ) // strip defaults & TS type annotations
        .filter(Boolean);
}

function resolveType(value: unknown): string {
    if (value === null) return 'null';
    if (Array.isArray(value)) return `Array(${value.length})`;

    const t = typeof value;
    if (t === 'object') {
        // Try to get the constructor name: Date, Map, Set, your own class, etc.
        return (value as object).constructor?.name ?? 'object';
    }
    return t; // 'string' | 'number' | 'boolean' | 'undefined' | 'function'
}


function loggerWrapper({ debugMode, timeConsumingMode }: LoggerOptions = { debugMode: DEBUG_MODE, timeConsumingMode: TIME_CONSUMING_MODE }) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value; // save original method
        const paramNames = extractParamNames(originalMethod);

        // replace with a wrapper function
        descriptor.value = function (...args: any[]) {
            const params: ParamEntry[] = args.map((val, i) => ({
                // index: i + 1,
                name: paramNames[i] ?? `arg${i}`,
                value: val,
                type: resolveType(val),
            }));
            const paramStrings = params.map((p) => `* ${p.name}: ${p.type} = ${JSON.stringify(p.value)}`).join('\n')
            let startTime = 0;

            try {
                if (timeConsumingMode) {
                    startTime = performance.now(); // Start timing
                }
                const result = originalMethod.apply(this, args); // call original

                let message: string = `Function: ${propertyKey}\n` +
                    `Params:\n${paramStrings}\n` +
                    `Result:\n` +
                    `* Value: ${JSON.stringify(result)}\n` +
                    `* Data type: ${resolveType(result)}\n`;

                if (timeConsumingMode) {
                    const endTime = performance.now(); // End timing
                    message += `Execution time: ${(endTime - startTime).toFixed(2)} (ms)`
                }
                if (debugMode) {
                    logger.debug(message);
                }

                return result;
            } catch (error: unknown | any) {
                let errorMessage: string = `Function: ${propertyKey}\n` +
                    `Params:\n${paramStrings}\n` +
                    `Detail:\n${error?.stack ?? "No stack"}`
                logger.error(errorMessage);
            }
        };

        return descriptor;
    };
}

export default loggerWrapper;


class Example3 {
    @loggerWrapper()
    foo(name: string, age: number) {
        return `Name: ${name}, Age: ${age}`;
    }

    @loggerWrapper()
    bar(num1: number, num2: number): number {
        if (num2 == 0) {
            throw new Error('num2 must greater than 0.');
        }
        return num1 / num2;
    }

    @loggerWrapper()
    async main(text: string) {
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Hello, world! ${text}`,);
            }, 1000);
        });
    }
}

const example3 = new Example3();
const returnValue1 = example3.foo('Ina', 20);
logger.info(returnValue1);

const example31 = new Example3();
const result1 = example31.bar(1, 0);
const result2 = example31.main("Hi")


