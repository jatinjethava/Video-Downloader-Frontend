'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InquiryItem {
  question: string;
  response: string;
}

const INQUIRIES: InquiryItem[] = [
  {
    question: 'How does VidFetch Atelier preserve master stream fidelity?',
    response:
      'Unlike consumer downloaders that force media through lossy server re-encoders, VidFetch Atelier inspects original container manifests and proxies the direct byte chunks. You receive the exact H.264, VP9, or AV1 streams delivered by the host CDN.',
  },
  {
    question: 'Are higher-resolution tiers (such as 4K UHD and 1080p) fully supported?',
    response:
      'Yes. When the source content has been published with 4K or 1080p Full HD bitrates, our engine lists each discrete resolution track in the stream manifest for direct selective download.',
  },
  {
    question: 'Can studio acoustic tracks be extracted without the video stream?',
    response:
      'Yes. Switching to the "Studio Audio (MP3 Pure)" tab isolates the acoustic layer, delivering a dedicated high-bitrate audio file ideal for interviews, podcasts, music, and archiving.',
  },
  {
    question: 'How does the architecture overcome browser CORS download restrictions?',
    response:
      'Browsers naturally block direct downloads across cross-origin CDNs. VidFetch Atelier operates a dedicated Node.js TypeScript proxy that handles byte requests in-flight and injects Content-Disposition attachment headers directly into your browser stream.',
  },
  {
    question: 'How can developers integrate with the underlying TypeScript API?',
    response:
      'The backend exposes modular REST endpoints (/api/video/info, /api/video/download, /api/video/platforms). The service layer in backend/src/services/videoExtractor.ts provides extensible plugin hooks for custom adapters and headless scrapers.',
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="inquiries-section" id="faq">
      <div className="container">
        <motion.div
          className="inquiries-prologue"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inquiries-tag">CONCIERGE DOSSIER</div>
          <h2 className="inquiries-title editorial-title">Frequently Consulted Technical Inquiries</h2>
          <p className="inquiries-desc">
            Clarity regarding codec capabilities, proxy protocols, and architectural specifications.
          </p>
        </motion.div>

        <div className="inquiries-list">
          {INQUIRIES.map((item, idx) => (
            <motion.div
              className={`inquiry-item luxury-card ${openIdx === idx ? 'inquiry-open' : ''}`}
              key={idx}
              id={`faq-item-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <button
                type="button"
                className="inquiry-trigger"
                onClick={() => toggle(idx)}
                aria-expanded={openIdx === idx}
              >
                <span className="inquiry-question">{item.question}</span>
                <motion.span
                  className="inquiry-icon"
                  animate={{ rotate: openIdx === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openIdx === idx ? '−' : '+'}
                </motion.span>
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    className="inquiry-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p>{item.response}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
