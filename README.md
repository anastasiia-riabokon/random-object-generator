# Random Object Generator according to the JSON scheme

The `randomObjectGeneration` function creates random data objects according to a provided JSON schema.

**Parameters**:

  * `schema`: A JSON schema defining the structure of the generated object.
  * `userObject`: An optional object containing specific values for certain fields within the generated object

**Returns**: A random data object or `null` if the schema is invalid.

The `dataTypeHandling(schema: object, definitions: object, userObject: object): any` function is used within the schema to generate data of specified types. It interacts with several helper functions:

  * `randomNumberInt({schema: object, minimum: number, maximum: number, num: number}): number|null`: Generates a random number within a specified range or returns `num` if provided.

  * `randomString(schema: object, view: string | undefined): string`: Generates a random string based on the specified view:
    * `"lowercase"` - a random string containing only lowercase letters.
    * `"numbers"` - a random string containing only numbers.
    * `""` or any other value - a random string containing uppercase and lowercase letters, and numbers.

  * `randomStringPattern(schema: object): string`: Utilizes `randomString()` to generate a string, commonly used for URL generation.

  * `generateBoolean(userBoolean: boolean): boolean`: Generates a random boolean or returns `userBoolean` if provided.

  * `randomArray(schema: object, min: number, max: number, defs: object): any[]`: Generates an array with random length between `min` and `max`, or based on `schema.minItems` and `schema.maxItems`.

  * `randomObject(schema: object, defs: object, userObject: object): object`: Generates an object with random values or the specified values from userObject. This function relies on additional helper functions for specific data generation needs:
    * `generateDate(mark: string, date: number | undefined): number`: Generates a random date or returns date if provided, based on `mark`:
      * `"start"` - starting date.
      * `"end"` - ending date.

    * `generateTags(userTags: any[], min: number | undefined, max: number | undefined): any[]`: Generates an array of random length between `min` and `max` or returns the specified tags if provided.

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

## Testing Instructions

### Running the Tests

To run the tests for the `randomObjectGeneration` function, follow these steps:

1. **Open the terminal** in your project directory.
2. **Run the test script** using Node.js with the following command:

   ```
   node runningTest.js
   ```

### What Happens After Running the Tests

- The terminal output will display the result of running each test case.
- For each test case, you will see whether it passed or failed, with an explanation of the reason for the result (e.g., "✕ test testName: expected `true`, but got `false`").
  
### Where to Find More Information

- **Test Descriptions**: You can find a detailed description of each test case, including its purpose, expected outcome, and edge cases, in the `README_TEST.md` file.
  
- **Source Code**: All the test implementations are located in the `tests` folder.
