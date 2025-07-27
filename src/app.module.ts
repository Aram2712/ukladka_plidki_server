import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { OrdersModule } from './orders/orders.module';
import { MessageModule } from './messages/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import { ForumModule } from './forum/forum.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: `.env.development`,
      envFilePath: `.env.production`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // useFactory: (config: ConfigService) => ({
      //     type: 'mysql' as const,
      //     host: config.get<string>('DB_HOST') ?? 'localhost',
      //     port: Number(config.get<string>('DB_PORT')) || 3306,
      //     username: config.get<string>('DB_USERNAME') ?? 'root',
      //     password: config.get<string>('DB_PASSWORD') ?? 'root',
      //     database: config.get<string>('DB_NAME') ?? 'uklad_plidka',
      //     autoLoadEntities: true,
      //     synchronize: true, // ⚠️ только для разработки!
      //   })
        useFactory: () => ({
            type: 'mysql' as const,
            host: 'localhost',
            port: 3306,
            username: 'plidkaroot',
            password: 'plidkapass',
            database: 'ukladplidki',
            autoLoadEntities: true,
            synchronize: true, // ⚠️ только для разработки!
        })
    }),
    AuthModule,
    ServicesModule,
    OrdersModule,
    MessageModule,
    CommentsModule,
    ForumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
