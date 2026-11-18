import { useEffect, useState } from 'react';
import { getHelloMessage } from './api/helloApi';
import memcycoLogo from './assets/Memcyco-logo.svg';

type RequestState =
  | { status: 'loading' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

export function App() {
  const [request, setRequest] = useState<RequestState>({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();

    getHelloMessage()
      .then((message) => {
        if (!controller.signal.aborted) setRequest({ status: 'success', message });
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setRequest({
            status: 'error',
            message: 'Could not reach the hello service. Please try again later.',
          });
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <main className="page-shell">
      <section className="response-card" aria-labelledby="page-title">
        <img className="brand-logo" src={memcycoLogo} alt="Memcyco" />
        <h1 id="page-title">Home Assignment</h1>

        {request.status === 'loading' && (
          <p className="status" role="status">Contacting the service…</p>
        )}

        {request.status === 'success' && (
          <p className="message" role="status">{request.message}</p>
        )}

        {request.status === 'error' && (
          <p className="error" role="alert">{request.message}</p>
        )}
      </section>
    </main>
  );
}
