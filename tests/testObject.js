import {randomObject} from "../js/dataTypeHandling/complexTypes/object.js";
import {outputTestResult} from "./outputTestResult.js";

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

  // Test to use values ​​from `userObject` for all fields
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

  // Test to generate random values ​​if some fields are missing from `userObject`
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
// testRandomObject();
