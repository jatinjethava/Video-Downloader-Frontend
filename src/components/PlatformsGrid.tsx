'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PlatformCardItem {
  name: string;
  protocolBadge: string;
  description: string;
  icon: React.ReactNode;
}

const PLATFORMS: PlatformCardItem[] = [
  {
    name: 'YouTube Global',
    protocolBadge: '4K • 1080P • SHORTS',
    description: 'High-bitrate stream extraction supporting 4K UHD, 60FPS sports broadcasts, and Shorts in pure master formats.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Instagram Atelier',
    protocolBadge: 'REELS • STORIES • IGTV',
    description: 'Lossless reel ingestion capturing dynamic color profiles and crisp audio tracks directly from creator feeds.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    name: 'TikTok Origin',
    protocolBadge: 'ZERO WATERMARK • HD',
    description: 'Pristine raw video extraction bypassing overlay watermarks and preserving full fidelity audio masters.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.32a6.34 6.34 0 0 0-5.45 6.27 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.82a8.27 8.27 0 0 0 4.88 1.57v-3.45a4.84 4.84 0 0 1-2.86-1.25z" />
      </svg>
    ),
  },
  {
    name: 'X Broadcast (Twitter)',
    protocolBadge: 'BROADCAST • FEED MP4',
    description: 'Direct stream parsing of news commentary, sports moments, and documentary footage hosted on X infrastructure.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Facebook Watch',
    protocolBadge: 'WATCH • PUBLIC REELS',
    description: 'Direct CDN chunk proxying for Facebook watch productions and public creator chronicles.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Direct Media & CDN',
    protocolBadge: 'RAW MP4 • WEBM • MOV',
    description: 'Zero-latency range proxying from AWS S3, Google Cloud Storage, Cloudflare R2, or custom media servers.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    ),
  },
];

export default function PlatformsGrid() {
  return (
    <section className="portals-section" id="platforms">
      <div className="container">
        <motion.div 
          className="section-prologue"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="prologue-tag">INGESTION PORTFOLIO</div>
          <h2 className="prologue-title editorial-title">Universal Compatibility With Premier Media Portals</h2>
          <p className="prologue-desc">
            No client software or browser extensions required. VidFetch Atelier interfaces directly with standard web protocols,
            content delivery networks, and OpenGraph schemas.
          </p>
        </motion.div>

        <div className="portals-grid">
          {PLATFORMS.map((item, idx) => (
            <motion.div 
              className="portal-card luxury-card" 
              key={idx} 
              id={`platform-card-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="portal-header">
                <div className="portal-icon-wrapper">
                  {item.icon}
                </div>
                <span className="portal-badge">{item.protocolBadge}</span>
              </div>
              <h3 className="portal-name">{item.name}</h3>
              <p className="portal-description">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
