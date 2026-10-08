'use client';

export default function Footer() {
  return (
    <footer className="footer-root" id="main-footer">
      <div className="container">
        <div className="footer-grid">
          
          <div className="brand-col">
            <div className="footer-brand">
              <div className="brand-monogram-box">
                <span>VF</span>
              </div>
              <div className="brand-copy">
                <span className="brand-name">VIDFETCH</span>
                <span className="brand-edition">ATELIER EDITION</span>
              </div>
            </div>
            <p className="brand-statement">
              The premier media archiving and video stream extraction suite. Engineered for lossless preservation,
              master bitrate compliance, and uncompromised privacy.
            </p>
          </div>

          
          <div className="footer-nav-matrix">
            <div className="matrix-col">
              <h4 className="matrix-title">Architecture</h4>
              <ul className="matrix-links">
                <li><a href="#downloader">Ingestion Studio</a></li>
                <li><a href="#platforms">Supported Portals</a></li>
                <li><a href="#process">Three-Phase Protocol</a></li>
                <li><a href="#specifications">Performance Specs</a></li>
                <li><a href="#faq">Technical Dossier</a></li>
              </ul>
            </div>

            <div className="matrix-col">
              <h4 className="matrix-title">Specifications</h4>
              <ul className="matrix-links">
                <li><span className="spec-tag-item">Next.js 16 App Router</span></li>
                <li><span className="spec-tag-item">Node.js Express TypeScript</span></li>
                <li><span className="spec-tag-item">10 Gbps Range Proxy</span></li>
                <li><span className="spec-tag-item">Lossless Audio Extraction</span></li>
                <li><span className="spec-tag-item">Ephemeral Memory Buffers</span></li>
              </ul>
            </div>
          </div>
        </div>

        
        <div className="footer-disclaimer-box">
          <p>
            <strong>LEGAL & USAGE PROTOCOL:</strong> VidFetch Atelier is designed strictly for educational media analysis, personal backup archival, and authorized public domain content. Users are solely responsible for ensuring adherence to copyright law, terms of digital service, and intellectual property provisions of host platforms.
          </p>
        </div>

        
        <div className="footer-bottom-bar">
          <p className="copyright-line">© 2026 VIDFETCH ATELIER. ALL RIGHTS RESERVED.</p>
          <p className="craft-line">CRAFTED FOR CINEPHILES & DIGITAL ARCHIVISTS.</p>
        </div>
      </div>
    </footer>
  );
}
