# Deployment Guide

## Vercel Deployment

### Prerequisites
- Node.js 18+
- Vercel account
- Git repository connected to Vercel

### Installation

```bash
# Install Vercel CLI
npm i -g vercel
```

### Deploy to Production

```bash
# Deploy to production
vercel --prod
```

### Environment Variables

```bash
# Pull production environment variables
vercel env pull .env.production
```

### Set Environment Variables

Set the following variables in Vercel project settings:

**Database**
- `DATABASE_URL` - PostgreSQL connection string
- `DIRECT_URL` - Direct PostgreSQL connection (for migrations)

**Authentication**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLERK_WEBHOOK_SECRET`

**AI Services**
- `ANTHROPIC_API_KEY` - Claude API key
- `OPENAI_API_KEY` - GPT-4 Vision API key

**Storage**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET`
- `AWS_REGION`

**Payments**
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

**Analytics**
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

**App Configuration**
- `NEXT_PUBLIC_APP_URL` - e.g. https://app.tradereviewai.com
- `NODE_ENV` - Set to "production"

### Database Setup

After deployment, run migrations:

```bash
# Connect to your Vercel project
vercel link

# Run Prisma migrations
npm run db:migrate
```

### Monitoring

Monitor deployments at: https://vercel.com/dashboard

### Rollback

To rollback to a previous deployment:

```bash
vercel rollback
```
