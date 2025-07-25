import { Global, Module } from '@nestjs/common'
import { ClientsModule, ClientsProviderAsyncOptions, GrpcOptions, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { join } from 'path'
import { UserGrpcService } from './user.grpc.service'

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_CLIENT_GRPC',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService): Promise<GrpcOptions> => {
        return {
            transport: Transport.GRPC,
            options: {
            loader: {
                longs: String,
                enums: String,
                json: true,
                defaults: true,
            },
            package: configService.get<string>('USER_GRPC_PACKAGE_NAME') || '',
            protoPath: [join(__dirname, '../../../proto/user.proto')],
            url: configService.get<string>('USER_GRPC_URL') || '',
            },
        };
        },
        inject: [ConfigService],
      } as ClientsProviderAsyncOptions,
    ]),
  ],
  providers: [
    UserGrpcService,
  ],
  exports: [
    UserGrpcService,
  ],
})
export class GrpcModule {}
