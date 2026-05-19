import logger from "../functions/logging/log4js"

const Person = {
    name: "Person 1",
    age: 10
}

type PersonType = typeof Person
const newPerson: PersonType = {
    name: "Person 2",
    age: 20
}
// typeof get data structure and data type of value


interface User { id: number; name: string; }
type UserKeys = keyof User;
// Kết quả: "id" | "name"


type PersonKey = keyof typeof Person
// Lấy các key từ một object thực tế mà không cần định nghĩa interface riêng cho nó.

const personKey1: PersonKey = "name"
const personKey2: PersonKey = "age"


// ======================== TS decorator =======================
/**
 * What is decorator
 * What it for
 * Why need decorator
 * When to use it
 * How to use
 * When not use
 * Advantage and disadvantage
 * Real example
 * 
 * GG search: ts decorator
 * Source: https://www.typescriptlang.org/docs/handbook/decorators.html
 */

function first() {
    logger.info("first(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        logger.info("first(): called");
    };
}

function second() {
    logger.info("second(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        logger.info("second(): called");
    };
}

class ExampleClass {
    @first()
    @second()
    method() {
        logger.info("method(): called")
        return
    }
}

const exampleClass1 = new ExampleClass()
logger.info('Decorator:', exampleClass1.method())


function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
  }

@sealed
class BugReport {
    type = "report";
    title: string;

    constructor(t: string) {
        this.title = t;
    }
}

const bug = new BugReport("Needs dark mode");
logger.info(bug.title);


function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.enumerable = value;
    };
  }

  class Greeter {
    greeting: string;
    constructor(message: string) {
      this.greeting = message;
    }
   
    @enumerable(true)
    greet() {
      return "Hello, " + this.greeting;
    }
  }

const greater1 = new Greeter("Pan")
logger.info(greater1.greet())



