const DEFAULT_HELLO_URL = '/api/hello';

export async function getHelloMessage(
  url = import.meta.env.VITE_HELLO_API_URL || DEFAULT_HELLO_URL,
): Promise<string> {
  const response = await fetch(url, { headers: { Accept: 'text/plain' } });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const message = await response.text();
  return message || 'The server returned an empty response.';
}
