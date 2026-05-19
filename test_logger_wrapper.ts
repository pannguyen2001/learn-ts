import logger from "./functions/logging/log4js";
import loggerWrapper from "./functions/common/loggerWrapper";

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
}

const example3 = new Example3();
const returnValue1 = example3.foo('Ina', 20);
logger.info(returnValue1);

const example31 = new Example3();
const result1 = example31.bar(1, 0);