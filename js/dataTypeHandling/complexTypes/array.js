import {availableTags, availableTitle, loremWords} from "../../../data/constants.js";
import {dataTypeHandling} from "../dataTypeHandling.js";

/**
 * * English:
 * The `randomArray` generates an array with unique items based on the provided schema.
 *
 * The function creates an array of random length between `min` and `max`, or based on `schema.minItems` and `schema.maxItems`.
 * array contains items with `schema.items` (the structure of each item).
 * if `schema.uniqueItems` is true, all items in the array will be unique items.
 *
 * @param {object} schema - JSON schema defining the properties in the array
 * @param {number} min - Minimum quantity items in the array
 * @param {number} max - Maximum quantity items in the array
 * @param {object} defs - Object containing specific values to populate fields
 * @returns {array} Array Generation with random items
 *
 * * Ukrainian:
 * Функція `randomArray` генерує масив з унікальними значеннями на основі переданої схеми.
 *
 * Функція створює масив випадкової довжини на основі заданих `min` та `max`, або на основі `schema.minItems` і `schema.maxItems`.
 * Масив заповнюється елементами, визначеними в `schema.items` (структура кожного елемента).
 * Якщо `schema.uniqueItems` встановлено на true, всі елементи в масиві будуть унікальними.
 *
 * @param {object} schema - JSON схема, що визначає властивості масиву.
 * @param {number} min - Мінімальна кількість елементів в масиві.
 * @param {number} max - Максимальна кількість елементів в масиві.
 * @param {object} defs - Об'єкт з потрібними значеннями, які будуть використані для заповнення полів
 * @returns {array} Згенерований масив випадкових значень
 */
export function randomArray(schema, min, max, defs) {
  const randomValue = Math.floor(Math.random() * 5);

  const newMin = typeof min === "number" ? min : randomValue;
  const newMax = typeof max === "number" ? max : randomValue + 5;

  const minItems = schema.minItems || newMin;
  const maxItems = schema.maxItems || newMax;
  const countItems = Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;
  const schemaItems = schema.items || {};
  const array = [];
  const uniqueItems = schema.uniqueItems || false;

  for (let i = 0; i < countItems; i += 1) {
    let item = dataTypeHandling(schemaItems, defs);
    if (uniqueItems) {
      while (array.includes(item)) {
        item = dataTypeHandling(schemaItems, defs);
      }
    }
    array.push(item);
  }

  return array;
}

/**
 * * English:
 * The `generateTags` function generates an array of random length between `min` and `max` or returns an array tags if provided
 *
 * if `userTags` is passed and it isn't an empty array, the function returns it.
 * if `userTags`, `min`, `max` aren't passed, the default values 1 and 10 will be used.
 * if `min` and `max` are passed, these values will be used instead of the default values.
 *
 * @param {array} userTags - Array of tags
 * @param {number} [min=1] - Minimum quantity of items in the array (optional)
 * @param {number} [max=10] - Maximum quantity of items in the array (optional)
 * @returns {array} An array of random length or the provided array of tags
 *
 * * Ukrainian:
 * Функція `generateTags` генерує масив випадкової довжини в діапазоні `min` та `max` або повертає масив тегів (якщо вказано)
 *
 * Якщо вказаний `userTags` не порожній масив, то функція повертає його.
 * Якщо не вказано `userTags`, `min` та `max`, то використовуються значення за замовчуванням 1 та 10 відповідно.
 * Якщо вказані `min` та `max`, то ці значення використовуються замість значень за замовчуванням.
 *
 * @param {array} userTags - Масив тегів
 * @param {number} [min=1] - Мінімальна кількість елементів в масиві (опціонально)
 * @param {number} [max=10] - Максимальна кількість елементів в масиві (опціонально)
 * @returns {array} Масив випадкової довжини або вказаний масив тегів
 */
export function generateTags(userTags, min = 1, max = 10) {
  if (userTags && Array.isArray(userTags) && userTags.length > 0) {
    return userTags;
  }
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const tags = [];

  for (let i = 0; i < count; i += 1) {
    const randomTag = availableTags[Math.floor(Math.random() * availableTags.length)];

    if (!tags.includes(randomTag)) {
      tags.push(randomTag);
    } else {
      i -= 1;
    }
  }

  return tags;
}

/**
 * * English:
 * The `randomTitle` function returns a provided title or a randomly selected one if no title is given.
 *
 * If `userTitle` is provided, the function returns it.
 * If `userTitle` is not provided, the function selects a random title from `availableTitle`.
 *
 * @param {string} userTitle - User title
 * @returns {string} User title or a random title from `availableTitle`.
 *
 * * Ukrainian:
 * Функція `randomTitle` повертає вказаний заголовок або вибирає випадковий, якщо заголовок не передано.
 *
 * Якщо `userTitle` вказано, функція повертає його.
 * Якщо `userTitle` не вказано, функція вибирає випадковий заголовок з `availableTitle`.
 *
 * @param {string} userTitle - Заголовок, вказаний користувачем
 * @returns {string} Заголовок, або випадково обраний заголовок
 */
export function randomTitle(userTitle) {
  if (userTitle && typeof userTitle === "string") {
    return userTitle.trim();
  }

  const title = availableTitle[Math.floor(Math.random() * availableTitle.length)];
  return title.trim();
}

/**
 * * English:
 * The `generateDescription` function returns a provided description or generates a random description using words from the `loremWords` array.
 *
 * If `userDesc` is provided, the function returns it.
 * If `userDesc` is not provided, the function generates a random description with a length between 1 and `loremWords.length`.
 *
 * @param {string} userDesc - User description
 * @returns {string} User description or a randomly generated description
 *
 * * Ukrainian:
 * Функція `generateDescription` повертає вказаний опис або генерує випадковий опис, використовуючи слова з масиву `loremWords`.
 *
 * Якщо `userDesc` вказано, функція повертає його.
 * Якщо `userDesc` не вказано, функція генерує випадковий опис з кількістю слів від 1 до `loremWords.length`.
 *
 * @param {string} userDesc - Опис, вказаний користувачем
 * @returns {string} Опис або випадково згенерований опис
 */
export function generateDescription(userDesc) {
  if (userDesc && typeof userDesc === "string") return userDesc.trim();
  let desc = "";
  const wordsQty = Math.floor(Math.random() * loremWords.length);

  for (let i = 0; i < wordsQty; i += 1) {
    desc += loremWords[i] + " ";
  }

  return desc.trim();
}
