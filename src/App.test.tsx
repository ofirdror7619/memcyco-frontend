import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';
import * as helloApi from './api/helloApi';

describe('App', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('shows a loading state while waiting for the service', () => {
    vi.spyOn(helloApi, 'getHelloMessage').mockReturnValue(new Promise(() => {}));
    render(<App />);
    expect(screen.getByRole('status')).toHaveTextContent('Contacting the service');
  });

  it('renders the response from the hello service', async () => {
    vi.spyOn(helloApi, 'getHelloMessage').mockResolvedValue('Hello from the API!');
    render(<App />);
    expect(await screen.findByText('Hello from the API!')).toBeInTheDocument();
  });

  it('renders a friendly error when the service cannot be reached', async () => {
    vi.spyOn(helloApi, 'getHelloMessage').mockRejectedValue(new Error('Network error'));
    render(<App />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not reach the hello service');
  });
});
