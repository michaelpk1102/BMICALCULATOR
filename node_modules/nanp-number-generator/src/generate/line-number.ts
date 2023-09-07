import { validateLineNumber } from "../validate/line-number";

/**
 * Generates a line number valid for the NANP
 * @param {boolean} fictionalize - if true, will generate a 01XX number
 * @returns a 4 digit string that:
 * - doesn't end between 0100-0199 UNLESS
 * - it's a 555 number (reserved for fictional numbers)
 * 
 * @param {string} override - if provided, will return this value if it's valid
 * otherwise it'll throw an error
 */
export const generateLineNumber = (override?: string, fictionalize?: boolean): string => {
	if (override) {
		if (validateLineNumber(override)) {
			return override;
		}
		throw new Error(`Invalid line number`);
	}
	// torn between if I want this as a true/false
	// or if i just want it to be valid no matter what goes here
	if (typeof fictionalize !== `undefined`) {
		// return 01XX for 555 numbers
		const third = Math.floor(Math.random() * 10);
		const fourth = Math.floor(Math.random() * 10);
		return `01${third}${fourth}`;
	}
	const first = Math.floor(Math.random() * 10);
	const second = Math.floor(Math.random() * 10);
	const third = Math.floor(Math.random() * 10);
	const fourth = Math.floor(Math.random() * 10);
	if (first === 0 && second === 1) {
		// re-roll
		return generateLineNumber();
	}
	return `${first}${second}${third}${fourth}`;
};
