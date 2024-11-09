import {randomArray} from "./complexTypes/array.js";
import {randomNumberInt} from "./primitiveTypes/numberInt.js";
import {randomObject} from "./complexTypes/object.js";
import {randomString, randomStringPattern} from "./primitiveTypes/string.js";
import {generateBoolean} from "./primitiveTypes/boolean.js";

/**
 * * English:
 * The `dataTypeHandling` function defines and generates data according to the specified data types in the JSON schema
 *
 * @param {object} schema - JSON schema defining the structure of the object
 * @param {object} definitions - Object containing definitions for using $ref in JSON schema
 * @param {object} userObject - Object containing specific values to populate certain fields
 * @returns {any} Generated value according to the specified data types in JSON schema
 *
 * * Ukrainian:
 * Функція `dataTypeHandling` визначає та генерує дані відповідно до вказаних типів даних в JSON схемі
 *
 * @param {object} schema - JSON схема, що описує структуру об'єкта
 * @param {object} definitions - Об'єкт з визначеннями для використання $ref у JSON-схемі.
 * @param {object} userObject - Об'єкт з потрібними значеннями, які будуть використані для заповнення деяких полів
 * @returns {any} Згенероване значення відповідно до типу, вказаного в JSON-схемі.
 */

export function dataTypeHandling(schema, definitions, userObject) {
  const defs = definitions || schema.definitions;

  if (schema.anyOf) {
    const selectedSchema = schema.anyOf[Math.floor(Math.random() * schema.anyOf.length)];
    return dataTypeHandling(selectedSchema, defs, userObject);
  }

  if (schema.$ref) {
    const refName = schema.$ref.replace("#", "");
    if (defs && defs[refName]) {
      return dataTypeHandling(defs[refName], defs, userObject);
    }
  }

  if (schema.enum) {
    const selectedSchema = schema.enum[Math.floor(Math.random() * schema.enum.length)];
    return selectedSchema;
  }

  switch (schema.type) {
    case "integer": {
      return randomNumberInt({schema, minimum: 0, maximum: 1000000});
    }
    case "string": {
      if (schema.pattern) {
        return randomStringPattern(schema);
      }

      return randomString(schema);
    }
    case "number": {
      return randomNumberInt({schema, minimum: 0, maximum: 100});
    }
    case "boolean": {
      return generateBoolean();
    }
    case "array": {
      return randomArray(schema, 1, 10, defs);
    }

    case "object": {
      return randomObject(schema, defs, userObject);
    }

    case "null":
      return null;

    default:
      return null;
  }
}
