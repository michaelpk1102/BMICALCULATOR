import { describe, expect, it } from "vitest";

import { generateLineNumber } from "../generate/line-number";

describe(`Line number`, () => {
	it(`should generate a valid line number`, () => {
		const lineNumber = generateLineNumber();
		expect(lineNumber.length).toBe(4);
	});
	it(`should allow a valid line number to be passed in`, () => {
		const lineNumber = generateLineNumber(`1234`);
		expect(lineNumber.length).toBe(4);
	});
	it(`should not allow an invalid line number to be passed in`, () => {
		try {
			generateLineNumber(`911`);
		} catch (error) {
			if (error instanceof Error) {
				expect(error.message).toBe(`Line number must be 4 digits`);
			}
		}
	});
	it(`should not allow an invalid line number to be passed in`, () => {
		try {
			generateLineNumber(`0145`);
		} catch (error) {
			if (error instanceof Error) {
				expect(error.message).toBe(
					`Line number must not end in range 0100-0199`
				);
			}
		}
	});
});
