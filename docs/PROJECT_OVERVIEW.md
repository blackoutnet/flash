# Flash - Project Overview

## Introduction

**Flash** is a browser-based tool that allows you to flash AGNOS onto your comma.ai device using the [qdl.js](https://github.com/commaai/qdl.js) library. It leverages modern web APIs for reliable downloads, progress reporting, and device communication.

## Tech Stack

- **Runtime & Package Manager:** Bun
- **Build & Dev Server:** Vite
- **UI Framework:** React
- **Styling:** Tailwind CSS
- **Device Programming:** QDL.js (with `programmer.bin`)
- **Browser APIs:** `navigator.storage` for caching and writable streams for downloads

## Key Features

- USB device detection and state monitoring
- Manifest-driven partition download and flashing
- Support for A/B partition layouts and GPT structures
- Resume-able, chunked streaming with progress callbacks
- Automated tests for manifest parsing, streaming, and image management
- Continuous Integration and GitHub Pages deployment

## Repository Layout

```
flash/
├── .devcontainer/          # Devcontainer configuration (Typescript + Bun)
├── .github/                # CI/CD workflows and PR templates
├── src/                    # Source code
│   ├── app/                # React components and entrypoint
│   │   ├── index.jsx       # Application entry
│   │   └── Flash.jsx       # Main flash UI and logic
│   ├── utils/              # Core logic modules:
│   │   ├── manifest.js     # ManifestImage & getManifest()
│   │   ├── image.js        # ImageManager for caching/downloading
│   │   ├── manager.js      # FlashManager orchestrates QDL operations
│   │   ├── stream.js       # fetchStream with range requests
│   │   └── progress.js     # Helpers for progress callbacks
│   └── QDL/                # QDL.js bindings & `programmer.bin`
├── index.html              # HTML template
├── tailwind.config.js      # TailwindCSS configuration
├── vite.config.js          # Vite configuration
├── package.json            # Scripts, dependencies, and metadata
└── README.md               # Quickstart and project description
```

## Getting Started

### Prerequisites

- A comma.ai device with USB access
- Bun (comes with the devcontainer via `.devcontainer` setup)

### Installation & Development

```bash
bun install       # Install dependencies
bun dev           # Start Vite dev server
```

Open <http://localhost:5173> in your browser to start flashing.

### Building for Production

```bash
bun run build     # Build static assets to dist/
```

### Testing

```bash
bun run test      # Run all Vitest suites
```

## CI/CD Pipeline

- **CI Tests:** `.github/workflows/main.yaml` runs unit tests on push and PR
- **Deployment:** `.github/workflows/deploy.yml` builds and deploys to GitHub Pages

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/your-feature`).
3. Commit changes and push (`git push origin feat/your-feature`).
4. Open a Pull Request against `master`.

---

*Generated for Codex integration and onboarding.* 