'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-wrapper">
      <div className="not-found-card luxury-card">
        <div className="not-found-badge">ROUTE 404 • REGISTRY EXCEPTION</div>
        <h1 className="not-found-title editorial-title">Asset Record Not Found</h1>
        <p className="not-found-desc">
          The requested media protocol or studio route does not exist within the VidFetch Atelier network.
        </p>
        <Link href="/" className="btn-luxury-primary">
          <span>Return To Studio</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
