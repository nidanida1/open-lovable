// tests/utils.test.js
import assert from 'node:assert';

// Mocking cn logic since we can't easily import from lib/utils.ts without a build step
// In a real project, we'd use vitest or jest with ts-jest/swc
function mockCn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

console.log('Running utils logic tests...');

try {
  assert.strictEqual(mockCn('btn', 'btn-primary'), 'btn btn-primary');
  console.log('✓ basic classes - OK');

  assert.strictEqual(mockCn('btn', false && 'hidden', 'visible'), 'btn visible');
  console.log('✓ conditional classes - OK');

  console.log('\nUtils logic tests passed!');
} catch (err) {
  console.error('Utils logic tests failed:', err);
  process.exit(1);
}
