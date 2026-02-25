import { describe, it, expect } from 'vitest';

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

describe('config logic', () => {
  it('should get nested config values', () => {
    expect(getConfigValue('ai.defaultModel', mockConfig)).toBe('claude-3-sonnet');
  });

  it('should get deep nested config values', () => {
    expect(getConfigValue('ui.theme.dark', mockConfig)).toBe(true);
  });

  it('should return undefined for non-existent paths', () => {
    expect(getConfigValue('non.existent', mockConfig)).toBeUndefined();
  });
});
