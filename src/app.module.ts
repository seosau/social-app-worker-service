import { Module } from '@nestjs/common';
import { ChatWorkerModule } from './chat-worker/chat-worker.module';
import { BullModule } from '@nestjs/bullmq';
import { bullMQConfig } from './configs/bullMQ.config';
import { RedisModule } from './configs/redis-module/redis.module';

@Module({
  imports: [
    ChatWorkerModule,
    BullModule.forRootAsync(bullMQConfig),
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
