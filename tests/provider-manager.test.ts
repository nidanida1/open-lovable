import { describe, it, expect, vi } from 'vitest';
import { getProviderForModel } from '@/lib/ai/provider-manager';

// Mock appConfig
vi.mock('@/config/app.config', () => ({
  appConfig: {
    ai: {
      modelApiConfig: {
        'custom-model': {
          provider: 'openai',
          model: 'gpt-4'
        }
      }
    }
  }
}));

// Mock providers
vi.mock('@ai-sdk/openai', () => ({
  createOpenAI: vi.fn(() => () => ({ provider: 'openai' }))
}));
vi.mock('@ai-sdk/anthropic', () => ({
  createAnthropic: vi.fn(() => () => ({ provider: 'anthropic' }))
}));
vi.mock('@ai-sdk/groq', () => ({
  createGroq: vi.fn(() => () => ({ provider: 'groq' }))
}));
vi.mock('@ai-sdk/google', () => ({
  createGoogleGenerativeAI: vi.fn(() => () => ({ provider: 'google' }))
}));

describe('provider-manager', () => {
  it('should resolve anthropic models', () => {
    const { actualModel } = getProviderForModel('anthropic/claude-3-sonnet');
    expect(actualModel).toBe('claude-3-sonnet');
  });

  it('should resolve openai models', () => {
    const { actualModel } = getProviderForModel('openai/gpt-4o');
    expect(actualModel).toBe('gpt-4o');
  });

  it('should resolve google models', () => {
    const { actualModel } = getProviderForModel('google/gemini-pro');
    expect(actualModel).toBe('gemini-pro');
  });

  it('should resolve custom configured models', () => {
    const { actualModel } = getProviderForModel('custom-model');
    expect(actualModel).toBe('gpt-4');
  });

  it('should default to groq for unknown models', () => {
    const { actualModel } = getProviderForModel('unknown-model');
    expect(actualModel).toBe('unknown-model');
  });
});
