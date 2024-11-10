import {mockSchema} from "../data/constants.js";
import {randomObjectGeneration} from "../js/randomObjectGeneration.js";
import {outputTestResult} from "./outputTestResult.js";

/* 
Test Case Description:

* Purpose: To test the `randomObjectGeneration` function, which generates an object based on a given JSON schema. The tests verify that the function respects the constraints defined in the schema.

* Constraints/Edge Cases:
  * The function should handle `null` or empty schema gracefully.
  * It should respect the required fields and generate all properties defined in the schema.
  * When given a user object, it should allow for field overwriting.

* Expected Outcome:
  * If the schema is `null` or empty, the function returns null.
  * If a valid schema is provided, it generates an object with the necessary fields and respects required properties.
  * If a `userObject` is provided, it overwrites the default values with the user-provided ones.
*/

function testRandomObjectGeneration() {
  console.log("Test randomObjectGeneration:");

  // 1. Test for Invalid Object (Null Schema):
  // * Step: Pass null as the schema and check the result.
  // * Expected Outcome: The function should return `null`.

  outputTestResult(randomObjectGeneration(null), null, "Returns null if `schema` is not an object");

  // 2. Test for Valid Object (Valid Schema):
  // * Step: Pass a valid schema (`mockSchema`) and check the result.
  // * Expected Outcome: The function should return an object.

  const resultGeneratedObject = randomObjectGeneration(mockSchema);
  outputTestResult(
    resultGeneratedObject && typeof resultGeneratedObject === "object",
    true,
    "Returns an object with a valid schema"
  );

  // 3. Test for Empty Schema:
  // * Step: Pass an empty schema (`{}`) and check the result.
  // * Expected Outcome: The function should return `null` because an empty schema cannot generate an object.

  outputTestResult(randomObjectGeneration({}), null, "Returns null if the `schema` is empty");

  // 4. Test for Required Properties:
  // * Step: Check if the generated object contains all properties listed as required in the schema.
  // * Expected Outcome: The object should contain all the required properties.

  const requiredProperties = mockSchema.required;
  const resultRequiredProperties = requiredProperties.filter(
    (prop) => !(prop in resultGeneratedObject)
  );
  outputTestResult(resultRequiredProperties.length === 0, true, "Check for mandatory fields");

  // 5. Test for All Properties:
  // * Step: Ensure all properties defined in the schema are present in the generated object.
  // * Expected Outcome: The object should contain all properties listed in the `mockSchema.properties`.

  const allProperties = Object.keys(mockSchema.properties);
  const resultWithAllProperties = randomObjectGeneration(mockSchema);
  const resultProperties = Object.keys(resultWithAllProperties);
  const missingProperties = allProperties.filter((prop) => !resultProperties.includes(prop));
  outputTestResult(missingProperties.length === 0, true, "Generates all fields from the `schema`");

  // 6. Test for Field Rewriting (User Object):
  // * Step: Pass a user object with custom values and check if those values are applied to the generated object.
  // * Expected Outcome: The object should match the userObject values where provided.

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

  // 7. Test for Empty User Object:
  // * Step: Pass an empty user object and check if a valid object is still generated.
  // * Expected Outcome: The function should return a valid object based on the schema.

  const resultWithEmptyUserObject = randomObjectGeneration(mockSchema, {});
  outputTestResult(
    resultWithEmptyUserObject && typeof resultWithEmptyUserObject === "object",
    true,
    "Generates an object when `userObject` is empty"
  );
}

// ! Running tests
testRandomObjectGeneration();
