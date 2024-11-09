/**
 * *English
 * The `generateBoolean` function generates random boolean value or returns `userBoolean` if provided
 *
 * if `userBoolean` is passed, the function returns this value.
 * if `userBoolean` is `null`, the function returns `false`.
 * If `userBoolean` is not provided, the function generates a random boolean value.
 *
 * @param {boolean} userBoolean
 * @returns {boolean} Random boolean value or `userBoolean`
 *
 * *Ukrainian
 * Функція `generateBoolean` генерує випадкове булеве значення або повертає задане
 *
 * Якщо `userBoolean` вказано, то функція повертає його.
 * Якщо `userBoolean` дорівнює `null`, то функція повертає `false`.
 * Якщо `userBoolean` не задано, то функція генерує випадкове булеве значення.
 *
 * @param {boolean} userBoolean
 * @returns {boolean} Випадкове булеве значення або `userBoolean`
 */
export function generateBoolean(userBoolean) {
  if (typeof userBoolean === "boolean") return userBoolean;
  if (userBoolean === null) return false;

  return Math.random() < 0.5;
}
