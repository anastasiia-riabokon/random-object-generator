import {generateDate, randomNumberInt} from "../js/dataTypeHandling/primitiveTypes/numberInt.js";
import {outputTestResult} from "./outputTestResult.js";

function testRandomNumberInt() {
  console.log("Test randomNumberInt:");

  const min = 0;
  const max = 10;
  const result = randomNumberInt({minimum: min, maximum: max});

  // Test to check the data type of the result
  outputTestResult(typeof result, "number", "returns type 'number'");

  // Test to check min < max
  outputTestResult(min < max, true, "min < max");

  // Test for finding a number in the selected range
  outputTestResult(result >= min && result <= max, true, "generates a number in the given range");

  // Test with an invalid number
  const invalidMinMaxResult = randomNumberInt({minimum: "5", maximum: 10});
  outputTestResult(
    invalidMinMaxResult,
    null,
    "returns `null` if `minimum` or `maximum` is not a number"
  );

  // Test to generate a random value in the range from 0 to 100
  const defaultResult = randomNumberInt({});
  outputTestResult(defaultResult >= 0 && defaultResult <= 100, true, "generates a default value");

  // Value generation test on range boundaries
  const boundaryResult = randomNumberInt({minimum: 10, maximum: 10});
  outputTestResult(boundaryResult, 10, "generates a number on the bounds of the range");

  // Test for compliance with the data type of `num`
  const numResult = randomNumberInt({num: 5});
  outputTestResult(typeof numResult, "number", "returns type 'number'");

  // Test with an invalid `num`
  const invalidNumResult = randomNumberInt({num: "NaN"});
  outputTestResult(invalidNumResult, null, "returns `null` if `num` is not a number");
}

function testGenerateDate() {
  console.log("Test generateDate:");

  // Test for an invalid marker
  outputTestResult(generateDate("invalid"), null, "checking for an invalid mark");

  // Tests for random date generation with different markers
  const resultStart = generateDate("start");
  const currentTimestampStart = Math.floor(Date.now() / 1000);
  outputTestResult(resultStart, currentTimestampStart, "returns the starting date ('start')");

  const resultEnd = generateDate("end");
  const currentTimestampEnd = Math.floor((Date.now() + 1000000000) / 1000);
  outputTestResult(resultEnd, currentTimestampEnd, "returns the ending date ('end')");

  // Tests with an invalid date between 1970 and 2038
  outputTestResult(generateDate("start", -15846623), null, "date less than lower limit (1970)");

  outputTestResult(generateDate("start", 2147483648), null, "date exceeds the upper limit (2038)");

  const invalidDate = "invalid date";
  outputTestResult(
    generateDate("start", typeof invalidDate),
    null,
    "returns `null` if `date` is not a number"
  );

  // Test with an invalid marker, but with a valid `date`
  outputTestResult(
    generateDate("invalid", 1734379887),
    null,
    "returns null for an invalid mark value with a valid date"
  );

  // Test with a valid marker and a valid `date`
  outputTestResult(generateDate("start", 1734379887), 1734379887, "returns a valid `date`");
}

function testNumberInt() {
  testRandomNumberInt();
  testGenerateDate();
}

// ! Running tests
// testNumberInt();
