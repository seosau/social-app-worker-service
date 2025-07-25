import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class PublisherService {
  constructor(@Inject('REDIS_PUBLISHER') private readonly redisPub: Redis) {}

  async publishEvent(userId: string, data: any) {
  console.log('[Publisher] Publishing event...', userId, data);
    await this.redisPub.publish('chat-events', JSON.stringify({ userId, data }));
  }
}
