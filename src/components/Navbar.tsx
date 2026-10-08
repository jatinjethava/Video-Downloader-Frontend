'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type BackendStatus = 'checking' | 'online' | 'offline';

export default function Navbar() {
  const [backendStatus, setBackendStatus] = useState<BackendStatus>('checking');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

    fetch(`${backendUrl}/api/health`, { method: 'GET' })
      .then((res) => res.json())
      .then((data: { status?: string }) => {
        if (data.status === 'healthy') {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      })
      .catch(() => {
        setBackendStatus('offline');
      });
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '#downloader', label: 'Studio', id: 'nav-downloader' },
    { href: '#platforms', label: 'Supported Portals', id: 'nav-platforms' },
    { href: '#process', label: 'Protocol', id: 'nav-how-it-works' },
    { href: '#specifications', label: 'Specifications', id: 'nav-specs' },
    { href: '#faq', label: 'Inquiries', id: 'nav-faq' }
  ];

  return (
    <header className="navbar-root" id="main-header">
      <div className="container nav-container">

        <a href="/" className="brand-anchor" id="brand-logo-link" onClick={closeMobileMenu}>
          <div className="brand-mark">
            <span className="brand-monogram">VF</span>
          </div>
          <div className="brand-typography">
            <span className="brand-title">VIDFETCH</span>
            <span className="brand-edition">ATELIER • SUITE</span>
          </div>
        </a>

        <nav className="nav-menu desktop-only" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-item" id={link.id}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-controls desktop-only">
          <div
            className={`telemetry-badge ${backendStatus}`}
            id="backend-status-indicator"
            title="Backend Stream Server Status"
          >
            <span className="telemetry-point"></span>
            <span className="telemetry-text">
              {backendStatus === 'online'
                ? 'CORE ONLINE'
                : backendStatus === 'offline'
                  ? 'CORE OFFLINE'
                  : 'INITIALIZING...'}
            </span>
          </div>
        </div>

        <button
          className="mobile-menu-toggle mobile-only"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-nav-links">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="mobile-nav-item"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mobile-nav-footer">
              <div
                className={`telemetry-badge ${backendStatus}`}
                title="Backend Stream Server Status"
              >
                <span className="telemetry-point"></span>
                <span className="telemetry-text">
                  {backendStatus === 'online'
                    ? 'CORE ONLINE'
                    : backendStatus === 'offline'
                      ? 'CORE OFFLINE'
                      : 'INITIALIZING...'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
