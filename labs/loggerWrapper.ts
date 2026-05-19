/**
 * Build custom logger wrapper for logging and debugging using decorator, Error, lo4js
 */


import { connectLogger } from "log4js";
import logger from "../functions/logging/log4js"

// ========== Example 1 ==========
// export parameters, values each params, type of each params

// function debug(target: any, name: string, descriptor: any) {
//     const original = descriptor.value  // save original

//     // Wrap the descriptor function.
//     descriptor.value = function (...args: any[]) {
//         console.log.call(console, 'Called with:', ...args)
//         console.time(name)
//         const result = original.apply(this, args)
//         console.timeEnd(name)
//         return original.apply(this, args)
//     }
// }

// class MyClass {

//     @debug
//     method(name: string, isHappy: boolean) {
//         // Do stuff...
//         logger.info(name, isHappy)
//     }

// }

//   new MyClass().method('Blake', true)



// ========== Example 2 ==========
// https://dev.to/malloc72p/build-a-logger-and-validator-with-typescript-decorators-like-nestjs-376n

// export interface LoggerOptions {
//   mode: 'simple' | 'detailed';
// }

// export function Logger({ mode }: LoggerOptions = { mode: 'detailed' }) {
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value; // save original method

//     // replace with a wrapper function
//     descriptor.value = function (...args: any[]) {
//       console.log(`Calling ${propertyKey}`);
//       if (mode === 'detailed') {
//         console.log('Arguments:', args);
//       }

//       const result = originalMethod.apply(this, args); // call original

//       console.log(`${propertyKey} finished`);
//       if (mode === 'detailed') {
//         console.log('Return value:', result);
//       }

//       return result;
//     };

//     return descriptor;
//   };
// }

// class Example2 {
//   @Logger({ mode: 'detailed' })
//   foo(name: string, age: number) {
//     return `Name: ${name}, Age: ${age}`;
//   }
// }

// const example2 = new Example2();
// const returnValue = example2.foo('Ina', 20);


// ========== Example 3 ==========
// Use Refelect-metadata and create validation wrapper
// import 'reflect-metadata';

// export interface MinLength {
//     length: number;
//     message?: string;
// }

// export function MinLength({ length, message = 'Minimum length is ${length}.' }: MinLength) {
//     return function (target: any, propertyKey: string) {
//         // store validation metadata on the class prototype
//         const constraint = { value: length, message };
//         Reflect.defineMetadata('minLength', constraint, target, propertyKey);
//     };
// }

// export function validate(target: any) {
//     for (const propertyKey of Object.keys(target)) {
//         // retrieve stored metadata for this property
//         const constraint = Reflect.getMetadata('minLength', target, propertyKey);

//         if (constraint) {
//             const value = target[propertyKey];

//             // run the actual check
//             if (typeof value === 'string' && value.length < constraint.value) {
//                 const errorMessage = constraint.message.replace('${length}', constraint.value.toString());
//                 console.log(errorMessage);
//                 throw new Error(errorMessage);
//             }
//         }
//     }

//     console.log('Validation passed.');
// }

// class Example {
//     @MinLength({ length: 3, message: 'Name must be at least ${length} characters.' })
//     value: string;

//     constructor(value: string) {
//         this.value = value;
//     }
// }

// const example1 = new Example('Ina');
// validate(example1); // ✅ Validation passed.

// const example22 = new Example('MO');
//   validate(example22); // ❌ Name must be at least 3 characters.


// =========== Example 4 ==========
// wrapper with log time executing and error if have

// // https://github.com/monade/typescript-decorators/blob/main/src/class-decorators/class-method-logging.ts

// import 'reflect-metadata';

// function traceClass(target: Function) {
//     const keys = Object.getOwnPropertyNames(target.prototype);

//     keys.forEach(key => {
//         const originalMethod = target.prototype[key];

//         if (key !== 'constructor' && typeof originalMethod === 'function') {
//             target.prototype[key] = function (...args: any[]) {
//                 console.log(`Entering function '${key}' with arguments: ${args.join(', ')}`);

//                 const startTime = performance.now(); // Start timing

//                 try {
//                     const result = originalMethod.apply(this, args);
//                     console.log(`Exiting function '${key}' with result: ${result}`);
//                     return result;
//                 }
//                 catch(error: unknown | any) {
//                     console.error(`Error in function '${key}': ${error?.message}`);
//                     throw error;
//                 }
//                  finally {
//                     const endTime = performance.now(); // End timing
//                     console.log(`Function '${key}' execution time: ${endTime - startTime} (ms)`);
//                     console.log()
//                 }
//             };
//         }
//     });
// }

// @traceClass
// class Example1 {
//     sayHello(name: string) {
//         return `Hello, ${name}!`;
//     }

//     add(a: number, b: number) {
//         return a + b;
//     }
// }

// const example = new Example1();

// example.sayHello("Alice");
// example.add(5, 3);


// ========== Example 5 ==========
// decorator can do validate function, required function or logging,...
// Source: https://github.com/monade/typescript-decorators/blob/main/src/parameter-decorators/parameter-validation.ts

import 'reflect-metadata';

interface Validation {
  index: number;
  validation: (parameter: any) => void;
}

const validationsMetadataKey = Symbol("method:validations");


function validate<T extends Object>(target: T, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const validations = Reflect.getOwnMetadata(validationsMetadataKey, target, key) as Validation[];

    for (const validation of validations) {
      validation.validation(args[validation.index]);
    }

    return originalMethod.apply(this, args);
  }

  return descriptor;
}

function required() {
  return function <T extends Object>(target: T, propertyKey: string, parameterIndex: number) {
    const validations = (Reflect.getOwnMetadata(validationsMetadataKey, target, propertyKey) ?? []) as Validation[];

    validations.push({
      index: parameterIndex,
      validation: (parameter: any) => {
        if (parameter === null || parameter === undefined) {
          throw new Error(`parameter ${parameterIndex} of ${propertyKey} is required. Got ${parameter}`);
        }
      }
    });

    Reflect.defineMetadata(validationsMetadataKey, validations, target, propertyKey);
  }
}

function greaterThan(value: number) {
  return function <T extends Object>(target: T, propertyKey: string, parameterIndex: number) {

    const validations = Reflect.getOwnMetadata(validationsMetadataKey, target, propertyKey) ?? [];

    validations.push({
      index: parameterIndex,
      validation: (parameter: number) => {
        if (typeof parameter !== 'number') {
          throw new Error(`parameter ${parameterIndex} of ${propertyKey} must be a number. Got ${parameter}`);
        }
        if (parameter <= value) {
          throw new Error(`parameter ${parameterIndex} of ${propertyKey} must be greater than ${value}. Got ${parameter}`);
        }
      }
    });

    Reflect.defineMetadata(validationsMetadataKey, validations, target, propertyKey);
  }
}

class Prova {
  value = 1;

  @validate
  provaMethod(@required() parameter1: string, @greaterThan(0) parameter2: number) {
    console.log('Executed method', parameter1, parameter2, this.value);
  }
}

const prova = new Prova();
prova.provaMethod('test', 1);
try {
  prova.provaMethod(null as any, 2);
} catch (e: any) {
  console.error(e.message);
}

try {
  prova.provaMethod('ciao', '' as any);
} catch (e: any) {
  console.error(e.message);
}

try {
  prova.provaMethod('ciao', -1);
} catch (e: any) {
  console.error(e.message);
}



// decorator pattern
// template pattern
// singleton pattern
// factory pattern
// strategy pattern
// 



// ========== Example 6 ==========

// https://dev.to/gaetanrdn/logger-decorator-47ob

interface LoggerParams {
  type?: 'log' | 'trace' | 'warn' | 'info' | 'debug';
  inputs?: boolean;
  outputs?: boolean;
}

const defaultParams: Required<LoggerParams> = {
  type: 'debug',
  inputs: true,
  outputs: true,
};

export function Log(params?: LoggerParams) {
  const options: Required<LoggerParams> = {
    type: params?.type || defaultParams.type,
    inputs: params?.inputs === undefined ? defaultParams.inputs : params.inputs,
    outputs: params?.outputs === undefined ? defaultParams.outputs : params.outputs,
  };

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (options.inputs) {
        logger[options.type](`[${propertyKey}] Logged inputs:`, args);
      }

      const result = original.apply(this, args);

      if (options.outputs) {
        logger[options.type](`[${propertyKey}] Logged outputs`, result);
      }

      return result;
    };
  };
}

class Toto {
  @Log()
  public myMethod(...args: unknown[]): boolean { return false }

  @Log({ outputs: false })
  public myMethod2(...args: unknown[]): void { logger.info(args) }

  @Log({ inputs: false })
  public myMethod3(...args: unknown[]): unknown { return }

  @Log({ type: 'trace' })
  public myMethod4(...args: unknown[]): unknown { return }

  @Log({ type: 'trace', inputs: false, outputs: false })
  public myMethod5(...args: unknown[]): unknown { return }

}

new Toto().myMethod()
new Toto().myMethod2()
new Toto().myMethod3()
new Toto().myMethod4()
new Toto().myMethod5()




// utils/extractParams.ts
export function extractParamNames(fn: Function): string[] {
    const src = fn.toString()

    // Handles: function foo(a, b), (a, b) => {}, async (a, b) => {}
    const match = src.match(/^[^(]*\(([^)]*)\)/)
    if (!match || !match[1].trim()) return []

    return match[1]
      .split(',')
      .map(p => p.trim().replace(/[=:].*/g, '').trim()) // strip defaults & TS type annotations
      .filter(Boolean)
  }

  // utils/resolveType.ts
  export function resolveType(value: unknown): string {
    if (value === null) return 'null'
    if (Array.isArray(value)) return `Array(${value.length})`

    const t = typeof value
    if (t === 'object') {
      // Try to get the constructor name: Date, Map, Set, your own class, etc.
      return (value as object).constructor?.name ?? 'object'
    }
    return t  // 'string' | 'number' | 'boolean' | 'undefined' | 'function'
  }

  // decorators/logParams.ts

  interface ParamEntry {
    index: number,
    name: string
    value: unknown
    type: string
  }

  export function logParams(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value as Function
    const paramNames = extractParamNames(original)

    descriptor.value = function (...args: unknown[]) {
      const params: ParamEntry[] = args.map((val, i) => ({
        index: i,
        name: paramNames[i] ?? `arg${i}`,
        value: val,
        type: resolveType(val),
      }))

      logger.debug(`[${methodName}] called with params:`, params)

      // Log each param individually for clarity
      params.forEach(p => {
        logger.debug(`  ${p.name}: ${p.type} = ${JSON.stringify(p.value)}`)
      })

      // Always call the original!
      return original.apply(this, args)
    }

    return descriptor
  }



  class MyClass {

    @logParams
    method(name: string, isHappy: boolean) {
      logger.info(name, isHappy)
    }

    @logParams
    async fetchUser(id: number, options: { timeout: number }) {
      // ...
    }
  }

  new MyClass().method('Blake', true)

// Output:
// [method] called with: [...]
//   name: string = "Blake"
//   isHappy: boolean = true

