# G7-Edge

TradeReview AI - A comprehensive SaaS platform for day traders to analyze trades, detect mistakes, discover patterns, and improve performance with AI coaching.

## 🎯 Features

- **Trade Journal** - Log and track all trades with detailed metrics
- **AI Analysis** - Automatic trade analysis using Claude & GPT-4 Vision
- **Mistake Detection** - Identify recurring trading mistakes
- **AI Coach** - Real-time coaching with contextual trade data
- **Psychology Tracking** - Monitor emotional state and correlate with performance
- **Pattern Discovery** - Automatically identify profitable patterns
- **Prop Firm Tracker** - Monitor funded account health and compliance
- **Weekly Reports** - AI-generated performance summaries

## 📁 Project Structure

```
G7-Edge/
├── apps/
│   ├── web/              # Next.js 14 frontend + API routes
│   └── workers/          # Railway background jobs
├── packages/
│   └── shared/           # Shared types & utilities
├── prisma/               # Database schema
└── docker/               # Docker configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- Anthropic API key
- OpenAI API key
- Stripe account
- AWS S3 bucket

### Installation

```bash
git clone https://github.com/Notwil2x/G7-Edge-.git
cd G7-Edge-
npm install
cp .env.example .env.local
npx prisma migrate dev
npm run dev
```

### Environment Variables

See `.env.example` for all required environment variables.

## 📚 API Documentation

See `API_STRUCTURE.md` for complete API endpoint documentation.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS, Shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **AI**: Claude (Anthropic), GPT-4 Vision (OpenAI)
- **Auth**: Clerk
- **Payments**: Stripe
- **Storage**: AWS S3
- **Jobs**: Railway Workers
- **Charts**: Recharts

## 📝 License

MIT
