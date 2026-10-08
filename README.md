# VidFetch Atelier

VidFetch Atelier is a premium Next.js frontend for extracting and downloading video and audio content from public media links. The interface allows users to paste a URL, analyze the media, inspect available formats, and download the selected version through a connected backend service.

This app focuses on a luxury media experience built for YouTube, Instagram, TikTok, X, Facebook, Vimeo, Reddit, and direct file links.

## Features

- Paste a media URL and detect the source platform automatically
- Fetch metadata such as title, thumbnail, author, and description
- Preview available video and audio formats
- Download content through a queued backend workflow
- Mobile-friendly, responsive UI with premium styling
- Support for direct MP4, WebM, MKV, and MOV content

## Supported Sources

- YouTube
- Instagram Reels / Stories / IGTV
- TikTok
- X / Twitter
- Facebook Watch / public media
- Vimeo
- Reddit
- Direct download media URLs

## Tech Stack

- Next.js 16
- React 19
- Framer Motion
- CSS-based styling via app-level global styles
- Integration with a backend API for info fetching and downloads

## Project Structure

```bash
.
├── Dockerfile
├── README.md
├── package.json
├── next.config.mjs
├── jsconfig.json
├── eslint.config.mjs
├── public/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── DownloaderSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── PlatformsGrid.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── Footer.tsx
│   └── types/
└── tsconfig.json
```

## Prerequisites

Before running the app, make sure you have:

- Node.js 20+
- npm
- A backend service running and accessible through `NEXT_PUBLIC_BACKEND_URL`

## Environment Variables

Create a `.env.local` file in the frontend root if needed:

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

If your backend runs on a different host or port, update this value.

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Production Build

```bash
npm run build
npm run start
```

## Docker

A Dockerfile is included for containerized setup:

```bash
docker build -t vidfetch-atelier .
docker run -p 3000:3000 vidfetch-atelier
```

## Available Scripts

```bash
npm run dev     # Start the Next.js development server
npm run build   # Build for production
npm run start   # Run the production server
npm run lint    # Run ESLint checks
```

## Backend API Expectations

This frontend expects the backend to expose endpoints such as:

- `/api/video/info`
- `/api/video/queue-download`
- `/api/video/status/:jobId`

The UI handles the request flow, while the backend performs URL analysis, format extraction, and media delivery.

## Notes

- The app is designed around a premium media-download UX rather than raw utility output.
- Media extraction and download processing is delegated to the backend service, not handled directly in the frontend.

## Contributing

Contributions are welcome. Please open an issue or start a discussion before making larger changes.
