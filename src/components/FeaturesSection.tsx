'use client';

import { motion } from 'framer-motion';

interface SpecFeature {
  title: string;
  summary: string;
  specCode: string;
}

const SPECIFICATIONS: SpecFeature[] = [
  {
    title: 'Zero Compression Degradation',
    summary: 'Streams are extracted directly in native H.264, VP9, or AV1 encoding containers without secondary transcode generational loss.',
    specCode: 'CODEC: DIRECT NATIVE',
  },
  {
    title: 'Studio 320kbps Audio Isolation',
    summary: 'Isolate high-frequency acoustic tracks from concert videos, interviews, and reels into pristine standalone MP3 audio files.',
    specCode: 'AUDIO: 48KHZ / 320KBPS',
  },
  {
    title: 'High-Throughput Stream Piping',
    summary: 'The decoupled Node.js Express engine streams byte chunks in-flight, injecting attachment headers to eliminate browser CORS obstacles.',
    specCode: 'PROXY: CHUNKED TCP',
  },
  {
    title: 'Unhindered Clean Master Feeds',
    summary: 'Acquire creator content stripped of invasive platform logo overlays, watermarks, and promotional end-cards.',
    specCode: 'OUTPUT: 100% UNBRANDED',
  },
  {
    title: 'Universal Hardware Compatibility',
    summary: 'Engineered for seamless operation across iOS Safari, Android Chrome, macOS, and desktop production workstations.',
    specCode: 'RUNTIME: CROSS-DEVICE',
  },
  {
    title: 'Ephemeral Zero-Storage Privacy',
    summary: 'Streams pass through memory buffers without persisting to server disks. No activity logs, tracking tokens, or user cookies.',
    specCode: 'SECURITY: ZERO-RETENTION',
  },
];

export default function FeaturesSection() {
  return (
    <section className="specifications-section" id="specifications">
      <div className="container">
        <div className="spec-prologue">
          <div className="spec-tag">PERFORMANCE BLUEPRINT</div>
          <h2 className="spec-title editorial-title">Engineered For Uncompromising Fidelity</h2>
          <p className="spec-desc">
            Technical superiority designed to deliver media preservation at the highest standards of modern engineering.
          </p>
        </div>

        <div className="specs-grid">
          {SPECIFICATIONS.map((item, idx) => (
            <motion.div
              className="spec-card luxury-card"
              key={idx}
              id={`feature-card-${idx}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="spec-code-pill">{item.specCode}</div>
              <h3 className="spec-heading">{item.title}</h3>
              <p className="spec-summary">{item.summary}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
