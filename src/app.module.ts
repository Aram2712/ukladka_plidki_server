
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
            envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'mysql',
                host: config.get('DB_HOST'),
                port: parseInt(<string>config.get('DB_PORT'), 10),
                username: config.get('DB_USERNAME'),
                password: config.get('DB_PASSWORD'),
                database: config.get('DB_NAME'),
                autoLoadEntities: true,
                synchronize: true, // ⚠️ только для разработки!
            }),
        }),
            AuthModule,
            ServicesModule,
            OrdersModule,
            MessageModule,
            CommentsModule,
            ForumModule
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}
