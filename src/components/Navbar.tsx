'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type BackendStatus = 'checking' | 'online' | 'offline';

export default function Navbar() {
  const [backendStatus, setBackendStatus] = useState<BackendStatus>('checking');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('downloader');

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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['downloader', 'platforms', 'process', 'specifications', 'faq'];
      const scrollPos = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMobileMenu();

    if (href.startsWith('#')) {
      const targetId = href.replace('#', '');
      setTimeout(() => {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
          const navOffset = isMobile ? 54 : 72;
          const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = Math.max(0, elementPosition - navOffset);

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });

          window.history.pushState(null, '', href);
          setActiveSection(targetId);
        }
      }, 50);
    } else {
      window.location.href = href;
    }
  };

  const navLinks = [
    { href: '#downloader', label: 'Studio', id: 'nav-downloader' },
    { href: '#platforms', label: 'Supported Portals', id: 'nav-platforms' },
    { href: '#process', label: 'Protocol', id: 'nav-how-it-works' },
    { href: '#specifications', label: 'Specifications', id: 'nav-specs' },
    { href: '#faq', label: 'Inquiries', id: 'nav-faq' },
  ];

  return (
    <header className="navbar-root" id="main-header">
      <div className="container nav-container">
        <a
          href="/"
          className="brand-anchor"
          id="brand-logo-link"
          onClick={(e) => handleNavClick(e, '#downloader')}
        >
          <div className="brand-mark" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="brand-logo-svg"
            >
              <defs>
                <linearGradient id="brandGoldGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#faecd0" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#8f691d" />
                </linearGradient>
              </defs>
              <path
                d="M4 5.5L9.5 18.5L15 5.5"
                stroke="url(#brandGoldGrad)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5 5.5H20"
                stroke="url(#brandGoldGrad)"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M13.5 11H18.5"
                stroke="url(#brandGoldGrad)"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx="19" cy="16.5" r="1.5" fill="url(#brandGoldGrad)" />
            </svg>
          </div>
          <div className="brand-typography">
            <span className="brand-title">VIDFETCH</span>
            <span className="brand-edition">ATELIER • SUITE</span>
          </div>
        </a>

        <nav className="nav-menu desktop-only" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`nav-item ${isActive ? 'active' : ''}`}
                id={link.id}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            );
          })}
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
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="mobile-nav-links">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    <span>{link.label}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </a>
                );
              })}
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
