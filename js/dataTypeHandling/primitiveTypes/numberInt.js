/**
 * * English:
 * The `randomNumberInt` function generates random number within a given range or returns `num` if provided
 *
 * if `num` is passed, the function returns `num`.
 * if `minimum` and `maximum` aren`t passed, the default values 0 and 100 will be used
 * if `minimum` та `maximum` are passed, these values will be used instead of the default values.
 *
 * @param {object} params - Function parameters
 * @param {object} params.schema - Schema has`minimum` and `maximum` (optional)
 * @param {number} params.minimum=0 - Minimum value for the range
 * @param {number} params.maximum=100 - Maximum value for the range
 * @param {number} params.num - if this value is passed, function returns this value
 * @returns {number|null} Random number in the given range or `num` if provided
 *
 * * Ukrainian:
 *  Функція `randomNumberInt` генерує випадкове число в межах заданого діапазону або `num` (якщо воно вказано)
 *
 * Якщо передане значення `num`, то функція повертає це значення.
 * Якщо не передано `minimum` та `maximum`, то використовуються значення за замовчуванням 0 та 100 відповідно
 * Якщо передано `minimum` та `maximum`, то вони використовуються замість значень за замовчуванням.
 *
 * @param {object} params - Параметри функції
 * @param {object} params.schema - Схема, що опційно містить minimum та maximum
 * @param {number} [params.minimum=0] - Мінімальне значеня для діапазону
 * @param {number} [params.maximum=100] - Максимальне значення для діапазону
 * @param {number} params.num - Якщо задано, то повертається params.num
 * @returns {number|null} Випадкове число в межах діапазону або передане значення `num`
 */

export function randomNumberInt({schema, minimum = 0, maximum = 100, num}) {
  if (num) {
    // validation `num`
    if (typeof num !== "number") return null;
    return num;
  }

  // validation `minimum` and `maximum`
  if (typeof maximum !== "number" || typeof minimum !== "number") return null;

  // Define random number within specified range
  const min = schema && schema.minimum ? schema.minimum : minimum;
  const max = schema && schema.maximum ? schema.maximum : maximum;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;

  return random;
}

/**
 * * English:
 * The `generateDate` function generates random date or return `date` if provided according `mark`
 *
 * if `date` is passed, function returns `date`
 *
 * @param {string} mark - Marker contains start or end date for value provided
 * @param {number|undefined} date - The date
 * @returns {number} Random date (UNIX format) or `date` if provided
 *
 * * Ukrainian:
 * Функція `generateDate` генерує випадкову дату або повертає вказане значення відповідно до `mark`
 *
 * Якщо передано `date`, то функція повертає це значення
 *
 * @param {string} mark - Маркер, що визначає чи є значення початковою або кінцевою датою
 * @param {number|undefined} date - Дата
 * @returns {number} Випадкова дата (UNIX format) або `date` (якщо вказано)
 */
export function generateDate(mark, date) {
  if (mark !== "start" && mark !== "end") {
    return null;
  }

  if (date) {
    if (typeof date !== "number" || !Number.isInteger(date) || date < 0 || date > 2147483647) {
      return null;
    }

    return date;
  }

  const start = new Date(); // default starting date (now)
  const end = new Date(start.getTime() + 1000000000); // default ending date (+ day 11)

  let timestamp;
  switch (mark) {
    case "start": {
      timestamp = start;
      break;
    }

    case "end": {
      timestamp = end;
      break;
    }
  }

  timestamp = new Date(timestamp);

  return Math.floor(timestamp.getTime() / 1000); // Date in UNIX format
}
