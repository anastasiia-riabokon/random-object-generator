import {randomString, randomStringPattern} from "../js/dataTypeHandling/primitiveTypes/string.js";
import {outputTestResult} from "./outputTestResult.js";

function testRandomString() {
  console.log("Test randomString:");

  const schema = {minLength: 5, maxLength: 5};

  // Lowercase test
  const resultLowercase = randomString(schema, "lowercase");
  const isLowercase = /[a-z]+/.test(resultLowercase);

  outputTestResult(isLowercase, true, "String validation with lowercase letters");

  // Numbers Test
  const resultNumbers = randomString(schema, "numbers");
  const isNumber = /[0-9]+/.test(resultNumbers);
  outputTestResult(isNumber, true, "Checking the string with numbers");

  // Mixed string test
  const resultMixed = randomString(schema); // the second argument can be left blank or any string
  const isMixed = /[0-9a-zA-Z]+/.test(resultMixed);
  outputTestResult(isMixed, true, "Mixed string validation");

  // String length test within a range
  const isValidLength =
    resultMixed.length >= schema.minLength && resultMixed.length <= schema.maxLength;
  outputTestResult(isValidLength, true, "String length check");
}

function testRandomStringPattern() {
  console.log("Test randomStringPattern:");

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
// testString();
