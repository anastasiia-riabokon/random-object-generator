import {dataTypeHandling} from "../js/dataTypeHandling/dataTypeHandling.js";
import {outputTestResult} from "./outputTestResult.js";

function testDataTypeHandling() {
  console.log("Test dataTypeHandling:");

  // enum test
  const enumSchema = {
    type: "string",
    enum: ["view", "modify", "sign", "execute"],
  };

  const resultEnumValue = dataTypeHandling(enumSchema);
  const isEnumValid = enumSchema.enum.includes(resultEnumValue);
  outputTestResult(isEnumValid, true, "enum validation");

  // anyOf test
  const anyOfSchema = {
    anyOf: [{type: "string"}, {type: "integer"}],
  };

  const resultAnyOfValue = dataTypeHandling(anyOfSchema);
  const isAnyOfValid = typeof resultAnyOfValue === "string" || typeof resultAnyOfValue === "number";

  outputTestResult(isAnyOfValid, true, "Validating that anyOf is selected correctly");

  // $ref test
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
// testDataTypeHandling();
