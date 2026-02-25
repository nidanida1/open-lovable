import { describe, it, expect } from 'vitest';

function mockCn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

describe('utils logic', () => {
  it('should merge basic classes', () => {
    expect(mockCn('btn', 'btn-primary')).toBe('btn btn-primary');
  });

  it('should handle conditional classes', () => {
    expect(mockCn('btn', false && 'hidden', 'visible')).toBe('btn visible');
  });

  it('should handle undefined or null classes', () => {
    expect(mockCn('btn', undefined, null, 'active')).toBe('btn active');
  });
});
