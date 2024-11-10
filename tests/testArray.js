import {
  generateDescription,
  generateTags,
  randomArray,
  randomTitle,
} from "../js/dataTypeHandling/complexTypes/array.js";
import {outputTestResult} from "./outputTestResult.js";

/*
Test Case Descriptions:

* Purpose: To test the randomArray function, ensuring it correctly generates arrays based on various schema configurations, including `minItems`, `maxItems`, `uniqueItems`, and item type.

* Constraints/Edge Cases:
  * Should respect `minItems` and `maxItems` properties to control array length.
  * Must handle invalid `minItems` and `maxItems` values.
  * Should ensure unique items if `uniqueItems` is true.
  * Must verify that all array items match the specified type in the schema.

* Expected Outcomes:
  * Array length is within `minItems` and `maxItems`.
  * If given invalid `minItems` and `maxItems`, the function still returns a valid array.
  * If `uniqueItems` is set to true, the array contains no duplicate items.
  * All items match the specified type in `schema.items`.
*/

function testRandomArray() {
  console.log("Test randomArray:");

  const schema = {minItems: 3, maxItems: 5, items: {type: "string"}};

  const resultArray = randomArray(schema);

  /*
  1. Test for Array Length Within Range:

  * Step: Provide a schema with `minItems` and `maxItems` and check the generated array length.
  * Expected Outcome: Array length is between `minItems` and `maxItems`.
  * Test Validation: `outputTestResult(resultArray.length <= schema.maxItems && resultArray.length >= schema.minItems, true, "Check for finding the length of the array in the given interval")`.
  */
  outputTestResult(
    resultArray.length <= schema.maxItems && resultArray.length >= schema.minItems,
    true,
    "Check for finding the length of the array in the given interval"
  );

  /*
  2. Test for Invalid `min` and `max`:

  * Step: Pass a schema without `minItems` and `maxItems`.
  * Expected Outcome: A non-empty array is generated.
  * Test Validation: `outputTestResult(Array.isArray(resultWithInvalidMinMax) && resultWithInvalidMinMax.length > 0, true, "Returns an array of random length even with invalid values")`.
  */
  const schemaWithoutMinMax = {items: {type: "string"}};
  const resultWithInvalidMinMax = randomArray(schemaWithoutMinMax, "34", "csds");

  outputTestResult(
    Array.isArray(resultWithInvalidMinMax) && resultWithInvalidMinMax.length > 0,
    true,
    "Returns an array of random length even with invalid values"
  );

  /*
  3. Test for Unique Items:

  * Step: Provide a schema with `uniqueItems: true`.
  * Expected Outcome: Generated array has no duplicate items.
  * Test Validation: `outputTestResult(isUnique, true, "Checking the uniqueness of the elements in the array")`.

  */
  const schemaUniqueItems = {minItems: 3, maxItems: 5, uniqueItems: true, items: {type: "integer"}};
  const resultUniqueItems = randomArray(schemaUniqueItems);
  const isUnique = resultUniqueItems.length === new Set(resultUniqueItems).size;

  outputTestResult(isUnique, true, "checking the uniqueness of the elements in the array");

  /*
  4. Test for Correct Item Type:

  * Step: Pass a schema with item type set to string.
  * Expected Outcome: All array items are strings.
  * Test Validation: `outputTestResult(isTypeValid, true, "Checking the type of elements in the array")`.
   */
  const schemaWithTypeCheck = {items: {type: "string"}};
  const resultTypeCheck = randomArray(schemaWithTypeCheck, 2, 6);
  const isTypeValid = resultTypeCheck.every((item) => typeof item === "string");

  outputTestResult(isTypeValid, true, "checking the type of elements in the array");
}

/*
Test Case Description:

* Purpose: To test the `generateTags` function for generating an array of tags and handling various configurations of the `userTags` array, including empty, `undefined`, or filled.

* Constraints/Edge Cases:
  * When userTags is empty or `undefined`, the function should generate random tags within a specified range.
  * If `userTags` is filled, it should return the same tags.
  * Generated tags should be unique.

* Expected Outcome:
  * Returns random tags when `userTags` is empty or `undefined`.
  * Returns `userTags` array if filled.
  * Generated array respects `min` and `max` for length.
  * Contains unique tags.
*/

function testGenerateTags() {
  console.log("Test generateTags:");

  /*
  1. Test for Empty `userTags` Array:

  * Step: Pass an empty array to `generateTags`.
  * Expected Outcome: Returns an array with random values.
  * Test Validation: `outputTestResult(Array.isArray(resultEmptyArray) && resultEmptyArray.length > 0, true, "The function returns an array with random values when passed an empty array or without passing userTags")`.
  */
  const resultEmptyArray = generateTags([]);
  outputTestResult(
    Array.isArray(resultEmptyArray) && resultEmptyArray.length > 0,
    true,
    "The function returns an array with random values ​​when passed an empty array or without passing userTags"
  );

  /*
  2. Test for filled `userTags` Array:

  * Step: Pass a filled `userTags` array.
  * Expected Outcome: Function returns the original `userTags`.
  * Test Validation: `outputTestResult(JSON.stringify(resultWithUserTags) === JSON.stringify(userTags), true, "The function returns userTags if it is not empty")`.
   */
  const userTags = ["tag123", "tag345", "tag678"];
  const resultWithUserTags = generateTags(userTags);
  outputTestResult(
    JSON.stringify(resultWithUserTags) === JSON.stringify(userTags),
    true,
    "The function returns userTags if it is not empty"
  );

  /*
  3. Test for `userTags` is `undefined:

  * Step: Pass a `undefined` instead of `userTags`.
  * Expected Outcome: Returns an array with random values.
  * Test Validation: `outputTestResult(Array.isArray(resultEmptyArrayWithMinMax) && resultEmptyArrayWithMinMax.length > 0,true,"The function returns an array with random values")`.
   */
  const min = 2;
  const max = 7;
  const resultEmptyArrayWithMinMax = generateTags(undefined, min, max);
  outputTestResult(
    Array.isArray(resultEmptyArrayWithMinMax) && resultEmptyArrayWithMinMax.length > 0,
    true,
    "The function returns an array with random values"
  );

  /*
  4. Test for Array Length Within Range:

  * Step: Generate tags with `min` and `max` specified.
  * Expected Outcome: Array length is within `min` and `max`.
  * Test Validation: `outputTestResult(resultEmptyArrayWithMinMax.length <= max && resultEmptyArrayWithMinMax.length >= min, true, "Check for finding the length of the array in the given interval")`.
   */
  outputTestResult(
    resultEmptyArrayWithMinMax.length <= max && resultEmptyArrayWithMinMax.length >= min,
    true,
    "Check for finding the length of the array in the given interval"
  );

  /*5. Test for Unique Tags:

  * Step: Verify that tags in the array are unique.
  * Expected Outcome: Generated tags are unique.
  * Test Validation: `outputTestResult(isUnique, true, "The function generates an array of unique tags")`.*/
  const isUnique = new Set(resultEmptyArray).size === resultEmptyArray.length;
  outputTestResult(isUnique, true, "The function generates an array of unique tags");
}

/*
Test Case Description:

* Purpose: To test `randomTitle` for generating a random title and handling `userTitle` input.

* Constraints/Edge Cases:
  * Should generate a title if `userTitle` is not specified.
  * Should use `userTitle` if provided.
  * If userTitle is invalid (not a string), the function generates a random title.

* Expected Outcome:
  * Returns random title if `userTitle` is missing or invalid.
  * Matches `userTitle` when provided.
*/

function testRandomTitle() {
  console.log("Test randomTitle:");

  /*
  1. Test for Random Title Generation:

  * Step: Call `randomTitle` without `userTitle`.
  * Expected Outcome: Returns a string as a randomly generated title.
  * Test Validation: `outputTestResult(resultRandomTitle && typeof resultRandomTitle === "string", true, "Returns a randomly chosen title")`.
  */
  const resultRandomTitle = randomTitle();
  outputTestResult(
    resultRandomTitle && typeof resultRandomTitle === "string",
    true,
    "Returns a randomly chosen title"
  );

  /*
  2. Test for Specified `userTitle`:

  * Step: Pass a valid `userTitle`.
  * Expected Outcome: Returns the specified `userTitle`.
  * Test Validation: `outputTestResult(resultUserTitle === userObject.title, true, "Checking the output value for the specified userTitle")`.
  */
  const userObject = {
    title: "TITLE",
  };
  const resultUserTitle = randomTitle(userObject.title);
  outputTestResult(
    resultUserTitle === userObject.title,
    true,
    "Checking the output value for the specified userTitle"
  );

  /*
  3. Test for Invalid `userTitle`:

  * Step: Pass an invalid `userTitle`.
  * Expected Outcome: Returns a valid random title.
  * Test Validation: `outputTestResult(resultUserInvalidTitle && typeof resultUserInvalidTitle === "string", true, "Checking the data type of the specified userTitle")`.
   */
  const userObjectInvalid = {
    title: 123,
  };
  const resultUserInvalidTitle = randomTitle(userObjectInvalid.title);
  outputTestResult(
    resultUserInvalidTitle && typeof resultUserInvalidTitle === "string",
    true,
    "Checking the data type of the specified userTitle"
  );
}

/*
Test Case Description:

* Purpose: To test `generateDescription` function, verifying generation of a random description and handling `userDesc` input.

* Constraints/Edge Cases:
  * Should generate a random description if `userDesc` is not provided.
  * Should use `userDesc` if valid.
  * If `userDesc` is invalid (not a string), the function generates a random description.
* Expected Outcome:
  * Generates a random description when `userDesc` is missing or invalid.
  * Matches `userDesc` if provided.
*/

function testGenerateDescription() {
  console.log("Test generateDescription:");

  /*
  1. Test for Random Description Generation:

  * Step: Call `generateDescription` without `userDesc`.
  * Expected Outcome: Returns a generated description.
  * Test Validation: `outputTestResult(resultRandomDesc && typeof resultRandomDesc === "string", true, "Returns the generated description when userDesc is not specified")`.
  */
  const resultRandomDesc = generateDescription();
  outputTestResult(
    resultRandomDesc && typeof resultRandomDesc === "string",
    true,
    "Returns the generated description when userDesc is not specified"
  );

  /*
  2. Test for Specified userDesc:

  * Step: Pass a valid `userDesc`.
  * Expected Outcome: Function returns `userDesc`.
  * Test Validation: `outputTestResult(resultUserDesc === userObject.description, true, "Checking the output value for the specified userDesc")`.
  */
  const resultInvalidUserDesc = generateDescription(5425);
  outputTestResult(
    resultInvalidUserDesc && typeof resultInvalidUserDesc === "string",
    true,
    "Checking the data type of the specified userDesc"
  );

  /*
  3. Test for Invalid `userDesc`:

  * Step: Pass an invalid `userDesc`.
  * Expected Outcome: Returns a valid description.
  * Test Validation: `outputTestResult(resultInvalidUserDesc && typeof resultInvalidUserDesc === "string", true, "Checking the data type of the specified userDesc")`.
  */
  const userObject = {
    description: "DESCRIPTION",
  };
  const resultUserDesc = generateDescription(userObject.description);
  outputTestResult(
    resultUserDesc === userObject.description,
    true,
    "Checking the output value for the specified userDesc"
  );
}

export function testArray() {
  testRandomArray();
  testGenerateTags();
  testRandomTitle();
  testGenerateDescription();
}

// ! Running tests
testArray();
