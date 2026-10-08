'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProtocolStep {
  index: string;
  phase: string;
  title: string;
  summary: string;
}

const STEPS: ProtocolStep[] = [
  {
    index: 'I',
    phase: 'PHASE 01',
    title: 'Source Ingestion',
    summary: 'Copy any public broadcast or content link directly from YouTube, Instagram, TikTok, X, or private storage buckets.',
  },
  {
    index: 'II',
    phase: 'PHASE 02',
    title: 'Stream Decomposition',
    summary: 'VidFetch Atelier inspects media manifests, OpenGraph descriptors, and adaptive bitrates to index all available video and audio tracks.',
  },
  {
    index: 'III',
    phase: 'PHASE 03',
    title: 'Master Delivery',
    summary: 'Choose your desired resolution tier or pure 320kbps MP3 audio track and download directly to your local file system via our accelerated proxy.',
  },
];

export default function HowItWorks() {
  return (
    <section className="protocol-section" id="process">
      <div className="container">
        <div className="protocol-prologue">
          <div className="protocol-badge">WORKFLOW INTEGRITY</div>
          <h2 className="protocol-title editorial-title">The Three-Phase Master Extraction Protocol</h2>
          <p className="protocol-desc">
            A frictionless, elegant workflow designed to archive web media with zero fidelity reduction.
          </p>
        </div>

        <div className="protocol-grid">
          {STEPS.map((item, idx) => (
            <motion.div 
              className="protocol-card luxury-card" 
              key={idx} 
              id={`step-card-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <div className="card-topline">
                <span className="phase-indicator">{item.phase}</span>
                <span className="numeral-serif">{item.index}</span>
              </div>
              <h3 className="protocol-heading editorial-title">{item.title}</h3>
              <p className="protocol-summary">{item.summary}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
