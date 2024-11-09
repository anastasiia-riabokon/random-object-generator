import {mockSchema} from "../data/constants.js";
import {randomObjectGeneration} from "../js/randomObjectGeneration.js";
import {outputTestResult} from "./outputTestResult.js";

function testRandomObjectGeneration() {
  console.log("Test randomObjectGeneration:");

  // Test for an invalid object
  outputTestResult(randomObjectGeneration(null), null, "Returns null if `schema` is not an object");

  // Test for a valid object
  const resultGeneratedObject = randomObjectGeneration(mockSchema);
  outputTestResult(
    resultGeneratedObject && typeof resultGeneratedObject === "object",
    true,
    "Returns an object with a valid schema"
  );

  // Test when an empty circuit is passed
  outputTestResult(randomObjectGeneration({}), null, "Returns null if the `schema` is empty");

  // Test for the presence of mandatory fields in the generated object
  const requiredProperties = mockSchema.required;
  const resultRequiredProperties = requiredProperties.filter(
    (prop) => !(prop in resultGeneratedObject)
  );
  outputTestResult(resultRequiredProperties.length === 0, true, "Check for mandatory fields");

  // Test for generating all fields according to the scheme
  const allProperties = Object.keys(mockSchema.properties);
  const resultWithAllProperties = randomObjectGeneration(mockSchema);
  const resultProperties = Object.keys(resultWithAllProperties);
  const missingProperties = allProperties.filter((prop) => !resultProperties.includes(prop));
  outputTestResult(missingProperties.length === 0, true, "Generates all fields from the `schema`");

  // Field rewriting test
  const userObject = {
    title: "MY Title",
    startDate: 1734379887,
    tags: ["testTag1", "testTag2"],
  };
  const resultWithUserObject = randomObjectGeneration(mockSchema, userObject);
  outputTestResult(
    resultWithUserObject.title === userObject.title,
    true,
    "Check for using the specified value instead of the default"
  );

  // Test to generate an object with random values ​​if `userObject` is an empty object
  const resultWithEmptyUserObject = randomObjectGeneration(mockSchema, {});
  outputTestResult(
    resultWithEmptyUserObject && typeof resultWithEmptyUserObject === "object",
    true,
    "Generates an object when `userObject` is empty"
  );
}

// ! Running tests
// testRandomObjectGeneration();
