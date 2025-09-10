import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null,
});

export const audioQueue = new Queue('audio-processing', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential' },
    delay: 5000,
  },
  //   removeOnComplete: true,
  //   removeOnFail: true,
});

export const addAudioJob = async (jobData: {
  audioFileId: string;
  filePath: string;
  userId: string;
  originalName: string;
}) => {
  const audioJob = await audioQueue.add('process-audio', jobData, {
    jobId: `audio-${jobData.audioFileId}`,
  });

  return audioJob;
};
