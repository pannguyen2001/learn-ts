import {describe, expect, test} from '@jest/globals';

describe("test", () => {
  test("test", () => {
    console.log("test");
  });
});

describe("test2", () => {
  test("test2", () => {
    let a = 1;
    let b = 2;
    expect(a + b).toBe(3);
  });
});
