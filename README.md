# Asking Card

A minimalist real-time card application built with Next.js, Socket.IO, and TypeScript. Create and share cards with real-time updates across all connected users.

## Features

- **Real-time Updates**: Cards appear instantly across all connected users using Socket.IO
- **Minimalist Design**: Clean Apple-style UI with a monochromatic theme (#F3F3F1 and #000)
- **TypeScript**: Full type safety throughout the application
- **Responsive**: Works beautifully on desktop and mobile devices
- **In-memory Storage**: No database required - cards are stored in memory
- **Form Validation**: Client-side validation for creating new cards

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Real-time**: Socket.IO
- **Styling**: CSS with Apple-inspired design principles
- **Development**: ESLint, TypeScript strict mode

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd asking-card
```

2. Install dependencies:
```bash
npm install
```

3. Start the Socket.IO server:
```bash
npm run server
```

4. In a new terminal, start the Next.js development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **View Cards**: All existing cards are displayed on the main page
2. **Create Cards**: Fill out the form with a topic and description, then click "Create Card"
3. **Real-time Updates**: Open multiple browser tabs to see real-time updates
4. **Delete Cards**: Click the × button on any card to delete it
5. **Responsive Design**: Use on any device - the design adapts automatically

## Project Structure

```
asking-card/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── Card.tsx          # Individual card component
│   └── CardForm.tsx      # Form for creating cards
├── hooks/                # Custom React hooks
│   └── useSocket.ts      # Socket.IO client hook
├── types/                # TypeScript type definitions
│   └── index.ts          # Card and form interfaces
├── server.js             # Socket.IO server
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run server` - Start the Socket.IO server
- `npm run lint` - Run ESLint

## Design Philosophy

The application follows Apple's design principles:

- **Minimalism**: Clean, uncluttered interface focusing on content
- **Typography**: System fonts with carefully chosen weights and sizes
- **Color Palette**: Monochromatic theme with #F3F3F1 (light gray) and #000 (black)
- **Spacing**: Generous whitespace and consistent padding/margins
- **Interactions**: Subtle hover effects and smooth transitions
- **Accessibility**: High contrast ratios and semantic HTML

## Development Notes

- The Socket.IO server runs on port 3001 by default
- Cards are stored in memory and will be lost when the server restarts
- The application uses Next.js 13+ App Router structure
- All components are fully typed with TypeScript
- The design is mobile-first and fully responsive

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.