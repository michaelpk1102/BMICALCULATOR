import { AREA_CODES } from "../consts";

/**
 * Validates area code
 * @param {string} code
 * @returns true if valid according to NANP
 */
export const validateAreaCode = (code: string) => {
	if (code.length !== 3) {
		throw new Error(`Area code must be 3 digits`);
	}
	if (!AREA_CODES.find((areaCode) => areaCode.toString() === code)) {
		throw new Error(`Area code must be a valid NANP area code`);
	}
	return true;
};
