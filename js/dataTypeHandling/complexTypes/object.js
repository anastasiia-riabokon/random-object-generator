import {dataTypeHandling} from "../dataTypeHandling.js";
import {generateBoolean} from "../primitiveTypes/boolean.js";
import {generateDate, randomNumberInt} from "../primitiveTypes/numberInt.js";
import {generateDescription, generateTags, randomTitle} from "./array.js";

/**
 * * English:
 * The `randomObject` function generates an object with random values or the provided values
 *
 * if `userObject` contains values for specific fields, they will be used instead of random values.
 *
 * @param {object} schema - JSON schema contains the structure of object.
 * @param {object} defs - Definitions or references used in generating data.
 * @param {object} userObject - ОObject containing specific values to populate certain fields.
 * @returns {object} Generated object with random or provided values.
 *
 * * Ukrainian:
 * Функція `randomObject` генерує об'єкт з рандомними або заданими значенянми
 *
 * Якщо `userObject` містить значення для деяких полів, ці значення будуть використані замість випадкових.
 *
 * @param {object} schema - JSON схема, що описує структуру об'єкта.
 * @param {object} defs - Додаткові визначення чи посилання для генерації даних.
 * @param {object} userObject - Об'єкт з потрібними значеннями, які будуть використані для заповнення деяких полів.
 * @returns {object} Згенерований об'єкт з рандомними значеннями або заданими.
 */
export function randomObject(schema, defs, userObject) {
  const object = {};
  const properties = schema.properties || {};

  for (const key in properties) {
    const property = properties[key];

    // Generate required fields if specified in schema
    if (schema.required && schema.required.includes(key)) {
      object[key] = dataTypeHandling(property, defs);
    } else {
      // Add data for non-required field
      object[key] = dataTypeHandling(property, defs);
    }

    // Overwriting properties based on key-specific logic
    switch (key) {
      case "startDate": {
        object[key] = generateDate("start", userObject?.startDate);
        break;
      }
      case "endDate": {
        object[key] = generateDate("end", userObject?.endDate);
        break;
      }
      case "tags": {
        object[key] = generateTags(userObject?.tags);
        break;
      }

      case "title": {
        object[key] = randomTitle(userObject?.title);
        break;
      }

      case "description": {
        object[key] = generateDescription(userObject?.description);
        break;
      }

      case "priorProbability": {
        // if provided priorProbability is available, otherwise generate random number
        if (object[key] === undefined || object[key] === null) {
          object[key] = randomNumberInt({num: userObject?.priorProbability});
        }
        break;
      }

      case "readOnly": {
        if (object[key]) object[key] = generateBoolean(userObject?.readOnly);
        break;
      }
      default:
        break;
    }
  }
  // Return object with all fields filled according to schema specifications
  return object;
}
