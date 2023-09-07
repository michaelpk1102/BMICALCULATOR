import { describe, expect, it } from "vitest";

import { AREA_CODES } from "../consts";
import { validateAreaCode } from "../validate/area-code";
import { validateCentralOfficeCode } from "../validate/central-office-code";
import { validateLineNumber } from "../validate/line-number";

describe(`Validation tests`, () => {
	it(`should test the area code validator`, () => {
		it(`should pass`, () => {
			AREA_CODES.forEach((areaCode) => {
				expect(validateAreaCode(areaCode.toString())).toBe(true);
			});
		});
		it(`should fail`, () => {
			// wrong amount of digits
			expect(validateAreaCode(`31`)).toBe(false);
			// starts with 0 or 1
			expect(validateAreaCode(`035`)).toBe(false);
			// starts with 0 or 1
			expect(validateAreaCode(`111`)).toBe(false);
			// not in list of verified area codes
			expect(validateAreaCode(`776`)).toBe(false);
			// 911 is reserved
			expect(validateAreaCode(`911`)).toBe(false);
			// wrong amount of digits
			expect(validateAreaCode(`1234`)).toBe(false);
		});
	});
	it(`should test the central office code validator`, () => {
		it(`should pass`, () => {
			expect(validateCentralOfficeCode(`737`)).toBe(true);                        
			expect(validateCentralOfficeCode(`555`)).toBe(true);                        
		});
		it(`should fail`, () => {
			// wrong amount of digits
			expect(validateCentralOfficeCode(`04`)).toBe(false);                        
			// starts with 0 or 1
			expect(validateCentralOfficeCode(`039`)).toBe(false);                        
			// starts with 0 or 1
			expect(validateCentralOfficeCode(`123`)).toBe(false);                        
			// ends with 11
			expect(validateCentralOfficeCode(`811`)).toBe(false);                        
			// wrong amount of digits
			expect(validateCentralOfficeCode(`9527`)).toBe(false);                        
		});
	});
	it(`should test the line number validator`, () => {
		it(`should pass`, () => {
			expect(validateLineNumber(`1234`)).toBe(true);
			expect(validateLineNumber(`0365`)).toBe(true);
		});
		it(`should fail`, () => {
			// wrong amount of digits
			expect(validateLineNumber(`543`)).toBe(false);
			// ends in 0100-0199
			expect(validateLineNumber(`0100`)).toBe(false);
			// wrong amount of digits
			expect(validateLineNumber(`98756`)).toBe(false);
		});
	});
});