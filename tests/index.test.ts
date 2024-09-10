import { for_test } from "../src/index";

describe("hello tests!", () => {
    test("tests", () => {
        expect(for_test()).toBe(1);
    });
});