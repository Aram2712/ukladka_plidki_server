import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { OrdersModule } from './orders/orders.module';
import { MessageModule } from './messages/message.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import { ForumModule } from './forum/forum.module';
import { PriceListModule } from './priceList/priceList.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: `.env.development`,
      // envFilePath: `.env.production`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => {
        console.log('DB_USERNAME:', config.get<string>('DB_USERNAME'));
        console.log('DB_PASSWORD:', config.get<string>('DB_PASSWORD'));
        console.log('DB_NAME:', config.get<string>('DB_NAME'));
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'plidkaroot',
          password: 'plidkapass',
          database: 'ukladplidki',
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      // useFactory: (config: ConfigService): TypeOrmModuleOptions => {
      //   console.log('DB_USERNAME:', config.get<string>('DB_USERNAME'));
      //   console.log('DB_PASSWORD:', config.get<string>('DB_PASSWORD'));
      //   console.log('DB_NAME:', config.get<string>('DB_NAME'));
      //   return {
      //     type: 'mysql',
      //     host: 'localhost',
      //     port: 3307,
      //     username: 'root',
      //     password: 'root',
      //     database: 'uklad_plidka',
      //     autoLoadEntities: true,
      //     synchronize: true,
      //   };
      // },
    }),
    AuthModule,
    ServicesModule,
    OrdersModule,
    MessageModule,
    CommentsModule,
    ForumModule,
    PriceListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
