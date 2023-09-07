import { describe, expect, it } from "vitest";

import { generateNANPNumber } from "../generate/nanp-number";
import { validateAreaCode } from "../validate/area-code";
import { validateCentralOfficeCode } from "../validate/central-office-code";
import { validateLineNumber } from "../validate/line-number";

describe(`Area Code`, () => {
	it(`should generate a valid NANP number`, () => {
		const number = generateNANPNumber({});
		expect(number).toBeDefined();
		const areaCode = number.slice(0, 3);
		const centralOfficeCode = number.slice(3, 6);
		const lineNumber = number.slice(6, 10);
		expect(validateAreaCode(areaCode)).toBe(true);
		expect(validateCentralOfficeCode(centralOfficeCode)).toBe(true);
		expect(validateLineNumber(lineNumber)).toBe(true);
	});
	it(`should generate a normal valid NANP number with custom options`, () => {
		const number = generateNANPNumber({
			areaCode: `503`,
			centralOfficeCode: `737`,
			lineNumber: `9999`,
		});
		expect(number).toBeDefined();
		expect(number).toBe(`5037379999`);
	});
	it(`should generate a valid fictionalized NANP number`, () => {
		const number = generateNANPNumber(true);
		expect(number).toBeDefined();
		const areaCode = number.slice(0, 3);
		const centralOfficeCode = number.slice(3, 6);
		const lineNumber = number.slice(6, 10);
		expect(validateAreaCode(areaCode)).toBe(true);
		expect(centralOfficeCode).toBe(`555`);
		expect(parseInt(lineNumber)).toBeGreaterThanOrEqual(100);
		expect(parseInt(lineNumber)).toBeLessThanOrEqual(199);
	});
	describe(`Invalid area code`, () => {
		it(`should throw in case of bad input`, () => {
			try {
				generateNANPNumber({
					areaCode: `2`,
				});
			} catch (error) {
				expect(error).toBeDefined();
				if (error instanceof Error) {
					expect(error.message).toBe(`Area code must be 3 digits`);
				}
			}
		});
		it(`should throw in case of bad input`, () => {
			try {
				generateNANPNumber({
					areaCode: `911`,
				});
			} catch (error) {
				expect(error).toBeDefined();
				if (error instanceof Error) {
					expect(error.message).toBe(
						`Area code must be a valid NANP area code`
					);
				}
			}
		});
	});
	describe(`Invalid central office code`, () => {
		it(`should not allow an invalid central office code to be passed in`, () => {
			try {
				generateNANPNumber({ centralOfficeCode: `9405` });
			} catch (error) {
				if (error instanceof Error) {
					expect(error.message).toBe(`Central office code must be 3 digits`);
				}
			}
		});
		it(`should not allow an invalid central office code to be passed in`, () => {
			try {
				generateNANPNumber({ centralOfficeCode: `94` });
			} catch (error) {
				if (error instanceof Error) {
					expect(error.message).toBe(`Central office code must be 3 digits`);
				}
			}
		});
		it(`should not allow an invalid central office code to be passed in`, () => {
			try {
				generateNANPNumber({ centralOfficeCode: `031` });
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
				generateNANPNumber({ centralOfficeCode: `211` });
			} catch (error) {
				if (error instanceof Error) {
					expect(error.message).toBe(
						`Central office code must not end with 11`
					);
				}
			}
		});
	});
	describe(`Invalid line number`, () => {
		it(`should not allow an invalid line number to be passed in`, () => {
			try {
				generateNANPNumber({ lineNumber: `911` });
			} catch (error) {
				if (error instanceof Error) {
					expect(error.message).toBe(`Line number must be 4 digits`);
				}
			}
		});
		it(`should not allow an invalid line number to be passed in`, () => {
			try {
				generateNANPNumber({ lineNumber: `0145` });
			} catch (error) {
				if (error instanceof Error) {
					expect(error.message).toBe(
						`Line number must not end in range 0100-0199`
					);
				}
			}
		});
	});
});
