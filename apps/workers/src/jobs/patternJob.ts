import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { Anthropic } from '@anthropic-ai/sdk';

const prisma = new PrismaClient();
const anthropic = new Anthropic();

/**
 * Pattern Discovery Job
 * Runs every night at 2am ET (0 2 * * *)
 * Analyzes historical trades to identify profitable trading patterns
 */
async function discoverPatterns() {
  try {
    console.log('Starting pattern discovery job...');
    
    const users = await prisma.user.findMany({
      where: { active: true },
      include: { trades: { orderBy: { createdAt: 'desc' }, take: 100 } }
    });

    for (const user of users) {
      if (user.trades.length < 10) continue;

      const tradeData = user.trades.map(t => ({
        entryPrice: t.entryPrice,
        exitPrice: t.exitPrice,
        symbol: t.symbol,
        timeFrame: t.timeFrame,
        strategy: t.strategy,
        profitable: t.pnl > 0,
        pnl: t.pnl,
      }));

      const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: `Analyze these trading patterns and identify recurring profitable patterns: ${JSON.stringify(tradeData)}`
          }
        ]
      });

      // Save pattern analysis
      await prisma.patternAnalysis.create({
        data: {
          userId: user.id,
          analysis: message.content[0].type === 'text' ? message.content[0].text : '',
          generatedAt: new Date(),
        }
      });

      console.log(`Pattern analysis completed for user: ${user.id}`);
    }

    console.log('Pattern discovery job completed');
  } catch (error) {
    console.error('Error discovering patterns:', error);
  }
}

/**
 * Schedule: Every night at 2am ET
 * Cron expression: 0 2 * * *
 */
cron.schedule('0 2 * * *', () => {
  console.log('Running pattern discovery job...');
  discoverPatterns();
});

export { discoverPatterns };
