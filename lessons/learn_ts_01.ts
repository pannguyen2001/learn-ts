import { json } from "stream/consumers"
import logger from "../functions/logging/log4js"

// Type alias
type stringOrNumber = string | number

// type stringOrNumberArr = (string | number)[]

type stringOrNumberArr = stringOrNumber[]

type UserId = stringOrNumber

type Guitarist = {
    id: UserId,
    name?: string,
    active: boolean,
    albums: string[] | number[]
}

let guitarist01: Guitarist = {
    "id": 1,
    "name": "Guitarist 01",
    active: true,
    albums: ["Album 01", "Album 02"]
}

logger.info(guitarist01)

// Literal type
let myName: "PAN";
myName = "PAN"
logger.info(myName)

let userName: "Pan" | "One" | "Panpan"

type UserNameType = "Pan" | "One" | "Panpan"
let oneName: UserNameType = "One"

// function
// normal function, anumynous function. arrow funtion, anomynous arrow function
const logMsg = (msg: string = ""): void => {
    logger.info(msg)
}
logMsg("Hello")

let num: number = 1.0 as number;

// Class
class Coder {
    constructor (
        public readonly name: string = "",
        public music: string = "",
        private age: number = 0,
        protected lang: string = ""
    ) {
        this.name = name
        this.music = music
        this.age = age
        this.lang = lang
        }
    
    public getName(): string {
        return this.name
    }
    public getMusic(): string {
        return this.music
    }
    public setMusic(music: string): void {
        this.music = music
    }
    public getAge(): number {
        return this.age
    }
    public setAge(age: number): void {
        this.age = age
    }
    public getLang(): string {
        return this.lang
    }
    public setLang(lang: string): void {
        this.lang = lang
    }

    public greeting(): void {
        logger.info(`Hello ${this.name}`)
    }
}


const pan = new Coder("Pan", "Pop", 24, "TS")
pan.greeting()


// interface
interface Transaction {
    [index: string]: string
}

// Default parameter
function announceSong(song: string, singer?: string) {
    logger.info(`Song: ${song}`);
    if (singer) {
        logger.info(`Singer: ${singer}`);
    }
}
announceSong("Greensleeves"); // Ok
announceSong("Greensleeves", undefined);
announceSong("Chandelier", "Sia");

// Rest parameter
function singAllTheSongs(singer: string, ...songs: string[]) {
    for (const song of songs) {
        logger.info(`${song}, by ${singer}`);
    }
}
singAllTheSongs("Alicia Keys");
singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Poker Face"); // Ok


/**
 * Never type: function that never returns any value,  adding an explicit : never type annotationindicates that any code after a call to that function won’t run
 * Source: [Learning-TypeScript-Enhance-Your-Web-Development-Skills-Using-Type-Safe-JavaScript-by-Josh-Goldberg_bibis.ir] https://yjpniq7uisce.jp.larksuite.com/file/Lv0TbmXP5oFMb9x9CndjkwxapPg
 */
// function fail(message: string): never {
//     throw new Error(`Invariant failure: ${message}.`);
// };

// function workWithUnsafeParam(param: unknown) {
//     try {
//         if (typeof param !== "string") {
//             fail(`param should be a string, not ${typeof param}`);
//         }// Here, param is known to be type string
//         param.toUpperCase(); // Ok
//     }
//     catch (error) {
//         if (error instanceof Error) {
//             fail(error.message);
//         }
//     }

// };

// workWithUnsafeParam(1)

// ========== Type union ==========
// Source - https://stackoverflow.com/a
// Posted by Yogesh Umesh Vaity, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-01, License - CC BY-SA 4.0

type Nullable<T> = T | null | undefined
type NonNull<T> = T extends (null | undefined) ? never : T


// ========== Class and interface ==========
/**
 * https://yjpniq7uisce.jp.larksuite.com/file/Lv0TbmXP5oFMb9x9CndjkwxapPg page 137 - ebook
 */
// Class implement interface
interface Learner {
    name: string;
    study(hours: number): void;
}
class Student implements Learner {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    study(hours: number) {
        for (let i = 0; i < hours; i+= 1) {
            logger.info("...studying...");
        }
    }
}
const student01: Student = new Student("Student 01")
student01.study(10)

// Implement multiple interfaces
// Meaning it needs to implement all properties and methos of all interfaces it implemented. => like + all and don't miss
interface Graded {
    grades: number[];
}

interface Reporter {
    report: () => string;
}

class ReportCard implements Graded, Reporter {
    public grades: number[];

    constructor(grades: number[]) {
        this.grades = grades;
    }

    public report(): string {
        return this.grades.join(" ")
    }
}

const reportCard01: ReportCard = new ReportCard([1,2,3])
logger.info(reportCard01.report()) // 1 2 3

// Class extends interface
// Meaning it can add more, which base interface doesn't have
class Teacher {
    teach() {
        console.log("The surest test of discipline is its absence.");
    }
}
class StudentTeacher extends Teacher {
    learn() {
        console.log("I cannot afford the luxury of a closed mind.");
    }
}

const teacher = new StudentTeacher();
teacher.teach(); // Ok (defined on base)
teacher.learn(); // Ok (defined on subclass)
// teacher.other();// ~~~~~// Error: Property 'other' does not exist on type 'StudentTeacher'.

// Need full all properties and methods if re-assigned base class type for derivered class instance
class Lesson {
    subject: string;
    constructor(subject: string) {
        this.subject = subject;
    }
}

class OnlineLesson extends Lesson {
    url: string;
    constructor(subject: string, url: string) {
        super(subject);
        this.url = url;
    }
}

let lesson: Lesson;
lesson = new Lesson("coding"); // Ok
lesson = new OnlineLesson("coding", "oreilly.com"); // Ok

let online: OnlineLesson;
online = new OnlineLesson("coding", "oreilly.com"); // Ok
// online = new Lesson("coding");// Error: Property 'url' is missing in type 'Lesson' but required in type 'OnlineLesson'.


// ========== Abstract class ==========
abstract class School {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract getStudentTypes(): string[];
}

class Preschool extends School {
    getStudentTypes(): string[] {
        return ["preschooler"];
    }
}

const preSchool01: Preschool = new Preschool("preSchool01");
logger.info(preSchool01.getStudentTypes());

// let school = new School("somewhere else"); // Error: Cannot create an instance of an abstract class.

// ========== Top types ==========
// unknown
// different form any, unknown need type checking before any usage
// • TypeScript does not allow directly accessing properties of unknown  typed values.
// • unknown  is not assignable to types that are not a top type (any  or unknown).
// Source: https://yjpniq7uisce.jp.larksuite.com/file/Lv0TbmXP5oFMb9x9CndjkwxapPg page 152

function greetComedianSafety(name: unknown) {
    // console.log(`Announcing ${name.toUpperCase()}!`); // Error: Object is of type 'unknown'.

    if (typeof name === "string") {
        logger.info(`Announcing ${name.toUpperCase()}!`); // Ok
    }
    else {
        logger.info("Well, I'm off.");
    }
}
greetComedianSafety("Betty White"); // Logs
greetComedianSafety({}); // Does not log

// Locals of type unknown always considered initialized
// Source: https://github.com/Microsoft/TypeScript/pull/24439
function f25() {
    let x: unknown; // the same as: let x: unknown = undefined;
    let y = x; // x is undefined, primary value, so y is aslo primary value: undefined
    logger.info(typeof y)
    logger.info(x, y) // undefined, undefined
    x = 10;
    logger.info(x, y) // 10, undefined
}
f25()

// Source - https://stackoverflow.com/a
// Posted by Dmitri Pavlutin, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-01, License - CC BY-SA 4.0

let unknownVar: unknown = 'Value'; // OK
unknownVar = 3;                    // OK
unknownVar = true;                  // OK
unknownVar = undefined;             // OK
unknownVar = null;                  // OK


// Source - https://stackoverflow.com/a
// Posted by Dmitri Pavlutin, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-01, License - CC BY-SA 4.0

let anyVar: any = 'Value';         // OK
anyVar = 3;                        // OK
anyVar = true;                      // OK
anyVar = undefined;                 // OK
anyVar = null;                      // OK

// Source - https://stackoverflow.com/a
// Posted by TrevTheDev
// Retrieved 2025-12-01, License - CC BY-SA 4.0

type Foo = unknown extends string ? true : false // false
type Bar = any extends string ? true : false     // boolean - i.e. both true and false


// ========== Generic ==========
function identity<T>(arg: T): T {
    return arg;
}

let identityStr = identity<string>("myString"); // type of output will be 'string'
logger.info(identityStr, typeof identityStr);

let identityNum = identity<number>(10);
logger.info(identityNum, typeof num);

const arrowIdentity = <T>(input: T) => input;
arrowIdentity(123); // Type: 123
logger.info(arrowIdentity(123), typeof arrowIdentity(123));

// Genneric base on input type to detect type for class or function, but if lack of info from input, it will use unknown as implicit type => cause some unwilling issues
function logWrapper<Input>(
    callback: (input: Input) => void
) {
    return (input: Input) => {
        console.log("Input:", input);
        callback(input);
    };
}
// Type: (input: string) => void
logWrapper(
    (input: string) => {
        console.log(input.length);
    }
);
// Type: (input: unknown) => void
// logWrapper((input) => {console.log(input.length);})// Error: Property 'length' does not exist on type 'unknown'.});

function makeTuple<First, Second>(first: First, second: Second) {
    return [first, second] as const;
}
let tuple = makeTuple(true, "abc"); // Type of value: readonly [boolean, string]
logger.info(tuple, typeof tuple[0], typeof tuple[1]);
// or
let tuple02: readonly [boolean, string] = makeTuple<boolean, string>(true, "abc");


type Point = { x: number; y: number };
type P = keyof Point;

// Genenic for interface
interface Box<T> {
    inside: T;
}

let stringyBox: Box<string> = {
    inside: "abc",
};

let numberBox: Box<number> = {
    inside: 123,
}

// let incorrectBox: Box<number> = {
//     inside: false,// Error: Type 'boolean' is not assignable to type 'number'.
// }

// Generic for class
class CurriedCallback<Input> {
    #callback: (input: any) => void; // private scope

    constructor(callback: (input: Input) => void) {
        this.#callback = (input: Input) => {
            logger.info("Input:", input);
            callback(input);
        };
    }
    call(input: Input): void {
        this.#callback(input);
    }
}

// Type: CurriedCallback<string>
const callback01 = new CurriedCallback((input: string) =>{
    logger.info(input.length);
}
);
logger.info(callback01)

// Extend generic type, for class extends class, interface extends interface
class Quote<T> {
    lines: T;
    constructor(lines: T) {
        this.lines = lines;
    }
}

class SpokenQuote extends Quote<string[]> {
    speak() {
        logger.info(this.lines.join("\n"));
    }
}

const quoteString = new Quote([
    "Test",
    "Test 2"
])
logger.info(typeof quoteString.lines)
logger.info(typeof new Quote("The only real failure is the failure to try.").lines); // Type: string
logger.info(typeof new Quote([4, 8, 15, 16, 23, 42]).lines); // Type: number[]

const quote = new SpokenQuote([
    "Test",
    "Test 2"
]
)
quote.speak()

// new SpokenQuote([4, 8, 15, 16, 23, 42]);// Error: Argument of type 'number' is not assignable to parameter of type 'string'. Due to SpokenQuote extends Quote<string[]>, not number

// Implement generic interface, for class implement interface only
interface ActingCredit<Role> {
    role: Role;
}

class MoviePart implements ActingCredit<string> // add type here to implement interface
{
    role: string;
    speaking: boolean;

    constructor(
        role: string = "Admin",
        speaking: boolean = true
    ) {
        this.role = role;
        this.speaking = speaking;
    }
}

const part = new MoviePart("Miranda Priestly", true);
logger.info(typeof part.role); // Type: string

// Method generics
class CreatePairFactory<Key> {
    key: Key;

    constructor(key: Key) {
        this.key = key;
    }

    createPair<Value>(value: Value) {
        return {
            key: this.key,
            value: value
        };
    }
}

// Type: CreatePairFactory<string>
const factory = new CreatePairFactory<string>("role");
// Type: { key: string, value: number }
const numberPair = factory.createPair<number>(10);
logger.info(typeof numberPair, JSON.stringify(numberPair, null, 2))
// Type: { key: string, value: string }
const stringPair = factory.createPair<string>("Sophie");
logger.info(typeof stringPair, JSON.stringify(stringPair, null, 2))