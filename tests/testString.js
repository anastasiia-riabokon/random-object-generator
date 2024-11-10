import {randomString, randomStringPattern} from "../js/dataTypeHandling/primitiveTypes/string.js";
import {outputTestResult} from "./outputTestResult.js";

/*
Test Case Description:

* Purpose: To validate that the `randomString` function generates strings of specified length and character sets.

* Constraints/Edge Cases:
  * Ensures the generated string contains characters from specified sets (`"lowercase"`, `"numbers"`, mixed).
  * Verifies that string length is within defined `minLength` and `maxLength`.

* Expected Outcome:
  * Generates a string within specified constraints.
  * Returns `true` for valid format and valid string length.
*/

function testRandomString() {
  console.log("Test randomString:");

  const schema = {minLength: 5, maxLength: 5};

  /*
  1. Test for Lowercase Characters:
   * Step: Generate a string with lowercase letters.
   * Expected Outcome: String matches `[a-z]+` pattern.
   * Test Validation: `outputTestResult(isLowercase, true, "String validation with lowercase letters")`.
  */
  const resultLowercase = randomString(schema, "lowercase");
  const isLowercase = /[a-z]+/.test(resultLowercase);

  outputTestResult(isLowercase, true, "String validation with lowercase letters");

  /*
  2. Test for Numeric Characters:
   * Step: Generate a string containing only numbers.
   * Expected Outcome: String matches `[0-9]+` pattern.
   * Test Validation: `outputTestResult(isNumber, true, "Checking the string with numbers")`.
  */
  const resultNumbers = randomString(schema, "numbers");
  const isNumber = /[0-9]+/.test(resultNumbers);
  outputTestResult(isNumber, true, "Checking the string with numbers");

  /*
  3. Test for Mixed Characters:
   * Step: Generate a string with mixed alphanumeric characters.
   * Expected Outcome: String matches `[0-9a-zA-Z]+` pattern.
   * Test Validation: `outputTestResult(isMixed, true, "Mixed string validation")`.
   */
  const resultMixed = randomString(schema); // the second argument can be left blank or any string
  const isMixed = /[0-9a-zA-Z]+/.test(resultMixed);
  outputTestResult(isMixed, true, "Mixed string validation");

  /*
  4. Test for Length Compliance:
   * Step: Check if generated string length within `minLength` and `maxLength`.
   * Expected Outcome: String length is within the range.
   * Test Validation: `outputTestResult(isValidLength, true, "String length check")`.
  */
  const isValidLength =
    resultMixed.length >= schema.minLength && resultMixed.length <= schema.maxLength;
  outputTestResult(isValidLength, true, "String length check");
}

/*
Test Case Description:

* Purpose: To validate that the `randomStringPattern` function generates a URL matching a specified pattern.

* Constraints/Edge Cases:
  * Checks if the generated string follows the specific URL structure.
  
* Expected Outcome:
  * Generated URL matches the format: `https://[a-z]+.corezoid/api/json/public/[0-9]+/[a-zA-Z0-9]+`.
*/
function testRandomStringPattern() {
  console.log("Test randomStringPattern:");

  /*
  1. Test for URL Format Compliance:
   * Step: Generate a URL and check if it matches the specified pattern.
   * Expected Outcome: URL matches `^https:\/\/[a-z]+\.corezoid\/api\/json\/public\/[0-9]+\/[a-zA-Z0-9]+$`.
   * Test Validation: `outputTestResult(isValidUrl, true, "Validation of URL formation")`.
  */
  const schema = {minLength: 5, maxLength: 10};
  const result = randomStringPattern(schema);

  const isValidUrl = /^https:\/\/[a-z]+\.corezoid\/api\/json\/public\/[0-9]+\/[a-zA-Z0-9]+$/.test(
    result
  );

  outputTestResult(isValidUrl, true, "Validation of URL formation");
}

function testString() {
  testRandomString();
  testRandomStringPattern();
}

// ! Running tests
testString();
