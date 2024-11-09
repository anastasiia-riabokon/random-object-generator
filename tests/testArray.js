import {
  generateDescription,
  generateTags,
  randomArray,
  randomTitle,
} from "../js/dataTypeHandling/complexTypes/array.js";
import {outputTestResult} from "./outputTestResult.js";

function testRandomArray() {
  console.log("Test randomArray:");

  const schema = {minItems: 3, maxItems: 5, items: {type: "string"}};

  const resultArray = randomArray(schema);

  // Test for finding the length of the array in the `minItems` and `maxItems` range
  outputTestResult(
    resultArray.length <= schema.maxItems && resultArray.length >= schema.minItems,
    true,
    "Check for finding the length of the array in the given interval"
  );

  // Test for invalid `min` and `max`
  const schemaWithoutMinMax = {items: {type: "string"}};
  const resultWithInvalidMinMax = randomArray(schemaWithoutMinMax, "34", "csds");

  outputTestResult(
    Array.isArray(resultWithInvalidMinMax) && resultWithInvalidMinMax.length > 0,
    true,
    "Returns an array of random length even with invalid values"
  );

  // Test for the uniqueness of elements in an array
  const schemaUniqueItems = {minItems: 3, maxItems: 5, uniqueItems: true, items: {type: "integer"}};
  const resultUniqueItems = randomArray(schemaUniqueItems);
  const isUnique = resultUniqueItems.length === new Set(resultUniqueItems).size;

  outputTestResult(isUnique, true, "checking the uniqueness of the elements in the array");

  // Test for the correspondence of the type of array elements
  const schemaWithTypeCheck = {items: {type: "string"}};
  const resultTypeCheck = randomArray(schemaWithTypeCheck, 2, 6);
  const isTypeValid = resultTypeCheck.every((item) => typeof item === "string");

  outputTestResult(isTypeValid, true, "checking the type of elements in the array");
}

function testGenerateTags() {
  console.log("Test generateTags:");

  // Test for transferring an empty array
  const resultEmptyArray = generateTags([]);
  outputTestResult(
    Array.isArray(resultEmptyArray) && resultEmptyArray.length > 0,
    true,
    "The function returns an array with random values ​​when passed an empty array or without passing userTags"
  );

  // Test for passing a non-empty `userTags` array
  const userTags = ["tag123", "tag345", "tag678"];
  const resultWithUserTags = generateTags(userTags);
  outputTestResult(
    JSON.stringify(resultWithUserTags) === JSON.stringify(userTags),
    true,
    "The function returns userTags if it is not empty"
  );

  // Test for random generation when userTags is not passed with min and max passed
  const min = 2;
  const max = 7;
  const resultEmptyArrayWithMinMax = generateTags(undefined, min, max);
  outputTestResult(
    Array.isArray(resultEmptyArrayWithMinMax) && resultEmptyArrayWithMinMax.length > 0,
    true,
    "The function returns an array with random values"
  );

  // Test for finding the length of an array in a given interval
  outputTestResult(
    resultEmptyArrayWithMinMax.length <= max && resultEmptyArrayWithMinMax.length >= min,
    true,
    "Check for finding the length of the array in the given interval"
  );

  // Test for no duplicate tags
  const isUnique = new Set(resultEmptyArray).size === resultEmptyArray.length;
  outputTestResult(isUnique, true, "The function generates an array of unique tags");
}

function testRandomTitle() {
  console.log("Test randomTitle:");

  // Test for random title generation
  const resultRandomTitle = randomTitle();
  outputTestResult(
    resultRandomTitle && typeof resultRandomTitle === "string",
    true,
    "Returns a randomly chosen title"
  );

  // Test to match title when `userTitle` is specified
  const userObject = {
    title: "TITLE",
  };
  const resultUserTitle = randomTitle(userObject.title);
  outputTestResult(
    resultUserTitle === userObject.title,
    true,
    "Checking the output value for the specified userTitle"
  );

  // Test for generating a random title with an invalid `userTitle`
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

function testGenerateDescription() {
  console.log("Test generateDescription:");

  // Random description generation test
  const resultRandomTitle = generateDescription();
  outputTestResult(
    resultRandomTitle && typeof resultRandomTitle === "string",
    true,
    "Returns the generated description when userDesc is not specified"
  );

  // Test for generating a random description with an invalid userDesc
  const resultInvalidUserDesc = generateDescription(5425);
  outputTestResult(
    resultInvalidUserDesc && typeof resultInvalidUserDesc === "string",
    true,
    "Checking the data type of the specified userDesc"
  );

  // Test for matching the original description when userDesc is specified
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

function testArray() {
  testRandomArray();
  testGenerateTags();
  testRandomTitle();
  testGenerateDescription();
}

// ! Running tests
// testArray();
