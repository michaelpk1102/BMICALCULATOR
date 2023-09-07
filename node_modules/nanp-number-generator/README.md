# nanp-number-generator

The North American Numbering Plan (NANP) is a telephone numbering plan for twenty-five regions in twenty countries, primarily in North America and the Caribbean. Phone numbers are formatted like so: (NXX)-NXX-XXXX where N is any digit 2 through 9, and X is any digit 0 through 9.  

This can cause issues when generating random phone numbers, as some numbers are invalid. This library's purpose is to generate only valid NANP numbers.

## Installation

```bash
npm install nanp-number-generator

# or
yarn add nanp-number-generator
```

## Usage

```javascript
import { generateNANPNumber } from "nanp-number-generator";

const number = generateNANPNumber({});

function show() {
  console.log(number);
}

show();
```

## Options

The `generateNANPNumber` function can take an object as its argument. The object can have the following properties:

- `areaCode`: A string of 3 digits
- `exchangeCode`: A string of 3 digits
- `lineNumber`: A string of 4 digits

The area code, exchange code, and line number will be validated before being returned. If any of the above properties are invalid according to the NANP, they will be replaced with a random valid number. Useful for keeping the area code the same, but generating a random exchange code and line number.

### Example usage

```javascript
const number = generateNANPNumber({
 areaCode: "503",
 exchangeCode: "459",
 lineNumber: "2769",
});

// returns "5034592769"
```

Alternatively, passing `true` into the function will generate a random TV number (555-XXXX format).

### Example usage

```javascript
const number = generateNANPNumber(true);

// returns a number in the format "NXX55501XX"
```

## License

MIT

## Author

[KirbyPaint](https://github.com/KirbyPaint)
