import {dataTypeHandling} from "../js/dataTypeHandling/dataTypeHandling.js";
import {outputTestResult} from "./outputTestResult.js";

/*
Test Case Descriptions

* Purpose: To test the dataTypeHandling function for accurately generating values based on specific JSON schema structures, including `enum`, `anyOf`, and `$ref`.

* Constraints/Edge Cases:
  * Should correctly handle and validate `enum` values by ensuring generated values are within defined limits.
  * Must properly interpret `anyOf` schemas with multiple type options, choosing random valid type.
  * Should resolve `$ref` references, accurately generating objects based on the referenced structure.

* Expected Outcome:
  * For `enum`, the function generates one of the allowed values.
  * For `anyOf`, the function returns a value matching one of the types defined in `anyOf`.
  * For `$ref`, the function produces an object that includes all required fields specified by the reference.
*/

function testDataTypeHandling() {
  console.log("Test dataTypeHandling:");

  // 1. Enum Test:
  /*
   * Step: Define enumSchema with `enum` values and pass it to `dataTypeHandling`.
   * Expected Outcome: Generated result should be one of the values in `enum`.
   */
  const enumSchema = {
    type: "string",
    enum: ["view", "modify", "sign", "execute"],
  };

  const resultEnumValue = dataTypeHandling(enumSchema);
  const isEnumValid = enumSchema.enum.includes(resultEnumValue);
  outputTestResult(isEnumValid, true, "enum validation");

  // 2. AnyOf Test:
  /*
   * Step: Define `anyOfSchema` allowing types `"string"` or `"integer"`, then pass it to `dataTypeHandling`.
   * Expected Outcome: Result should be either a string or a number.
   */
  const anyOfSchema = {
    anyOf: [{type: "string"}, {type: "integer"}],
  };

  const resultAnyOfValue = dataTypeHandling(anyOfSchema);
  const isAnyOfValid = typeof resultAnyOfValue === "string" || typeof resultAnyOfValue === "number";

  outputTestResult(isAnyOfValid, true, "Validating that anyOf is selected correctly");

  // 3. $ref Test:
  /*
   * Step: Define `refSchema` with an attendees structure and `$ref`, and pass this along with definitions to `dataTypeHandling`.
   * Expected Outcome: Resulting object should contain `userId` and `access` properties as required by the reference.
   */
  const refSchema = {
    definitions: {
      attendees: {
        type: "object",
        $id: "#attendees",
        properties: {
          userId: {
            type: "integer",
          },
          access: {
            enum: ["view", "modify", "sign", "execute"],
          },
        },
        required: ["userId", "access"],
      },
    },
    type: "object",
    properties: {
      attendees: {
        type: "array",
        items: {$ref: "#attendees"},
        default: [],
      },
    },
  };
  const resultRefValue = dataTypeHandling(
    refSchema.properties.attendees.items,
    refSchema.definitions
  );

  const isRefValid =
    resultRefValue &&
    typeof resultRefValue === "object" &&
    "userId" in resultRefValue &&
    "access" in resultRefValue;

  outputTestResult(isRefValid, true, "Checking for correct handling of $ref");
}

// ! Running tests
testDataTypeHandling();
