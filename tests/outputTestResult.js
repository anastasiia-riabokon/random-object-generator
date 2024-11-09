export function outputTestResult(actual, expected, testName) {
  return actual === expected
    ? console.log(`✓ test ${testName}`)
    : console.error(`✕ test ${testName}: expected ${expected}, but got ${actual}`);
}
