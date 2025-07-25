import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Inject } from "@nestjs/common";
import { Job } from "bullmq";
import { APP_CONFIG } from "src/configs/app.config";
import { UserGrpcService } from "../configs/gRPC/user.grpc.service";
import { PublisherService } from "../configs/redis-module/publisher.service";

//Da commet queue register ben module=================================
@Processor(APP_CONFIG.QUEUE_CHAT_NAME)
export class ChatWorkerProcessor extends WorkerHost{
    constructor(
        private readonly redisPublisher: PublisherService,
        private readonly userGrpc: UserGrpcService,
    ) {
        super();
    }

    async process(job: Job, token?: string) {
        if (job.name === APP_CONFIG.QUEUE_CHAT_NAME_SEND_MESSAGE) {
            console.log('Job name is: ', APP_CONFIG.QUEUE_CHAT_NAME_SEND_MESSAGE)
            const user = await this.userGrpc.getOneUser({id: job.data.message.senderId});
            console.log('================= ', user)
            return this.redisPublisher.publishEvent(job.data.message.senderId, job.data)
        }
        return
    }
}
