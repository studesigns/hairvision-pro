# HairVision Pro

AI-Powered Hair Consultation Software for Professional Stylists

## Features

### Core Capabilities
- **Photo Capture**: Take or upload client photos for realistic previews
- **AI Style Generation**: Describe styles in natural language, AI generates recommendations
- **Color Visualization**: Preview colors on actual client photos with blend modes
- **Formula Calculator**: Automatic translation to exact chemical mixing formulas
- **Style Gallery**: Browse 12+ pre-built styles with tags and filters
- **Multi-Brand Support**: Wella, Schwarzkopf, L'Oréal, Redken, Matrix formulas

### Workflow
1. Client describes their desired look
2. AI analyzes and generates style options
3. Preview colors on client's actual photo
4. Client approves the final look
5. Get exact chemical formula to mix

## Tech Stack

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-4 for recommendations, DALL-E for image generation (optional)
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hairvision-pro.git
cd hairvision-pro

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```env
# Required for AI features
OPENAI_API_KEY=your_key_here

# Optional: Enable image generation
ENABLE_IMAGE_GENERATION=false
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── consultation/         # Main consultation workflow
│   ├── gallery/              # Style gallery browser
│   ├── formulas/             # Formula reference guide
│   └── api/
│       └── generate-style/   # AI generation endpoint
├── components/
│   ├── ui/                   # Reusable UI components
│   └── consultation/         # Consultation-specific components
├── lib/                      # Utilities
└── types/                    # TypeScript types
```

## Key Components

### Consultation Workflow (`/consultation`)
- Multi-step wizard interface
- Photo upload with drag-and-drop
- Style description with quick-add chips
- Color picker with tone filtering
- Real-time formula calculation

### Formula Calculator
- Supports multiple brands (Wella, Schwarzkopf, L'Oréal)
- Calculates developer volume based on lift needed
- Includes additive recommendations
- Safety warnings for high-lift applications

### Style Gallery (`/gallery`)
- Grid and list view modes
- Search by name, tags, description
- Category filtering
- Favorite system
- Popularity rankings

## API Endpoints

### POST `/api/generate-style`
Generates AI-powered style recommendations.

**Request:**
```json
{
  "description": "Shoulder-length bob with warm caramel balayage",
  "currentPhoto": "base64_encoded_image (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "primaryRecommendation": {
      "style": "Layered Balayage Bob",
      "colorFormula": {
        "base": "7/3",
        "highlights": "9/03 + 10/38",
        "developer": "30 Vol (1:1)",
        "processingTime": "40"
      },
      "technique": "Hand-painted balayage...",
      "maintenanceTips": ["Use color-safe shampoo", ...]
    },
    "alternatives": [...],
    "warnings": [...]
  },
  "generatedPreviews": []
}
```

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]
```

## Future Roadmap

### Phase 2
- Database integration (PostgreSQL/Prisma)
- Client history tracking
- Appointment scheduling
- Inventory management

### Phase 3
- Mobile app (React Native)
- Multi-stylist salon support
- Analytics dashboard
- POS integration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and feature requests, please open a GitHub issue.

---

Built with Next.js and AI for the modern salon
