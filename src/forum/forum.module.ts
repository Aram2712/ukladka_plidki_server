import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { ForumEntity } from './forum.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ForumEntity])],
  controllers: [ForumController],
  providers: [ForumService],
})
export class ForumModule {}
