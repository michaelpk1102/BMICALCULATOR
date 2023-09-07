/**
 * Validates central office code
 * @param {string} code
 * @returns true if valid according to NANP
 */
export const validateCentralOfficeCode = (code: string) => {
	if (code.length !== 3) {
		throw new Error(`Central office code must be 3 digits`);
	}
	const digits = code.split(``);
	// doesn't start with 0 or 1
	if (digits[0] === `0` || digits[0] === `1`) {
		throw new Error(`Central office code must not start with 0 or 1`);
	}
	// doesn't end with 11
	if (digits[1] === `1` && digits[2] === `1`) {
		throw new Error(`Central office code must not end with 11`);
	}
	// if not false must be true
	return true;
};
