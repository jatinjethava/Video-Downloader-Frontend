'use client';

import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VideoResult, VideoFormat } from '../types/video';

interface SampleLink {
  name: string;
  shortName?: string;
  url: string;
  type: string;
}

interface DetectedPlatform {
  name: string;
  color: string;
}

const CURATED_SAMPLES: SampleLink[] = [
  {
    name: 'Oceans Nature',
    url: 'https://vjs.zencdn.net/v/oceans.mp4',
    type: 'direct',
  },
  {
    name: 'Big Buck Bunny',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
    type: 'direct',
  },
  {
    name: 'Sintel',
    url: 'https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_2MB.mp4',
    type: 'direct',
  },
  {
    name: 'Elephant Dream',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    type: 'direct',
  },
];

export default function DownloaderSection() {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<VideoResult | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadStatusText, setDownloadStatusText] = useState<{ [id: string]: string }>({});
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');
  const inputId = useId();


  const detectInputPlatform = (inputUrl: string): DetectedPlatform | null => {
    if (!inputUrl) return null;
    const lower = inputUrl.toLowerCase();
    if (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mkv')) {
      return { name: 'Direct Stream File', color: '#c5a059' };
    }
    if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
      return { name: 'YouTube Stream', color: '#c5a059' };
    }
    if (lower.includes('instagram.com')) {
      return { name: 'Instagram Reel', color: '#c5a059' };
    }
    if (lower.includes('tiktok.com')) {
      return { name: 'TikTok Video', color: '#c5a059' };
    }
    if (lower.includes('twitter.com') || lower.includes('x.com')) {
      return { name: 'X / Twitter Media', color: '#c5a059' };
    }
    if (lower.includes('facebook.com') || lower.includes('fb.watch')) {
      return { name: 'Facebook Media', color: '#c5a059' };
    }
    if (lower.includes('vimeo.com')) {
      return { name: 'Vimeo Showcase', color: '#c5a059' };
    }
    if (lower.includes('reddit.com')) {
      return { name: 'Reddit Media', color: '#c5a059' };
    }
    if (lower.startsWith('http://') || lower.startsWith('https://')) {
      return { name: 'Universal Web Media', color: '#c5a059' };
    }
    return null;
  };

  const detected = detectInputPlatform(url);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          setError('');
        }
      }
    } catch {
      // clipboard access not permitted in browser security context
    }
  };

  const handleFetch = async (targetUrl: string = url) => {
    const finalUrl = (targetUrl || '').trim();
    if (!finalUrl) {
      setError('Please provide a valid media link to commence extraction.');
      return;
    }

    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      setError('The provided URL protocol must begin with http:// or https://');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${backendUrl}/api/video/info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finalUrl }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to extract video specification from this link.');
      }

      setResult(data as VideoResult);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not reach the extraction backend engine.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format: VideoFormat) => {
    if (!result || downloadingId) return;
    setDownloadingId(format.formatId);
    setDownloadStatusText((prev) => ({ ...prev, [format.formatId]: 'Queueing...' }));
    setError('');

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

    try {

      const queueResponse = await fetch(`${backendUrl}/api/video/queue-download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: result.url,
          title: result.title,
          formatId: format.formatId
        })
      });

      if (!queueResponse.ok) {
        throw new Error('Failed to queue download on server.');
      }

      const queueData = await queueResponse.json();
      if (!queueData.success) throw new Error(queueData.error);
      const jobId = queueData.jobId;


      const pollStatus = async () => {
        try {
          const statusRes = await fetch(`${backendUrl}/api/video/status/${jobId}`);
          if (!statusRes.ok) throw new Error('Failed to poll status.');
          const statusData = await statusRes.json();
          if (!statusData.success) throw new Error(statusData.error);

          const job = statusData.job;

          if (job.status === 'failed') {
            throw new Error(job.error || 'Server error during extraction');
          }

          if (job.status === 'completed' && job.result?.downloadUrl) {
            setDownloadStatusText((prev) => ({ ...prev, [format.formatId]: 'Complete! ✓' }));


            const downloadLink = document.createElement('a');
            downloadLink.href = `${backendUrl}${job.result.downloadUrl}`;
            downloadLink.download = '';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            setTimeout(() => {
              setDownloadingId(null);
              setDownloadStatusText((prev) => {
                const next = { ...prev };
                delete next[format.formatId];
                return next;
              });
            }, 3000);
            return;
          }

          // Still waiting/active
          let statusText = 'Waiting in queue...';
          if (job.status === 'active') {
            statusText = `Processing (${job.progress}%)`;
          }
          setDownloadStatusText((prev) => ({ ...prev, [format.formatId]: statusText }));

          setTimeout(pollStatus, 2000);
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : 'Polling failed.';
          setError(`Download Interrupted: ${msg}`);
          setDownloadingId(null);
        }
      };


      setTimeout(pollStatus, 1500);

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Download failed to initialize.';
      setError(msg);
      setDownloadingId(null);
      setDownloadStatusText((prev) => {
        const next = { ...prev };
        delete next[format.formatId];
        return next;
      });
    }
  };

  const filteredFormats: VideoFormat[] = result?.formats
    ? result.formats.filter((f) => (activeTab === 'audio' ? !f.hasVideo : f.hasVideo))
    : [];

  return (
    <section className="studio-hero-section" id="downloader">
      <div className="container">

        <motion.div
          className="editorial-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="pre-heading">
            <span className="pre-heading-dash"></span>
            <span className="pre-heading-text">ENTERPRISE MEDIA INGESTION ARCHITECTURE</span>
            <span className="pre-heading-dash"></span>
          </div>

          <h1 className="hero-heading editorial-title" id="main-heading">
            Master-Grade Video Extraction, <br />
            <span className="gold-accent-text">From Only A Link.</span>
          </h1>

          <p className="hero-subtext">
            Engineered for high-fidelity preservation. Seamlessly analyze and extract streams from YouTube,
            Instagram, TikTok, X, Vimeo, or direct raw MP4 storage at pristine bitrates with zero watermark contamination.
          </p>
        </motion.div>


        <motion.div
          className="console-wrapper luxury-card"
          id="downloader-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="console-input-bar">
            <div className="console-field-wrapper">
              <div className="console-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </div>

              <input
                id={inputId}
                type="url"
                className="console-input"
                placeholder="Paste video URL (YouTube, IG, X, TikTok...)"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleFetch();
                }}
                autoComplete="off"
              />

              <div className="console-actions-cluster">
                {url ? (
                  <button
                    type="button"
                    className="clear-icon-btn"
                    onClick={() => {
                      setUrl('');
                      setResult(null);
                      setError('');
                    }}
                    title="Clear input"
                    aria-label="Clear field"
                  >
                    ✕
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-paste-minimal"
                    onClick={handlePaste}
                    title="Paste link from clipboard"
                    id="paste-link-btn"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                    <span>Paste</span>
                  </button>
                )}
              </div>
            </div>

            {detected && (
              <div className="telemetry-mobile-row">
                <span className="telemetry-pill" id="platform-telemetry-tag-mobile">
                  <span className="telemetry-gem"></span>
                  <span>{detected.name}</span>
                </span>
              </div>
            )}

            <button
              type="button"
              className="btn-luxury-primary console-submit-btn"
              onClick={() => handleFetch()}
              disabled={loading}
              id="fetch-video-btn"
            >
              {loading ? (
                <>
                  <span className="luxury-spinner"></span>
                  <span>Ingesting...</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <span>Analyze Stream</span>
                </>
              )}
            </button>
          </div>


          <div className="curated-row">
            <span className="curated-label">Curated Sample Portals:</span>
            <div className="curated-chips">
              {CURATED_SAMPLES.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="chip-item"
                  onClick={() => {
                    setUrl(sample.url);
                    handleFetch(sample.url);
                  }}
                  id={`demo-chip-${idx}`}
                >
                  <span className="chip-symbol">✦</span>
                  <span>{sample.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>


        {error && (
          <div className="error-banner" id="error-message-box" role="alert">
            <div className="error-symbol">!</div>
            <div className="error-content">
              <strong>Extraction Advisory:</strong> {error}
            </div>
          </div>
        )}



        <AnimatePresence mode="wait">
          {loading && !result && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="inspection-result luxury-card"
            >
              <div className="inspection-header" style={{ opacity: 0.7 }}>
                <div className="cinema-frame skeleton-box" style={{ background: 'var(--bg-surface-hover)' }}></div>
                <div className="cinema-details">
                  <div className="meta-badge-row">
                    <div className="skeleton-box" style={{ width: '60px', height: '20px', borderRadius: '4px' }}></div>
                    <div className="skeleton-box" style={{ width: '100px', height: '20px', borderRadius: '4px' }}></div>
                  </div>
                  <div className="skeleton-box" style={{ width: '80%', height: '32px', margin: '10px 0', borderRadius: '4px' }}></div>
                  <div className="skeleton-box" style={{ width: '120px', height: '20px', borderRadius: '4px' }}></div>
                  <div className="skeleton-box" style={{ width: '100%', height: '60px', marginTop: '10px', borderRadius: '4px' }}></div>
                </div>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inspection-result luxury-card" id="video-result-card"
            >
              <div className="inspection-header">
                <div className="cinema-frame">
                  {result.thumbnail ? (
                    <img src={result.thumbnail} alt={result.title} className="cinema-image" />
                  ) : result.url && (result.platform?.id === 'direct' || result.url.match(/\.(mp4|webm|mkv|mov)(\?.*)?$/i)) ? (
                    <video
                      src={`${result.url}#t=0.5`}
                      className="cinema-image"
                      preload="metadata"
                      muted
                      playsInline
                    />
                  ) : (
                    <div className="cinema-fallback">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" strokeWidth="1.5">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      <span>MASTER STREAM ENCODED</span>
                    </div>
                  )}
                  <div className="cinema-badge-duration">{result.formattedDuration || 'HD STREAM'}</div>
                </div>

                <div className="cinema-details">
                  <div className="meta-badge-row">
                    <span className="platform-tag">{result.platform?.name}</span>
                    <span className="fidelity-tag">MASTER FIDELITY</span>
                  </div>
                  <h2 className="media-headline editorial-title" id="extracted-video-title">{result.title}</h2>
                  <div className="media-provenance">
                    <span className="provenance-label">Origin:</span>
                    <span className="provenance-val">{result.author || 'Universal Web Source'}</span>
                  </div>
                  {result.description && (
                    <p className="media-synopsis">
                      {result.description.length > 250 ? `${result.description.slice(0, 250)}...` : result.description}
                    </p>
                  )}
                </div>
              </div>


              <div className="streams-specification">
                <div className="spec-nav-tabs">
                  <button
                    type="button"
                    className={`spec-tab ${activeTab === 'video' ? 'spec-tab-active' : ''}`}
                    onClick={() => setActiveTab('video')}
                    id="tab-video-formats"
                  >
                    <span className="tab-glyph">🎬</span>
                    <span className="tab-label-full">Video Streams (MP4 Master)</span>
                    <span className="tab-label-compact">Video (MP4)</span>
                  </button>
                  <button
                    type="button"
                    className={`spec-tab ${activeTab === 'audio' ? 'spec-tab-active' : ''}`}
                    onClick={() => setActiveTab('audio')}
                    id="tab-audio-formats"
                  >
                    <span className="tab-glyph">🎵</span>
                    <span className="tab-label-full">Studio Audio (MP3 Pure)</span>
                    <span className="tab-label-compact">Audio (MP3)</span>
                  </button>
                </div>

                {filteredFormats.length > 0 ? (
                  <div className="formats-manifest">
                    {filteredFormats.map((format, idx) => (
                      <div className="format-row" key={idx} id={`format-card-${format.formatId}`}>
                        <div className="format-descriptor">
                          <div className="format-grade">{format.quality}</div>
                          <div className="format-meta-chips">
                            <span className="meta-ext-chip">.{format.extension?.toUpperCase() || 'MP4'}</span>
                            <span className="meta-res-chip">{format.resolution}</span>
                            <span className="meta-size-chip">{format.formattedSize}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`btn-luxury-download ${downloadingId === format.formatId ? 'downloading' : ''}`}
                          onClick={() => handleDownload(format)}
                          disabled={!!downloadingId}
                          id={`download-btn-${format.formatId}`}
                        >
                          {downloadingId === format.formatId ? (
                            <>
                              <span className="luxury-spinner-gold"></span>
                              <span>{downloadStatusText[format.formatId] || 'Processing...'}</span>
                            </>
                          ) : (
                            <>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                              </svg>
                              <span>Download Stream</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}

                    {result.platform?.id === 'youtube' && activeTab === 'video' && !filteredFormats.some((f) => f.formatId === '1080p') && (
                      <div className="stream-quality-advisory">
                        <span style={{ fontSize: '1.1rem' }}>💡</span>
                        <div>

                          <strong>High-Definition Note:</strong> YouTube server restricts 720p/1080p for this copyright/VEVO video unless authenticated. Add a <code>cookies.txt</code> file in the <code>backend</code> directory to unlock Full HD & 4K for all protected videos.
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="empty-manifest">
                    No streams discovered in this tier. Switch classification above.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
