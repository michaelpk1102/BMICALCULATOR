import { validateAreaCode } from "../validate/area-code";
import { validateCentralOfficeCode } from "../validate/central-office-code";
import { validateLineNumber } from "../validate/line-number";

// imports are sorted alphabetically!!!
// eslint-disable-next-line sort-imports
import { generateAreaCode } from "./area-code";
import { generateCentralOfficeCode } from "./central-office-code";
import { generateLineNumber } from "./line-number";

type Options = {
  areaCode?: string;
  centralOfficeCode?: string;
  lineNumber?: string;
};

/**
 * Generates a NANP number
 * 
 * Add in ability to override the number's components
 * Add in ability to fictionalize the number with 555-01XX pattern
 */
export const generateNANPNumber = (options: boolean | Options) => {
	if (typeof options === `boolean`) {
		const areaCode = generateAreaCode();
		const centralOfficeCode = `555`;
		const lineNumber = generateLineNumber(undefined, true);
		return `${areaCode}${centralOfficeCode}${lineNumber}`;
	} else {
		let { areaCode, centralOfficeCode, lineNumber } = options;
		// Area code will be assigned if not provided
		if (!areaCode || !validateAreaCode(areaCode)) {
			areaCode = generateAreaCode();
		}
		// Central office code will be assigned if not provided
		if (!centralOfficeCode || !validateCentralOfficeCode(centralOfficeCode)) {
			centralOfficeCode = generateCentralOfficeCode();
		}
		// Line number will be assigned if not provided
		if (!lineNumber || !validateLineNumber(lineNumber)) {
			lineNumber = generateLineNumber();
		}
		return `${areaCode}${centralOfficeCode}${lineNumber}`;
	}
};