/**
 *  * English
 * The `randomObjectGeneration` function generates random data objects based on a given JSON schema
 * @param {object} schema - JSON schema defining the structure of the object.
 * @param {object} userObject - Object containing specific values to populate certain fields
 * @returns {object|null} Random data object generation or null if the schema isn't an object
 *
 *  * Ukrainian
 * Функція `randomObjectGeneration` генерує випадковий об'єкт на основі JSON-схеми.
 * @param {object} schema - JSON схема, що описує структуру об'єкта
 * @param {object} userObject - Об'єкт з потрібними значеннями, які будуть використані для заповнення деяких полів
 * @returns {object|null} Згенерований об'єкт з випадковими даними або null, якщо schema не є об'єктом
 */

import {mockSchema} from "../data/constants.js";
import {dataTypeHandling} from "./dataTypeHandling/dataTypeHandling.js";

export function randomObjectGeneration(schema, userObject) {
  // Checking the scheme for validity
  if (typeof schema !== "object" || schema === null || Object.keys(schema).length === 0)
    return null;

  return dataTypeHandling(schema, schema.definitions, userObject);
}
