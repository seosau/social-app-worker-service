import { Module } from '@nestjs/common';
import { RedisModule } from '../configs/redis-module/redis.module';
import { ChatWorkerProcessor } from './chat-worker.processor';
import { GrpcModule } from '../configs/gRPC/grpc.module';
import { queueConfig } from '../configs/bullMQ.config';
import { BullModule } from '@nestjs/bullmq';
import { PublisherService } from '../configs/redis-module/publisher.service';

@Module({
  imports: [
    RedisModule,
    BullModule.registerQueue(queueConfig),
    GrpcModule,
  ],
  controllers: [],
  providers: [ChatWorkerProcessor, PublisherService],
})
export class ChatWorkerModule {}
