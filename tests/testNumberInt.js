import {generateDate, randomNumberInt} from "../js/dataTypeHandling/primitiveTypes/numberInt.js";
import {outputTestResult} from "./outputTestResult.js";

/*
Test Case Description:

* Purpose: To verify that the `randomNumberInt` function correctly generates number within a specified range and handles various edge cases.

* Constraints/Edge Cases:
  * Ensures `minimum` is less than `maximum`.
  * Returns `null` if `minimum` or `maximum` is not a number.
  * Handles invalid inputs and boundary values.
* Expected Outcome:
  * Generates an integer in the specified range when given valid inputs.
  * Returns `null` for invalid or non-numeric inputs.
*/
function testRandomNumberInt() {
  console.log("Test randomNumberInt:");

  const min = 0;
  const max = 10;
  const result = randomNumberInt({minimum: min, maximum: max});

  /*
  1. Test for Type Check:
   * Step: Verify that the returned value is of type `number`.
   * Expected Outcome: Returns type `'number'`.
   * Test Validation: `outputTestResult(typeof result, "number", "returns type 'number'")`.
  */
  outputTestResult(typeof result, "number", "returns type 'number'");

  /*
  2. Test for Range Check:
   * Step: Validate that `min` is less than `max`.
   * Expected Outcome: `min` is less than `max`.
   * Test Validation: `outputTestResult(min < max, true, "min < max")`.
  */
  outputTestResult(min < max, true, "min < max");

  /*
  3. Test for Range Compliance:
   * Step: Verify that the generated number is within the specified range.
   * Expected Outcome: The number is within `[min, max]`.
   * Test Validation: `outputTestResult(result >= min && result <= max, true, "generates a number in the given range")`.
  */
  outputTestResult(result >= min && result <= max, true, "generates a number in the given range");

  /*
  4. Invalid `minimum`/`maximum`:
   * Step: Test with non-numeric `minimum` or `maximum`.
   * Expected Outcome: Returns `null`.
   * Test Validation: `outputTestResult(invalidMinMaxResult, null, "returns null if minimum or maximum is not a number")`.
  */
  const invalidMinMaxResult = randomNumberInt({minimum: "5", maximum: 10});
  outputTestResult(
    invalidMinMaxResult,
    null,
    "returns `null` if `minimum` or `maximum` is not a number"
  );

  /*
  5. Test for Default Range:
   * Step: Call `randomNumberInt` without `minimum` or `maximum`.
   * Expected Outcome: Generates a random number in the default range `[0, 100]`.
   * Test Validation: `outputTestResult(defaultResult >= 0 && defaultResult <= 100, true, "generates a default value")`.
  */
  const defaultResult = randomNumberInt({});
  outputTestResult(defaultResult >= 0 && defaultResult <= 100, true, "generates a default value");

  /*
  6. Boundary Test:
   * Step: Set `minimum` and `maximum` to the same value.
   * Expected Outcome: Returns that value.
   * Test Validation: `outputTestResult(boundaryResult, 10, "generates a number on the bounds of the range")`.
  */
  const boundaryResult = randomNumberInt({minimum: 10, maximum: 10});
  outputTestResult(boundaryResult, 10, "generates a number on the bounds of the range");

  /*
  7. Test for Type of `num`:
   * Step: Verify that `num` is of type `number`.
   * Expected Outcome: Returns type `number`.
   * Test Validation: `outputTestResult(typeof numResult, "number", "returns type 'number'")`.
   */
  const numResult = randomNumberInt({num: 5});
  outputTestResult(typeof numResult, "number", "returns type 'number'");

  /*
  8. Test for Invalid `num`:
   * Step: Pass a non-numeric `num`.
   * Expected Outcome: Returns `null`.
   * Test Validation: `outputTestResult(invalidNumResult, null, "returns null if num is not a number")`.
  */
  const invalidNumResult = randomNumberInt({num: "NaN"});
  outputTestResult(invalidNumResult, null, "returns `null` if `num` is not a number");
}

/*
Test Case Description:

* Purpose: To validate the `generateDate` function for generating date values based on a marker.
* Constraints/Edge Cases:
  * Handles invalid markers and dates.
  * Supports specific markers for `"start"` and `"end"`.
* Expected Outcome:
  * Returns a timestamp based on the marker.
  * Returns `null` for out-of-range dates or invalid markers.
*/

function testGenerateDate() {
  console.log("Test generateDate:");

  /*
  1. Test for Invalid Marker:
   * Step: Call `generateDate` with an invalid marker.
   * Expected Outcome: Returns `null`.
   * Test Validation: `outputTestResult(generateDate("invalid"), null, "checking for an invalid mark")`.
  */
  outputTestResult(generateDate("invalid"), null, "checking for an invalid mark");

  /*
  2. Test for "Start" Marker:
   * Step: Call `generateDate` with `"start"` marker.
   * Expected Outcome: Returns the current timestamp for `"start"`.
   * Test Validation: `outputTestResult(resultStart, currentTimestampStart, "returns the starting date ('start')")`.
  */
  const resultStart = generateDate("start");
  const currentTimestampStart = Math.floor(Date.now() / 1000);
  outputTestResult(resultStart, currentTimestampStart, "returns the starting date ('start')");

  /*
  3. Test for "End" Marker:
   * Step: Call `generateDate` with "end" marker.
   * Expected Outcome: Returns the end timestamp.
   * Test Validation: `outputTestResult(resultEnd, currentTimestampEnd, "returns the ending date ('end')")`.
  */
  const resultEnd = generateDate("end");
  const currentTimestampEnd = Math.floor((Date.now() + 1000000000) / 1000);
  outputTestResult(resultEnd, currentTimestampEnd, "returns the ending date ('end')");

  /*
  4. Test for Lower Limit Violation:
   * Step: Test a date below the 1970 limit.
   * Expected Outcome: Returns `null`.
   * Test Validation: `outputTestResult(generateDate("start", -15846623), null, "date less than lower limit (1970)")`.
  */
  outputTestResult(generateDate("start", -15846623), null, "date less than lower limit (1970)");

  /*
  5. Test for Upper Limit Violation:
   * Step: Test a date above the 2038 limit.
   * Expected Outcome: Returns `null`.
   * Test Validation: `outputTestResult(generateDate("start", 2147483648), null, "date exceeds the upper limit (2038)")`.
  */
  outputTestResult(generateDate("start", 2147483648), null, "date exceeds the upper limit (2038)");

  /*
  6. Test for Invalid Date Type:
   * Step: Pass a non-numeric date.
   * Expected Outcome: Returns `null`.
   * Test Validation: `outputTestResult(generateDate("start", typeof invalidDate), null, "returns null if date is not a number")`.
  */
  const invalidDate = "invalid date";
  outputTestResult(
    generateDate("start", typeof invalidDate),
    null,
    "returns `null` if `date` is not a number"
  );

  /*
  7. Test for Invalid Marker, Valid Date:
   * Step: Use an invalid marker but a valid date.
   * Expected Outcome: Returns `null`.
   * Test Validation: `outputTestResult(generateDate("invalid", 1734379887), null, "returns null for an invalid mark value with a valid date")`.
   */
  outputTestResult(
    generateDate("invalid", 1734379887),
    null,
    "returns null for an invalid mark value with a valid date"
  );

  /*
  8. Test for Valid Marker and Date:
   * Step: Call with a valid marker and date.
   * Expected Outcome: Returns the provided date.
   * Test Validation: `outputTestResult(generateDate("start", 1734379887), 1734379887, "returns a valid date")`.
  */
  outputTestResult(generateDate("start", 1734379887), 1734379887, "returns a valid `date`");
}

function testNumberInt() {
  testRandomNumberInt();
  testGenerateDate();
}

// ! Running tests
testNumberInt();
