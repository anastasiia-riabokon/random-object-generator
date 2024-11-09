/**
 * * English:
 *
 * The `randomString` function generates according of provided schema
 *
 * if `view` passed on:
 * - `"lowercase"`, string will contain only lowercase letters;
 * - `"numbers"`, string will contain only numbers;
 * if `view` isn`t passed or has any other value, string will contain uppercase and lowercase, numbers
 *
 *  @param {object} schema - JSON schema contains minimum length and maximum length
 * @param {string} [view=""] - String view, that defined character set: lowercase","numbers"
 * @returns {string} Random string, that defined of according character set
 *
 * * Ukrainian:
 * Функція `randomString` генерує випадковий рядок на основі заданої схеми
 *
 * Якщо параметр `view` встановлений на:
 * - `"lowercase"`, то рядок міститиме лише малі літери;
 * - `"numbers"`, то рядок міститиме лише цифри;
 * Якщо параметр `view` не заданий або має інше значення, то рядок міститиме великі та малі літери, а також цифри
 *
 * @param {object} schema - JSON схема, яка містить мінімальну та максимальну довжину рядка
 * @param {string} [view=""] - Вид рядка, який визначає набір символів: `"lowercase"`,`"numbers"`
 * @returns {string} Випадковий рядок, що складається з символів з відповідного набору
 */

export function randomString(schema, view = "") {
  const minLength = schema.minLength || 5;
  const maxLength = schema.maxLength || 20;
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  switch (view) {
    case "lowercase": {
      characters = characters.slice(26, 52);
      break;
    }
    case "numbers": {
      characters = characters.slice(52);
      break;
    }
    default: {
      break;
    }
  }

  let str = "";
  for (let i = 0; i < length; i++) {
    str += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return str;
}

export function randomStringPattern(schema) {
  return `https://${randomString(schema, "lowercase")}.corezoid/api/json/public/${randomString(
    schema,
    "numbers"
  )}/${randomString(schema)}`;
}
