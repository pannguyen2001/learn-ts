/**
 * Utility Types
 * Source:
 * 1. https://www.typescriptlang.org/docs/handbook/utility-types.html
 * 2. https://yjpniq7uisce.jp.larksuite.com/file/QBEzbzJpuot31ex66hIjS4XGpNg - page 140 ebook
 */

import { isEqual } from "lodash";
import logger from "../functions/logging/log4js";


// ========== Record<Keys, Type> ==========
// Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.
// Source: 1
type Person = {
    name: string,
    age: number
}

const people: Record<string, Person> = {
    person01: {
        name: "Person01",
        age: 10
    },
    person02: {
        name: "Person02",
        age: 20
    }
}

people['jill'] = {name: 'Jill' , age: 48 }; // Allowed
delete people.person01; // Allowed
logger.info(JSON.stringify(people, null, 2), typeof people)

// ========== Pick<Type, Keys> ==========
// The "Pick" utility type allows you to create a new type that includes only certain properties from an existing type:
// Mean that select some keys in all keys, concat by "|"
// pick: chon

// Pick type from interface
interface PickPerson {
    name: string,
    age: number,
    location: string
}

type PickPerson01 = Pick<PickPerson, "name" | "age">

const pickPerson01Info: PickPerson01 = {
    name: "pickPerson01Info",
    age: 10
}

// Pick type from type
type PickPersonType = {
    name: string,
    age: number,
    location: string
}

type PickPerson02 = Pick<PickPersonType, "name" | "age">

const pickPerson02Info: PickPerson02 = {
    name: "pickPerson02Info",
    age: 1
}

// Used for?


// =========== Omit ==========
// The Omit<Type, Keys> utility type allows you to create a new type that excludes certain properties from an existing type. It is the exact inverse of the Pick<Type, Keys> utility type. Here's the same example as shown previously, but instead using Omit<Type, Keys>:
// Meaning that get all keys, exclude mentioned keys
// omit: chuwaf ra :)

interface OmitPerson {
    id: string | number
    name: string,
    age: number,
    location: string
}

type OmitPersonBasic = Omit<OmitPerson, "location"|"age">

const omitPersonBasic01: OmitPersonBasic = {
    id: 1,
    name: "omitPersonBasic01"
}

// ========== Partial<Type> ===========
// Turn all types into optional types

interface PartialPerson {
    name: string,
    age: number,
    location: string
}

type PartialPersonType = Partial<PartialPerson>
/**
 * type PartialPersonType = {
 *  name?: string | undefined;
 *  age?: number | undefined;
 *  location?: string | undefined;
 * }
 */

const partialPersonType01: PartialPersonType = {
    name: "partialPersonType01"
}
const partialPersonType02: PartialPersonType = {
    age: 10
}
const partialPersonType03: PartialPersonType = {
    location: "Taiwan"
}
const partialPersonType04: PartialPersonType = {
    name: "partialPersonType04",
    location: "Taiwan"
}


// =========== Required<Type> ===========
// In contrast of Partial<Type>, it turn all types to required types

interface RequiredPerson {
    name: string,
    age?: number,
    location?: string 
}

const nonRequiredPerson01: RequiredPerson = {
    name: "requiredPerson01",
} // age and location is optional, so it can be undefined

type RequiredPersonType = Required<RequiredPerson>
/**
 * type RequiredPersonType = {
 *  name: string;
 *  age: number;
 *  location: string;
 * }
 */

const requiredPerson01: RequiredPersonType = {
    name: "requiredPerson01",
    age: 10,
    location: "VN"
}


// =========== ReadOnly<Type> ==========
// Turn types to readonly, can not edit

interface ReadOnlyPerson {
    readonly name: string,
    readonly age: number,
    readonly location: string
}

const readOnlyPerson01: ReadOnlyPerson = {
    name: "readOnlyPerson01",
    age: 10,
    location: "VN"
}
// readOnlyPerson01.name = "readOnlyPerson02" // Error: Cannot assign to 'name' because it is a read-only property."

// =========== Exclude<Type, Keys> ==========
// reduce some keys in all keys
// A variable of this type must hold ONE value at a time, not a union expression.

interface ExcludePerson {
    id: string | number,
    name: string,
    age: number,
    location: string
}

type ExcludePersonType = Exclude<keyof ExcludePerson, "id">
/**
 * Note: keyof ExcludePerson = "id" | "name" | "age" | "location", so Exclude<keyof ExcludePerson, "id"> = "name" | "age" | "location"
 */

const excludePersonType01: ExcludePersonType = "name"
const excludePersonType02: ExcludePersonType = "age"
const excludePersonType03: ExcludePersonType = "location"
// const excludePersonType04: ExcludePersonType = "age" | "location" // Type 'number' is not assignable to type 'ExcludePersonType'.
// const excludePersonType05: ExcludePersonType = "id" // Error: Type '"id"' is not assignable to type '"name" | "age" | "location"'.

// ========== Extract<Type, Keys> ==========
// just get choosen key, opposite of Exclude<Type, Keys>

interface ExtractPerson {
    id: string | number,
    name: string,
    age: number,
    location: string
}

type ExtractPersonType = Extract<keyof ExtractPerson, "name" | "age"> // type Extract<T, U> = T extends U ? T : never, meaning if T is not a subset of U, then T is never

const extractPersonType01: ExtractPersonType = "name"
const extractPersonType02: ExtractPersonType = "age"
// const extractPersonType03: ExtractPersonType = "name" | "age" // Type 'number' is not assignable to type 'ExtractPersonType'.
// const extractPersonType04: ExtractPersonType = "id" // Error: Type '"id"' is not assignable to type '"name" | "age"'.


// ========== Template literal ==========
type Email = `${string}@${string}.${string}`
const email01: Email = "a@gmail.com"

type DomainSuffix = "gmail.com" | "outlook.com" | "yahoo.com"
type EmailWithDomainSuffix = `${string}@${DomainSuffix}`
const emailWithDomainSuffix01: EmailWithDomainSuffix = "a@gmail.com"
