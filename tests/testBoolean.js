import {generateBoolean} from "../js/dataTypeHandling/primitiveTypes/boolean.js";
import {outputTestResult} from "./outputTestResult.js";

function testGenerateBoolean() {
  console.log("Test generateBoolean:");
  outputTestResult(generateBoolean(true), true, "returns true when true is passed");

  outputTestResult(generateBoolean(false), false, "returns false when false is passed");

  outputTestResult(
    generateBoolean(),
    true,
    "returns true or false when nothing is passed or undefined is passed"
  );

  outputTestResult(generateBoolean(null), false, "returns false when null is passed");
}

// ! Running tests
// testGenerateBoolean();
