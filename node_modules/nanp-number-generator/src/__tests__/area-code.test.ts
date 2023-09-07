import { describe, expect, it } from "vitest";

import { generateAreaCode } from "../generate/area-code";
import { validateAreaCode } from "../validate/area-code";

const areaCodeRegex = /^[2-9](\d)(?!\1)\d$/;

describe(`Area Code`, () => {
	it(`should generate a valid area code`, () => {
		const areaCode = generateAreaCode();
		expect(areaCode).toMatch(areaCodeRegex);
	});
	it(`should allow a valid area code to be passed in`, () => {
		const areaCode = generateAreaCode(`503`);
		expect(areaCode).toBe(`503`);
	});
	it(`should not allow an invalid area code to be passed in`, () => {
		try {
			generateAreaCode(`911`);
		} catch (error) {
			if (error instanceof Error) {
				expect(error.message).toBe(`Area code must be a valid NANP area code`);
			}
		}
	});
	it(`should not allow an invalid area code to be passed in`, () => {
		try {
			generateAreaCode(`2`);
		} catch (error) {
			if (error instanceof Error) {
				expect(error.message).toBe(`Area code must be 3 digits`);
			}
		}
	});
});

describe(`Area Code Sanity Test`, () => {
	it(`should generate a valid area code a lot of times with no errors`, async () => {
		for (let i = 0; i < 1000; i++) {
			const centralOfficeCode = await generateAreaCode();
			expect(validateAreaCode(centralOfficeCode)).toBe(true);
		}
	});
});

