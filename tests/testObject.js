import {randomObject} from "../js/dataTypeHandling/complexTypes/object.js";
import {outputTestResult} from "./outputTestResult.js";

/*
Test Case Description:

* Purpose: To validate that the `randomObject` function correctly generates objects based on the specified schema, utilizing `userObject` values where provided and creating random values for missing properties.

* Constraints/Edge Cases:
  * If a value is provided in `userObject`, it should be used.
  * If a property is missing in `userObject`, `randomObject` should generate a random value of the appropriate type according to the schema.

* Expected Outcome:
  * The function should correctly apply `userObject` values where specified and generate values that fit the schema for fields that are missing.
*/

function testRandomObject() {
  console.log("Test randomObject:");

  const schema = {
    properties: {
      title: {type: "string"},
      description: {type: "string"},
      tags: {type: "array"},
      readOnly: {type: "boolean"},
    },
    required: ["title", "tags"],
  };

  /*
  1. Test for Full `userObject` Values:

   * Step: Call `randomObject` with a complete `userObject` that includes values for all properties defined in the schema.
   * Expected Outcome: Each property in the resulting object matches the corresponding value from `userObject`.
   * Test Validation:
     * `outputTestResult(resultFull.title === userObjFull.title, true, "Uses the `title` value from `userObject`")`.
     * `outputTestResult(resultFull.description === userObjFull.description, true, "Uses the `description` value from `userObject`")`.
     * `outputTestResult(resultFull.tags === userObjFull.tags, true, "Uses the `tags` value from the `userObject`")`.
     * `outputTestResult(resultFull.readOnly === userObjFull.readOnly, true, "Uses the `readOnly` value from `userObject`")`.
  */
  const userObjFull = {
    title: "My Title",
    description: "My Description",
    tags: ["tag1", "tag2"],
    readOnly: true,
  };
  const resultFull = randomObject(schema, {}, userObjFull);

  outputTestResult(
    resultFull.title === userObjFull.title,
    true,
    "Uses the `title` value from `userObject`"
  );

  outputTestResult(
    resultFull.description === userObjFull.description,
    true,
    "Uses the `description` value from `userObject`"
  );

  outputTestResult(
    resultFull.tags === userObjFull.tags,
    true,
    "Uses the `tags` value from the `userObject`"
  );

  outputTestResult(
    resultFull.readOnly === userObjFull.readOnly,
    true,
    "Uses the `readOnly` value from `userObject`"
  );

  /*
  2. Test for Partial `userObject` Values:

   * Step: Call `randomObject` with a `userObject` containing only some properties (e.g., only `title`).
   * Expected Outcome: The function should use the provided `userObject` value for `title` and generate appropriate random values for other properties.
   * Test Validation:
     * `outputTestResult(resultPartial.title === userObjPartial.title, true, "Uses the `title` value from `userObject`")`.
     * `outputTestResult(Array.isArray(resultPartial.tags), true, "Generates random values for `tags` when `userObject.tags` is missing")`.
     * `outputTestResult(typeof resultPartial.readOnly === "boolean", true, "Generates random values for `readOnly` when `userObject.readOnly` is missing")`.
  */
  const userObjPartial = {title: "Anything Title"};
  const resultPartial = randomObject(schema, {}, userObjPartial);

  outputTestResult(
    resultPartial.title === userObjPartial.title,
    true,
    "Stores the value of `title` from `userObject` in the absence of other fields"
  );

  outputTestResult(
    Array.isArray(resultPartial.tags),
    true,
    "Generates random values ​​for `tags` when `userObject.tags` is not passed"
  );

  outputTestResult(
    typeof resultPartial.readOnly === "boolean",
    true,
    "Generates random values ​​for `readOnly` when `userObject.readOnly` is not passed"
  );
}

// ! Running tests
testRandomObject();
