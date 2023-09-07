import { AREA_CODES } from "../consts.js";
import { validateAreaCode } from "../validate/area-code.js";

/**
 * Generates an area code valid for the NANP
 * @returns a 3 digit string that:
 * - does not start with a 0 or a 1 (toll center/system codes)
 * - second digit cannot be 9
 * - ends in the range of 10-99 BUT
 * - does not end in 11 (service codes)
 *
 * - Easily Recognizable Codes:
 *   N11 - service codes
 *   N9X - expansion codes
 *   37X, 96X - set aside for future use
 *
 * @param {string} override - if provided, will return this value if it's valid
 * otherwise it'll throw an error
 */
export const generateAreaCode = (override?: string): string => {
	if (override) {
		if (validateAreaCode(override)) {
			return override;
		}
		// if this package was really good, it would throw the exact reason it's invalid
		throw new Error(`Invalid area code`);
	}
	return AREA_CODES[Math.floor(Math.random() * AREA_CODES.length)].toString();
};
