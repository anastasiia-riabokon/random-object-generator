# Random Object Generator according to the JSON scheme

The `randomObjectGeneration` function creates random data objects according to a provided JSON schema.

**Parameters**:

  * `schema`: A JSON schema defining the structure of the generated object.
  * `userObject`: An optional object containing specific values for certain fields within the generated object

**Returns**: A random data object or `null` if the schema is invalid.

The `dataTypeHandling` function is used within the schema to generate data of specified types. It interacts with several helper functions:

  * `randomNumberInt({schema: object, minimum: number, maximum: number, num: number}): number|null`: Generates a random number within a specified range or returns num if provided.

  * `randomString(schema: object, view: string | undefined): string`: Generates a random string based on the specified view:
    * `"lowercase"` - a random string containing only lowercase letters.
    * `"numbers"` - a random string containing only numbers.
    * `""` or any other value - a random string containing uppercase and lowercase letters, and numbers.

  * `randomStringPattern(schema: object): string`: Utilizes `randomString()` to generate a string, commonly used for URL generation.

  * `generateBoolean(userBoolean: boolean): boolean`: Generates a random boolean or returns `userBoolean` if provided.

  * `randomArray(schema: object, min: number, max: number, defs: object): array`: Generates an array with random length between `min` and `max`, or based on `schema.minItems` and `schema.maxItems`.

  * `randomObject(schema: object, defs: object, userObject: object): object`: Generates an object with random values or the specified values from userObject. This function relies on additional helper functions for specific data generation needs:
    * `generateDate(mark: string, date: number | undefined): number`: Generates a random date or returns date if provided, based on `mark`:
      * `"start"` - starting date.
      * `"end"` - ending date.

    * `generateTags(userTags: array, min: number | undefined, max: number | undefined): array`: Generates an array of random length between `min` and `max` or returns the specified tags if provided.

    * `randomTitle(userTitle: string): string`: Returns `userTitle` if provided, or generates a random title.

    * `generateDescription(userDesc: string): string`: Returns `userDesc` if provided, or generates a random description.

**Example**

```
const schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "attendees": {
      "type": "object",
      "$id": "#attendees",
      "properties": {
        "userId": {
          "type": "integer"
        },
        "access": {
          "enum": [
            "view",
            "modify",
            "sign",
            "execute"
          ]
        },
        "formAccess": {
          "enum": [
            "view",
            "execute",
            "execute_view"
          ]
        }
      },
      "required": [
        "userId",
        "access"
      ]
    }
  },
  "type": "object",
  "properties": {
    "id": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "integer"
        }
      ]
    },
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "startDate": {
      "type": "integer"
    },
    "endDate": {
      "type": "integer"
    },
    "attendees": {
      "type": "array",
      "items": {
        "$ref": "#attendees"
      },
      "default": []
    },
    "parentId": {
      "anyOf": [
        {
          "type": "null"
        },
        {
          "type": "string"
        },
        {
          "type": "integer"
        }
      ]
    },
    "locationId": {
      "anyOf": [
        {
          "type": "null"
        },
        {
          "type": "integer"
        }
      ]
    },
    "process": {
      "anyOf": [
        {
          "type": "null"
        },
        {
          "type": "string",
          "pattern": "https:\\/\\/[a-z]+\\.corezoid\\.com\\/api\\/1\\/json\\/public\\/[0-9]+\\/[0-9a-zA-Z]+"
        }
      ]
    },
    "readOnly": {
      "type": "boolean"
    },
    "priorProbability": {
      "anyOf": [
        {
          "type": "null"
        },
        {
          "type": "integer",
          "minimum": 0,
          "maximum": 100
        }
      ]
    },
    "channelId": {
      "anyOf": [
        {
          "type": "null"
        },
        {
          "type": "integer"
        }
      ]
    },
    "externalId": {
      "anyOf": [
        {
          "type": "null"
        },
        {
          "type": "string"
        }
      ]
    },
    "tags": {
      "type": "array"
    },
    "form": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer"
        },
        "viewModel": {
          "type": "object"
        }
      },
      "required": [
        "id"
      ]
    },
    "formValue": {
      "type": "object"
    }
  },
  "required": [
    "id",
    "title",
    "description",
    "startDate",
    "endDate",
    "attendees"
  ]
}
```

1. Without `userObject`.

```
randomObjectGeneration(schema);
```

**Result**

```
{
    "id": 640750,
    "title": "Quarterly Review",
    "description": "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur",
    "startDate": 1731177553,
    "endDate": 1732177553,
    "attendees": [
        {
            "userId": 884770,
            "access": "sign",
            "formAccess": "execute_view"
        }
    ],
    "parentId": null,
    "locationId": 637423,
    "process": null,
    "readOnly": false,
    "priorProbability": 0,
    "channelId": null,
    "externalId": null,
    "tags": [
        "channel",
        "execute",
        "user",
        "external"
    ],
    "form": {
        "id": 757016,
        "viewModel": {}
    },
    "formValue": {}
}
```

2. With `userObject`.

```
const userObject = {
  title: "Example Title",
  description: "Example Description",
  priorProbability: 78.5,
  startDate: 1730851200,
  endDate: 1731283200,
  tags: ["Tag1", "Tag2", "Tag3", "Tag4"],
};
randomObjectGeneration(schema, userObject);

```

**Result**

```
{
    "id": "JTzB04ObLh",
    "title": "Example Title",
    "description": "Example Description",
    "startDate": 1730851200,
    "endDate": 1731283200,
    "attendees": [
        {
            "userId": 137534,
            "access": "view",
            "formAccess": "execute"
        },
        {
            "userId": 866210,
            "access": "execute",
            "formAccess": "view"
        }
    ],
    "parentId": 94747,
    "locationId": 41415,
    "process": "https://ephkscyylbgtcjlvd.corezoid/api/json/public/30792333527497898/jncblAEOreKSlj25zD",
    "readOnly": true,
    "priorProbability": 78.5,
    "channelId": 703226,
    "externalId": "7wUmGHPat5rJKsL",
    "tags": [
        "Tag1",
        "Tag2",
        "Tag3",
        "Tag4"
    ],
    "form": {
        "id": 299887,
        "viewModel": {}
    },
    "formValue": {}
} 
```

## Function testing

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

#### Test Case Description:

* Purpose: To test `dataTypeHandling` function, which generates data according to the specified data types in the JSON schema (e.g. number, string, boolean). It also resolves $ref and handles conditional schemas like anyOf and enum.

* Constraints/Edge Cases:
  * The schema may include references to other schemas via $ref.
  * The schema may define multiple possible types using anyOf, which the function should handle by selecting one randomly.
  * The function should handle both mandatory and optional fields when generating objects.
  * The function should respect pattern constraints when generating strings.

#### Validation Steps:

  1. Test anyOf Handling:

      * Step: Call `dataTypeHandling` with a schema that includes anyOf and check the result.
      * Expected Outcome: The function should return a value according to one of the schemas in the `anyOf` array.

  2. Test $ref Resolution:

      * Step: Call dataTypeHandling with a schema that includes a `$ref` to another definition and check the result.
      * Expected Outcome: The function should resolve the `$ref` and generate data according to the referenced schema.

  3. Test enum Handling:

      * Step: Call `dataTypeHandling` with a schema that has an `enum` property.
      * Expected Outcome: The function should return a random value from the enum array.

  4. Test Integer Type:

      * Step: Call `dataTypeHandling` with a schema that specifies `integer`.
      * Expected Outcome: The function should return an integer within the defined range.

  5. Test String Type with Pattern:

      * Step: Call `dataTypeHandling` with a schema that specifies `string` and a `pattern`.
      * Expected Outcome: The function should return a string matching the specified pattern.

  6. Test String Type without Pattern:

      * Step: Call `dataTypeHandling` with a schema that specifies `string` without a pattern.
      * Expected Outcome: The function should return a random string.

  7. Test Boolean Type:

      * Step: Call `dataTypeHandling` with a schema that specifies `boolean`.
      * Expected Outcome: The function should return a boolean value.

  8. Test Array Type:

      * Step: Call `dataTypeHandling` with a schema that specifies `array`.
      * Expected Outcome: The function should return an array with random items based on the schema.

  9. Test Object Type:

      * Step: Call `dataTypeHandling` with a schema that specifies `object`.
      * Expected Outcome: The function should return an object that matches the defined properties and required fields.

  10. Test Null Type:

      * Step: Call `dataTypeHandling` with a schema that specifies `null`.
      * Expected Outcome: The function should return null
