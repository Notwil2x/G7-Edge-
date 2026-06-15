# API Structure

## Trades

- `POST /api/trades` - Create trade
- `GET /api/trades` - List trades (paginated, filtered)
- `GET /api/trades/:id` - Get trade detail
- `PUT /api/trades/:id` - Update trade
- `DELETE /api/trades/:id` - Delete trade
- `POST /api/trades/:id/analyze` - Trigger AI analysis
- `POST /api/trades/:id/screenshots` - Upload screenshot

## Analysis

- `GET /api/analysis/:tradeId` - Get trade analysis
- `GET /api/analysis/mistakes/weekly` - Mistake summary (7d)
- `GET /api/analysis/mistakes/trends` - Mistake trends over time

## Coach

- `POST /api/coach/chat` - Send message to AI coach
- `GET /api/coach/chat/history` - Chat history
- `GET /api/coach/weekly-report` - Current weekly report
- `POST /api/coach/weekly-report` - Generate weekly report (cron)

## Psychology

- `GET /api/psychology/checkins` - List check-ins
- `POST /api/psychology/checkins` - Submit daily check-in
- `GET /api/psychology/correlations` - AI emotion-performance correlations

## Patterns

- `GET /api/patterns` - Get discovered patterns
- `POST /api/patterns/discover` - Trigger pattern discovery

## Goals

- `GET /api/goals` - List goals
- `POST /api/goals` - Create goal
- `PUT /api/goals/:id` - Update goal
- `GET /api/goals/progress` - Progress summary

## Prop Firm

- `GET /api/prop/:accountId` - Prop account details
- `POST /api/prop` - Create prop account
- `GET /api/prop/:accountId/health` - Account health check
- `GET /api/prop/:accountId/warnings` - AI risk warnings

## Reports

- `GET /api/reports/daily` - Daily report
- `GET /api/reports/weekly` - Weekly report
- `GET /api/reports/monthly` - Monthly report

## Workspace

- `GET /api/workspace` - Get workspaces
- `POST /api/workspace` - Save workspace layout
- `PUT /api/workspace/:id` - Update workspace

## Upload

- `POST /api/upload/screenshot` - Upload chart screenshot → S3 → GPT-4o analysis
