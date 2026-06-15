import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Goal Progress Tracking Job
 * Runs every night at midnight (0 0 * * *)
 * Updates progress metrics for user trading goals and sends notifications
 */
async function updateGoalProgress() {
  try {
    console.log('Starting goal progress tracking job...');
    
    const goals = await prisma.goal.findMany({
      where: { active: true },
      include: { user: true, trades: { where: { createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } } } }
    });

    for (const goal of goals) {
      let progress = 0;
      
      // Calculate progress based on goal type
      if (goal.type === 'DAILY_PNL') {
        const dailyPnl = goal.trades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
        progress = (dailyPnl / goal.targetValue) * 100;
      } else if (goal.type === 'WIN_RATE') {
        const winCount = goal.trades.filter(t => t.pnl > 0).length;
        progress = (winCount / goal.trades.length) * 100;
      } else if (goal.type === 'TRADE_COUNT') {
        progress = (goal.trades.length / goal.targetValue) * 100;
      }

      // Update goal progress
      const updatedGoal = await prisma.goal.update({
        where: { id: goal.id },
        data: {
          currentProgress: Math.min(progress, 100),
          lastUpdated: new Date(),
        }
      });

      // Check if goal is achieved
      if (updatedGoal.currentProgress >= 100) {
        await prisma.notification.create({
          data: {
            userId: goal.userId,
            type: 'GOAL_ACHIEVED',
            title: `Goal Achieved: ${goal.name}`,
            message: `Congratulations! You've achieved your goal: ${goal.name}`,
            read: false,
          }
        });
        console.log(`Goal achieved for user ${goal.userId}: ${goal.name}`);
      }

      console.log(`Updated goal progress for user ${goal.userId}: ${progress.toFixed(2)}%`);
    }

    console.log('Goal progress tracking job completed');
  } catch (error) {
    console.error('Error updating goal progress:', error);
  }
}

/**
 * Schedule: Every night at midnight ET
 * Cron expression: 0 0 * * *
 */
cron.schedule('0 0 * * *', () => {
  console.log('Running goal progress tracking job...');
  updateGoalProgress();
});

export { updateGoalProgress };
