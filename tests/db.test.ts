import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readDb, writeDb } from '@/lib/db';
import fs from 'node:fs/promises';

vi.mock('node:fs/promises', () => ({
  default: {
    readFile: vi.fn(),
    writeFile: vi.fn()
  }
}));

describe('db utility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should read from database', async () => {
    vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify({ test: 'data' }));
    const data = await readDb();
    expect(data).toEqual({ test: 'data' });
  });

  it('should return empty object if database read fails', async () => {
    vi.mocked(fs.readFile).mockRejectedValue(new Error('File not found'));
    const data = await readDb();
    expect(data).toEqual({});
  });

  it('should write to database', async () => {
    await writeDb({ new: 'data' });
    expect(fs.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('db.json'),
      JSON.stringify({ new: 'data' }, null, 2),
      'utf-8'
    );
  });
});
