import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class SubscriberService implements OnModuleInit {
  constructor(@Inject('REDIS_SUBSCRIBER') private readonly redisSub: Redis) {}

  onModuleInit() {
    this.redisSub.subscribe('chat-events', (err, count) => {
      if (err) console.error('Subscribe error:', err);
      else console.log(`Subscribed to ${count} channel(s).`);
    });

    this.redisSub.on('message', (channel, message) => {
      console.log(`[${channel}] New message:`, JSON.parse(message));
      // TODO: emit to WebSocket here
    });
  }
}
