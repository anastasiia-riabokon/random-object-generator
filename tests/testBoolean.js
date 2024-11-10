import {generateBoolean} from "../js/dataTypeHandling/primitiveTypes/boolean.js";
import {outputTestResult} from "./outputTestResult.js";

/*
Test Case Description:

* Purpose: To test the `generateBoolean` function, ensuring that it returns expected boolean values based on the input provided.

* Constraints/Edge Cases:
  * Should return `true` if `true` is passed.
  * Should return `false` if `false` or `null` is passed.
  * When no argument or `undefined` is provided, it should randomly return `true` or `false`.

* Expected Outcome:
  * Returns `true` for `true` input and `false` for `false` or `null`.
  * Generates a random boolean value when no input or `undefined` is provided.
*/

function testGenerateBoolean() {
  console.log("Test generateBoolean:");

  /*
  1. Test for True Input:

  * Step: Pass `true` as the argument to `generateBoolean`.
  * Expected Outcome: The function returns `true`.
  * Test Validation: `outputTestResult(generateBoolean(true), true, "returns true when true is passed")`.
  */
  outputTestResult(generateBoolean(true), true, "returns true when true is passed");

  /*
  2. Test for False Input:

  * Step: Pass false as the argument to `generateBoolean`.
  * Expected Outcome: The function returns `false`.
  * Test Validation: `outputTestResult(generateBoolean(false), false, "returns false when false is passed")`.
  */
  outputTestResult(generateBoolean(false), false, "returns false when false is passed");

  /*
  3. Test for Undefined Input (Random Boolean Generation):

  * Step: Call `generateBoolean` without passing any argument.
  * Expected Outcome: The function should return a random boolean value (`true` or `false`).
  * Test Validation: `outputTestResult(typeof generateBoolean() === "boolean", true, "returns true or false when nothing is passed or undefined is passed")`.
  */
  outputTestResult(
    typeof generateBoolean() === "boolean",
    true,
    "returns true or false when nothing is passed or undefined is passed"
  );

  /*
  4. Test for Null Input:

  * Step: Pass `null` as the argument to `generateBoolean`.
  * Expected Outcome: The function returns `false`.
  * Test Validation: `outputTestResult(generateBoolean(null), false, "returns false when null is passed")`.
  */
  outputTestResult(generateBoolean(null), false, "returns false when null is passed");
}

// ! Running tests
testGenerateBoolean();
