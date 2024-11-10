## Function testing

The `outputTestResult(actual, expected, nameTest)` function is used for testing, and it prints the test result to the console.

### Test: `randomObjectGeneration()`

#### Test Case Description:

* Purpose: To test the `randomObjectGeneration` function, which generates an object based on a given JSON schema. The tests verify that the function respects the constraints defined in the schema.

* Constraints/Edge Cases:
  * The function should handle `null` or empty schema gracefully.
  * It should respect the required fields and generate all properties defined in the schema.
  * When given a user object, it should allow for field overwriting.

* Expected Outcome:
  * If the schema is `null` or empty, the function returns null.
  * If a valid schema is provided, it generates an object with the necessary fields and respects required properties.
  * If a `userObject` is provided, it overwrites the default values with the user-provided ones.

#### Validation Steps:

  1. Test for Invalid Object (Null Schema):

      * Step: Pass null as the schema and check the result.
      * Expected Outcome: The function should return `null`.
      * Test Validation: `outputTestResult(randomObjectGeneration(null), null, "Returns null if schema is not an object")`.

  2. Test for Valid Object (Valid Schema):

      * Step: Pass a valid schema (`mockSchema`) and check the result.
      * Expected Outcome: The function should return an object.
      * Test Validation: `outputTestResult(resultGeneratedObject && typeof resultGeneratedObject === "object", true, "Returns an object with a valid schema")`.

  3. Test for Empty Schema:

      * Step: Pass an empty schema (`{}`) and check the result.
      * Expected Outcome: The function should return `null` because an empty schema cannot generate an object.
      * Test Validation: `outputTestResult(randomObjectGeneration({}), null, "Returns null if the schema is empty")`.

  4. Test for Required Properties:

      * Step: Check if the generated object contains all properties listed as required in the schema.
      * Expected Outcome: The object should contain all the required properties.
      * Test Validation: `outputTestResult(resultRequiredProperties.length === 0, true, "Check for mandatory fields")`.

  5. Test for All Properties:

      * Step: Ensure all properties defined in the schema are present in the generated object.
      * Expected Outcome: The object should contain all properties listed in the `mockSchema.properties`.
      * Test Validation: `outputTestResult(missingProperties.length === 0, true, "Generates all fields from the schema")`.

  6. Test for Field Rewriting (User Object):

      * Step: Pass a user object with custom values and check if those values are applied to the generated object.
      * Expected Outcome: The object should match the userObject values where provided.
      * Test Validation: `outputTestResult(resultWithUserObject.title === userObject.title, true, "Check for using the specified value instead of the default")`.

  7. Test for Empty User Object:

      * Step: Pass an empty user object and check if a valid object is still generated.
      * Expected Outcome: The function should return a valid object based on the schema.
      * Test Validation: `outputTestResult(resultWithEmptyUserObject && typeof resultWithEmptyUserObject === "object", true, "Generates an object when userObject is empty")`.

### Test: `dataTypeHandling()`

#### Test Case Descriptions:

* Purpose: To test the dataTypeHandling function for accurately generating values based on specific JSON schema structures, including `enum`, `anyOf`, and `$ref`.

* Constraints/Edge Cases:
  * Should correctly handle and validate `enum` values by ensuring generated values are within defined limits.
  * Must properly interpret `anyOf` schemas with multiple type options, choosing random valid type.
  * Should resolve `$ref` references, accurately generating objects based on the referenced structure.

* Expected Outcome:
  * For `enum`, the function generates one of the allowed values.
  * For `anyOf`, the function returns a value matching one of the types defined in `anyOf`.
  * For `$ref`, the function produces an object that includes all required fields specified by the reference.

#### Validation Steps:

1. Enum Test:
  * Step: Define enumSchema with `enum` values and pass it to `dataTypeHandling`.
  * Expected Outcome: Generated result should be one of the values in `enum`.
  * Test Validation: `outputTestResult(isEnumValid, true, "Enum validation - checks if generated value is within enum options")`.

2. AnyOf Test:

  * Step: Define `anyOfSchema` allowing types `"string"` or `"integer"`, then pass it to `dataTypeHandling`.
  * Expected Outcome: Result should be either a string or a number.
  * Test Validation: `outputTestResult(isAnyOfValid, true, "anyOf validation - verifies generated value matches one of the allowed types")`.

3. $ref Test:

  * Step: Define `refSchema` with an attendees structure and `$ref`, and pass this along with definitions to `dataTypeHandling`.
  * Expected Outcome: Resulting object should contain `userId` and `access` properties as required by the reference.
  * Test Validation: `outputTestResult(isRefValid, true, "Reference handling - ensures referenced schema fields are generated correctly")`.

### Test: `randomArray()`:

#### Test Case Descriptions:

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

#### Validation Steps:

1. Test for Array Length Within Range:

  * Step: Provide a schema with `minItems` and `maxItems` and check the generated array length.
  * Expected Outcome: Array length is between `minItems` and `maxItems`.
  * Test Validation: `outputTestResult(resultArray.length <= schema.maxItems && resultArray.length >= schema.minItems, true, "Check for finding the length of the array in the given interval")`.

2. Test for Invalid `min` and `max`:

  * Step: Pass a schema without `minItems` and `maxItems`.
  * Expected Outcome: A non-empty array is generated.
  * Test Validation: `outputTestResult(Array.isArray(resultWithInvalidMinMax) && resultWithInvalidMinMax.length > 0, true, "Returns an array of random length even with invalid values")`.

3. Test for Unique Items:

  * Step: Provide a schema with `uniqueItems: true`.
  * Expected Outcome: Generated array has no duplicate items.
  * Test Validation: `outputTestResult(isUnique, true, "Checking the uniqueness of the elements in the array")`.

4. Test for Correct Item Type:

  * Step: Pass a schema with item type set to string.
  * Expected Outcome: All array items are strings.
  * Test Validation: `outputTestResult(isTypeValid, true, "Checking the type of elements in the array")`.

### Test: `generateTags()`

#### Test Case Description:

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

#### Validation Steps:

1. Test for Empty `userTags` Array:

  * Step: Pass an empty array to `generateTags`.
  * Expected Outcome: Returns an array with random values.
  * Test Validation: `outputTestResult(Array.isArray(resultEmptyArray) && resultEmptyArray.length > 0, true, "The function returns an array with random values when passed an empty array or without passing userTags")`.

2. Test for filled `userTags` Array:

  * Step: Pass a filled `userTags` array.
  * Expected Outcome: Function returns the original `userTags`.
  * Test Validation: `outputTestResult(JSON.stringify(resultWithUserTags) === JSON.stringify(userTags), true, "The function returns userTags if it is not empty")`.

3. Test for `userTags` is `undefined`:

  * Step: Pass a `undefined` instead of `userTags`.
  * Expected Outcome: Returns an array with random values.
  * Test Validation: `outputTestResult(Array.isArray(resultEmptyArrayWithMinMax) && resultEmptyArrayWithMinMax.length > 0,true,"The function returns an array with random values")`.


4. Test for Array Length Within Range:

  * Step: Generate tags with `min` and `max` specified.
  * Expected Outcome: Array length is within `min` and `max`.
  * Test Validation: `outputTestResult(resultEmptyArrayWithMinMax.length <= max && resultEmptyArrayWithMinMax.length >= min, true, "Check for finding the length of the array in the given interval")`.

5. Test for Unique Tags:

  * Step: Verify that tags in the array are unique.
  * Expected Outcome: Generated tags are unique.
  * Test Validation: `outputTestResult(isUnique, true, "The function generates an array of unique tags")`.

### Test: `randomTitle()`

#### Test Case Description:

* Purpose: To test `randomTitle` for generating a random title and handling `userTitle` input.

* Constraints/Edge Cases:
  * Should generate a title if `userTitle` is not specified.
  * Should use `userTitle` if provided.
  * If userTitle is invalid (not a string), the function generates a random title.

* Expected Outcome:
  * Returns random title if `userTitle` is missing or invalid.
  * Matches `userTitle` when provided.

#### Validation Steps:

1. Test for Random Title Generation:

  * Step: Call `randomTitle` without `userTitle`.
  * Expected Outcome: Returns a string as a randomly generated title.
  * Test Validation: `outputTestResult(resultRandomTitle && typeof resultRandomTitle === "string", true, "Returns a randomly chosen title")`.

2. Test for Specified `userTitle`:

  * Step: Pass a valid `userTitle`.
  * Expected Outcome: Returns the specified `userTitle`.
  * Test Validation: `outputTestResult(resultUserTitle === userObject.title, true, "Checking the output value for the specified userTitle")`.

3. Test for Invalid `userTitle`:

  * Step: Pass an invalid `userTitle`.
  * Expected Outcome: Returns a valid random title.
  * Test Validation: `outputTestResult(resultUserInvalidTitle && typeof resultUserInvalidTitle === "string", true, "Checking the data type of the specified userTitle")`.

### Test: `generateDescription()`

#### Test Case Description:

* Purpose: To test `generateDescription` function, verifying generation of a random description and handling `userDesc` input.

* Constraints/Edge Cases:
  * Should generate a random description if `userDesc` is not provided.
  * Should use `userDesc` if valid.
  * If `userDesc` is invalid (not a string), the function generates a random description.
* Expected Outcome:
  * Generates a random description when `userDesc` is missing or invalid.
  * Matches `userDesc` if provided.

#### Validation Steps:

1. Test for Random Description Generation:

  * Step: Call `generateDescription` without `userDesc`.
  * Expected Outcome: Returns a generated description.
  * Test Validation: `outputTestResult(resultRandomDesc && typeof resultRandomDesc === "string", true, "Returns the generated description when userDesc is not specified")`.

2. Test for Specified userDesc:

  * Step: Pass a valid `userDesc`.
  * Expected Outcome: Function returns `userDesc`.
  * Test Validation: `outputTestResult(resultUserDesc === userObject.description, true, "Checking the output value for the specified userDesc")`.

3. Test for Invalid `userDesc`:

  * Step: Pass an invalid `userDesc`.
  * Expected Outcome: Returns a valid description.
  * Test Validation: `outputTestResult(resultInvalidUserDesc && typeof resultInvalidUserDesc === "string", true, "Checking the data type of the specified userDesc")`.

### Test: `generateBoolean()`

#### Test Case Description:

* Purpose: To test the `generateBoolean` function, ensuring that it returns expected boolean values based on the input provided.

* Constraints/Edge Cases:
  * Should return `true` if `true` is passed.
  * Should return `false` if `false` or `null` is passed.
  * When no argument or `undefined` is provided, it should randomly return `true` or `false`.

* Expected Outcome:
  * Returns `true` for `true` input and `false` for `false` or `null`.
  * Generates a random boolean value when no input or `undefined` is provided.

#### Validation Steps:

1. Test for True Input:

  * Step: Pass `true` as the argument to `generateBoolean`.
  * Expected Outcome: The function returns `true`.
  * Test Validation: `outputTestResult(generateBoolean(true), true, "returns true when true is passed")`.

2. Test for False Input:

  * Step: Pass false as the argument to `generateBoolean`.
  * Expected Outcome: The function returns `false`.
  * Test Validation: `outputTestResult(generateBoolean(false), false, "returns false when false is passed")`.

3. Test for Undefined Input (Random Boolean Generation):

  * Step: Call `generateBoolean` without passing any argument.
  * Expected Outcome: The function should return a random boolean value (`true` or `false`).
  * Test Validation: `outputTestResult(typeof generateBoolean() === "boolean", true, "returns true or false when nothing is passed or undefined is passed")`.

4. Test for Null Input:

  * Step: Pass `null` as the argument to `generateBoolean`.
  * Expected Outcome: The function returns `false`.
  * Test Validation: `outputTestResult(generateBoolean(null), false, "returns false when null is passed")`.

### Test: `randomNumberInt()`

#### Test Case Description:

* Purpose: To verify that the `randomNumberInt` function correctly generates number within a specified range and handles various edge cases.

* Constraints/Edge Cases:
  * Ensures `minimum` is less than `maximum`.
  * Returns `null` if `minimum` or `maximum` is not a number.
  * Handles invalid inputs and boundary values.
* Expected Outcome:
  * Generates an integer in the specified range when given valid inputs.
  * Returns `null` for invalid or non-numeric inputs.

#### Validation Steps:

1. Test for Type Check:
   * Step: Verify that the returned value is of type `number`.
   * Expected Outcome: Returns type `'number'`.
   * Test Validation: `outputTestResult(typeof result, "number", "returns type 'number'")`.

2. Test for Range Check:
   * Step: Validate that `min` is less than `max`.
   * Expected Outcome: `min` is less than `max`.
   * Test Validation: `outputTestResult(min < max, true, "min < max")`.

3. Test for Range Compliance:
   * Step: Verify that the generated number is within the specified range.
   * Expected Outcome: The number is within `[min, max]`.
   * Test Validation: `outputTestResult(result >= min && result <= max, true, "generates a number in the given range")`.

4. Test for Invalid `minimum`/`maximum`:
   * Step: Test with non-numeric `minimum` or `maximum`.
   * Expected Outcome: Returns `null`.
   * Test Validation: `outputTestResult(invalidMinMaxResult, null, "returns null if minimum or maximum is not a number")`.

5. Test for Default Range:
   * Step: Call `randomNumberInt` without `minimum` or `maximum`.
   * Expected Outcome: Generates a random number in the default range `[0, 100]`.
   * Test Validation: `outputTestResult(defaultResult >= 0 && defaultResult <= 100, true, "generates a default value")`.

6. Test for Boundary Test:
   * Step: Set `minimum` and `maximum` to the same value.
   * Expected Outcome: Returns that value.
   * Test Validation: `outputTestResult(boundaryResult, 10, "generates a number on the bounds of the range")`.

7. Test for Type of `num`:
   * Step: Verify that `num` is of type `number`.
   * Expected Outcome: Returns type `number`.
   * Test Validation: `outputTestResult(typeof numResult, "number", "returns type 'number'")`.

8. Test for Invalid `num`:
   * Step: Pass a non-numeric `num`.
   * Expected Outcome: Returns `null`.
   * Test Validation: `outputTestResult(invalidNumResult, null, "returns null if num is not a number")`.


### Test: `generateDate()`

#### Test Case Description:

* Purpose: To validate the `generateDate` function for generating date values based on a marker.
* Constraints/Edge Cases:
  * Handles invalid markers and dates.
  * Supports specific markers for `"start"` and `"end"`.
* Expected Outcome:
  * Returns a timestamp based on the marker.
  * Returns `null` for out-of-range dates or invalid markers.

#### Validation Steps:

1. Test for Invalid Marker:
   * Step: Call `generateDate` with an invalid marker.
   * Expected Outcome: Returns `null`.
   * Test Validation: `outputTestResult(generateDate("invalid"), null, "checking for an invalid mark")`.

2. Test for "Start" Marker:
   * Step: Call `generateDate` with `"start"` marker.
   * Expected Outcome: Returns the current timestamp for `"start"`.
   * Test Validation: `outputTestResult(resultStart, currentTimestampStart, "returns the starting date ('start')")`.

3. Test for "End" Marker:
   * Step: Call `generateDate` with "end" marker.
   * Expected Outcome: Returns the end timestamp.
   * Test Validation: `outputTestResult(resultEnd, currentTimestampEnd, "returns the ending date ('end')")`.

4. Test for Lower Limit Violation:
   * Step: Test a date below the 1970 limit.
   * Expected Outcome: Returns `null`.
   * Test Validation: `outputTestResult(generateDate("start", -15846623), null, "date less than lower limit (1970)")`.

5. Test for Upper Limit Violation:
   * Step: Test a date above the 2038 limit.
   * Expected Outcome: Returns `null`.
   * Test Validation: `outputTestResult(generateDate("start", 2147483648), null, "date exceeds the upper limit (2038)")`.

6. Test for Invalid Date Type:
   * Step: Pass a non-numeric date.
   * Expected Outcome: Returns `null`.
   * Test Validation: `outputTestResult(generateDate("start", typeof invalidDate), null, "returns null if date is not a number")`.

7. Test for Invalid Marker, Valid Date:
   * Step: Use an invalid marker but a valid date.
   * Expected Outcome: Returns `null`.
   * Test Validation: `outputTestResult(generateDate("invalid", 1734379887), null, "returns null for an invalid mark value with a valid date")`.

8. Test for Valid Marker and Date:
   * Step: Call with a valid marker and date.
   * Expected Outcome: Returns the provided date.
   * Test Validation: `outputTestResult(generateDate("start", 1734379887), 1734379887, "returns a valid date")`.

### Test: `randomString()`

#### Test Case Description:

* Purpose: To validate that the `randomString` function generates strings of specified length and character sets.

* Constraints/Edge Cases:
  * Ensures the generated string contains characters from specified sets (`"lowercase"`, `"numbers"`, mixed).
  * Verifies that string length is within defined `minLength` and `maxLength`.

* Expected Outcome:
  * Generates a string within specified constraints.
  * Returns `true` for valid format and string length.

#### Validation Steps:

1. Test for Lowercase Characters:
   * Step: Generate a string with lowercase letters.
   * Expected Outcome: String matches `[a-z]+` pattern.
   * Test Validation: `outputTestResult(isLowercase, true, "String validation with lowercase letters")`.

2. Test for Numeric Characters:
   * Step: Generate a string containing only numbers.
   * Expected Outcome: String matches `[0-9]+` pattern.
   * Test Validation: `outputTestResult(isNumber, true, "Checking the string with numbers")`.

3. Test for Mixed Characters:
   * Step: Generate a string with mixed alphanumeric characters.
   * Expected Outcome: String matches `[0-9a-zA-Z]+` pattern.
   * Test Validation: `outputTestResult(isMixed, true, "Mixed string validation")`.

4. Test for Length Compliance:
   * Step: Check if generated string length within `minLength` and `maxLength`.
   * Expected Outcome: String length is within the range.
   * Test Validation: `outputTestResult(isValidLength, true, "String length check")`.


### Test: `randomStringPattern()`

#### Test Case Description:

* Purpose: To validate that the `randomStringPattern` function generates a URL matching a specified pattern.

* Constraints/Edge Cases:
  * Checks if the generated string follows the specific URL structure.

* Expected Outcome:
  * Generated URL matches the format: `https://[a-z]+.corezoid/api/json/public/[0-9]+/[a-zA-Z0-9]+`.

#### Validation Steps:

1. Test for URL Format Compliance:
   * Step: Generate a URL and check if it matches the specified pattern.
   * Expected Outcome: URL matches `^https:\/\/[a-z]+\.corezoid\/api\/json\/public\/[0-9]+\/[a-zA-Z0-9]+$`.
   * Test Validation: `outputTestResult(isValidUrl, true, "Validation of URL formation")`.

### Test: `randomObject()`

#### Test Case Description:

* Purpose: To validate that the `randomObject` function correctly generates objects based on the specified schema, utilizing `userObject` values where provided and creating random values for missing properties.

* Constraints/Edge Cases:
  * If a value is provided in `userObject`, it should be used.
  * If a property is missing in `userObject`, `randomObject` should generate a random value of the appropriate type according to the schema.

* Expected Outcome:
  * The function should correctly apply `userObject` values where specified and generate values that fit the schema for fields that are missing.

#### Validation Steps:

1. Test for Full `userObject` Values:

   * Step: Call `randomObject` with a complete `userObject` that includes values for all properties defined in the schema.
   * Expected Outcome: Each property in the resulting object matches the corresponding value from `userObject`.
   * Test Validation:
     - `outputTestResult(resultFull.title === userObjFull.title, true, "Uses the `title` value from `userObject`")`.
     - `outputTestResult(resultFull.description === userObjFull.description, true, "Uses the `description` value from `userObject`")`.
     - `outputTestResult(resultFull.tags === userObjFull.tags, true, "Uses the `tags` value from the `userObject`")`.
     - `outputTestResult(resultFull.readOnly === userObjFull.readOnly, true, "Uses the `readOnly` value from `userObject`")`.

2. Test for Partial `userObject` Values:

   * Step: Call `randomObject` with a `userObject` containing only some properties (e.g., only `title`).
   * Expected Outcome: The function should use the provided `userObject` value for `title` and generate appropriate random values for other properties.
   * Test Validation:
     - `outputTestResult(resultPartial.title === userObjPartial.title, true, "Uses the `title` value from `userObject`")`.
     - `outputTestResult(Array.isArray(resultPartial.tags), true, "Generates random values for `tags` when `userObject.tags` is missing")`.
     - `outputTestResult(typeof resultPartial.readOnly === "boolean", true, "Generates random values for `readOnly` when `userObject.readOnly` is missing")`.