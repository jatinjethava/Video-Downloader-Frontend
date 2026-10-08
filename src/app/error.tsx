'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Atelier Runtime Exception:', error);
  }, [error]);

  return (
    <div className="error-screen-wrapper">
      <div className="error-card luxury-card">
        <div className="error-tag">RUNTIME ANOMALY</div>
        <h1 className="error-title editorial-title">Studio Protocol Interrupted</h1>
        <p className="error-message">
          An unexpected computational interruption occurred while processing the atelier state.
        </p>
        <button
          type="button"
          className="btn-luxury-primary"
          onClick={() => reset()}
        >
          <span>Reinitialize Engine</span>
          <span aria-hidden="true">↻</span>
        </button>
      </div>
    </div>
  );
}
