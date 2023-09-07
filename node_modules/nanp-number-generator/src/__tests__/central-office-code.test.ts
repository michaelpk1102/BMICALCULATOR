import { describe, expect, it } from "vitest";

import { generateCentralOfficeCode } from "../generate/central-office-code";
import { validateCentralOfficeCode } from "../validate/central-office-code";

describe(`Central Office Code`, () => {
	it(`should generate a valid central office code`, async () => {
		const centralOfficeCode = await generateCentralOfficeCode();
		expect(validateCentralOfficeCode(centralOfficeCode)).toBe(true);
	});
	it(`should allow a valid central office code to be passed in`, () => {
		const areaCode = generateCentralOfficeCode(`737`);
		expect(areaCode).toBe(`737`);
	});
	it(`should not allow an invalid central office code to be passed in`, () => {
		try {
			generateCentralOfficeCode(`9405`);
		} catch (error) {
			if (error instanceof Error) {
				expect(error.message).toBe(`Central office code must be 3 digits`);
			}
		}
	});
	it(`should not allow an invalid central office code to be passed in`, () => {
		try {
			generateCentralOfficeCode(`94`);
		} catch (error) {
			if (error instanceof Error) {
				expect(error.message).toBe(`Central office code must be 3 digits`);
			}
		}
	});
	it(`should not allow an invalid central office code to be passed in`, () => {
		try {
			generateCentralOfficeCode(`031`);
		} catch (error) {
			if (error instanceof Error) {
				expect(error.message).toBe(
					`Central office code must not start with 0 or 1`
				);
			}
		}
	});
	it(`should not allow an invalid central office code to be passed in`, () => {
		try {
			generateCentralOfficeCode(`211`);
		} catch (error) {
			if (error instanceof Error) {
				expect(error.message).toBe(`Central office code must not end with 11`);
			}
		}
	});
});

describe(`Central Office Code Sanity Test`, () => {
	it(`should generate a valid central office code a lot of times with no errors`, async () => {
		for (let i = 0; i < 1000; i++) {
			const centralOfficeCode = await generateCentralOfficeCode();
			expect(validateCentralOfficeCode(centralOfficeCode)).toBe(true);
		}
	});
});

