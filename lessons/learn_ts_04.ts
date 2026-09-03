/**
 * Type vs Interface
 */

import logger from "@/functions/logging/log4js";


// ==============================

/**
 * Generic
 * GG search: generict TS
 * Source:
 * - https://medium.com/@ignatovich.dm/typescript-generics-a-simple-guide-with-practical-examples-ca3492eb821f
 * When use generics:
 * - The function/class should work with multiple types
 * - You want TypeScript to infer and enforce types
 * - You need flexibility without losing type safety
 *
 * When Not to Use Generics?
 * - Code only needs to work with a single type.
 * - The logic is simple.
 */

// Generic for function
// Common concept
function identity<T>(value: T): T {
    return value;
};

const num = identity(42); // 42, type: number
const str = identity("hello"); // hello, type: string

// Some examples:
// Generic with array:
function getFirstElement<T>(arr: T[]): T {
    return arr[0];
};

const numArr: number[] = [1, 2, 3];
const firstNum = getFirstElement(numArr); // 1, type: number

const strArr: string[] = ["a", "b", "c"];
const firstStr = getFirstElement(strArr); // "a", type: string

// Generics with Multiple Types
// Partial<T>: All T's properties are optional.
// Readonly<T>: readonly properites.
// Pick<T, K>: get set K properties from T.
function pair<K, V>(key: K, value: V): [K, V] {
    return [key, value]
};

const result = pair("id", 1); // ["id", 1], type: [string, number]

// Extend
function logLength<T extends {length: number}>(value: T): number {
    return value.length;
}

const strLength = logLength("hello");
const arrLength = logLength([1, 2, 3]);
const objLength = logLength({length: 10});
// logLength(20) // Error, number has no length property.

// Generic for arrow function
const getArg = <T>(arg: T): T => arg;
const numArg = getArg(42); // 42, type: number
const strArg = getArg("hello"); // "hello", type: string

// Optional generic
function createArr<T = string>(length: number, value: T): T[] {
    return Array(length).fill(value);
}

let createStrArr = createArr(3, "hello");
let createNumArr = createArr(3, 0); // type input is number
let createObj = createArr(3, { name: "A"});
logger.info(createNumArr);
logger.info(createObj);

let anyNum: any = 0;
let createAnyNum = createArr(3, anyNum);
for (let i = 0; i < createAnyNum.length; i++) {
    logger.info(createAnyNum[i], typeof createAnyNum[i])
}

let unknownValue: unknown = "hello";
let unknowableArr = createArr(3, unknownValue);
for (let i = 0; i < unknowableArr.length; i++) {
    logger.info(unknowableArr[i], typeof unknowableArr[i])
}

let x; // x is implicitly `any` in non-strict mode
let arr = createArr(3, x); // T falls back to string
for (let i = 0; i < arr.length; i++) {
    logger.info(arr[i], typeof arr[i])
}


// Generic for class
class Stack<T> {
    private items: T[] = [];

    push(item: T) {
        this.items.push(item)
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
};

const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
numStack.push(3);
const poppedNum = numStack.pop(); // 3, type: number

const strStack = new Stack<string>();
strStack.push("hello");
strStack.push("world");
const poppedStr = strStack.pop(); // "world", type: string


// Generic for type
type Methods = {
    add: (a: number, b: number) => number;
    concat: (a: string, b: string) => string;
    isEven: (num: number) => boolean;
};

  // Generic function to safely call a method from an object
function callMethod<T extends keyof Methods>(
    method: T,
    ...args: Parameters<Methods[T]>
): ReturnType<Methods[T]> {
    const methods: Methods = {
        add: (a, b) => a + b,
        concat: (a, b) => a + b,
        isEven: (num) => num % 2 === 0,
    };

    if (!(method in methods)) {
        throw new Error(`Method ${method} does not exist.`);
    }

    return methods[method](...args);
}

  // ✅ Valid calls (type-safe)
  const sum = callMethod("add", 2, 3);       // number
  const text = callMethod("concat", "Hello, ", "World!"); // string
  const even = callMethod("isEven", 4);      // boolean


// Generic for interface
// Common concept
interface Box<T> {
    content: T;
}

const box1: Box<number> = { content: 42};
const box2: Box<string> = { content: "hello"};
