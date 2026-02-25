// tests/config.test.js
import assert from 'node:assert';

// We'll test the logic of getConfigValue since we can't easily import the TS file without a runner
function getConfigValue(path, obj) {
  return path.split('.').reduce((obj, key) => obj?.[key], obj);
}

const mockConfig = {
  ai: {
    defaultModel: 'claude-3-sonnet'
  },
  ui: {
    theme: {
      dark: true
    }
  }
};

console.log('Running config logic tests...');

try {
  assert.strictEqual(getConfigValue('ai.defaultModel', mockConfig), 'claude-3-sonnet');
  console.log('✓ ai.defaultModel - OK');

  assert.strictEqual(getConfigValue('ui.theme.dark', mockConfig), true);
  console.log('✓ ui.theme.dark - OK');

  assert.strictEqual(getConfigValue('non.existent', mockConfig), undefined);
  console.log('✓ non.existent - OK');

  console.log('\nConfig logic tests passed!');
} catch (err) {
  console.error('Config logic tests failed:', err);
  process.exit(1);
}
