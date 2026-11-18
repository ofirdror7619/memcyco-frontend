import { describe, expect, it, vi } from 'vitest';
import { getHelloMessage } from './helloApi';

describe('getHelloMessage', () => {
  it('returns the response text', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('Hello world')));
    await expect(getHelloMessage('http://localhost:8080/hello')).resolves.toBe('Hello world');
  });

  it('returns a fallback for an empty response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('')));
    await expect(getHelloMessage('/hello')).resolves.toBe('The server returned an empty response.');
  });

  it('throws when the server returns an error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 500 })));
    await expect(getHelloMessage('/hello')).rejects.toThrow('Request failed with status 500');
  });
});
