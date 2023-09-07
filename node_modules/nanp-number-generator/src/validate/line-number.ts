// This one depends on the previous one
// so a failure here isn't necessarily a failure of the code
// as long as the previous number is 555, this should be valid regardless
/**
 * Validates line number
 * @param {string} code
 * @returns true if valid according to NANP
 */
export const validateLineNumber = (code: string) => {
	if (code.length !== 4) {
		throw new Error(`Line number must be 4 digits`);
	}
	// doesn't end with 0100-0199
	if (
		code.startsWith(`01`)
	) {
		throw new Error(`Line number must not end in range 0100-0199`);
	}
	// if not false must be true
	return true;
};
