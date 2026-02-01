# RonyDevKit

RonyDevKit is a collection of essential developer utilities built with modern web technologies. It provides a fast, privacy-first, and offline-capable suite of tools that developers use in their daily workflows.

## Features

- **JWT Tools** - Generate, decode, and verify JSON Web Tokens with support for HS256, HS384, and HS512 algorithms
- **UUID Generator** - Generate UUIDs with options for uppercase, lowercase, and no-dash formats
- **Base64 Encoder/Decoder** - Encode and decode Base64 strings with UTF-8 support
- **Hash Generator** - Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes
- **JSON Formatter** - Format, minify, and validate JSON with configurable indentation
- **Password Generator** - Generate secure passwords with customizable length and character sets
- **Regex Tester** - Test regular expressions with live matching, highlighting, and common pattern presets
- **Timestamp Converter** - Convert between Unix timestamps and human-readable dates with timezone support

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [jose](https://github.com/panva/jose) - JavaScript Object Signing and Encryption

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/fiston-user/wisetools.git
cd wisetools
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

## Privacy

All tools run entirely in your browser. No data is sent to any server. Your inputs never leave your device.

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-tool`)
3. Commit your changes (`git commit -m 'Add new tool'`)
4. Push to the branch (`git push origin feature/new-tool`)
5. Open a Pull Request

### Adding a New Tool

1. Create a new directory in `src/app/tools/`
2. Add the tool definition to `src/lib/tools.ts`
3. Create an icon in `src/components/icons/`
4. Export the icon from `src/components/icons/index.tsx`
5. Register the icon in `src/components/ToolIcon.tsx`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons designed as custom SVG components
- Inspired by the need for fast, reliable developer utilities
